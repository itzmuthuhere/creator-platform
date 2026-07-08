import React from "react";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/posts/PostCard";
import SearchBar from "@/components/posts/SearchBar";
import { Search, TrendingUp } from "lucide-react";
import type { PostCard as PostCardType } from "@/types";
import type { Metadata } from "next";
import AdUnit from "@/components/ads/AdUnit";

interface Props { searchParams: Promise<{ q?: string; page?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `Search results for "${q}"` : "Search" };
}

// A title match ("Voice Access" for query "voice") means far more than the word
// merely appearing somewhere in a long article — rank on relevance first, with
// view count only as a tiebreaker within the same relevance tier.
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

async function searchPosts(q: string, page: number) {
  const limit = 12;
  if (!q) return { posts: [], total: 0 };
  const where = {
    status: "PUBLISHED" as const,
    OR: [
      { title: { contains: q, mode: "insensitive" as const } },
      { excerpt: { contains: q, mode: "insensitive" as const } },
      { content: { contains: q, mode: "insensitive" as const } },
      { tags: { some: { name: { contains: q, mode: "insensitive" as const } } } },
    ],
  };
  const all = await prisma.post.findMany({
    where,
    select: {
      id: true, title: true, subtitle: true, slug: true, excerpt: true,
      coverImage: true, publishedAt: true, viewCount: true, readingTime: true,
      featured: true, sponsored: true, sponsoredLabel: true,
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true, color: true } },
      tags: { select: { name: true, slug: true } },
    },
  });
  all.sort((a, b) => relevanceScore(b, q) - relevanceScore(a, q) || b.viewCount - a.viewCount);
  const total = all.length;
  const posts = all.slice((page - 1) * limit, (page - 1) * limit + limit);
  return { posts, total };
}

async function getTrending() {
  return prisma.searchQuery.findMany({ orderBy: { count: "desc" }, take: 12 });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q: rawQ, page: rawPage } = await searchParams;
  const q = rawQ?.trim() || "";
  const page = parseInt(rawPage || "1");
  const [{ posts, total }, trending] = await Promise.all([searchPosts(q, page), getTrending()]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {q ? `Results for "${q}"` : "Search"}
        </h1>
        <SearchBar placeholder="Search articles, tools, reviews…" />
      </div>

      {!q && trending.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <TrendingUp className="h-5 w-5 text-violet-600" /> Trending Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {trending.map((t) => (
              <a key={t.id} href={`/search?q=${encodeURIComponent(t.query)}`}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-violet-400 hover:text-violet-600 dark:border-gray-700 dark:text-gray-300">
                {t.query}
                <span className="ml-2 text-xs text-gray-400">({t.count})</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {q && (
        <p className="mb-6 text-sm text-gray-500">
          {total} result{total !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Ad — top of results (only once there's something to show) */}
      {posts.length > 0 && (
        <div className="mb-8">
          <AdUnit slot="2233445566" format="horizontal" className="h-24 sm:h-28" />
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.slice(0, 8).map((p) => <PostCard key={p.id} post={p as PostCardType} />)}
          {posts.length > 8 && (
            <>
              <div className="col-span-full">
                <AdUnit slot="3344556677" format="horizontal" className="h-24 sm:h-28" />
              </div>
              {posts.slice(8).map((p) => <PostCard key={p.id} post={p as PostCardType} />)}
            </>
          )}
        </div>
      ) : q ? (
        <div className="py-20 text-center">
          <Search className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No results for "{q}"</h3>
          <p className="mt-2 text-gray-500">Try different keywords or browse categories.</p>
        </div>
      ) : null}
    </div>
  );
}
