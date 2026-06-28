import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import { formatNumber, formatDate } from "@/lib/utils";
import { Eye, FileText, Search, ExternalLink, TrendingUp, BarChart2 } from "lucide-react";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const [totalViews, publishedPosts, topPosts, topSearches, affiliateTotal, trafficSources, categoryData] = await Promise.all([
    prisma.post.aggregate({ _sum: { viewCount: true } }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { viewCount: "desc" },
      take: 10,
      select: { title: true, slug: true, viewCount: true, publishedAt: true, category: { select: { name: true } } },
    }),
    prisma.searchQuery.findMany({ orderBy: { count: "desc" }, take: 15 }),
    prisma.affiliateLink.aggregate({ _sum: { clickCount: true } }),
    prisma.postAnalytic.groupBy({ by: ["source"], _sum: { views: true }, orderBy: { _sum: { views: "desc" } } }),
    prisma.category.findMany({ include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } } }),
  ]);

  const stats = [
    { label: "Total Views", value: formatNumber(totalViews._sum.viewCount || 0), icon: Eye, color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20" },
    { label: "Published Posts", value: publishedPosts, icon: FileText, color: "text-green-600 bg-green-50 dark:bg-green-900/20" },
    { label: "Affiliate Clicks", value: formatNumber(affiliateTotal._sum.clickCount || 0), icon: ExternalLink, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20" },
    { label: "Search Queries", value: topSearches.reduce((a, b) => a + b.count, 0), icon: Search, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
  ];

  const maxViews = topPosts[0]?.viewCount || 1;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500">Platform-wide performance overview</p>
      </div>

      <div className="space-y-6">
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
            <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-violet-600" /> Top Articles by Views
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {topPosts.map((p, i) => (
                <div key={p.slug}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{p.title}</span>
                    <span className="ml-4 shrink-0 text-sm font-bold text-gray-700 dark:text-gray-300">{formatNumber(p.viewCount)}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: `${(p.viewCount / maxViews) * 100}%` }} />
                  </div>
                </div>
              ))}
              {topPosts.length === 0 && <p className="py-8 text-center text-sm text-gray-400">No data yet</p>}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-violet-600" /> Traffic Sources
              </h2>
            </div>
            <div className="p-5 space-y-3">
              {trafficSources.length > 0 ? trafficSources.map((s) => {
                const sourceColors: Record<string, string> = {
                  instagram: "bg-pink-500", facebook: "bg-blue-600", youtube: "bg-red-500",
                  twitter: "bg-sky-500", direct: "bg-violet-500", referral: "bg-green-500",
                };
                const total = trafficSources.reduce((a, b) => a + (b._sum.views || 0), 0);
                const pct = total ? Math.round(((s._sum.views || 0) / total) * 100) : 0;
                return (
                  <div key={s.source} className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${sourceColors[s.source || "direct"] || "bg-gray-400"}`} />
                    <span className="flex-1 text-sm capitalize text-gray-700 dark:text-gray-300">{s.source || "Direct"}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatNumber(s._sum.views || 0)}</span>
                    <span className="text-xs text-gray-400 w-10 text-right">{pct}%</span>
                  </div>
                );
              }) : <p className="py-8 text-center text-sm text-gray-400">No traffic data yet</p>}
            </div>
          </div>
        </div>

        {/* Search Analytics */}
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Search className="h-4 w-4 text-violet-600" /> Top Search Queries
            </h2>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {topSearches.map((s) => (
                <div key={s.id} className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 dark:border-gray-700">
                  <span className="text-sm text-gray-800 dark:text-gray-200">{s.query}</span>
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">{s.count}</span>
                </div>
              ))}
              {topSearches.length === 0 && <p className="text-sm text-gray-400">No searches recorded yet</p>}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
