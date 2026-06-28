"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, Clock, X } from "lucide-react";

interface SearchBarProps {
  size?: "default" | "hero";
  placeholder?: string;
}

export default function SearchBar({ size = "default", placeholder = "Search articles, tools, reviews…" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [trending, setTrending] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/search").then((r) => r.json()).then((d) => {
      setTrending(d.trending?.map((t: any) => t.query).slice(0, 6) || []);
    });
  }, []);

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    const t = setTimeout(async () => {
      const r = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
      const d = await r.json();
      setSuggestions(d.posts || []);
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setFocused(false);
    }
  };

  const isHero = size === "hero";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center overflow-hidden rounded-2xl border bg-white shadow-md dark:bg-gray-900 transition-all ${
          focused ? "border-violet-500 shadow-violet-100 dark:shadow-violet-900/20" : "border-gray-200 dark:border-gray-700"
        } ${isHero ? "shadow-xl" : ""}`}>
          <Search className={`absolute left-4 shrink-0 text-gray-400 ${isHero ? "h-5 w-5" : "h-4 w-4"}`} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            className={`w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 ${
              isHero ? "py-4 pl-12 pr-16 text-base" : "py-3 pl-10 pr-12 text-sm"
            }`}
          />
          {query && (
            <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-14 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          )}
          <button type="submit"
            className={`absolute right-2 rounded-xl bg-violet-600 font-medium text-white transition hover:bg-violet-700 ${
              isHero ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs"
            }`}>
            Search
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {focused && (query.length === 0 || suggestions.length > 0) && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
          {query.length === 0 && trending.length > 0 && (
            <div className="p-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <TrendingUp className="h-3 w-3" /> Trending
              </p>
              <div className="flex flex-wrap gap-2">
                {trending.map((t) => (
                  <button key={t} onClick={() => { setQuery(t); router.push(`/search?q=${encodeURIComponent(t)}`); setFocused(false); }}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:border-violet-400 hover:text-violet-600 dark:border-gray-600 dark:text-gray-300">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          {suggestions.map((s) => (
            <button key={s.slug} onClick={() => { router.push(`/${s.slug}`); setFocused(false); }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{s.title}</p>
                {s.category && <p className="text-xs text-gray-500">{s.category.name}</p>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
