import type { Metadata } from "next";
import { Inter, Noto_Sans_Tamil } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import SessionProvider from "@/components/layout/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-tamil",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Techpulzo";
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
    site: "@techpulzo",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansTamil.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <>
            {/* Must run before adsbygoogle.js initializes so it picks up the
                visitor's consent choice (EEA/UK/CH require non-personalized
                ads by default until they explicitly accept). */}
            <Script id="adsense-consent-init" strategy="beforeInteractive">
              {`
                try {
                  window.adsbygoogle = window.adsbygoogle || [];
                  var consent = localStorage.getItem("techpulzo_ad_consent");
                  window.adsbygoogle.requestNonPersonalizedAds = consent === "granted" ? 0 : 1;
                } catch (e) {}
              `}
            </Script>
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </>
        )}
      </head>
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
