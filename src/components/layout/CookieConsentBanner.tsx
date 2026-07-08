"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "techpulzo_ad_consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(CONSENT_KEY));
  }, []);

  const choose = (value: "granted" | "denied") => {
    localStorage.setItem(CONSENT_KEY, value);
    // Reload so the AdSense request flag set in the root layout picks up
    // the new choice for every ad on the page consistently.
    window.location.reload();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200 bg-white/95 p-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Cookie className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-600" />
          <p>
            We use cookies for site analytics and to show ads. Choosing "Accept" allows personalized ads;
            "Reject" limits us to non-personalized ads only. Read our{" "}
            <Link href="/privacy" className="underline hover:text-violet-600">Privacy Policy</Link> for details.
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
