// Uploads rendered cover PNGs to Cloudinary (creator-platform/covers/<slug>),
// the same folder the existing article covers live in.
// Usage: CLOUDINARY_API_SECRET=... node scripts/research/upload-covers.mjs <dir>
// Cloud name and API key are the site's (see DOCUMENTATION.md §3); the secret
// is read from the environment, e.g. from GCP Secret Manager.
import { readdirSync } from "node:fs";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dkoqrad8k",
  api_key: process.env.CLOUDINARY_API_KEY || "851729445168496",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const dir = process.argv[2] || "content/drafts/covers";
const urls = {};
for (const f of readdirSync(dir).filter((f) => f.endsWith(".png"))) {
  const slug = f.replace(/\.png$/, "");
  const r = await cloudinary.uploader.upload(path.join(dir, f), {
    folder: "creator-platform/covers", public_id: slug, overwrite: true, resource_type: "image",
  });
  urls[slug] = r.secure_url;
  console.log(slug, r.secure_url);
}
console.log(JSON.stringify(urls));
