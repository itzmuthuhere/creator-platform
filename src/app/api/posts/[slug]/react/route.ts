import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ReactionType = "like" | "fire" | "bulb";

const FIELD_MAP: Record<ReactionType, "reactLike" | "reactFire" | "reactBulb"> = {
  like: "reactLike",
  fire: "reactFire",
  bulb: "reactBulb",
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { type } = await req.json();

  if (!["like", "fire", "bulb"].includes(type)) {
    return NextResponse.json({ error: "Invalid reaction type" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { slug, status: "PUBLISHED" }, select: { id: true } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const field = FIELD_MAP[type as ReactionType];
  const updated = await prisma.post.update({
    where: { id: post.id },
    data: { [field]: { increment: 1 } },
    select: { reactLike: true, reactFire: true, reactBulb: true },
  });

  return NextResponse.json(updated);
}
