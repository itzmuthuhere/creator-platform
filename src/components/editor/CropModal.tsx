"use client";
import React, { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X, Check, Loader2 } from "lucide-react";

interface Props {
  src: string;
  onClose: () => void;
  onCropDone: (newUrl: string) => void;
}

function centerDefaultCrop(width: number, height: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 80 }, width / height, width, height),
    width,
    height
  );
}

export default function CropModal({ src, onClose, onCropDone }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerDefaultCrop(width, height));
  }, []);

  const applyCrop = async () => {
    if (!completedCrop || !imgRef.current) return;
    setUploading(true);
    setError("");

    try {
      const img = imgRef.current;
      const canvas = document.createElement("canvas");
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;
      const ctx = canvas.getContext("2d")!;

      ctx.drawImage(
        img,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0, 0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise<Blob>((res) =>
        canvas.toBlob((b) => res(b!), "image/jpeg", 0.92)
      );

      const fd = new FormData();
      fd.append("file", new File([blob], "cropped.jpg", { type: "image/jpeg" }));

      const response = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Upload failed");
      onCropDone(data.url);
    } catch (e: any) {
      setError(e.message || "Crop failed");
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Crop Image</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Crop area */}
        <div className="flex flex-1 items-center justify-center overflow-auto p-4 bg-gray-100 dark:bg-gray-800">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            keepSelection
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt="Crop preview"
              onLoad={onImageLoad}
              crossOrigin="anonymous"
              style={{ maxHeight: "55vh", maxWidth: "100%", display: "block" }}
            />
          </ReactCrop>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4 dark:border-gray-700">
          <div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {!error && <p className="text-xs text-gray-400">Drag to select area. The cropped image will be re-uploaded.</p>}
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400">
              Cancel
            </button>
            <button onClick={applyCrop} disabled={uploading || !completedCrop}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {uploading ? "Uploading…" : "Apply Crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
