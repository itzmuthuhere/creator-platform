export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import PostEditor from "@/components/admin/PostEditor";

interface Props { params: Promise<{ slug: string }> }

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const [post, categories] = await Promise.all([
    prisma.post.findUnique({
      where: { slug },
      include: { tags: true, affiliateLinks: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) notFound();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
        <p className="font-mono text-sm text-gray-500">/{post.slug}</p>
      </div>
      <PostEditor categories={categories} post={post} />
    </AdminLayout>
  );
}
