"use client";
import React, { useCallback, useRef, useState } from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight, Crop, Trash2, GripVertical } from "lucide-react";
import dynamic from "next/dynamic";
import { trackUpload } from "@/lib/uploadTracker";

const CropModal = dynamic(() => import("./CropModal"), { ssr: false });

// ---------- Node View Component ----------
function ResizableImageView({ node, updateAttributes, selected, deleteNode }: NodeViewProps) {
  const { src, alt, width, align } = node.attrs;
  const [showCrop, setShowCrop] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const startX = useRef(0);
  const startW = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startX.current = e.clientX;
    startW.current = imgRef.current?.offsetWidth || parseInt(width) || 600;

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX.current;
      const newW = Math.max(80, Math.min(900, startW.current + delta));
      updateAttributes({ width: `${newW}px` });
    };

    const onUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [updateAttributes, width]);

  const imgStyle: React.CSSProperties = {
    display: "block",
    width: width || "100%",
    maxWidth: "100%",
    borderRadius: "6px",
    cursor: isResizing ? "ew-resize" : "default",
  };

  const wrapStyle: React.CSSProperties =
    align === "left"
      ? { marginRight: "auto", marginLeft: 0, width: width || "100%" }
      : align === "right"
      ? { marginLeft: "auto", marginRight: 0, width: width || "100%" }
      : { margin: "0 auto", width: width || "100%" };

  return (
    <NodeViewWrapper
      as="div"
      data-drag-handle
      style={{
        position: "relative",
        display: "flex",
        flexDirection: align === "left" ? "row" : align === "right" ? "row-reverse" : "column",
        alignItems: align === "center" ? "center" : "flex-start",
        outline: selected ? "2px solid #7c3aed" : "none",
        outlineOffset: "3px",
        borderRadius: "8px",
        padding: "2px",
        margin: "12px 0",
        cursor: "grab",
      }}
    >
      {/* Crop modal */}
      {showCrop && (
        <CropModal
          src={src}
          onClose={() => setShowCrop(false)}
          onCropDone={(newUrl, newPublicId) => {
            updateAttributes({ src: newUrl, publicId: newPublicId });
            if (newPublicId) trackUpload("image", newPublicId);
            setShowCrop(false);
          }}
        />
      )}

      {/* Floating toolbar — visible when selected */}
      {selected && (
        <div
          contentEditable={false}
          style={{
            position: "absolute",
            top: -44,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 3,
            background: "#1f2937",
            borderRadius: 10,
            padding: "5px 8px",
            zIndex: 100,
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          {/* Drag hint */}
          <span style={{ color: "#6b7280", display: "flex", alignItems: "center", marginRight: 2 }}>
            <GripVertical size={13} />
          </span>

          {/* Alignment buttons */}
          {(["left", "center", "right"] as const).map((a) => {
            const Icon = a === "left" ? AlignLeft : a === "center" ? AlignCenter : AlignRight;
            return (
              <button key={a} type="button"
                onMouseDown={(e) => { e.preventDefault(); updateAttributes({ align: a }); }}
                title={`Align ${a}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 28, height: 28, borderRadius: 6, border: "none", cursor: "pointer",
                  background: align === a ? "#7c3aed" : "transparent",
                  color: "#fff",
                }}
              >
                <Icon size={13} />
              </button>
            );
          })}

          <span style={{ width: 1, background: "#374151", alignSelf: "stretch", margin: "0 3px" }} />

          {/* Crop */}
          <button type="button"
            onMouseDown={(e) => { e.preventDefault(); setShowCrop(true); }}
            title="Crop image"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28, borderRadius: 6, border: "none", cursor: "pointer",
              background: "transparent", color: "#fff",
            }}
          >
            <Crop size={13} />
          </button>

          {/* Width input */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <input
              type="number"
              min={80} max={900} step={10}
              value={parseInt(width) || ""}
              onChange={(e) => updateAttributes({ width: `${e.target.value}px` })}
              onMouseDown={(e) => e.stopPropagation()}
              placeholder="w"
              title="Width in px"
              style={{
                width: 52, height: 24, borderRadius: 4, border: "none",
                background: "#374151", color: "#fff", fontSize: 11,
                padding: "0 4px", outline: "none", textAlign: "center",
              }}
            />
            <span style={{ color: "#9ca3af", fontSize: 10 }}>px</span>
          </div>

          <span style={{ width: 1, background: "#374151", alignSelf: "stretch", margin: "0 3px" }} />

          {/* Delete */}
          <button type="button"
            onMouseDown={(e) => { e.preventDefault(); deleteNode(); }}
            title="Remove image"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28, borderRadius: 6, border: "none", cursor: "pointer",
              background: "transparent", color: "#f87171",
            }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}

      {/* Image wrapper */}
      <div style={{ ...wrapStyle, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt || ""}
          draggable={false}
          style={imgStyle}
        />

        {/* Resize handle */}
        {selected && (
          <div
            contentEditable={false}
            onMouseDown={onResizeStart}
            title="Drag to resize"
            style={{
              position: "absolute",
              bottom: 6,
              right: 6,
              width: 14,
              height: 14,
              background: "#7c3aed",
              border: "2px solid #fff",
              borderRadius: "50%",
              cursor: "ew-resize",
              zIndex: 10,
            }}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
}

// ---------- Tiptap Extension ----------
export const ResizableImage = Node.create({
  name: "image",
  group: "block",
  inline: false,
  draggable: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      src:      { default: null },
      alt:      { default: null },
      title:    { default: null },
      width:    { default: "100%" },
      align:    { default: "center" },
      publicId: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-public-id"),
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const { align, width, publicId, ...rest } = HTMLAttributes;
    const wrapStyle =
      align === "left"  ? `margin-right:auto;margin-left:0;width:${width};max-width:100%`
      : align === "right" ? `margin-left:auto;margin-right:0;width:${width};max-width:100%`
      : `margin:0 auto;width:${width};max-width:100%`;
    return ["div", { style: "margin:12px 0" },
      ["img", mergeAttributes(rest, {
        style: `display:block;${wrapStyle};border-radius:6px`,
        "data-align": align,
        "data-public-id": publicId || undefined,
        "data-cld": publicId ? `image:${publicId}` : undefined,
      })]
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});
