"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  status: string;
  confirmedAt: Date | null;
  createdAt: Date;
}

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  UNSUBSCRIBED: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export default function NewsletterAdminClient({ initialSubscribers }: { initialSubscribers: Subscriber[] }) {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [filter, setFilter] = useState("ALL");

  const remove = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;
    await fetch("/api/newsletter", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setSubscribers((s) => s.filter((x) => x.id !== id));
  };

  const filtered = filter === "ALL" ? subscribers : subscribers.filter((s) => s.status === filter);

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        {["ALL", "CONFIRMED", "PENDING", "UNSUBSCRIBED"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${filter === f ? "bg-violet-600 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">{filtered.length} subscribers</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr className="text-left text-xs text-gray-500">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.email}</td>
                <td className="px-4 py-3 text-gray-500">{s.name || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[s.status]}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{formatDate(new Date(s.createdAt))}</td>
                <td className="px-4 py-3">
                  <button onClick={() => remove(s.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No subscribers yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
