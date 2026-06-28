import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const link = await prisma.affiliateLink.findUnique({ where: { id } });
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.affiliateLink.update({
    where: { id },
    data: { clickCount: { increment: 1 } },
  });

  return NextResponse.json({ url: link.url });
}
