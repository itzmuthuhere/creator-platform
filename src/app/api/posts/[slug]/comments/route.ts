import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;

  const post = await prisma.post.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const comments = await prisma.comment.findMany({
    where: { postId: post.id, ...(isAdmin ? {} : { status: "APPROVED" }) },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(comments);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { authorName, authorEmail, content } = await req.json();

  if (!authorName?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Name and comment are required" }, { status: 400 });
  }
  if (content.trim().length < 10) {
    return NextResponse.json({ error: "Comment is too short" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { slug, status: "PUBLISHED" }, select: { id: true } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const comment = await prisma.comment.create({
    data: { postId: post.id, authorName: authorName.trim(), authorEmail: authorEmail?.trim() || "", content: content.trim() },
  });

  return NextResponse.json(comment, { status: 201 });
}
