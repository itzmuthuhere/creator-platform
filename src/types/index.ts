// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Prisma } from "@prisma/client";

export type PostCard = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  viewCount: number;
  readingTime: number;
  featured: boolean;
  sponsored: boolean;
  sponsoredLabel: string | null;
  author: { name: string | null; image: string | null };
  category: { name: string; slug: string; color: string | null } | null;
  tags: { name: string; slug: string }[];
};

export interface SearchResult {
  posts: PostCard[];
  total: number;
  query: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  creator: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}
