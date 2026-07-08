export const dynamic = "force-dynamic";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import CommentsAdminClient from "@/components/admin/CommentsAdminClient";

export default async function CommentsAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  const [pending, approved, total] = await Promise.all([
    prisma.comment.count({ where: { status: "PENDING" } }),
    prisma.comment.count({ where: { status: "APPROVED" } }),
    prisma.comment.count(),
  ]);

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { post: { select: { title: true, slug: true, locale: true } } },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comments</h1>
          <p className="mt-1 text-sm text-gray-500">Review and moderate reader comments</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Pending Review", value: pending, color: "text-yellow-600" },
            { label: "Approved", value: approved, color: "text-green-600" },
            { label: "Total", value: total, color: "text-violet-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-sm text-gray-500">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <CommentsAdminClient initialComments={comments as any} />
      </div>
    </AdminLayout>
  );
}
