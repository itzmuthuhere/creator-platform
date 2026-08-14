import Link from "next/link";
import { ArrowRight, BookOpen, Target, Users, Zap } from "lucide-react";
import { prisma } from "@/lib/prisma";
import AuthorBio from "@/components/posts/AuthorBio";

export const revalidate = 3600;

export default async function AboutPage() {
  const founder = await prisma.user.findFirst({
    where: { email: "rajamuthu107@gmail.com" },
    select: { name: true, image: true, bio: true, socialLinks: true },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="border-b border-gray-100 dark:border-gray-800 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
            <Zap className="h-3.5 w-3.5" /> About Us
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            We write so you can decide
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
            Techpulzo is an independent blog covering technology, career growth, personal finance, and productivity. We do the research so you can make confident decisions.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "In-depth research", desc: "Every article is thoroughly researched. No fluff, no filler — just clear, actionable information." },
            { icon: Target, title: "Honest opinions", desc: "We are editorially independent. Our recommendations are based on merit, not sponsorships." },
            { icon: Users, title: "Built for readers", desc: "We write for curious, ambitious people who want to grow — not just browse." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-gray-100 p-6 dark:border-gray-800">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/30">
                <Icon className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-gray-100 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900/30">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our story</h2>
          <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-400">
            <p>Techpulzo was started to fill a gap: most tech content online is either too shallow or too technical. We wanted a place where smart, curious people could come to get real answers.</p>
            <p>Every article we publish goes through a research and review process. We cover topics across technology, career, finance, and productivity — the things that actually matter in your day-to-day life.</p>
            <p>We're independently owned and supported by affiliate partnerships and advertising. When you click a link and make a purchase, we may earn a commission at no extra cost to you.</p>
          </div>

          {founder?.bio && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Who writes this</h2>
              <div className="mt-4">
                <AuthorBio
                  name={founder.name}
                  image={founder.image}
                  bio={founder.bio}
                  socialLinks={founder.socialLinks}
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">
              Read our articles <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
