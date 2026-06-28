"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Tag, Trash2, Pencil, X, Check } from "lucide-react";
import { useSession } from "next-auth/react";

interface Category {
  id: string; name: string; slug: string; description?: string; color?: string;
  _count: { posts: number };
}

export default function CategoriesPage() {
  const { status } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", description: "", color: "#7c3aed" });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", color: "#7c3aed" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  if (status === "unauthenticated") {
    window.location.href = "/admin/login";
    return null;
  }

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

  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setEditForm({ name: cat.name, description: cat.description || "", color: cat.color || "#7c3aed" });
  };

  const handleEdit = async (id: string) => {
    const res = await fetch("/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...editForm }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCategories((prev) => prev.map((c) => c.id === id ? { ...c, ...updated } : c));
      setEditId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Posts in this category will be uncategorized.")) return;
    setDeletingId(id);
    const res = await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeletingId(null);
  };

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
              <div key={cat.id} className="px-5 py-3">
                {editId === cat.id ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="color" value={editForm.color}
                        onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                        className="h-8 w-10 cursor-pointer rounded border border-gray-300" />
                      <Input value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="h-8 flex-1" placeholder="Name" />
                    </div>
                    <Input value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="h-8" placeholder="Description" />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(cat.id)} className="h-7 gap-1 px-3">
                        <Check className="h-3 w-3" /> Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditId(null)} className="h-7 gap-1 px-3">
                        <X className="h-3 w-3" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: cat.color || "#7c3aed" }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white">{cat.name}</p>
                      <p className="text-xs text-gray-500">{cat._count.posts} posts · /{cat.slug}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(cat)}>
                        <Pencil className="h-3.5 w-3.5 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"
                        disabled={deletingId === cat.id}
                        onClick={() => handleDelete(cat.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                )}
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
