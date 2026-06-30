"use client";
import React, { useCallback, useRef, useState } from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight, Crop, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";

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
    startW.current = imgRef.current?.offsetWidth || parseInt(width) || 400;

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

  const alignStyle: React.CSSProperties =
    align === "left"  ? { float: "left",  marginRight: "1.5rem", marginBottom: "0.5rem", clear: "left" }
    : align === "right" ? { float: "right", marginLeft:  "1.5rem", marginBottom: "0.5rem", clear: "right" }
    : { display: "block", margin: "1rem auto", clear: "both" };

  return (
    <NodeViewWrapper
      as="span"
      style={{ display: align === "center" ? "block" : "inline-block", userSelect: "none" }}
    >
      {/* Crop modal */}
      {showCrop && (
        <CropModal
          src={src}
          onClose={() => setShowCrop(false)}
          onCropDone={(newUrl) => { updateAttributes({ src: newUrl }); setShowCrop(false); }}
        />
      )}

      <span
        style={{
          ...alignStyle,
          display: "inline-block",
          position: "relative",
          width: width || "auto",
          maxWidth: "100%",
          outline: selected ? "2px solid #7c3aed" : "none",
          outlineOffset: "2px",
          borderRadius: "4px",
        }}
      >
        {/* Inline toolbar — only when selected */}
        {selected && (
          <span
            contentEditable={false}
            style={{
              position: "absolute",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "4px",
              background: "#1f2937",
              borderRadius: "8px",
              padding: "4px 6px",
              zIndex: 50,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {/* Alignment */}
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
                  <Icon size={14} />
                </button>
              );
            })}

            <span style={{ width: 1, background: "#374151", margin: "2px 2px" }} />

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
              <Crop size={14} />
            </button>

            {/* Width input */}
            <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <input
                type="number"
                min={80} max={900} step={10}
                value={parseInt(width) || ""}
                onChange={(e) => updateAttributes({ width: `${e.target.value}px` })}
                onMouseDown={(e) => e.stopPropagation()}
                placeholder="px"
                title="Width in px"
                style={{
                  width: 54, height: 24, borderRadius: 4, border: "none",
                  background: "#374151", color: "#fff", fontSize: 11,
                  padding: "0 4px", outline: "none", textAlign: "center",
                }}
              />
              <span style={{ color: "#9ca3af", fontSize: 10 }}>px</span>
            </span>

            <span style={{ width: 1, background: "#374151", margin: "2px 2px" }} />

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
              <Trash2 size={14} />
            </button>
          </span>
        )}

        {/* The image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt || ""}
          draggable={false}
          style={{
            display: "block",
            width: width || "auto",
            maxWidth: "100%",
            borderRadius: "6px",
            cursor: isResizing ? "ew-resize" : "default",
          }}
        />

        {/* Resize handle — bottom right */}
        {selected && (
          <span
            contentEditable={false}
            onMouseDown={onResizeStart}
            title="Drag to resize"
            style={{
              position: "absolute",
              bottom: -5,
              right: -5,
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
      </span>
    </NodeViewWrapper>
  );
}

// ---------- Tiptap Extension ----------
export const ResizableImage = Node.create({
  name: "image",
  group: "inline",
  inline: true,
  draggable: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      src:   { default: null },
      alt:   { default: null },
      title: { default: null },
      width: { default: "100%" },
      align: { default: "center" },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const { align, width, ...rest } = HTMLAttributes;
    const style =
      align === "left"  ? `float:left;margin-right:1.5rem;margin-bottom:0.5rem;width:${width};max-width:100%`
      : align === "right" ? `float:right;margin-left:1.5rem;margin-bottom:0.5rem;width:${width};max-width:100%`
      : `display:block;margin:1rem auto;width:${width};max-width:100%`;
    return ["img", mergeAttributes(rest, { style, "data-align": align })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});
