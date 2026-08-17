import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Dedicated, single-field endpoint for the admin list page's quick-approve
// toggle. Deliberately NOT reusing the general PUT /api/posts/[slug] route:
// that route defaults several omitted fields (images, keywords, tags,
// affiliateLinks, scheduledAt) to empty/null when they're absent from the
// body, so a partial { editorialApproved } payload through it would wipe
// tags/affiliate links and clear the schedule date. This route touches
// editorialApproved only.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (typeof body.approved !== "boolean") {
    return NextResponse.json({ error: "'approved' must be a boolean" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.post.update({
    where: { slug },
    data: { editorialApproved: body.approved },
    select: { slug: true, status: true, editorialApproved: true },
  });

  return NextResponse.json(updated);
}
