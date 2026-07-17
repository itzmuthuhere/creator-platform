export default function PrivacyPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Techpulzo";
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: June 28, 2026</p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">1. Information we collect</h2>
            <p className="mt-3">We collect information you provide directly (such as your email when subscribing to our newsletter) and information collected automatically (such as your IP address, browser type, and pages visited via analytics tools).</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. How we use your information</h2>
            <p className="mt-3">We use the information we collect to operate and improve our website, send newsletters (with your consent), analyze traffic patterns, and comply with legal obligations. We do not sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">3. Cookies and Ad Consent</h2>
            <p className="mt-3">We use cookies to understand how visitors interact with our site and to serve ads through Google AdSense. On your first visit, a banner lets you choose "Accept" (allows personalized ads) or "Reject" (limits us to non-personalized ads only, based on the page content rather than your browsing history). Your choice is stored in your browser and applied on every subsequent visit until you clear your browser data. You can also disable cookies entirely in your browser settings, though some features may not function correctly.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">4. Third-party services</h2>
            <p className="mt-3">We may use third-party services such as Google Analytics, Google AdSense, and Cloudinary. These services have their own privacy policies and may collect data in accordance with their terms.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">5. Data retention</h2>
            <p className="mt-3">We retain your data only for as long as necessary to provide our services or as required by law. You may request deletion of your data at any time by contacting us.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">6. Your rights</h2>
            <p className="mt-3">You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at the email below.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">7. Contact</h2>
            <p className="mt-3">If you have questions about this Privacy Policy, please contact us at <a href="mailto:rajamuthu107@gmail.com" className="text-violet-600 hover:underline">rajamuthu107@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
