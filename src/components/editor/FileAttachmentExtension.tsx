"use client";
import React from "react";
import { Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { Paperclip, Trash2 } from "lucide-react";

function FileAttachmentView({ node, deleteNode, selected }: NodeViewProps) {
  const href: string = node.attrs.href ?? "";
  const filename: string = node.attrs.filename ?? "file";

  return (
    <NodeViewWrapper
      as="div"
      data-drag-handle
      contentEditable={false}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        margin: "4px 0",
        cursor: "grab",
        userSelect: "none",
        outline: selected ? "2px solid #7c3aed" : "none",
        outlineOffset: 3,
        borderRadius: 4,
      }}
    >
      <Paperclip size={14} style={{ color: "#7c3aed", flexShrink: 0 }} />
      <a
        href={href}
        download={filename}
        onClick={(e) => e.stopPropagation()}
        style={{
          color: "#7c3aed",
          fontWeight: 500,
          fontSize: 14,
          textDecoration: "underline",
        }}
      >
        {filename}
      </a>
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); deleteNode(); }}
        title="Remove"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 20, height: 20, borderRadius: 4, border: "none",
          background: "transparent", color: "#9ca3af", cursor: "pointer", flexShrink: 0,
        }}
      >
        <Trash2 size={12} />
      </button>
    </NodeViewWrapper>
  );
}

export const FileAttachment = Node.create({
  name: "fileAttachment",
  group: "block",
  inline: false,
  draggable: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      href:     { default: null },
      filename: { default: "file" },
      size:     { default: "" },
      ext:      { default: "FILE" },
      publicId: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-file-attachment]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const href: string = HTMLAttributes.href ?? "";
    const filename: string = HTMLAttributes.filename ?? "file";
    const publicId: string | null = HTMLAttributes.publicId ?? null;

    return [
      "div",
      {
        "data-file-attachment": "true",
        "data-cld": publicId ? `raw:${publicId}` : undefined,
        style: "display:inline-flex;align-items:center;gap:6px;margin:4px 0",
      },
      ["a", {
        href,
        download: filename,
        style: "color:#7c3aed;font-weight:500;font-size:14px;text-decoration:underline;display:inline-flex;align-items:center;gap:6px",
      }, "📎 " + filename],
    ] as any;
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileAttachmentView);
  },
});
