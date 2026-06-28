export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import PostEditor from "@/components/admin/PostEditor";

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Post</h1>
        <p className="text-sm text-gray-500">Create and publish a new article</p>
      </div>
      <PostEditor categories={categories} />
    </AdminLayout>
  );
}
