export const revalidate = 60;
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate, formatNumber, getBaseUrl, getWordCount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import PostCard from "@/components/posts/PostCard";
import ShareButtons from "@/components/posts/ShareButtons";
import FAQSection from "@/components/posts/FAQSection";
import { Clock, Eye, Calendar, Home, ChevronRight } from "lucide-react";
import type { PostCard as PostCardType } from "@/types";
import AdUnit from "@/components/ads/AdUnit";
import AuthorBio from "@/components/posts/AuthorBio";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED", locale: "ta" },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug, status: "PUBLISHED", locale: "ta" },
    include: {
      author: { select: { id: true, name: true, image: true, bio: true, socialLinks: true } },
      category: true,
      tags: true,
      translationOf: { select: { slug: true } },
    },
  });
}

async function getRelated(categoryId: string | null, currentSlug: string) {
  return prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      locale: "ta",
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
  const url = `${getBaseUrl()}/ta/${post.slug}`;

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    keywords: post.keywords,
    alternates: {
      canonical: post.canonicalUrl || url,
      languages: post.translationOf
        ? { ta: url, en: `${getBaseUrl()}/${post.translationOf.slug}` }
        : { ta: url },
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      url,
      type: "article",
      locale: "ta_IN",
      publishedTime: post.publishedAt?.toISOString(),
      images: [{ url: post.ogImage || post.coverImage || "/og-default.png" }],
    },
    twitter: { card: "summary_large_image", title: post.title },
  };
}

export default async function TamilArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  await prisma.post.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  const related = await getRelated(post.categoryId, post.slug);
  const articleUrl = `${getBaseUrl()}/ta/${post.slug}`;
  const faqItems = post.faqItems as { question: string; answer: string }[] | null;

  const wordCount = getWordCount(post.content);
  const showCoreAds = wordCount >= 300;
  const showExtraAds = wordCount >= 800;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "முகப்பு", item: `${getBaseUrl()}/ta` },
      { "@type": "ListItem", position: 2, name: post.title, item: articleUrl },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.ogImage || post.coverImage,
    author: { "@type": "Person", name: post.author.name },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: "ta",
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const faqJsonLd = faqItems?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <article className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      {post.coverImage && (
        <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[480px]">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {showCoreAds && (
        <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
          <AdUnit slot="5555555555" format="horizontal" className="h-24 sm:h-28" />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/ta" className="flex items-center gap-1 hover:text-violet-600">
            <Home className="h-3.5 w-3.5" /> முகப்பு
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          <span className="line-clamp-1 text-gray-700 dark:text-gray-300">{post.title}</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {post.category && <Badge variant="default">{post.category.name}</Badge>}
          {post.tags.map((t) => (
            <Badge key={t.id} variant="secondary">#{t.name}</Badge>
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
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readingTime} நிமிடம்</span>
          <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{formatNumber(post.viewCount)}</span>
        </div>

        <div
          className="prose prose-gray mt-8 max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-violet-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {faqItems && faqItems.length > 0 && <FAQSection faqs={faqItems} />}

        {showCoreAds && (
          <div className="my-8">
            <AdUnit slot="6666666666" format="rectangle" className="min-h-[250px]" />
          </div>
        )}

        <ShareButtons url={articleUrl} title={post.title} />

        <AuthorBio
          name={post.author.name}
          image={post.author.image}
          bio={post.author.bio}
          socialLinks={post.author.socialLinks}
        />
      </div>

      {related.length > 0 && (
        <section className="bg-gray-50 py-14 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">தொடர்புடைய கட்டுரைகள்</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <PostCard key={p.id} post={p as PostCardType} basePath="/ta" />)}
            </div>
            {showExtraAds && (
              <div className="mt-10">
                <AdUnit slot="1010101010" format="horizontal" className="h-24 sm:h-28" />
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
