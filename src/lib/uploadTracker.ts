// Tracks every Cloudinary asset uploaded during the current editor session,
// so we can clean up assets that get uploaded then removed before save.
const uploaded = new Set<string>();

export function trackUpload(resourceType: "image" | "raw", publicId: string) {
  if (publicId) uploaded.add(`${resourceType}:${publicId}`);
}

export function getTrackedUploads(): Set<string> {
  return uploaded;
}

export function clearTrackedUploads() {
  uploaded.clear();
}

// Pulls every "resourceType:publicId" pair out of saved HTML content.
export function extractAssetIds(html: string): Set<string> {
  const ids = new Set<string>();
  const re = /data-cld="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) ids.add(m[1]);
  return ids;
}
