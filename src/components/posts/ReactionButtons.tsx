"use client";
import React, { useState } from "react";

interface Props {
  slug: string;
  initialLike: number;
  initialFire: number;
  initialBulb: number;
}

const REACTIONS = [
  { type: "like", emoji: "👍", label: "Helpful" },
  { type: "fire", emoji: "🔥", label: "Awesome" },
  { type: "bulb", emoji: "💡", label: "Insightful" },
] as const;

export default function ReactionButtons({ slug, initialLike, initialFire, initialBulb }: Props) {
  const [counts, setCounts] = useState({ like: initialLike, fire: initialFire, bulb: initialBulb });
  const [reacted, setReacted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);

  const react = async (type: string) => {
    if (reacted.has(type) || loading) return;
    setLoading(type);
    setCounts((c) => ({ ...c, [type]: c[type as keyof typeof c] + 1 }));
    setReacted((r) => new Set([...r, type]));

    await fetch(`/api/posts/${slug}/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    }).catch(() => {
      // revert on failure
      setCounts((c) => ({ ...c, [type]: c[type as keyof typeof c] - 1 }));
      setReacted((r) => { const n = new Set(r); n.delete(type); return n; });
    });
    setLoading(null);
  };

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <p className="mb-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
        Was this article helpful?
      </p>
      <div className="flex justify-center gap-4">
        {REACTIONS.map(({ type, emoji, label }) => (
          <button
            key={type}
            onClick={() => react(type)}
            disabled={reacted.has(type) || !!loading}
            className={`flex flex-col items-center gap-1 rounded-xl border px-5 py-3 text-sm transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed ${
              reacted.has(type)
                ? "border-violet-400 bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                : "border-gray-200 bg-white hover:border-violet-300 dark:border-gray-700 dark:bg-gray-900"
            }`}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="font-semibold">{counts[type as keyof typeof counts]}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
