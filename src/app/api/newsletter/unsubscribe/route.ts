import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const email = new URL(req.url).searchParams.get("email");
  if (!email) return NextResponse.redirect(new URL("/", req.url));

  await prisma.subscriber.updateMany({
    where: { email },
    data: { status: "UNSUBSCRIBED" },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techpulzo.in";
  return NextResponse.redirect(new URL("/?newsletter=unsubscribed", siteUrl));
}
