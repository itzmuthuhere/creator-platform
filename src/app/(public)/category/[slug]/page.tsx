export const dynamic = "force-dynamic";
import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/posts/PostCard";
import { Metadata } from "next";
import type { PostCard as PostCardType } from "@/types";

interface Props { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  return { title: cat ? `${cat.name} — Articles` : "Category" };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr || "1");
  const limit = 12;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED", categoryId: category.id },
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
    prisma.post.count({ where: { status: "PUBLISHED", categoryId: category.id } }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color || "#7c3aed" }} />
          <span className="text-sm font-medium text-gray-500">Category</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{category.name}</h1>
        {category.description && <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{category.description}</p>}
        <p className="mt-1 text-sm text-gray-500">{total} articles</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((p) => <PostCard key={p.id} post={p as PostCardType} />)}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500">No posts in this category yet.</p>
        </div>
      )}
    </div>
  );
}
