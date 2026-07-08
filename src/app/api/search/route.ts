import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// A title match means far more than the word merely appearing somewhere in a
// long article — rank on relevance first, view count only as a tiebreaker.
function relevanceScore(post: { title: string; excerpt: string | null; tags: { name: string }[] }, q: string) {
  const ql = q.toLowerCase();
  const title = post.title.toLowerCase();
  if (title === ql) return 100;
  if (title.startsWith(ql)) return 90;
  if (title.includes(ql)) return 80;
  if (post.tags.some((t) => t.name.toLowerCase().includes(ql))) return 60;
  if (post.excerpt?.toLowerCase().includes(ql)) return 40;
  return 10;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("q")?.trim() || "";
  const q = raw.startsWith("#") ? raw.slice(1) : raw;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!q) {
    const trending = await prisma.searchQuery.findMany({
      orderBy: { count: "desc" },
      take: 10,
    });
    return NextResponse.json({ posts: [], total: 0, trending });
  }

  const skip = (page - 1) * limit;

  const where = {
    status: "PUBLISHED" as const,
    OR: [
      { title: { contains: q, mode: "insensitive" as const } },
      { excerpt: { contains: q, mode: "insensitive" as const } },
      { content: { contains: q, mode: "insensitive" as const } },
      { tags: { some: { name: { contains: q, mode: "insensitive" as const } } } },
      { category: { name: { contains: q, mode: "insensitive" as const } } },
      { keywords: { has: q.toLowerCase() } },
    ],
  };

  const all = await prisma.post.findMany({
    where,
    select: {
      id: true,
      title: true,
      subtitle: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      viewCount: true,
      readingTime: true,
      featured: true,
      sponsored: true,
      sponsoredLabel: true,
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true, color: true } },
      tags: { select: { name: true, slug: true } },
    },
  });
  all.sort((a, b) => relevanceScore(b, q) - relevanceScore(a, q) || b.viewCount - a.viewCount);
  const total = all.length;
  const posts = all.slice(skip, skip + limit);

  // Track search query
  const querySlug = q.toLowerCase().trim();
  prisma.searchQuery.findFirst({ where: { query: querySlug } }).then((existing) => {
    if (existing) {
      prisma.searchQuery.update({ where: { id: existing.id }, data: { count: { increment: 1 }, results: total } }).catch(() => {});
    } else {
      prisma.searchQuery.create({ data: { query: querySlug, count: 1, results: total } }).catch(() => {});
    }
  }).catch(() => {});

  return NextResponse.json({ posts, total, query: q, page, limit });
}
