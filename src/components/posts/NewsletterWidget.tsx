"use client";
import React, { useState } from "react";
import { Mail, Loader2 } from "lucide-react";

export default function NewsletterWidget() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setMessage(data.message);
    } else {
      setStatus("error");
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-6 dark:border-violet-800 dark:from-violet-950/30 dark:to-purple-950/30">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Stay Updated</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Get the latest tech news in your inbox</p>
        </div>
      </div>

      {status === "success" ? (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
          {message}
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
          {status === "error" && <p className="text-xs text-red-600">{message}</p>}
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            {status === "loading" ? "Subscribing…" : "Subscribe — It's Free"}
          </button>
          <p className="text-center text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  );
}
