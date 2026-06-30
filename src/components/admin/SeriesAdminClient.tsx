"use client";
import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface Series {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: { posts: number };
}

export default function SeriesAdminClient({ initialSeries }: { initialSeries: Series[] }) {
  const [series, setSeries] = useState(initialSeries);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const save = async () => {
    if (!form.name.trim()) return;
    const res = await fetch("/api/series", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setSeries((s) => [{ ...data, _count: { posts: 0 } }, ...s]);
      setCreating(false);
      setForm({ name: "", description: "" });
    }
  };

  const update = async (id: string) => {
    const res = await fetch("/api/series", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...form }),
    });
    const data = await res.json();
    if (res.ok) {
      setSeries((s) => s.map((x) => x.id === id ? { ...x, ...data } : x));
      setEditingId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this series? Posts will remain but won't be part of any series.")) return;
    await fetch("/api/series", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setSeries((s) => s.filter((x) => x.id !== id));
  };

  const startEdit = (s: Series) => {
    setEditingId(s.id);
    setForm({ name: s.name, description: s.description || "" });
  };

  return (
    <div className="space-y-4">
      <button onClick={() => { setCreating(true); setForm({ name: "", description: "" }); }}
        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
        <Plus className="h-4 w-4" /> New Series
      </button>

      {creating && (
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-950/30 space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-white">New Series</h3>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Series name" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100" />
          <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Description (optional)" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100" />
          <div className="flex gap-2">
            <button onClick={save} className="flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-sm text-white hover:bg-violet-700">
              <Check className="h-4 w-4" /> Create
            </button>
            <button onClick={() => setCreating(false)} className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400">
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        {series.length === 0 ? (
          <div className="py-12 text-center text-gray-400">No series yet. Create one to group related articles.</div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {series.map((s) => (
              <div key={s.id} className="p-4">
                {editingId === s.id ? (
                  <div className="space-y-3">
                    <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100" />
                    <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Description" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100" />
                    <div className="flex gap-2">
                      <button onClick={() => update(s.id)} className="flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-xs text-white"><Check className="h-3 w-3" /> Save</button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs text-gray-500 dark:border-gray-700"><X className="h-3 w-3" /> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
                      {s.description && <p className="text-sm text-gray-500">{s.description}</p>}
                      <p className="text-xs text-gray-400 mt-1">{s._count.posts} articles</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(s)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-violet-600 dark:hover:bg-gray-800"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => remove(s.id)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
