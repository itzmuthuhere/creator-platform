"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeletePostButton({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this post permanently?")) return;
    setLoading(true);
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  };

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={handleDelete} disabled={loading}>
      <Trash2 className="h-3.5 w-3.5" />
    </Button>
  );
}
