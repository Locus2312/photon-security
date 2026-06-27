import { FalconParticlesWrapper } from "@/components/home/falcon-particles-wrapper";
import { HeroSection } from "@/components/home/hero-section";
import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/home/section-skeleton";

const ServicesGrid = dynamic(() => import("@/components/home/services-grid").then(mod => mod.ServicesGrid), { loading: () => <SectionSkeleton /> });
const ProcessTimeline = dynamic(() => import("@/components/home/process-timeline").then(mod => mod.ProcessTimeline), { loading: () => <SectionSkeleton /> });
const IndustriesSection = dynamic(() => import("@/components/home/industries-section").then(mod => mod.IndustriesSection), { loading: () => <SectionSkeleton /> });
const TestimonialCarousel = dynamic(() => import("@/components/home/testimonial-carousel").then(mod => mod.TestimonialCarousel), { loading: () => <SectionSkeleton /> });
const MarqueeCta = dynamic(() => import("@/components/home/marquee-cta").then(mod => mod.MarqueeCta), { loading: () => <SectionSkeleton /> });
const FaqAccordion = dynamic(() => import("@/components/home/faq-accordion").then(mod => mod.FaqAccordion), { loading: () => <SectionSkeleton /> });

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
