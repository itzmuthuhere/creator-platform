import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Vercel Cron calls this on schedule with `Authorization: Bearer $CRON_SECRET`.
// Without this, SCHEDULED posts sit forever — nothing else flips them to
// PUBLISHED, which is why "queue posts now, trickle them out over weeks"
// wasn't actually possible before.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  // editorialApproved is a hard gate, independent of scheduledAt: a due
  // SCHEDULED post that hasn't been explicitly approved is left exactly
  // as it is (still SCHEDULED, same date) — never auto-flipped to
  // PUBLISHED. See reports/11-final-submission-gate.md for why this exists.
  const due = await prisma.post.findMany({
    where: { status: "SCHEDULED", scheduledAt: { lte: now }, editorialApproved: true },
    select: { id: true, slug: true },
  });

  const pendingApproval = await prisma.post.count({
    where: { status: "SCHEDULED", scheduledAt: { lte: now }, editorialApproved: false },
  });

  if (due.length > 0) {
    await prisma.post.updateMany({
      where: { id: { in: due.map((p) => p.id) } },
      data: { status: "PUBLISHED", publishedAt: now },
    });
  }

  return NextResponse.json({
    published: due.map((p) => p.slug),
    count: due.length,
    pendingApproval,
  });
}
