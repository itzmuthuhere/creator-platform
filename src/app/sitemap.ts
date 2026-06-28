export const dynamic = "force-dynamic";
import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();

  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  const categories = await prisma.category.findMany({
    select: { slug: true, createdAt: true },
  });

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${base}/${p.slug}`,
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
