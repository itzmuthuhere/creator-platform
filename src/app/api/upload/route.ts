import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
const FILE_TYPES = ["application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;  // 5MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;  // 10MB

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const isImage = IMAGE_TYPES.includes(file.type);
  const isFile = FILE_TYPES.includes(file.type);

  if (!isImage && !isFile) {
    return NextResponse.json({
      error: "Unsupported file type. Allowed: JPG, PNG, GIF, WebP, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX"
    }, { status: 400 });
  }

  const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_FILE_SIZE;
  if (file.size > maxSize) {
    return NextResponse.json({
      error: `File too large. Max size: ${isImage ? "5MB for images" : "10MB for documents"}`
    }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  if (isImage) {
    const result = await uploadImage(base64, "creator-platform");
    return NextResponse.json({ url: result.url, type: "image" });
  }

  // Raw file upload to Cloudinary
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload(base64, {
      folder: "creator-platform/files",
      resource_type: "raw",
      public_id: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
    }, (err, res) => err ? reject(err) : resolve(res));
  });

  const downloadUrl = `/api/download?url=${encodeURIComponent(result.secure_url)}&name=${encodeURIComponent(file.name)}`;

  return NextResponse.json({
    url: result.secure_url,
    downloadUrl,
    name: file.name,
    size: file.size,
    type: "file",
  });
}
