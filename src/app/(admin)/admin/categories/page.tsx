"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Tag, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Category {
  id: string; name: string; slug: string; description?: string; color?: string;
  _count: { posts: number };
}

export default function CategoriesPage() {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", description: "", color: "#7c3aed" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const cat = await res.json();
      setCategories((prev) => [...prev, { ...cat, _count: { posts: 0 } }]);
      setForm({ name: "", description: "", color: "#7c3aed" });
    }
    setSaving(false);
  };

  if (status === "unauthenticated") {
    window.location.href = "/admin/login";
    return null;
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p className="text-sm text-gray-500">Organize your content</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Create Form */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">New Category</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. AI Tools" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional description" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="h-10 w-16 cursor-pointer rounded border border-gray-300" />
                <span className="font-mono text-sm text-gray-600">{form.color}</span>
              </div>
            </div>
            <Button type="submit" disabled={saving} className="w-full">
              <Plus className="h-4 w-4" /> {saving ? "Creating…" : "Create Category"}
            </Button>
          </form>
        </div>

        {/* List */}
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">{categories.length} Categories</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-3 px-5 py-3">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: cat.color || "#7c3aed" }} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat._count.posts} posts · /{cat.slug}</p>
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="px-5 py-12 text-center">
                <Tag className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-400">No categories yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
