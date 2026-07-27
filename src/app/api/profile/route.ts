import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, image: true, bio: true, socialLinks: true },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, bio, image, socialLinks } = body;

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: typeof name === "string" ? name : undefined,
      bio: typeof bio === "string" ? bio : undefined,
      image: typeof image === "string" ? image : undefined,
      socialLinks: socialLinks ?? undefined,
    },
    select: { id: true, name: true, email: true, image: true, bio: true, socialLinks: true },
  });

  return NextResponse.json(user);
}
