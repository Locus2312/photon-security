import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QuoteWizard } from "@/components/forms/quote-wizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Photon Security",
  description:
    "Receive a customized security assessment quote based on your organization's needs.",
};

export default function QuotePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen pt-8">
        <div className="container max-w-4xl mx-auto px-4 mb-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get a Custom Quote
            </h1>
            <p className="text-lg text-foreground/70">
              Answer a few questions and receive a transparent, no-obligation
              quote.
            </p>
          </div>
        </div>

        <div className="grow pb-20">
          <QuoteWizard />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
