"use client";
import React, { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading { id: string; text: string; level: number }

function parseHeadings(html: string): Heading[] {
  const div = document.createElement("div");
  div.innerHTML = html;
  const nodes = div.querySelectorAll("h2, h3");
  return Array.from(nodes).map((n, i) => ({
    id: n.id || `heading-${i}`,
    text: n.textContent || "",
    level: parseInt(n.tagName[1]),
  }));
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const parsed = parseHeadings(content);
    // Inject IDs into DOM headings if missing
    const domHeadings = document.querySelectorAll(".prose h2, .prose h3");
    domHeadings.forEach((el, i) => {
      if (!el.id) el.id = parsed[i]?.id || `heading-${i}`;
    });
    setHeadings(parsed);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px" }
    );
    document.querySelectorAll(".prose h2, .prose h3").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
        <List className="h-4 w-4 text-violet-600" /> Table of Contents
      </h3>
      <nav>
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1rem" : "0" }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`block rounded px-2 py-1 text-xs transition hover:text-violet-600 ${
                  active === h.id
                    ? "font-semibold text-violet-600"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
