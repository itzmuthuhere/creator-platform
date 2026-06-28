import React from "react";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/posts/PostCard";
import SearchBar from "@/components/posts/SearchBar";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame, Star, Grid3X3, ArrowRight, Zap } from "lucide-react";
import type { PostCard as PostCardType } from "@/types";

async function getPosts() {
  const [featured, latest, trending, categories] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED", featured: true },
      take: 4,
      orderBy: { publishedAt: "desc" },
      select: postSelect,
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      take: 12,
      orderBy: { publishedAt: "desc" },
      select: postSelect,
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      take: 6,
      orderBy: { viewCount: "desc" },
      select: postSelect,
    }),
    prisma.category.findMany({
      take: 12,
      include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } },
    }),
  ]);
  return { featured, latest, trending, categories };
}

const postSelect = {
  id: true, title: true, subtitle: true, slug: true, excerpt: true,
  coverImage: true, publishedAt: true, viewCount: true, readingTime: true,
  featured: true, sponsored: true, sponsoredLabel: true,
  author: { select: { name: true, image: true } },
  category: { select: { name: true, slug: true, color: true } },
  tags: { select: { name: true, slug: true } },
} as const;

const CATEGORY_ICONS: Record<string, string> = {
  "tech": "💻", "ai-tools": "🤖", "reviews": "⭐", "tutorials": "📚",
  "finance": "💰", "career": "🚀", "productivity": "⚡", "mobile-apps": "📱",
  "web-tools": "🌐", "coding": "👨‍💻", "business": "💼", "life-hacks": "🎯",
};

export default async function HomePage() {
  let featured: any[] = [], latest: any[] = [], trending: any[] = [], categories: any[] = [];
  try {
    ({ featured, latest, trending, categories } = await getPosts());
  } catch (e) {
    // DB unavailable — show empty state
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-violet-400 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-indigo-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 text-sm px-4 py-1.5">
            <Zap className="mr-1.5 h-3.5 w-3.5" /> Deep-dive content from short-form creators
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Everything Your{" "}
            <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              30-Second Video
            </span>{" "}
            Couldn't Cover
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-violet-200">
            Full reviews, comparisons, tutorials, and affiliate picks — linked directly from your social content.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBar size="hero" placeholder="Search reviews, AI tools, tutorials…" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {["ChatGPT", "Best Laptops", "AI Courses", "Power Bank", "Free Tools"].map((tag) => (
              <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-violet-200 transition hover:bg-white/20 hover:text-white">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader icon={<Star className="h-5 w-5" />} title="Featured" href="/search?featured=true" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featured[0] && <PostCard post={featured[0] as PostCardType} variant="featured" />}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featured.slice(1, 4).map((p) => (
                <PostCard key={p.id} post={p as PostCardType} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-gray-50 py-14 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader icon={<Grid3X3 className="h-5 w-5" />} title="Browse by Category" href="/categories" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center transition hover:border-violet-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                  <span className="text-2xl">{CATEGORY_ICONS[cat.slug] || "📄"}</span>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-violet-600 dark:text-gray-100">{cat.name}</span>
                  <span className="text-xs text-gray-400">{(cat as any)._count.posts} posts</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader icon={<Flame className="h-5 w-5 text-orange-500" />} title="Trending Now" href="/search?sort=trending" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((p) => (
              <PostCard key={p.id} post={p as PostCardType} variant="horizontal" />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {latest.length > 0 && (
        <section className="bg-gray-50 py-14 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader icon={<TrendingUp className="h-5 w-5" />} title="Latest Posts" href="/posts" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {latest.map((p) => (
                <PostCard key={p.id} post={p as PostCardType} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/posts"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-300 px-6 py-3 text-sm font-medium text-violet-600 transition hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:hover:bg-violet-900/20">
                View all posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Ad Placeholder */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-900">
          Advertisement — Google AdSense Placement
        </div>
      </section>

      {/* Empty State */}
      {latest.length === 0 && featured.length === 0 && (
        <section className="mx-auto max-w-4xl px-4 py-32 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Platform is ready!</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Start creating content from the admin dashboard.
          </p>
          <Link href="/admin" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700">
            Go to Admin <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ icon, title, href }: { icon: React.ReactNode; title: string; href: string }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
        <span className="text-violet-600">{icon}</span> {title}
      </h2>
      <Link href={href} className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
        View all <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
