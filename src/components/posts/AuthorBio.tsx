import Image from "next/image";
import { Globe } from "lucide-react";

type SocialLinks = { twitter?: string; linkedin?: string; website?: string };

interface AuthorBioProps {
  name: string | null;
  image: string | null;
  bio: string | null;
  socialLinks: unknown;
}

export default function AuthorBio({ name, image, bio, socialLinks }: AuthorBioProps) {
  if (!bio) return null;

  const links = (socialLinks || {}) as SocialLinks;

  return (
    <div className="mt-10 flex gap-4 rounded-xl border border-gray-200 bg-gray-50/60 p-5 dark:border-gray-800 dark:bg-gray-900/60">
      {image ? (
        <Image src={image} alt={name || "Author"} width={56} height={56} className="h-14 w-14 flex-shrink-0 rounded-full object-cover" />
      ) : (
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-lg font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
          {(name || "?").charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Written by</p>
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{bio}</p>
        {(links.twitter || links.linkedin || links.website) && (
          <div className="mt-2 flex items-center gap-3 text-xs font-medium">
            {links.twitter && (
              <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-600">
                X (Twitter)
              </a>
            )}
            {links.linkedin && (
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-600">
                LinkedIn
              </a>
            )}
            {links.website && (
              <a href={links.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-violet-600">
                <Globe className="h-3.5 w-3.5" /> Website
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
