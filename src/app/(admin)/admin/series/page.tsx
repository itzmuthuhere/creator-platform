export const dynamic = "force-dynamic";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import SeriesAdminClient from "@/components/admin/SeriesAdminClient";

export default async function SeriesAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  const series = await prisma.series.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Article Series</h1>
          <p className="mt-1 text-sm text-gray-500">Group related articles into multi-part series</p>
        </div>
        <SeriesAdminClient initialSeries={series as any} />
      </div>
    </AdminLayout>
  );
}
