import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Photon Security",
  description: "Terms of service for Photon Security.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        <article className="container max-w-4xl mx-auto px-4 py-20 prose prose-invert">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-foreground/70 mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-foreground/80">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                2. License
              </h2>
              <p>
                Photon Security grants you a limited license to access and use
                this website for informational purposes only. This license does
                not permit any reproduction or modification of content, or any
                resale of the website or its contents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                3. Disclaimer of Warranties
              </h2>
              <p>
                This website and its contents are provided "as is" without
                warranty of any kind. Photon Security disclaims all warranties,
                express or implied, including but not limited to fitness for a
                particular purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                4. Limitation of Liability
              </h2>
              <p>
                In no event shall Photon Security be liable for any indirect,
                incidental, special, or consequential damages arising from the
                use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                5. Service Agreement
              </h2>
              <p>
                When engaging Photon Security for services, a separate Service
                Agreement will be executed outlining the scope, timeline,
                deliverables, and terms specific to that engagement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                6. Confidentiality
              </h2>
              <p>
                Photon Security maintains strict confidentiality regarding
                client information, findings, and recommendations, except as
                required by law or regulatory bodies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                7. Governing Law
              </h2>
              <p>
                These terms are governed by and construed in accordance with the
                laws of India, and you irrevocably submit to the exclusive
                jurisdiction of courts located in Bangalore.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                8. Contact
              </h2>
              <p>
                For inquiries regarding these terms, contact:
                hello@photonsecurity.com
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
