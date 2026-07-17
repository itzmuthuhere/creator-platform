export const revalidate = 60;
import React from "react";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/posts/PostCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PostCard as PostCardType } from "@/types";
import type { Metadata } from "next";
import AdUnit from "@/components/ads/AdUnit";

export const metadata: Metadata = { title: "All Articles" };

interface Props { searchParams: Promise<{ page?: string }> }

export default async function PostsPage({ searchParams }: Props) {
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr || "1");
  const limit = 12;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true, title: true, subtitle: true, slug: true, excerpt: true,
        coverImage: true, publishedAt: true, viewCount: true, readingTime: true,
        featured: true, sponsored: true, sponsoredLabel: true,
        author: { select: { name: true, image: true } },
        category: { select: { name: true, slug: true, color: true } },
        tags: { select: { name: true, slug: true } },
      },
    }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">All Articles</h1>
        <p className="mt-1 text-sm text-gray-500">{total} articles published</p>
      </div>

      {/* Ad — top (only once there's something to show) */}
      {posts.length > 0 && (
        <div className="mb-8">
          <AdUnit slot="6677889900" format="horizontal" className="h-24 sm:h-28" />
        </div>
      )}

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.slice(0, 8).map((p) => (
              <PostCard key={p.id} post={p as PostCardType} />
            ))}
            {posts.length > 8 && (
              <>
                <div className="col-span-full">
                  <AdUnit slot="7788990011" format="horizontal" className="h-24 sm:h-28" />
                </div>
                {posts.slice(8).map((p) => (
                  <PostCard key={p.id} post={p as PostCardType} />
                ))}
              </>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/posts?page=${page - 1}`}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-violet-400 hover:text-violet-600 dark:border-gray-700 dark:text-gray-300"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Link>
              )}
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/posts?page=${page + 1}`}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-violet-400 hover:text-violet-600 dark:border-gray-700 dark:text-gray-300"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500">No articles published yet.</p>
        </div>
      )}
    </div>
  );
}
