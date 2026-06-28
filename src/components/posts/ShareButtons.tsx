"use client";
import React, { useState } from "react";
import { Share2, Users, Briefcase, MessageCircle, Check, Link2 } from "lucide-react";

interface Props { url: string; title: string }

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encode = encodeURIComponent;

  const socials = [
    { label: "Twitter/X", icon: Share2, href: `https://twitter.com/intent/tweet?url=${encode(url)}&text=${encode(title)}`, color: "hover:text-sky-500" },
    { label: "Facebook", icon: Users, href: `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`, color: "hover:text-blue-600" },
    { label: "LinkedIn", icon: Briefcase, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encode(url)}`, color: "hover:text-blue-700" },
    { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${encode(title + " " + url)}`, color: "hover:text-green-500" },
  ];

  return (
    <div className="mt-8 flex items-center gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-500">Share:</span>
      {socials.map(({ label, icon: Icon, href, color }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition ${color} hover:border-current dark:border-gray-700 dark:text-gray-400`}>
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button onClick={copy}
        className="flex h-9 items-center gap-2 rounded-full border border-gray-200 px-3 text-sm text-gray-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-gray-700 dark:text-gray-400">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
