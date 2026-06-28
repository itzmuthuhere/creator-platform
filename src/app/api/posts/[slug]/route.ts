import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify, estimateReadingTime } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: { select: { id: true, name: true, image: true, bio: true, socialLinks: true } },
      category: true,
      tags: true,
      affiliateLinks: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  prisma.post.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  const referer = req.headers.get("referer") || "";
  const source = referer.includes("instagram") ? "instagram"
    : referer.includes("facebook") ? "facebook"
    : referer.includes("youtube") ? "youtube"
    : referer.includes("twitter") || referer.includes("x.com") ? "twitter"
    : referer ? "referral"
    : "direct";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  prisma.postAnalytic.findFirst({ where: { postId: post.id, date: today, source } }).then((existing) => {
    if (existing) {
      prisma.postAnalytic.update({ where: { id: existing.id }, data: { views: { increment: 1 } } }).catch(() => {});
    } else {
      prisma.postAnalytic.create({ data: { postId: post.id, date: today, source, views: 1 } }).catch(() => {});
    }
  }).catch(() => {});

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    title, subtitle, content, excerpt, coverImage, images,
    categoryId, tags, status, featured, sponsored, sponsoredLabel,
    seoTitle, metaDescription, keywords, ogImage, scheduledAt, affiliateLinks,
  } = body;

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const readingTime = estimateReadingTime(content || post.content);
  let publishedAt = post.publishedAt;
  if (status === "PUBLISHED" && !post.publishedAt) {
    publishedAt = new Date();
  }

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

  await prisma.affiliateLink.deleteMany({ where: { postId: post.id } });

  const updated = await prisma.post.update({
    where: { slug },
    data: {
      title,
      subtitle,
      content: content ?? post.content,
      excerpt,
      coverImage,
      images: images || [],
      status,
      featured,
      sponsored,
      sponsoredLabel,
      seoTitle,
      metaDescription,
      keywords: keywords || [],
      ogImage,
      readingTime,
      publishedAt,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      categoryId: categoryId || null,
      tags: { set: tagConnections },
      affiliateLinks: {
        create: (affiliateLinks || []).map((l: any) => ({
          label: l.label,
          url: l.url,
          platform: l.platform || null,
        })),
      },
    },
    include: { tags: true, category: true, affiliateLinks: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.post.delete({ where: { slug } });
  return NextResponse.json({ success: true });
}
