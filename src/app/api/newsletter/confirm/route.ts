import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/?newsletter=invalid", req.url));

  const subscriber = await prisma.subscriber.findUnique({ where: { token } });
  if (!subscriber) return NextResponse.redirect(new URL("/?newsletter=invalid", req.url));

  await prisma.subscriber.update({
    where: { token },
    data: { status: "CONFIRMED", confirmedAt: new Date(), token: null },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techpulzo.in";
  return NextResponse.redirect(new URL("/?newsletter=confirmed", siteUrl));
}
