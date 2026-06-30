import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const name = searchParams.get("name") || "download";

  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  // Only allow Cloudinary URLs
  if (!url.startsWith("https://res.cloudinary.com/")) {
    return NextResponse.json({ error: "Invalid source" }, { status: 400 });
  }

  const response = await fetch(url);
  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 502 });
  }

  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "application/octet-stream";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(name)}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
