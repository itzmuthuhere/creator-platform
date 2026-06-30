import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  const series = await prisma.series.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });
  return NextResponse.json(series);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const slug = slugify(name);
  const series = await prisma.series.create({ data: { name: name.trim(), slug, description } });
  return NextResponse.json(series, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, name, description } = await req.json();
  const slug = slugify(name);
  const series = await prisma.series.update({ where: { id }, data: { name, slug, description } });
  return NextResponse.json(series);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await prisma.series.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
