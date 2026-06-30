import React from "react";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

interface SeriesPost { slug: string; title: string; seriesOrder: number | null }
interface Props {
  seriesName: string;
  currentSlug: string;
  posts: SeriesPost[];
}

export default function SeriesNav({ seriesName, currentSlug, posts }: Props) {
  const sorted = [...posts].sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
  const currentIndex = sorted.findIndex((p) => p.slug === currentSlug);
  const prev = sorted[currentIndex - 1];
  const next = sorted[currentIndex + 1];

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-blue-600" />
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">Series</span>
      </div>
      <h4 className="mb-3 font-bold text-gray-900 dark:text-white">{seriesName}</h4>

      <ul className="mb-4 space-y-1">
        {sorted.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/${post.slug}`}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                post.slug === currentSlug
                  ? "bg-blue-600 font-semibold text-white"
                  : "text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-900/30"
              }`}
            >
              <span className="w-5 text-center text-xs font-bold opacity-60">{i + 1}</span>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      {(prev || next) && (
        <div className="flex gap-2">
          {prev && (
            <Link href={`/${prev.slug}`}
              className="flex flex-1 items-center gap-1 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs text-gray-600 hover:border-blue-400 hover:text-blue-600 dark:border-blue-800 dark:bg-gray-900 dark:text-gray-400">
              ← Prev
            </Link>
          )}
          {next && (
            <Link href={`/${next.slug}`}
              className="flex flex-1 items-center justify-end gap-1 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs text-gray-600 hover:border-blue-400 hover:text-blue-600 dark:border-blue-800 dark:bg-gray-900 dark:text-gray-400">
              Next <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
