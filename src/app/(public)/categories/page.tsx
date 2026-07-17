export const revalidate = 300;
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Grid3X3 } from "lucide-react";
import AdUnit from "@/components/ads/AdUnit";

export const metadata: Metadata = {
  title: "Browse Topics — Techpulzo",
  description: "Explore all article categories on Techpulzo — Tech, Career, Tutorials, Finance, Reviews and more.",
};

const CATEGORY_ICONS: Record<string, string> = {
  tech: "💻",
  reviews: "⭐",
  career: "🚀",
  tutorials: "📚",
  finance: "💰",
  productivity: "⚡",
  ai: "🤖",
  programming: "🧑‍💻",
  mobile: "📱",
  web: "🌐",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { posts: { where: { status: "PUBLISHED" } } },
      },
    },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-12 dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-2">
            <Grid3X3 className="h-7 w-7 text-violet-600" />
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Browse Topics</h1>
          </div>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Explore articles across {categories.length} topics — find what interests you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Ad — top */}
        <AdUnit slot="9900112233" format="horizontal" className="mb-10 h-24 sm:h-28" />

        {categories.length === 0 ? (
          <div className="py-24 text-center text-gray-400">No categories yet.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((cat) => {
              const icon = CATEGORY_ICONS[cat.slug] || CATEGORY_ICONS[cat.name.toLowerCase()] || "📝";
              const count = cat._count.posts;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="card-hover group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900"
                >
                  <span className="text-4xl">{icon}</span>
                  <div>
                    <p
                      className="font-bold text-gray-900 group-hover:text-violet-600 dark:text-white"
                      style={{ color: cat.color || undefined }}
                    >
                      {cat.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {count} {count === 1 ? "article" : "articles"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Ad — bottom */}
        <AdUnit slot="1122003344" format="horizontal" className="mt-12 h-24 sm:h-28" />
      </div>
    </div>
  );
}
