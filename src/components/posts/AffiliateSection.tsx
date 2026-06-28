"use client";
import React from "react";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
interface AffiliateLink { id: string; label: string; url: string; platform: string | null; clickCount: number; postId: string; createdAt: Date; }

interface Props { links: AffiliateLink[] }

export default function AffiliateSection({ links }: Props) {
  const handleClick = async (link: AffiliateLink) => {
    try {
      await fetch(`/api/affiliate/${link.id}/click`, { method: "POST" });
    } catch {}
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-6 dark:border-violet-800 dark:from-violet-950/30 dark:to-indigo-950/30">
      <div className="mb-4 flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-violet-600" />
        <h3 className="font-bold text-gray-900 dark:text-white">Recommended Products & Links</h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <button key={link.id} onClick={() => handleClick(link)}
            className="flex items-center gap-3 rounded-xl border border-violet-200 bg-white p-4 text-left transition hover:border-violet-400 hover:shadow-md dark:border-violet-700 dark:bg-gray-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
              <ExternalLink className="h-5 w-5 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white truncate">{link.label}</p>
              {link.platform && <p className="text-xs text-gray-500">{link.platform}</p>}
            </div>
            <span className="shrink-0 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">
              Get it
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
