"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Techpulzo";
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(data => {
      // Don't link to categories with no published posts — dead-end nav items
      // read as broken/low-value to both users and reviewers.
      if (Array.isArray(data)) setCategories(data.filter((c: any) => c._count?.posts > 0).slice(0, 6));
    }).catch(() => {});
  }, []);

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{siteName}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              In-depth articles on technology, career, finance, and productivity. Written for curious, ambitious people.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Topics</h3>
            <ul className="mt-4 space-y-2.5">
              {categories.length > 0 ? categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`}
                    className="text-sm text-gray-600 transition hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400">
                    {c.name}
                  </Link>
                </li>
              )) : (
                <li className="text-sm text-gray-400">No categories yet</li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Search", href: "/search" },
                { label: "Sitemap", href: "/sitemap.xml" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Affiliate Disclosure", href: "/disclosure" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-600 transition hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-8 sm:flex-row dark:border-gray-800">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p className="text-xs text-gray-400">This site may contain affiliate links. We earn a small commission at no extra cost to you.</p>
        </div>
      </div>
    </footer>
  );
}
