"use client";
import React, { useState } from "react";
import { Mail, Loader2, Send, Zap } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setFeedback(data.message);
    } else {
      setStatus("error");
      setFeedback(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="border-b border-gray-100 dark:border-gray-800 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
            <Zap className="h-3.5 w-3.5" /> Contact
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
            Questions, corrections, partnership inquiries, or just want to say hi — send a message and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-gray-100 p-5 dark:border-gray-800">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/30">
            <Mail className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Prefer email?</p>
            <a href="mailto:rajamuthu107@gmail.com" className="text-sm text-violet-600 hover:underline">
              rajamuthu107@gmail.com
            </a>
          </div>
        </div>

        {status === "success" ? (
          <div className="rounded-lg bg-green-50 px-4 py-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
            {feedback}
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            {status === "error" && <p className="text-sm text-red-600">{feedback}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
