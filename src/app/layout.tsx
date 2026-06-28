import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import SessionProvider from "@/components/layout/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "TechPulse";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Tech Reviews, AI Tools & Digital Content`,
    template: `%s | ${siteName}`,
  },
  description: "In-depth reviews, tutorials, and insights on tech, AI tools, and digital productivity.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@techpulse",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans antialiased dark:bg-gray-950">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
