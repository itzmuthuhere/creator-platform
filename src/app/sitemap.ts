export const dynamic = "force-dynamic";
import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();

  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true, locale: true },
  });

  const categories = await prisma.category.findMany({
    where: { posts: { some: { status: "PUBLISHED" } } },
    select: { slug: true, createdAt: true },
  });

  const hasTamilPosts = posts.some((p) => p.locale === "ta");

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...(hasTamilPosts ? [{ url: `${base}/ta`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 }] : []),
    ...posts.map((p) => ({
      url: p.locale === "ta" ? `${base}/ta/${p.slug}` : `${base}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...categories.map((c) => ({
      url: `${base}/category/${c.slug}`,
      lastModified: c.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
