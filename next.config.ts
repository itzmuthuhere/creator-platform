import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
