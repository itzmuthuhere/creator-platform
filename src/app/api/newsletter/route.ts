import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const existing = await prisma.subscriber.findUnique({ where: { email } });
  if (existing?.status === "CONFIRMED") {
    return NextResponse.json({ message: "Already subscribed!" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techpulzo.in";

  await prisma.subscriber.upsert({
    where: { email },
    create: { email, name, token, status: "PENDING" },
    update: { name, token, status: "PENDING" },
  });

  await sendEmail({
    to: email,
    subject: "Confirm your Techpulzo subscription",
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px">
        <h2 style="color:#7c3aed">Welcome to Techpulzo!</h2>
        <p>Hi ${name || "there"},</p>
        <p>Click the button below to confirm your subscription and stay updated with the latest tech news.</p>
        <a href="${siteUrl}/api/newsletter/confirm?token=${token}"
          style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0">
          Confirm Subscription
        </a>
        <p style="color:#666;font-size:12px">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    text: `Hi ${name || "there"},\n\nConfirm your Techpulzo subscription: ${siteUrl}/api/newsletter/confirm?token=${token}\n\nIf you didn't request this, you can safely ignore this email.`,
  });

  return NextResponse.json({ message: "Check your email to confirm subscription!" });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 50;

  const where: any = {};
  if (status) where.status = status;

  const [subscribers, total] = await Promise.all([
    prisma.subscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.subscriber.count({ where }),
  ]);

  return NextResponse.json({ subscribers, total });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await prisma.subscriber.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
