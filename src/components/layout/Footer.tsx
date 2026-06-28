import React from "react";
import Link from "next/link";
import { Zap, Share2, Camera, Play, Users } from "lucide-react";

export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "TechPulse";
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{siteName}</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Your go-to source for in-depth tech reviews, AI tools, and digital productivity content.
            </p>
            <div className="mt-6 flex gap-4">
              {[
                { icon: Share2, href: "#", label: "Twitter" },
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Play, href: "#", label: "YouTube" },
                { icon: Users, href: "#", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-violet-500 hover:text-violet-600 dark:border-gray-700 dark:text-gray-400">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Categories</h3>
            <ul className="mt-4 space-y-2">
              {["Tech Reviews", "AI Tools", "Tutorials", "Finance", "Career", "Productivity"].map((c) => (
                <li key={c}>
                  <Link href={`/category/${c.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Platform</h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Search", href: "/search" },
                { label: "Sitemap", href: "/sitemap.xml" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Affiliate Disclosure", href: "/disclosure" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-gray-500 dark:text-gray-600">
              © {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-600">
              This site contains affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
