import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalPosts,
    publishedPosts,
    totalViews,
    topPosts,
    recentSearches,
    affiliateClicks,
    categoryBreakdown,
    trafficSources,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.aggregate({ _sum: { viewCount: true } }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { viewCount: "desc" },
      take: 10,
      select: { title: true, slug: true, viewCount: true, publishedAt: true },
    }),
    prisma.searchQuery.findMany({
      orderBy: { count: "desc" },
      take: 10,
    }),
    prisma.affiliateLink.aggregate({ _sum: { clickCount: true } }),
    prisma.category.findMany({
      include: { _count: { select: { posts: true } } },
    }),
    prisma.postAnalytic.groupBy({
      by: ["source"],
      _sum: { views: true },
      orderBy: { _sum: { views: "desc" } },
    }),
  ]);

  return NextResponse.json({
    totalPosts,
    publishedPosts,
    totalViews: totalViews._sum.viewCount || 0,
    topPosts,
    recentSearches,
    affiliateClicks: affiliateClicks._sum.clickCount || 0,
    categoryBreakdown: categoryBreakdown.map((c) => ({
      name: c.name,
      count: c._count.posts,
      color: c.color,
    })),
    trafficSources,
  });
}
