import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/utils";
import PostCard from "@/components/posts/PostCard";
import type { PostCard as PostCardType } from "@/types";
import { Globe, ShieldCheck } from "lucide-react";

export const revalidate = 300;

const AUTHOR_EMAIL = "rajamuthu107@gmail.com";

type SocialLinks = { twitter?: string; linkedin?: string; website?: string };

async function getAuthorWithPosts() {
  const author = await prisma.user.findFirst({
    where: { email: AUTHOR_EMAIL },
    select: { id: true, name: true, image: true, bio: true, socialLinks: true },
  });
  if (!author) return null;

  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED", authorId: author.id },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true, title: true, subtitle: true, slug: true, excerpt: true,
      coverImage: true, publishedAt: true, viewCount: true, readingTime: true,
      featured: true, sponsored: true, sponsoredLabel: true,
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true, color: true } },
      tags: { select: { name: true, slug: true } },
    },
  });

  return { author, posts };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAuthorWithPosts();
  const name = data?.author.name || "Muthu Raja";
  return {
    title: `${name} — Author`,
    description: `Articles written by ${name} on Techpulzo.`,
    alternates: { canonical: `${getBaseUrl()}/author/muthu-raja` },
  };
}

export default async function AuthorPage() {
  const data = await getAuthorWithPosts();
  if (!data) notFound();
  const { author, posts } = data;
  const links = (author.socialLinks || {}) as SocialLinks;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `${getBaseUrl()}/author/muthu-raja`,
    ...(author.image ? { image: author.image } : {}),
    ...(author.bio ? { description: author.bio } : {}),
    sameAs: [links.twitter, links.linkedin, links.website].filter(Boolean),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <div className="border-b border-gray-100 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900/30">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          {author.image ? (
            <Image src={author.image} alt={author.name || "Author"} width={96} height={96}
              className="h-24 w-24 rounded-full object-cover" />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-3xl font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
              {(author.name || "?").charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="mt-5 text-3xl font-extrabold text-gray-900 dark:text-white">{author.name}</h1>
          <p className="mt-1 text-sm font-medium text-violet-600">Founder, sole writer &amp; editor of Techpulzo</p>
          {author.bio && (
            <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-400">{author.bio}</p>
          )}

          <div className="mt-5 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900">
            <ShieldCheck className="h-3.5 w-3.5 text-violet-600" />
            <span>
              Writes from hands-on use and day-to-day work as a software developer. See our{" "}
              <Link href="/editorial-policy" className="text-violet-600 hover:underline">editorial policy</Link> for what
              that does and doesn&apos;t qualify him to write about.
            </span>
          </div>

          {(links.twitter || links.linkedin || links.website) && (
            <div className="mt-5 flex items-center gap-4 text-sm font-medium">
              {links.twitter && (
                <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600">X (Twitter)</a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600">LinkedIn</a>
              )}
              {links.website && (
                <a href={links.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-violet-600">
                  <Globe className="h-3.5 w-3.5" /> Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-bold text-gray-900 dark:text-white">
          {posts.length} published article{posts.length === 1 ? "" : "s"}
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((p) => <PostCard key={p.id} post={p as PostCardType} />)}
          </div>
        ) : (
          <p className="text-gray-500">No published articles yet.</p>
        )}
      </div>
    </div>
  );
}
