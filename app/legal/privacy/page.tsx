import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Photon Security",
  description: "Cookie policy explaining how Photon Security uses cookies.",
};

export default function CookiePolicyPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <article className="container max-w-4xl mx-auto px-4 py-20 prose prose-invert">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <p className="text-foreground/70 mb-8">Last updated: December 2025</p>

        <div className="space-y-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They help websites function properly, improve user
              experience, and provide analytical insights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              2. How We Use Cookies
            </h2>
            <p>Photon Security uses cookies for the following purposes:</p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Essential Cookies:</strong> Required for basic website
                functionality and security.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Used to understand how
                visitors interact with our website, such as pages visited and
                time spent. This helps us improve website performance.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember user preferences
                to enhance browsing experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              3. Third-Party Cookies
            </h2>
            <p>
              We may use third-party services such as analytics providers. These
              third parties may set their own cookies in accordance with their
              respective privacy policies. Photon Security does not control
              third-party cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              4. Managing Cookies
            </h2>
            <p>
              You can control or delete cookies through your browser settings.
              Disabling cookies may affect certain website features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              5. Changes to This Cookie Policy
            </h2>
            <p>
              Photon Security reserves the right to update this Cookie Policy at
              any time. Changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              6. Contact Information
            </h2>
            <p>
              If you have questions about our use of cookies, contact us at{" "}
              <Link
                href="mailto:info@photonsecurity.in"
                className="text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                info@photonsecurity.in
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
