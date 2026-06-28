export const dynamic = "force-dynamic";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { Plus, Edit2, Eye, Trash2, Globe, FileText } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DeletePostButton from "@/components/admin/DeletePostButton";

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      _count: { select: { tags: true } },
    },
  });

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Posts</h1>
          <p className="text-sm text-gray-500">{posts.length} total posts</p>
        </div>
        <Link href="/admin/posts/new">
          <Button><Plus className="h-4 w-4" /> New Post</Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                {["Title", "Status", "Category", "Views", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="max-w-xs px-4 py-3">
                    <p className="truncate font-medium text-gray-900 dark:text-white">{post.title}</p>
                    <p className="text-xs text-gray-400 font-mono">/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      post.status === "PUBLISHED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      post.status === "DRAFT" ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" :
                      post.status === "SCHEDULED" ? "bg-blue-100 text-blue-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>{post.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{post.category?.name || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{formatNumber(post.viewCount)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(post.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/posts/${post.slug}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-3.5 w-3.5" /></Button>
                      </Link>
                      {post.status === "PUBLISHED" && (
                        <Link href={`/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button>
                        </Link>
                      )}
                      <DeletePostButton slug={post.slug} />
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                    <p className="text-gray-500">No posts yet</p>
                    <Link href="/admin/posts/new" className="mt-2 inline-block text-sm text-violet-600 hover:underline">Create your first post</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
