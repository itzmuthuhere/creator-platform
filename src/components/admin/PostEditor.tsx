"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, Eye, Globe, Image as ImageIcon, X, Plus, Upload, Link, QrCode } from "lucide-react";
type Category = { id: string; name: string; slug: string; color: string | null; description: string | null };
type Tag = { id: string; name: string; slug: string };
type AffiliateLink = { id: string; label: string; url: string; platform: string | null; clickCount: number; postId: string; createdAt: Date };
type Post = { id: string; title: string; subtitle: string | null; slug: string; content: string; excerpt: string | null; coverImage: string | null; images: string[]; status: string; featured: boolean; sponsored: boolean; sponsoredLabel: string | null; categoryId: string | null; seoTitle: string | null; metaDescription: string | null; keywords: string[]; ogImage: string | null; readingTime: number; publishedAt: Date | null; scheduledAt: Date | null; createdAt: Date; updatedAt: Date; authorId: string; viewCount: number };
import { slugify } from "@/lib/utils";

const RichTextEditor = dynamic(() => import("@/components/editor/RichTextEditor"), { ssr: false });

interface Props {
  categories: Category[];
  post?: Post & { tags: Tag[]; affiliateLinks: AffiliateLink[] };
}

export default function PostEditor({ categories, post }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "affiliate">("content");

  const [form, setForm] = useState({
    title: post?.title || "",
    subtitle: post?.subtitle || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    coverImage: post?.coverImage || "",
    status: post?.status || "DRAFT",
    featured: post?.featured || false,
    sponsored: post?.sponsored || false,
    sponsoredLabel: post?.sponsoredLabel || "",
    categoryId: post?.categoryId || "",
    tags: post?.tags.map((t) => t.name) || [] as string[],
    seoTitle: post?.seoTitle || "",
    metaDescription: post?.metaDescription || "",
    keywords: post?.keywords || [] as string[],
    ogImage: post?.ogImage || "",
    scheduledAt: "",
    affiliateLinks: post?.affiliateLinks.map((l) => ({ label: l.label, url: l.url, platform: l.platform || "" })) || [] as { label: string; url: string; platform: string }[],
  });

  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!post) set("slug", slugify(title));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]);
    setTagInput("");
  };

  const addKeyword = () => {
    const k = keywordInput.trim().toLowerCase();
    if (k && !form.keywords.includes(k)) set("keywords", [...form.keywords, k]);
    setKeywordInput("");
  };

  const addAffiliateLink = () => set("affiliateLinks", [...form.affiliateLinks, { label: "", url: "", platform: "" }]);

  const uploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) set("coverImage", data.url);
    setUploading(false);
  };

  const handleSave = async (status: string) => {
    setSaving(true);
    const payload = { ...form, status };
    const url = post ? `/api/posts/${post.slug}` : "/api/posts";
    const method = post ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      router.push(`/admin/posts`);
    } else {
      alert(data.error || "Failed to save");
    }
  };

  const TABS = ["content", "seo", "affiliate"] as const;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition border-b-2 -mb-px ${
              activeTab === tab ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            {tab === "affiliate" ? "Affiliate Links" : tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-6">
          {activeTab === "content" && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Article title"
                  className="text-xl font-bold"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle</label>
                <Input value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} placeholder="Optional subtitle" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="url-slug" className="font-mono text-sm" />
                {form.slug && <p className="mt-1 text-xs text-gray-500">/{form.slug}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)}
                  placeholder="Brief summary shown in cards and search"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Content *</label>
                <RichTextEditor value={form.content} onChange={(v) => set("content", v)} />
              </div>
            </>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">SEO Title</label>
                <Input value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} placeholder="SEO title (defaults to article title)" />
                <p className="mt-1 text-xs text-gray-500">{form.seoTitle.length}/60</p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
                <textarea value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)}
                  placeholder="Brief description for search engines"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                />
                <p className="mt-1 text-xs text-gray-500">{form.metaDescription.length}/160</p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</label>
                <div className="flex gap-2">
                  <Input value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    placeholder="Add keyword and press Enter" />
                  <Button type="button" variant="outline" size="sm" onClick={addKeyword}><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.keywords.map((k) => (
                    <Badge key={k} variant="secondary" className="cursor-pointer" onClick={() => set("keywords", form.keywords.filter((x) => x !== k))}>
                      {k} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">OG Image URL</label>
                <Input value={form.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="Social preview image URL" />
              </div>
            </div>
          )}

          {activeTab === "affiliate" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Affiliate Links</h3>
                  <p className="text-xs text-gray-500">These appear as product recommendation cards in the article</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addAffiliateLink}>
                  <Plus className="h-4 w-4" /> Add Link
                </Button>
              </div>
              {form.affiliateLinks.map((link, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-4 space-y-3 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Link #{i + 1}</span>
                    <button type="button" onClick={() => set("affiliateLinks", form.affiliateLinks.filter((_, j) => j !== i))}>
                      <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <Input placeholder="Label (e.g. Buy on Amazon)" value={link.label}
                    onChange={(e) => { const l = [...form.affiliateLinks]; l[i].label = e.target.value; set("affiliateLinks", l); }} />
                  <Input placeholder="URL" value={link.url}
                    onChange={(e) => { const l = [...form.affiliateLinks]; l[i].url = e.target.value; set("affiliateLinks", l); }} />
                  <Input placeholder="Platform (e.g. Amazon, Flipkart)" value={link.platform}
                    onChange={(e) => { const l = [...form.affiliateLinks]; l[i].platform = e.target.value; set("affiliateLinks", l); }} />
                </div>
              ))}
              {form.affiliateLinks.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                  <Link className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">No affiliate links yet. Click "Add Link" to add one.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Publish</h3>
            <div className="space-y-3">
              <Button onClick={() => handleSave("PUBLISHED")} disabled={saving} className="w-full">
                <Globe className="h-4 w-4" /> {saving ? "Publishing…" : "Publish Now"}
              </Button>
              <Button variant="outline" onClick={() => handleSave("DRAFT")} disabled={saving} className="w-full">
                <Save className="h-4 w-4" /> Save Draft
              </Button>
              {form.slug && (
                <a href={`/${form.slug}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" className="w-full text-xs">
                    <Eye className="h-4 w-4" /> Preview
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Cover Image</h3>
            {form.coverImage ? (
              <div className="relative">
                <img src={form.coverImage} alt="Cover" className="w-full rounded-lg object-cover aspect-video" />
                <button onClick={() => set("coverImage", "")}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-400 hover:border-violet-400 hover:text-violet-500 dark:border-gray-600">
                {uploading ? <span className="text-sm">Uploading…</span> : (
                  <><Upload className="h-6 w-6" /><span className="text-sm">Upload image</span></>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={uploadCover} />
              </label>
            )}
            <Input value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)}
              placeholder="Or paste image URL" className="mt-2 text-xs" />
          </div>

          {/* Category */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Category</h3>
            <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:border-violet-500 focus:outline-none">
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Tags</h3>
            <div className="flex gap-2">
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag, press Enter" className="text-sm" />
              <Button type="button" variant="outline" size="icon" onClick={addTag}><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {form.tags.map((t) => (
                <Badge key={t} variant="secondary" className="cursor-pointer text-xs" onClick={() => set("tags", form.tags.filter((x) => x !== t))}>
                  #{t} <X className="ml-1 h-2.5 w-2.5" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-white">Options</h3>
            {[
              { label: "Featured post", key: "featured" },
              { label: "Sponsored content", key: "sponsored" },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={(form as any)[key]}
                  onChange={(e) => set(key, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
              </label>
            ))}
            {form.sponsored && (
              <Input value={form.sponsoredLabel} onChange={(e) => set("sponsoredLabel", e.target.value)}
                placeholder="Sponsored label (e.g. 'Partnered')" className="text-sm" />
            )}
          </div>

          {/* QR Preview */}
          {form.slug && post && (
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <QrCode className="h-4 w-4" /> QR Code
              </h3>
              <img src={`/api/qr/${form.slug}`} alt="QR" className="mx-auto h-32 w-32 rounded-lg" />
              <a href={`/api/qr/${form.slug}`} download={`qr-${form.slug}.png`}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-xs text-gray-600 hover:border-violet-400 hover:text-violet-600 dark:border-gray-700">
                Download QR Code
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
