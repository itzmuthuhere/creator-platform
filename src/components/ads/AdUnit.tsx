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
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {}
  }, [client]);

  if (!client) {
    // Show placeholder when AdSense not configured yet
    return (
      <div className={`flex items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400 dark:border-gray-700 dark:bg-gray-900 ${className}`}>
        Ad Placement
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      {label && (
        <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-gray-400">Advertisement</p>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
