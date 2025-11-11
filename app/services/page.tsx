import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicesCategoryGrid } from "@/components/services/services-category-grid";
import { servicesData } from "@/lib/services-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Photon Security",
  description:
    "Our comprehensive cybersecurity services including VA&PT, audits, compliance, and managed security.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen pt-8">
        <div className="container max-w-7xl mx-auto px-4 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-lg text-foreground/70">
              Comprehensive security solutions tailored to protect your
              organization from evolving threats.
            </p>
          </div>
        </div>

        <div className="space-y-24 pb-20">
          {servicesData.map((category) => (
            <ServicesCategoryGrid key={category.id} category={category} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
