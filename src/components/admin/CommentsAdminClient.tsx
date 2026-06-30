"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Check, X, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: string;
  createdAt: Date;
  post: { title: string; slug: string };
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  APPROVED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function CommentsAdminClient({ initialComments }: { initialComments: Comment[] }) {
  const [comments, setComments] = useState(initialComments);
  const [filter, setFilter] = useState("PENDING");

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setComments((c) => c.map((x) => x.id === id ? { ...x, status } : x));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    setComments((c) => c.filter((x) => x.id !== id));
  };

  const filtered = filter === "ALL" ? comments : comments.filter((c) => c.status === filter);

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        {["PENDING", "APPROVED", "REJECTED", "ALL"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${filter === f ? "bg-violet-600 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">{filtered.length}</span>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {filtered.map((c) => (
          <div key={c.id} className="p-4">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">{c.authorName}</span>
                <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
                <span className="text-xs text-gray-400">{c.authorEmail}</span>
                <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
                <span className="text-xs text-gray-400">{formatDate(new Date(c.createdAt))}</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[c.status]}`}>{c.status}</span>
            </div>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">{c.content}</p>
            <div className="flex items-center gap-2">
              <Link href={`/${c.post.slug}`} target="_blank" className="text-xs text-violet-600 hover:underline">
                {c.post.title}
              </Link>
              <div className="ml-auto flex gap-2">
                {c.status !== "APPROVED" && (
                  <button onClick={() => updateStatus(c.id, "APPROVED")}
                    className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">
                    <Check className="h-3 w-3" /> Approve
                  </button>
                )}
                {c.status !== "REJECTED" && (
                  <button onClick={() => updateStatus(c.id, "REJECTED")}
                    className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400">
                    <X className="h-3 w-3" /> Reject
                  </button>
                )}
                <button onClick={() => remove(c.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">No comments in this category</div>
        )}
      </div>
    </div>
  );
}
