import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description, color, icon } = await req.json();
  const slug = slugify(name);

  const category = await prisma.category.create({
    data: { name, slug, description, color, icon },
  });

  return NextResponse.json(category, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, name, description, color } = await req.json();
  const slug = slugify(name);
  const category = await prisma.category.update({ where: { id }, data: { name, slug, description, color } });
  return NextResponse.json(category);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
