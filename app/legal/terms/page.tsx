import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Photon Security",
  description: "Terms of service for Photon Security.",
};

export default function TermsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <article className="container max-w-4xl mx-auto px-4 py-20 prose prose-invert">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-foreground/70 mb-8">Last updated: December 2025</p>

        <div className="space-y-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you agree to be bound by
              these Terms of Service. If you do not agree with any part of these
              terms, you must discontinue use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              2. Use of Website
            </h2>
            <p>
              This website is provided for informational purposes only. You
              agree not to misuse, copy, reproduce, distribute, modify, publish,
              or exploit any content from this website without prior written
              consent from Photon Security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              3. License
            </h2>
            <p>
              Photon Security grants you a limited, non-exclusive,
              non-transferable license to access and use this website solely for
              personal or business informational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              4. No Security Guarantee
            </h2>
            <p>
              Use of this website does not constitute or imply any form of
              security assessment, protection, monitoring, or assurance. All
              cybersecurity services, including VAPT, remediation, or audit
              support, are provided only under a separately executed Service
              Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              5. Disclaimer of Warranties
            </h2>
            <p>
              This website and its contents are provided on an &quot;as is&quot;
              and &quot;as available&quot; basis. Photon Security makes no
              warranties, express or implied, including but not limited to
              warranties of accuracy, reliability, or fitness for a particular
              purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall Photon Security be liable for any indirect,
              incidental, special, consequential, or punitive damages arising
              out of or related to the use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              7. Service Engagement
            </h2>
            <p>
              Any professional engagement with Photon Security shall be governed
              by a separate Service Agreement defining the scope of work,
              deliverables, timelines, responsibilities, and commercial terms
              specific to that engagement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              8. Confidentiality
            </h2>
            <p>
              Photon Security maintains strict confidentiality of client
              information, security findings, and engagement-related data,
              except where disclosure is required by applicable law, regulation,
              or legal process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              9. Third-Party Links
            </h2>
            <p>
              This website may contain links to third-party websites or
              resources. Photon Security does not control and is not responsible
              for the content, security, availability, or privacy practices of
              any third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              10. Changes to Terms
            </h2>
            <p>
              Photon Security reserves the right to update or modify these Terms
              of Service at any time. Continued use of the website after such
              changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              11. Governing Law
            </h2>
            <p>
              These Terms of Service shall be governed by and construed in
              accordance with the laws of India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              12. Contact Information
            </h2>
            <p>
              For any questions regarding these Terms of Service, please contact{" "}
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
