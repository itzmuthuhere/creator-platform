export const dynamic = "force-dynamic";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import NewsletterAdminClient from "@/components/admin/NewsletterAdminClient";

export default async function NewsletterAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  const [confirmed, pending, unsubscribed] = await Promise.all([
    prisma.subscriber.count({ where: { status: "CONFIRMED" } }),
    prisma.subscriber.count({ where: { status: "PENDING" } }),
    prisma.subscriber.count({ where: { status: "UNSUBSCRIBED" } }),
  ]);

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your email subscribers</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Confirmed", value: confirmed, color: "text-green-600" },
            { label: "Pending", value: pending, color: "text-yellow-600" },
            { label: "Unsubscribed", value: unsubscribed, color: "text-gray-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-sm text-gray-500">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <NewsletterAdminClient initialSubscribers={subscribers} />
      </div>
    </AdminLayout>
  );
}
