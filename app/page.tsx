import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicesGrid } from "@/components/home/services-grid";
// import { StatsStrip } from "@/components/home/stats-strip";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { IndustriesSection } from "@/components/home/industries-section";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
// import { CaseStudyCard } from "@/components/home/case-study-card";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { LeadCaptureBanner } from "@/components/home/lead-capture-banner";
import { organizationSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        {/* <TrustBar /> */}
        <ServicesGrid />
        <ProcessTimeline />
        <IndustriesSection />
        <TestimonialCarousel />
        <FaqAccordion />
        <LeadCaptureBanner />
      </main>
    </>
  );
}
