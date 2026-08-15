import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  // Titles with no Latin characters (Tamil, etc.) strip down to nothing —
  // fall back to a short unique slug instead of an invalid empty one.
  return base || `post-${Date.now().toString(36)}`;
}

export function getWordCount(content: string): number {
  const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

export function estimateReadingTime(content: string): number {
  return Math.max(1, Math.ceil(getWordCount(content) / 200));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export interface HowToStep {
  name: string;
  text: string;
}

// Only treats content as a genuine HowTo when it has real "Step N:" H2 headings —
// tagging essay-style H2 sections as HowTo would produce structured data that
// doesn't match the actual content, which Google explicitly warns against.
export function extractHowToSteps(content: string): HowToStep[] | null {
  const parts = content.split(/(<h2[^>]*>.*?<\/h2>)/gi);
  const steps: HowToStep[] = [];

  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i].replace(/<[^>]*>/g, "").trim();
    if (!/^step\s*\d+/i.test(heading)) continue;

    const body = (parts[i + 1] || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!body) continue;

    steps.push({ name: heading, text: body.slice(0, 500) });
  }

  return steps.length >= 2 ? steps : null;
}
