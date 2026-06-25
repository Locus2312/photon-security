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
      <div id="particles-container" className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <FalconParticlesWrapper />
      </div>
      <main className="relative flex flex-col min-h-screen bg-transparent">

        <div className="relative z-10">
          <HeroSection />
          <ServicesGrid />
          {/* Spacer to absorb the overlapping -mt-16 of the next section without leaving a transparent gap */}
          <div className="w-full h-16 bg-[#050505]"></div>
        </div>

        <div className="relative z-20 bg-[#ede8df] rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <ProcessTimeline />
        </div>

        <div className="relative z-30 bg-[#111111] rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <IndustriesSection />
        </div>

        <div className="relative z-40 bg-background rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <TestimonialCarousel />
          <MarqueeCta />
          <FaqAccordion />
        </div>

      </main>
    </>
  );
}
