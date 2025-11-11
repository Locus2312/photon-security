import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Photon Security",
  description: "Privacy policy for Photon Security.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        <article className="container max-w-4xl mx-auto px-4 py-20 prose prose-invert">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-foreground/70 mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-foreground/80">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                1. Information We Collect
              </h2>
              <p>
                Photon Security ("we", "us", or "our") collects information you
                provide directly, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Name, email, company, and contact information from forms
                </li>
                <li>Information about your organization's security needs</li>
                <li>Communication preferences and inquiry details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                2. How We Use Information
              </h2>
              <p>We use collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Respond to inquiries and provide quotes</li>
                <li>Deliver our services and support</li>
                <li>Send newsletters and updates (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                3. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                information. However, no method of transmission over the
                internet is completely secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                4. Third-Party Services
              </h2>
              <p>
                We may use third-party services for email delivery, analytics,
                and hosting. These providers have access to your information
                only as needed to perform their functions and are obligated to
                maintain confidentiality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                5. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                information. To exercise these rights, contact us at
                hello@photonsecurity.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                6. GDPR Compliance
              </h2>
              <p>
                For individuals in the EU, we comply with GDPR. You have the
                right to request data portability, object to processing, and
                withdraw consent. Contact us for requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                7. Policy Changes
              </h2>
              <p>
                We may update this policy periodically. Changes will be
                effective immediately upon posting to the website. Your
                continued use constitutes acceptance of changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                8. Contact
              </h2>
              <p>For privacy inquiries, contact: hello@photonsecurity.com</p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
