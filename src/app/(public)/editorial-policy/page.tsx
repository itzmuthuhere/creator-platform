import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "Who writes Techpulzo, what they're qualified to write about, and the process every article goes through before it's published.",
};

export default async function EditorialPolicyPage() {
  const founder = await prisma.user.findFirst({
    where: { email: "rajamuthu107@gmail.com" },
    select: { name: true },
  });
  const authorName = founder?.name || "Muthu Raja";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Editorial Policy</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: August 18, 2026</p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">1. Who writes Techpulzo</h2>
            <p className="mt-3">
              Techpulzo is written and published by one person: <Link href="/author/muthu-raja" className="text-violet-600 hover:underline">{authorName}</Link>.
              There is no editorial team, no staff of writers, and no freelance contributor pool. Every article on this site
              has the same author. If that changes — if a second person starts genuinely writing, fact-checking, or
              reviewing content here — this page will be updated to reflect it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. What actually qualifies him to write this</h2>
            <p className="mt-3">
              {authorName} works as a software developer (Java, backend systems). That's a real, verifiable professional
              credential, and it's the basis for anything this site says about software, apps, and how technology works
              under the hood.
            </p>
            <p className="mt-3">
              It is <em>not</em> a credential in personal finance, tax or legal procedure, career coaching, or biometrics —
              topics this site also covers. Articles in those areas are researched against primary sources rather than
              written from professional standing in the field. Where that distinction matters, we say so in the piece
              itself rather than letting a byline imply expertise that isn't there.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">3. How an article gets published</h2>
            <p className="mt-3">
              Techpulzo doesn't have a multi-person newsroom, so we don't claim one. What we do have is a real, sequential
              process — the same person, doing a different job at each step, with actual distance in time between them:
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li><strong>Draft.</strong> The article gets written.</li>
              <li><strong>Research.</strong> Any claim that's a number, a law, a regulation, or a "how it works" mechanism
                needs a named, linkable source — a government portal, a vendor's own documentation, an RBI circular —
                before it's allowed to stay in the piece.</li>
              <li><strong>Self fact-check.</strong> A second pass, after a cooling-off gap, that checks every factual and
                numeric claim against its source. This happens in a separate sitting from drafting, not as a quick
                re-read.</li>
              <li><strong>Self editorial review.</strong> A pass focused on structure — whether the piece delivers on
                what its title promises, and whether it's padded out with filler.</li>
              <li><strong>Publish.</strong> With an honest byline pointing to the <Link href="/author/muthu-raja" className="text-violet-600 hover:underline">author page</Link>.</li>
            </ol>
            <p className="mt-3">
              We're direct about the limits of this: sequential self-review is a genuine quality practice, but it is not
              independent editorial oversight. We don't call it that, and we don't put a "reviewed by" or "fact-checked by"
              credit on any article, because there's no second person behind that claim today.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">4. Fact-checking, honestly stated</h2>
            <p className="mt-3">
              Going forward, claims involving numbers, law, regulation, or mechanism ("how X works") are checked against a
              named primary source before publishing. Not every article already published meets that bar — some of the
              catalog predates this policy and cites no source at all. We're working backward through it to add sourcing
              rather than claiming it was always there. A false "we fact-check everything" statement would be worse than
              no statement, since it's disprovable by anyone who reads an unsourced older article.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">5. Corrections</h2>
            <p className="mt-3">
              When a factual error is found, the article is corrected and its "last updated" date reflects the change.
              For material errors on regulated topics (tax, credit, employment law), the article itself carries a short
              note on what changed and when. We don't run a separate public corrections log — at this site's current
              size (one author, under 50 live articles), a log that's mostly empty would read as a checkbox exercise
              rather than a real signal, so we've held off on building one until there's enough history to make it
              meaningful.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">6. Questions</h2>
            <p className="mt-3">
              If you spot something wrong, or want to know more about how a specific article was put together, contact us
              at <a href="mailto:rajamuthu107@gmail.com" className="text-violet-600 hover:underline">rajamuthu107@gmail.com</a> or
              through the <Link href="/contact" className="text-violet-600 hover:underline">contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
