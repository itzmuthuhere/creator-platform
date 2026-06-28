import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";
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

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
          { content: { contains: q, mode: "insensitive" } },
          { tags: { some: { name: { contains: q, mode: "insensitive" } } } },
          { category: { name: { contains: q, mode: "insensitive" } } },
          { keywords: { has: q.toLowerCase() } },
        ],
      },
      skip,
      take: limit,
      orderBy: { viewCount: "desc" },
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
    }),
    prisma.post.count({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
          { content: { contains: q, mode: "insensitive" } },
          { tags: { some: { name: { contains: q, mode: "insensitive" } } } },
          { category: { name: { contains: q, mode: "insensitive" } } },
        ],
      },
    }),
  ]);

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
