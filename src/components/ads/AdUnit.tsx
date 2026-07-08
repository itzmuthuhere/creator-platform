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
      <div className={`flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/60 ${className}`}>
        {label && (
          <p className="border-b border-gray-200/80 px-3 py-1.5 text-center text-[10px] font-medium uppercase tracking-widest text-gray-400 dark:border-gray-800 dark:text-gray-500">
            Advertisement
          </p>
        )}
        <div className="flex flex-1 items-center justify-center border border-dashed border-gray-200 text-xs text-gray-400 dark:border-gray-700">
          Ad Placement
        </div>
      </div>
    );
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
