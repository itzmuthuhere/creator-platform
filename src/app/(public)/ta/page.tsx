import React from "react";
export const revalidate = 60;
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/posts/PostCard";
import type { PostCard as PostCardType } from "@/types";
import { getBaseUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "தமிழ் கட்டுரைகள் — Techpulzo",
  description: "தொழில்நுட்பம், வேலைவாய்ப்பு, நிதி குறித்த தமிழில் கட்டுரைகள்.",
  alternates: {
    canonical: `${getBaseUrl()}/ta`,
    languages: { en: getBaseUrl(), ta: `${getBaseUrl()}/ta` },
  },
};

const postSelect = {
  id: true, title: true, subtitle: true, slug: true, excerpt: true,
  coverImage: true, publishedAt: true, viewCount: true, readingTime: true,
  featured: true, sponsored: true, sponsoredLabel: true,
  author: { select: { name: true, image: true } },
  category: { select: { name: true, slug: true, color: true } },
  tags: { select: { name: true, slug: true } },
} as const;

export default async function TamilHomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED", locale: "ta" },
    orderBy: { publishedAt: "desc" },
    select: postSelect,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            தமிழில் படியுங்கள்
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500 dark:text-gray-400">
            தொழில்நுட்பம், வேலைவாய்ப்பு, நிதி குறித்த கட்டுரைகள் — தமிழில்.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p as PostCardType} basePath="/ta" />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500 dark:text-gray-400">
            விரைவில் கட்டுரைகள் வெளியிடப்படும்.
          </div>
        )}
      </section>
    </div>
  );
}
