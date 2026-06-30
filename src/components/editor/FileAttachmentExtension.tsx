"use client";
import React from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { Trash2, Download } from "lucide-react";

function FileAttachmentView({ node, deleteNode, selected }: NodeViewProps) {
  const { href, filename, size, ext } = node.attrs;

  const colors: Record<string, string> = {
    PDF: "#ef4444", DOC: "#2563eb", DOCX: "#2563eb",
    XLS: "#16a34a", XLSX: "#16a34a", PPT: "#f97316", PPTX: "#f97316",
  };
  const badgeColor = colors[ext] || "#7c3aed";

  return (
    <NodeViewWrapper
      as="div"
      data-drag-handle
      contentEditable={false}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        border: selected ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb",
        borderRadius: 12,
        background: "#f9fafb",
        margin: "16px 0",
        cursor: "grab",
        userSelect: "none",
        position: "relative",
      }}
    >
      {/* EXT badge */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 44, height: 44, borderRadius: 8,
        background: badgeColor + "1a", flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: badgeColor }}>{ext}</span>
      </div>

      {/* Name + size */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {filename}
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{size}</div>
      </div>

      {/* Delete button (editor only) */}
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); deleteNode(); }}
        title="Remove file"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: 6, border: "none",
          background: "transparent", color: "#9ca3af", cursor: "pointer", flexShrink: 0,
        }}
      >
        <Trash2 size={14} />
      </button>

      {/* Download badge */}
      <a
        href={href}
        download={filename}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#7c3aed", color: "#fff",
          padding: "8px 16px", borderRadius: 8,
          fontSize: 12, fontWeight: 600,
          textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
        }}
      >
        <Download size={13} /> Download
      </a>
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
    };
  },

  parseHTML() {
    return [{ tag: "div[data-file-attachment]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const { href, filename, size, ext } = HTMLAttributes;
    const colors: Record<string, string> = {
      PDF: "#ef4444", DOC: "#2563eb", DOCX: "#2563eb",
      XLS: "#16a34a", XLSX: "#16a34a", PPT: "#f97316", PPTX: "#f97316",
    };
    const badgeColor = colors[ext] || "#7c3aed";

    return [
      "div",
      mergeAttributes({
        "data-file-attachment": "true",
        style: [
          "display:flex", "align-items:center", "gap:14px",
          "padding:14px 18px",
          "border:1.5px solid #e5e7eb", "border-radius:12px",
          "background:#f9fafb", "margin:16px 0",
        ].join(";"),
      }),
      ["div", {
        style: [
          "display:flex", "align-items:center", "justify-content:center",
          "width:44px", "height:44px", "border-radius:8px",
          `background:${badgeColor}1a`, "flex-shrink:0",
        ].join(";"),
      },
        ["span", { style: `font-size:11px;font-weight:700;color:${badgeColor}` }, ext],
      ],
      ["div", { style: "flex:1;min-width:0" },
        ["div", { style: "font-weight:600;font-size:14px;color:#111827;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" }, filename],
        ["div", { style: "font-size:12px;color:#6b7280;margin-top:2px" }, size],
      ],
      ["a", {
        href,
        download: filename,
        style: [
          "display:inline-flex", "align-items:center", "gap:6px",
          "background:#7c3aed", "color:#fff",
          "padding:8px 16px", "border-radius:8px",
          "font-size:12px", "font-weight:600",
          "text-decoration:none", "white-space:nowrap", "flex-shrink:0",
        ].join(";"),
      }, "⬇ Download"],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileAttachmentView);
  },
});
