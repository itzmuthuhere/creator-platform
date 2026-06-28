export const dynamic = "force-dynamic";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { FileText, Eye, Search, ExternalLink, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { formatNumber, formatDate } from "@/lib/utils";

async function getDashboardData() {
  const [totalPosts, publishedPosts, totalViews, topPosts, recentPosts, topSearches, affiliateClicks] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.aggregate({ _sum: { viewCount: true } }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { viewCount: "desc" },
      take: 5,
      select: { title: true, slug: true, viewCount: true, publishedAt: true },
    }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { title: true, slug: true, status: true, createdAt: true, viewCount: true },
    }),
    prisma.searchQuery.findMany({ orderBy: { count: "desc" }, take: 8 }),
    prisma.affiliateLink.aggregate({ _sum: { clickCount: true } }),
  ]);
  return { totalPosts, publishedPosts, totalViews: totalViews._sum.viewCount || 0, topPosts, recentPosts, topSearches, affiliateClicks: affiliateClicks._sum.clickCount || 0 };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { totalPosts, publishedPosts, totalViews, topPosts, recentPosts, topSearches, affiliateClicks } = await getDashboardData();

  const stats = [
    { label: "Total Posts", value: totalPosts, icon: FileText, color: "text-violet-600 bg-violet-50" },
    { label: "Published", value: publishedPosts, icon: TrendingUp, color: "text-green-600 bg-green-50" },
    { label: "Total Views", value: formatNumber(totalViews), icon: Eye, color: "text-blue-600 bg-blue-50" },
    { label: "Affiliate Clicks", value: formatNumber(affiliateClicks), icon: ExternalLink, color: "text-orange-600 bg-orange-50" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {session.user.name || session.user.email}</p>
          </div>
          <Link href="/admin/posts/new"
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
            <Plus className="h-4 w-4" /> New Post
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
              <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Posts */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">Top Posts</h2>
              <Link href="/admin/posts" className="text-xs text-violet-600 hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {topPosts.map((p, i) => (
                <div key={p.slug} className="flex items-center gap-3 px-5 py-3">
                  <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{p.title}</p>
                    {p.publishedAt && <p className="text-xs text-gray-500">{formatDate(p.publishedAt)}</p>}
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-gray-700 dark:text-gray-300">{formatNumber(p.viewCount)}</span>
                </div>
              ))}
              {topPosts.length === 0 && (
                <p className="px-5 py-8 text-center text-sm text-gray-400">No published posts yet</p>
              )}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">Recent Posts</h2>
              <Link href="/admin/posts/new" className="text-xs text-violet-600 hover:underline">+ New post</Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentPosts.map((p) => (
                <Link key={p.slug} href={`/admin/posts/${p.slug}/edit`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{p.title}</p>
                    <p className="text-xs text-gray-500">{formatDate(p.createdAt)}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    p.status === "PUBLISHED" ? "bg-green-100 text-green-700" :
                    p.status === "DRAFT" ? "bg-gray-100 text-gray-600" : "bg-orange-100 text-orange-700"
                  }`}>{p.status}</span>
                </Link>
              ))}
              {recentPosts.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-gray-400">No posts yet</p>
                  <Link href="/admin/posts/new" className="mt-2 inline-flex items-center gap-1 text-sm text-violet-600">
                    Create your first post <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trending Searches */}
        {topSearches.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Search className="h-4 w-4 text-violet-600" /> Trending Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {topSearches.map((s) => (
                <div key={s.id} className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-sm dark:border-gray-700">
                  <span className="text-gray-900 dark:text-gray-100">{s.query}</span>
                  <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
