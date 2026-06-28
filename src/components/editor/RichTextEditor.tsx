"use client";
import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, UnderlineIcon, Strikethrough, Code, Link2, ImageIcon,
  AlignLeft, AlignCenter, AlignRight, List, ListOrdered,
  Heading1, Heading2, Heading3, Quote, Minus, Undo, Redo
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing your article…" }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-gray max-w-none dark:prose-invert min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  const addImage = useCallback(() => {
    const url = prompt("Enter image URL");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const setLink = useCallback(() => {
    const prev = editor?.getAttributes("link").href;
    const url = prompt("Enter URL", prev);
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const ToolBtn = ({ onClick, active, title, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
    <button type="button" title={title} onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded text-sm transition ${active ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}>
      {children}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-900">
        <ToolBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></ToolBtn>
        <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
        <ToolBtn title="H1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="H3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></ToolBtn>
        <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
        <ToolBtn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code className="h-4 w-4" /></ToolBtn>
        <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
        <ToolBtn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight className="h-4 w-4" /></ToolBtn>
        <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
        <ToolBtn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></ToolBtn>
        <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
        <ToolBtn title="Link" active={editor.isActive("link")} onClick={setLink}><Link2 className="h-4 w-4" /></ToolBtn>
        <ToolBtn title="Image" onClick={addImage}><ImageIcon className="h-4 w-4" /></ToolBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
