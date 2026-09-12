"use client";
import React, { useState } from "react";
import { QrCode, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props { slug: string; url: string }

export default function QRCodeSection({ slug, url }: Props) {
  const [copied, setCopied] = useState(false);
  const qrUrl = `/api/qr/${slug}`;

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <div className="mb-3 flex items-center gap-2">
        <QrCode className="h-4 w-4 text-violet-600" />
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Share This Article</h3>
      </div>
      <div className="flex justify-center mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrUrl} alt="QR Code" className="h-32 w-32 rounded-lg" />
      </div>
      <p className="text-center text-xs text-gray-500 mb-3">Scan to open this article</p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={copyUrl}>
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied!" : "Copy URL"}
        </Button>
        <a href={qrUrl} download={`qr-${slug}.png`}>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="h-3 w-3" />
          </Button>
        </a>
      </div>
    </div>
  );
}
