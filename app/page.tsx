import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicesGrid } from "@/components/home/services-grid";
import { StatsStrip } from "@/components/home/stats-strip";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { IndustriesSection } from "@/components/home/industries-section";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import { CaseStudyCard } from "@/components/home/case-study-card";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { LeadCaptureBanner } from "@/components/home/lead-capture-banner";
// import { Script } from "next/script";
import { organizationSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      {/* <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      /> */}
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        <TrustBar />
        <ServicesGrid />
        <StatsStrip />
        <ProcessTimeline />
        <IndustriesSection />
        <TestimonialCarousel />
        <CaseStudyCard />
        <FaqAccordion />
        <LeadCaptureBanner />
      </main>
      <SiteFooter />
    </>
  );
}
