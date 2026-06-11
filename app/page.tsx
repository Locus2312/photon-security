import { FalconParticlesWrapper } from "@/components/home/falcon-particles-wrapper";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { IndustriesSection } from "@/components/home/industries-section";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import { MarqueeCta } from "@/components/home/marquee-cta";
import { FaqAccordion } from "@/components/home/faq-accordion";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none hidden lg:block">
        <FalconParticlesWrapper />
      </div>
      <main className="relative z-10 flex flex-col min-h-screen">
        <HeroSection />
        <ServicesGrid />
        <ProcessTimeline />
        <IndustriesSection />
        <TestimonialCarousel />
        <MarqueeCta />
        <FaqAccordion />
      </main>
    </>
  );
}
