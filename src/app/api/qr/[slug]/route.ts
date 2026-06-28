import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { getBaseUrl } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const url = `${getBaseUrl()}/${slug}`;
  const qrDataUrl = await QRCode.toDataURL(url, {
    width: 400,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  });

  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="qr-${slug}.png"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
