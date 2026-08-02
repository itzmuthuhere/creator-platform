"use client";
import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  className?: string;
  label?: boolean;
}

declare global {
  interface Window { adsbygoogle: any[] }
}

export default function AdUnit({ slot, format = "auto", className = "", label = true }: AdUnitProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  // Real ad requests only fire once the AdSense account is approved AND the
  // slot IDs below have been replaced with real ones from the AdSense
  // dashboard. Until then this must stay unset/false — requesting ads with
  // non-existent placeholder slot IDs (e.g. "1111111111") renders empty
  // "Advertisement" boxes site-wide, which is a strong low-value-content
  // signal to AdSense reviewers and can itself cause repeated rejection.
  const adsLive = process.env.NEXT_PUBLIC_ADS_LIVE === "true";
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !adsLive || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {}
  }, [client, adsLive]);

  if (!client || !adsLive) {
    // No approved account + real slot IDs yet — render nothing rather than
    // an empty ad-shaped box, so pages read as content, not ad scaffolding.
    return null;
  }

  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/60 ${className}`}>
      {label && (
        <p className="border-b border-gray-200/80 px-3 py-1.5 text-center text-[10px] font-medium uppercase tracking-widest text-gray-400 dark:border-gray-800 dark:text-gray-500">
          Advertisement
        </p>
      )}
      <div className="flex flex-1 items-center justify-center overflow-hidden p-2">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
