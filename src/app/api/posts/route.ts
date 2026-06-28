import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify, estimateReadingTime } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const status = searchParams.get("status") as "DRAFT" | "PUBLISHED" | "SCHEDULED" | "UNPUBLISHED" | null;
  const featured = searchParams.get("featured");
  const skip = (page - 1) * limit;

  const where: any = {};

  if (status) {
    where.status = status;
  } else {
    where.status = "PUBLISHED";
  }

  if (category) where.category = { slug: category };
  if (tag) where.tags = { some: { slug: tag } };
  if (featured === "true") where.featured = true;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishedAt: "desc" },
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
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    title, subtitle, content, excerpt, coverImage, images,
    categoryId, tags, status, featured, sponsored, sponsoredLabel,
    seoTitle, metaDescription, keywords, ogImage, scheduledAt, affiliateLinks,
  } = body;

  const slug = slugify(title);
  const readingTime = estimateReadingTime(content || "");
  const publishedAt = status === "PUBLISHED" ? new Date() : scheduledAt ? new Date(scheduledAt) : null;

  // Handle tags
  const tagConnections = await Promise.all(
    (tags || []).map(async (tagName: string) => {
      const tagSlug = slugify(tagName);
      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        create: { name: tagName, slug: tagSlug },
        update: {},
      });
      return { id: tag.id };
    })
  );

  const post = await prisma.post.create({
    data: {
      title,
      subtitle,
      slug,
      content: content || "",
      excerpt,
      coverImage,
      images: images || [],
      status: status || "DRAFT",
      featured: featured || false,
      sponsored: sponsored || false,
      sponsoredLabel,
      seoTitle,
      metaDescription,
      keywords: keywords || [],
      ogImage,
      readingTime,
      publishedAt,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      authorId: session.user.id,
      categoryId: categoryId || null,
      tags: { connect: tagConnections },
      affiliateLinks: {
        create: (affiliateLinks || []).map((l: any) => ({
          label: l.label,
          url: l.url,
          platform: l.platform || null,
        })),
      },
    },
    include: {
      tags: true,
      category: true,
      affiliateLinks: true,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
