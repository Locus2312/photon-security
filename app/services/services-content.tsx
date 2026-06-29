"use client";

import Link from "next/link";
import { servicesData } from "@/lib/services-data";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { motion, Variants } from "framer-motion";

import { VaptVisual } from "@/components/services/visuals/vapt-visual";
import { MssVisual } from "@/components/services/visuals/mss-visual";
import { CloudInfraVisual } from "@/components/services/visuals/cloud-infra-visual";
import { ComplianceVisual } from "@/components/services/visuals/compliance-visual";
import { AwarenessVisual } from "@/components/services/visuals/awareness-visual";
import { SpecializedVisual } from "@/components/services/visuals/specialized-visual";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const getVisualComponent = (categoryId: string) => {
  switch (categoryId) {
    case "vapt": return <VaptVisual />;
    case "mss": return <MssVisual />;
    case "cloud-infra": return <CloudInfraVisual />;
    case "compliance": return <ComplianceVisual />;
    case "awareness": return <AwarenessVisual />;
    case "specialized": return <SpecializedVisual />;
    default: return null;
  }
};

import { useRef, useEffect } from "react";
import type { ServiceCategory } from "@/lib/types";

function ServiceCard({ category, index, isEven }: { category: ServiceCategory, index: number, isEven: boolean }) {
  const markerRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!markerRef.current || !scrollRef.current) return;
      const markerTop = markerRef.current.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const isDesktop = window.innerWidth >= 1024;

      // Calculate the distance to the next card based on CSS classes:
      // Desktop: h-[90vh] + gap (which we replaced with 50vh spacer) = 140vh
      // Mobile: h-[85vh] + gap (which we replaced with 20vh spacer) = 105vh
      const cardTotalSpace = isDesktop ? vh * 1.4 : vh * 1.05;

      // When the next card is fully covering this one, the marker is pushed up by exactly cardTotalSpace.
      // We trigger the reset when it is fully covered (markerTop < -cardTotalSpace + a small 10vh buffer)
      // or when it is pushed fully below the viewport (markerTop > vh).
      if (markerTop < -cardTotalSpace + (vh * 0.1) || markerTop > vh) {
        if (scrollRef.current.scrollTop > 0) {
          // Setting scrollTop without scroll-smooth instantly resets it invisibly
          scrollRef.current.scrollTop = 0;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <span ref={markerRef} className="block w-full h-0 pointer-events-none" />
      <div
        className="sticky top-4 md:top-8 pt-6 md:pt-14 lg:pt-20 flex flex-col lg:flex-row bg-[#f5f3ef] border border-black/5 rounded-[2rem] shadow-2xl overflow-hidden h-[85vh] lg:h-[90vh]"
      >
        {/* Image/Visual Component Side */}
        <div className={`hidden lg:flex w-full lg:w-1/2 p-2 md:p-6 items-stretch justify-center min-h-[180px] max-h-[25vh] lg:max-h-none lg:min-h-0 shrink-0 ${!isEven ? 'lg:order-2' : ''}`}>
          <div className="w-full h-full flex items-center justify-center">
            {getVisualComponent(category.id)}
          </div>
        </div>

        {/* Content Side */}
        <div
          ref={scrollRef}
          className={`w-full lg:w-1/2 p-5 md:p-10 lg:p-12 flex flex-col overflow-y-auto no-scrollbar ${!isEven ? 'lg:order-1' : ''}`}
        >
          <div className="my-auto py-2 md:py-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-black/40 font-bold mb-3 md:mb-4 shrink-0">
              Domain 0{index + 1}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight uppercase mb-4 leading-none shrink-0">
              {category.name}
            </h2>

            <p className="text-black/60 text-base md:text-lg leading-relaxed font-medium mb-8 max-w-lg shrink-0">
              {category.description}
            </p>

            <div className="flex flex-col gap-3 shrink-0">
              {category.services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group flex items-center justify-between p-3 lg:p-4 rounded-xl border border-black/5 hover:border-black/10 hover:bg-white/50 transition-all shrink-0"
                >
                  <div>
                    <h3 className="font-bold text-black text-base lg:text-lg">{service.name}</h3>
                    <p className="text-[11px] lg:text-xs text-black/50 mt-1 max-w-sm hidden md:block">{service.shortDescription}</p>
                  </div>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 shrink-0 rounded-full border border-black/10 flex items-center justify-center text-black/40 group-hover:text-white group-hover:bg-[#c85a3a] group-hover:border-[#c85a3a] transition-all">
                    <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ServicesContent() {
  return (
    <main className="relative flex flex-col min-h-screen bg-transparent selection:bg-white selection:text-black">

      {/* HERO SECTION - Dark */}
      <div className="relative z-10 bg-[#050505] text-white overflow-hidden">
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 md:px-8 py-20 pb-32">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.015] tracking-tighter pointer-events-none select-none uppercase">
            SERVICES
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-5xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/50 font-bold">
                Capabilities Matrix
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-[9vw] font-bold tracking-tighter leading-[0.95] md:leading-[0.85] mb-10 uppercase">
              BEYOND<br className="md:hidden" />{" "}
              <span className="text-white/20 italic">DEFENSE.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-white/30 max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0">
              Navigate our unified security matrix. A horizontal journey through offensive research and defensive frameworks.
            </motion.p>
          </motion.div>
        </section>
      </div>

      {/* DYNAMIC SECTIONS - Stacked Cards Array */}
      <div data-theme="light" className="relative z-20 bg-[#ede8df] text-black rounded-t-[4rem] -mt-16 pt-16 md:pt-32 pb-32 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-[#0a0a0a] selection:text-white">
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col">
          {servicesData.map((category, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={category.id} className="contents">
                {index > 0 && <div className="h-[20vh] md:h-[50vh] shrink-0" />}
                <ServiceCard category={category} index={index} isEven={isEven} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
