import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.techpulzo.in" }],
        destination: "https://techpulzo.in/:path*",
        permanent: true,
      },
      // Content survival plan (reports/04) — merged into the Notion vs Google Docs article
      {
        source: "/notion-vs-google-keep-vs-obsidian-which-note-taking-app-should-you-use",
        destination: "/notion-vs-google-docs-what-each-one-is-actually-built-for",
        permanent: true,
      },
      // Editorial strategy (reports/05 Part 4) — Tutorials category renamed to Pillar 2
      {
        source: "/category/tutorials",
        destination: "/category/developer-fundamentals",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
