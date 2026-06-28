export const dynamic = "force-dynamic";

export default function DisclosurePage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "TechPulse";
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Affiliate Disclosure</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: June 28, 2026</p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Our commitment to transparency</h2>
            <p className="mt-3">{siteName} participates in affiliate marketing programs. This means we may earn a commission when you click on certain links and make a purchase — at no additional cost to you.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">What this means for you</h2>
            <p className="mt-3">Affiliate commissions help us keep this site free and fund the research that goes into our articles. However, our editorial opinions are never influenced by affiliate relationships. We only recommend products and services we genuinely believe in.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Which links are affiliate links?</h2>
            <p className="mt-3">Affiliate links may appear in product reviews, comparison articles, and resource pages. We do our best to label sponsored content clearly. If you're unsure whether a link is an affiliate link, assume it may be.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Programs we participate in</h2>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Amazon Associates Program</li>
              <li>Various brand and product affiliate programs</li>
              <li>Google AdSense (display advertising)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Questions?</h2>
            <p className="mt-3">If you have questions about our affiliate relationships or sponsored content, contact us at <a href="mailto:rajamuthu107@gmail.com" className="text-violet-600 hover:underline">rajamuthu107@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
