import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

// Deletes orphaned Cloudinary assets (images/files removed from post content before save).
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { ids } = await req.json();
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ deleted: 0 });
  }

  let deleted = 0;
  await Promise.all(
    ids.map(async (id: string) => {
      const [resourceType, publicId] = id.split(/:(.+)/);
      if (!publicId || (resourceType !== "image" && resourceType !== "raw")) return;
      try {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: resourceType,
          type: resourceType === "raw" ? "authenticated" : "upload",
        });
        deleted++;
      } catch {
        // best-effort cleanup — ignore failures (already deleted, etc.)
      }
    })
  );

  return NextResponse.json({ deleted });
}
