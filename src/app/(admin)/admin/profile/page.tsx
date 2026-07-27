export const dynamic = "force-dynamic";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import ProfileForm from "@/components/admin/ProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, image: true, bio: true, socialLinks: true },
  });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Author Profile</h1>
        <p className="text-sm text-gray-500">This appears in the "Written by" box at the end of every article.</p>
      </div>
      <ProfileForm initial={user || { name: null, image: null, bio: null, socialLinks: null }} />
    </AdminLayout>
  );
}
