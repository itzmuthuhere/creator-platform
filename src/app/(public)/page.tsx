import React from "react";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/posts/PostCard";
import SearchBar from "@/components/posts/SearchBar";
import { TrendingUp, Flame, Star, Grid3X3, ArrowRight, BookOpen, PenLine } from "lucide-react";
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
  "technology": "💻", "health": "❤️", "science": "🔬", "travel": "✈️",
};

export default async function HomePage() {
  let featured: any[] = [], latest: any[] = [], trending: any[] = [], categories: any[] = [], topSearches: any[] = [];
  try {
    ({ featured, latest, trending, categories } = await getPosts());
    topSearches = await prisma.searchQuery.findMany({ where: { count: { gte: 3 } }, orderBy: { count: "desc" }, take: 5 });
  } catch (e) {}
  const heroTags = topSearches.length > 0
    ? topSearches.map((s: any) => s.query)
    : ["Technology", "AI Tools", "Tutorials", "Finance", "Career"];

  const totalPosts = latest.length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <section className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center py-20 text-center lg:py-28">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
              <PenLine className="h-3.5 w-3.5" />
              Ideas worth reading
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Discover stories,{" "}
              <span className="text-violet-600">thinking,</span>
              {" "}and expertise
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-500 dark:text-gray-400">
              Read in-depth articles on technology, career growth, finance, and more — written by experts, for curious minds.
            </p>
            <div className="mt-10 w-full max-w-xl">
              <SearchBar size="hero" placeholder="Search articles, topics, authors…" />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-gray-400">Trending:</span>
              {heroTags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-violet-400">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      {totalPosts > 0 && (
        <div className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-4 py-4 sm:px-6 lg:px-8">
            {[
              { label: "Articles", value: totalPosts },
              { label: "Categories", value: categories.length },
              { label: "Free to read", value: "100%" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Posts */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader icon={<Star className="h-5 w-5" />} title="Editor's Picks" href="/search?featured=true" />
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
        <section className="border-y border-gray-100 bg-gray-50 py-14 dark:border-gray-800 dark:bg-gray-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader icon={<Grid3X3 className="h-5 w-5" />} title="Browse Topics" href="/categories" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-5 text-center transition hover:border-violet-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-violet-700">
                  <span className="text-2xl">{CATEGORY_ICONS[cat.slug] || "📄"}</span>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-violet-600 dark:text-gray-200 dark:group-hover:text-violet-400">{cat.name}</span>
                  <span className="text-xs text-gray-400">{(cat as any)._count.posts} articles</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader icon={<Flame className="h-5 w-5 text-orange-500" />} title="Most Read" href="/search?sort=trending" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((p) => (
              <PostCard key={p.id} post={p as PostCardType} variant="horizontal" />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {latest.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-14 dark:border-gray-800 dark:bg-gray-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader icon={<TrendingUp className="h-5 w-5" />} title="Latest Articles" href="/posts" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {latest.map((p) => (
                <PostCard key={p.id} post={p as PostCardType} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/posts"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-violet-300 hover:text-violet-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                View all articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-violet-600 py-16 dark:bg-violet-900">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-violet-200" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Stay in the loop</h2>
          <p className="mt-3 text-violet-200">Get the best articles delivered to your inbox, weekly.</p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input type="email" placeholder="your@email.com"
              className="w-full rounded-lg border-0 px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-white sm:w-72" />
            <button type="submit"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-sm transition hover:bg-violet-50">
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-violet-300">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Empty State */}
      {latest.length === 0 && featured.length === 0 && (
        <section className="mx-auto max-w-4xl px-4 py-32 text-center">
          <div className="text-6xl mb-6">✍️</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to publish</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Start writing your first article from the admin dashboard.
          </p>
          <Link href="/admin" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700">
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
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
        <span className="text-violet-600">{icon}</span> {title}
      </h2>
      <Link href={href} className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
        View all <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
