export const dynamic = "force-dynamic";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate, formatNumber, getBaseUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import PostCard from "@/components/posts/PostCard";
import AffiliateSection from "@/components/posts/AffiliateSection";
import QRCodeSection from "@/components/posts/QRCodeSection";
import ShareButtons from "@/components/posts/ShareButtons";
import { Clock, Eye, Calendar, ArrowLeft } from "lucide-react";
import type { PostCard as PostCardType } from "@/types";
import AdUnit from "@/components/ads/AdUnit";

interface Props { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { id: true, name: true, image: true, bio: true, socialLinks: true } },
      category: true,
      tags: true,
      affiliateLinks: true,
    },
  });
}

async function getRelated(categoryId: string | null, currentSlug: string) {
  return prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      slug: { not: currentSlug },
      ...(categoryId ? { categoryId } : {}),
    },
    take: 4,
    orderBy: { viewCount: "desc" },
    select: {
      id: true, title: true, subtitle: true, slug: true, excerpt: true,
      coverImage: true, publishedAt: true, viewCount: true, readingTime: true,
      featured: true, sponsored: true, sponsoredLabel: true,
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true, color: true } },
      tags: { select: { name: true, slug: true } },
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  const url = `${getBaseUrl()}/${post.slug}`;
  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    keywords: post.keywords,
    alternates: { canonical: post.canonicalUrl || url },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      url,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: [{ url: post.ogImage || post.coverImage || "/og-default.png" }],
    },
    twitter: { card: "summary_large_image", title: post.title },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  await prisma.post.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  const related = await getRelated(post.categoryId, post.slug);
  const articleUrl = `${getBaseUrl()}/${post.slug}`;

  return (
    <article className="min-h-screen">
      {post.coverImage && (
        <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[480px]">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Ad — below cover image */}
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
        <AdUnit slot="5555555555" format="horizontal" className="h-24 sm:h-28" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {post.sponsored && <Badge variant="sponsored">{post.sponsoredLabel || "Sponsored"}</Badge>}
          {post.category && (
            <Link href={`/category/${post.category.slug}`}>
              <Badge variant="default">{post.category.name}</Badge>
            </Link>
          )}
          {post.tags.map((t) => (
            <Link key={t.id} href={`/search?q=${t.name}`}>
              <Badge variant="secondary">#{t.name}</Badge>
            </Link>
          ))}
        </div>

        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">{post.subtitle}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 text-sm text-gray-500 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {post.author.image && (
              <Image src={post.author.image} alt={post.author.name || ""} width={28} height={28} className="rounded-full" />
            )}
            <span>{post.author.name}</span>
          </div>
          {post.publishedAt && (
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(post.publishedAt)}</span>
          )}
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readingTime} min read</span>
          <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{formatNumber(post.viewCount)} views</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <div
              className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-violet-600 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Ad — mid-article */}
            <div className="my-8">
              <AdUnit slot="6666666666" format="rectangle" className="min-h-[250px]" />
            </div>

            {post.affiliateLinks.length > 0 && (
              <AffiliateSection links={post.affiliateLinks} />
            )}

            <div className="mt-8 rounded-lg border border-orange-200 bg-orange-50 p-4 text-xs text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
              <strong>Affiliate Disclosure:</strong> This article contains affiliate links. If you purchase through these links, we may earn a commission at no extra cost to you.
            </div>

            {/* Ad — end of article */}
            <div className="mt-8">
              <AdUnit slot="7777777777" format="horizontal" className="h-24 sm:h-28" />
            </div>

            <ShareButtons url={articleUrl} title={post.title} />
          </div>

          <aside className="space-y-6">
            <QRCodeSection slug={post.slug} url={articleUrl} />

            <AdUnit slot="8888888888" format="vertical" className="min-h-[600px]" />
            <div className="mt-4">
              <AdUnit slot="9999999999" format="rectangle" className="min-h-[250px]" />
            </div>

            {post.tags.length > 0 && (
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <Link key={t.id} href={`/search?q=${t.name}`}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-violet-400 hover:text-violet-600 dark:border-gray-700 dark:text-gray-400">
                      #{t.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Ad — before related posts */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AdUnit slot="1010101010" format="horizontal" className="h-24 sm:h-28" />
      </div>

      {related.length > 0 && (
        <section className="bg-gray-50 py-14 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related Posts</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <PostCard key={p.id} post={p as PostCardType} />)}
            </div>
            {/* Ad — after related posts */}
            <div className="mt-10">
              <AdUnit slot="1122334455" format="horizontal" className="h-24 sm:h-28" />
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
