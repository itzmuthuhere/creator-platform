"use client";
import React, { useEffect, useState } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ authorName: "", authorEmail: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${slug}/comments`)
      .then((r) => r.json())
      .then(setComments)
      .catch(() => {});
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await fetch(`/api/posts/${slug}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) { setError(data.error || "Failed to submit"); return; }
    setSubmitted(true);
    setForm({ authorName: "", authorEmail: "", content: "" });
  };

  return (
    <div className="mt-10 border-t border-gray-200 pt-10 dark:border-gray-700">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
        <MessageSquare className="h-5 w-5 text-violet-600" />
        Comments {comments.length > 0 && <span className="text-base font-normal text-gray-500">({comments.length})</span>}
      </h3>

      {comments.length === 0 ? (
        <p className="mb-8 text-sm text-gray-500">No comments yet. Be the first to share your thoughts!</p>
      ) : (
        <div className="mb-8 space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                  <User className="h-4 w-4 text-violet-600" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{c.authorName}</span>
                <span className="text-xs text-gray-400">{formatDate(new Date(c.createdAt))}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {submitted ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
          Thanks for your comment! It will appear after review.
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">Leave a comment</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Name *</label>
              <input
                required
                value={form.authorName}
                onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Email (not published)</label>
              <input
                type="email"
                value={form.authorEmail}
                onChange={(e) => setForm((f) => ({ ...f, authorEmail: e.target.value }))}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Comment *</label>
            <textarea
              required
              rows={4}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="Share your thoughts..."
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Submitting…" : "Post Comment"}
          </button>
        </form>
      )}
    </div>
  );
}
