"use client";
import React, { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import { ResizableImage } from "./ResizableImageExtension";
import {
  Bold, Italic, UnderlineIcon, Strikethrough, Code, Link2, ImageIcon,
  AlignLeft, AlignCenter, AlignRight, List, ListOrdered,
  Heading1, Heading2, Heading3, Quote, Minus, Undo, Redo,
  Table as TableIcon, Highlighter, Paperclip, Upload, X, FileText,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const PRESET_COLORS = [
  "#000000", "#374151", "#6b7280", "#ef4444", "#f97316",
  "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899",
  "#ffffff", "#fef2f2", "#fef9c3", "#f0fdf4", "#eff6ff",
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const imgInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      ResizableImage,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing your article…" }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-gray max-w-none dark:prose-invert min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = prompt("Enter URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const uploadAndInsertImage = async (file: File) => {
    setUploadError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) { setUploadError(data.error || "Upload failed"); return; }
    editor?.chain().focus().insertContent({
      type: "image",
      attrs: { src: data.url, alt: file.name, width: "100%", align: "center" },
    }).run();
  };

  const uploadAndInsertFile = async (file: File) => {
    setUploadError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) { setUploadError(data.error || "Upload failed"); return; }

    // Insert a styled file download card as HTML
    const html = `<div class="file-attachment" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb;margin:12px 0;text-decoration:none;">
  <span style="font-size:24px">📎</span>
  <div style="flex:1;min-width:0;">
    <div style="font-weight:600;font-size:14px;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${data.name}</div>
    <div style="font-size:12px;color:#6b7280;">${formatBytes(data.size)}</div>
  </div>
  <a href="${data.url}" target="_blank" rel="noopener noreferrer" download style="background:#7c3aed;color:#fff;padding:6px 14px;border-radius:6px;font-size:12px;font-weight:500;text-decoration:none;white-space:nowrap;">Download</a>
</div>`;
    editor?.chain().focus().insertContent(html).run();
  };

  if (!editor) return null;

  const ToolBtn = ({
    onClick, active, title, children, disabled,
  }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode; disabled?: boolean }) => (
    <button type="button" title={title} onClick={onClick} disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded text-sm transition disabled:opacity-40 ${
        active
          ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      }`}>
      {children}
    </button>
  );

  const Sep = () => <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-900">

        {/* Undo/Redo */}
        <ToolBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></ToolBtn>
        <Sep />

        {/* Headings */}
        <ToolBtn title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></ToolBtn>
        <Sep />

        {/* Formatting */}
        <ToolBtn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code className="h-4 w-4" /></ToolBtn>
        <Sep />

        {/* Text color */}
        <div className="relative">
          <button type="button" title="Text color" onClick={() => { setShowColorPicker((p) => !p); setShowTableMenu(false); }}
            className="flex h-8 w-8 flex-col items-center justify-center rounded text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <span className="text-xs font-bold leading-none" style={{ color: editor.getAttributes("textStyle").color || "currentColor" }}>A</span>
            <span className="mt-0.5 h-1 w-4 rounded-full" style={{ background: editor.getAttributes("textStyle").color || "#7c3aed" }} />
          </button>
          {showColorPicker && (
            <div className="absolute left-0 top-10 z-50 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900" style={{ width: 180 }}>
              <p className="mb-2 text-xs font-medium text-gray-500">Text Color</p>
              <div className="mb-2 grid grid-cols-5 gap-1.5">
                {PRESET_COLORS.map((c) => (
                  <button key={c} type="button" title={c}
                    onClick={() => { editor.chain().focus().setColor(c).run(); setShowColorPicker(false); }}
                    className="h-6 w-6 rounded border border-gray-200 transition hover:scale-110"
                    style={{ background: c }} />
                ))}
              </div>
              <button type="button" onClick={() => { editor.chain().focus().unsetColor().run(); setShowColorPicker(false); }}
                className="w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400">
                Reset color
              </button>
            </div>
          )}
        </div>

        {/* Highlight */}
        <ToolBtn title="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}>
          <Highlighter className="h-4 w-4" />
        </ToolBtn>
        <Sep />

        {/* Alignment */}
        <ToolBtn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight className="h-4 w-4" /></ToolBtn>
        <Sep />

        {/* Lists */}
        <ToolBtn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Divider line" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></ToolBtn>
        <Sep />

        {/* Table */}
        <div className="relative">
          <ToolBtn title="Table" active={editor.isActive("table")} onClick={() => { setShowTableMenu((p) => !p); setShowColorPicker(false); }}>
            <TableIcon className="h-4 w-4" />
          </ToolBtn>
          {showTableMenu && (
            <div className="absolute left-0 top-10 z-50 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-gray-900">
              {[
                { label: "Insert table (3×3)", action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
                { label: "Add row below", action: () => editor.chain().focus().addRowAfter().run() },
                { label: "Add row above", action: () => editor.chain().focus().addRowBefore().run() },
                { label: "Delete row", action: () => editor.chain().focus().deleteRow().run() },
                { label: "Add column right", action: () => editor.chain().focus().addColumnAfter().run() },
                { label: "Add column left", action: () => editor.chain().focus().addColumnBefore().run() },
                { label: "Delete column", action: () => editor.chain().focus().deleteColumn().run() },
                { label: "Delete table", action: () => editor.chain().focus().deleteTable().run() },
              ].map(({ label, action }) => (
                <button key={label} type="button"
                  onClick={() => { action(); setShowTableMenu(false); }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <Sep />

        {/* Link */}
        <ToolBtn title="Link" active={editor.isActive("link")} onClick={setLink}><Link2 className="h-4 w-4" /></ToolBtn>

        {/* Image upload */}
        <ToolBtn title="Insert image (upload)" disabled={uploading} onClick={() => imgInputRef.current?.click()}>
          {uploading ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" /> : <ImageIcon className="h-4 w-4" />}
        </ToolBtn>
        <input ref={imgInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAndInsertImage(f); e.target.value = ""; }} />

        {/* File attachment */}
        <ToolBtn title="Attach file (PDF, DOC, XLS, PPT — max 10MB)" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          <Paperclip className="h-4 w-4" />
        </ToolBtn>
        <input ref={fileInputRef} type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAndInsertFile(f); e.target.value = ""; }} />

        {/* Upload indicator */}
        {uploading && (
          <span className="ml-2 flex items-center gap-1.5 text-xs text-violet-600">
            <Upload className="h-3 w-3 animate-bounce" /> Uploading…
          </span>
        )}
      </div>

      {/* Upload error */}
      {uploadError && (
        <div className="flex items-center justify-between border-b border-red-200 bg-red-50 px-4 py-2 text-xs text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <span>{uploadError}</span>
          <button type="button" onClick={() => setUploadError("")}><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {/* File limits hint */}
      <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50/50 px-4 py-1.5 text-xs text-gray-400 dark:border-gray-800 dark:bg-gray-900/50">
        <span className="flex items-center gap-1"><ImageIcon className="h-3 w-3" /> Images: JPG, PNG, GIF, WebP — max 5 MB</span>
        <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> Files: PDF, DOC, XLS, PPT — max 10 MB</span>
      </div>

      <EditorContent editor={editor} onClick={() => { setShowColorPicker(false); setShowTableMenu(false); }} />
    </div>
  );
}
