"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickApproveToggle({ slug, approved }: { slug: string; approved: boolean }) {
  const [checked, setChecked] = useState(approved);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    const next = !checked;
    setChecked(next); // optimistic
    setLoading(true);
    const res = await fetch(`/api/posts/${slug}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: next }),
    });
    setLoading(false);
    if (!res.ok) {
      setChecked(!next); // revert on failure
      alert("Failed to update approval status");
      return;
    }
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      title={checked ? "Approved — click to revoke" : "Pending approval — click to approve"}
      className={`ml-1.5 rounded-full px-2 py-1 text-[10px] font-semibold transition disabled:opacity-50 ${
        checked
          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
      }`}
    >
      {loading ? "…" : checked ? "Approved" : "Pending approval"}
    </button>
  );
}
