import { ServicesCategoryGrid } from "@/components/services/services-category-grid";
import { PageHero } from "@/components/layout/page-hero";
import { servicesData } from "@/lib/services-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Photon Security",
  description:
    "Our comprehensive cybersecurity services including VA&PT, audits, compliance, and managed security.",
  alternates: {
    canonical: `https://www.photonsecurity.in/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <PageHero
          title="Our Services"
          description="Comprehensive security solutions tailored to protect your organization from evolving threats."
        />

        <div className="space-y-24 pb-20">
          {servicesData.map((category) => (
            <section id={category.id} key={category.id}>
              <ServicesCategoryGrid category={category} />
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
