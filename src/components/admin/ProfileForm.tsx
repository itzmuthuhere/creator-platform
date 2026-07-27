"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SocialLinks = { twitter?: string; linkedin?: string; website?: string };

interface Props {
  initial: {
    name: string | null;
    image: string | null;
    bio: string | null;
    socialLinks: unknown;
  };
}

export default function ProfileForm({ initial }: Props) {
  const initialLinks = (initial.socialLinks || {}) as SocialLinks;
  const [name, setName] = useState(initial.name || "");
  const [bio, setBio] = useState(initial.bio || "");
  const [image, setImage] = useState(initial.image || "");
  const [twitter, setTwitter] = useState(initialLinks.twitter || "");
  const [linkedin, setLinkedin] = useState(initialLinks.linkedin || "");
  const [website, setWebsite] = useState(initialLinks.website || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setImage(data.url);
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    const socialLinks: SocialLinks = {};
    if (twitter) socialLinks.twitter = twitter;
    if (linkedin) socialLinks.linkedin = linkedin;
    if (website) socialLinks.website = website;

    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio, image, socialLinks }),
    });
    setSaving(false);
    setSavedAt(Date.now());
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Photo</label>
        <div className="flex items-center gap-4">
          {image ? (
            <Image src={image} alt="" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold text-gray-400 dark:bg-gray-800">
              {(name || "?").charAt(0).toUpperCase()}
            </div>
          )}
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload photo"}
            <input type="file" accept="image/*" className="hidden" onChange={uploadPhoto} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Display name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />

        <label className="mb-1.5 mt-4 block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="A few sentences about who you are and why readers should trust what you write."
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
        />
        <p className="mt-1 text-xs text-gray-400">
          Shown at the bottom of every article. Real, specific bios are one of the signals AdSense and readers use to judge whether content is trustworthy — leave it blank and the author box won't show at all.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Social links (optional)</h3>
        <div className="space-y-3">
          <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://x.com/yourhandle" />
          <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/yourprofile" />
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourwebsite.com" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Profile"}
        </Button>
        {savedAt && <span className="text-sm text-green-600 dark:text-green-400">Saved</span>}
      </div>
    </div>
  );
}
