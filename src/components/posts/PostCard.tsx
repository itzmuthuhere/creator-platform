import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatNumber } from "@/lib/utils";
import type { PostCard } from "@/types";

interface PostCardProps {
  post: PostCard;
  variant?: "default" | "featured" | "compact" | "horizontal";
  basePath?: string;
}

export default function PostCard({ post, variant = "default", basePath = "" }: PostCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`${basePath}/${post.slug}`} className="group flex gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-800/50">
        {post.coverImage && (
          <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 group-hover:text-violet-600 dark:text-gray-100 line-clamp-2">
            {post.title}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`${basePath}/${post.slug}`} className="group card-hover flex gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        {post.coverImage && (
          <div className="relative h-24 w-36 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {post.category && (
            <Badge variant="default" className="mb-1 text-[10px]">{post.category.name}</Badge>
          )}
          <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 dark:text-gray-100 line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
            {post.readingTime > 0 && (
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime}m</span>
            )}
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{formatNumber(post.viewCount)}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`${basePath}/${post.slug}`} className="group relative block overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/9] w-full">
          {post.coverImage ? (
            <Image src={post.coverImage} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-violet-600 to-indigo-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-3">
            {post.sponsored && <Badge variant="sponsored">Sponsored</Badge>}
            {post.category && <Badge className="bg-white/20 text-white border-0">{post.category.name}</Badge>}
          </div>
          <h2 className="text-xl font-bold text-white line-clamp-2">{post.title}</h2>
          {post.excerpt && (
            <p className="mt-2 text-sm text-gray-300 line-clamp-2">{post.excerpt}</p>
          )}
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
            <span>{post.author.name}</span>
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{formatNumber(post.viewCount)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`${basePath}/${post.slug}`} className="group card-hover flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="relative aspect-[16/9] overflow-hidden">
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30" />
        )}
        {post.sponsored && (
          <div className="absolute top-2 right-2">
            <Badge variant="sponsored">{post.sponsoredLabel || "Sponsored"}</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 mb-2">
          {post.category && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: post.category.color ? `${post.category.color}20` : "#7c3aed20", color: post.category.color || "#7c3aed" }}>
              {post.category.name}
            </span>
          )}
          {post.tags.slice(0, 2).map((t) => (
            <span key={t.slug} className="text-[10px] text-gray-500">#{t.name}</span>
          ))}
        </div>
        <h3 className="font-bold text-gray-900 group-hover:text-violet-600 dark:text-gray-100 line-clamp-2 text-base leading-snug">
          {post.title}
        </h3>
        {post.subtitle && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">{post.subtitle}</p>
        )}
        {post.excerpt && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">{post.excerpt}</p>
        )}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-3">
            {post.readingTime > 0 && (
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime} min</span>
            )}
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{formatNumber(post.viewCount)}</span>
          </div>
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        </div>
      </div>
    </Link>
  );
}
