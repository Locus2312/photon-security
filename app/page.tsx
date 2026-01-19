import { HeroSection } from "@/components/home/hero-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { IndustriesSection } from "@/components/home/industries-section";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import { FaqAccordion } from "@/components/home/faq-accordion";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        <ServicesGrid />
        <ProcessTimeline />
        <IndustriesSection />
        <TestimonialCarousel />
        <FaqAccordion />
      </main>
    </>
  );
}
