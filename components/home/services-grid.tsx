"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { servicesData } from "@/lib/services-data";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!scrollWrapperRef.current || !trackRef.current) return;

      const track = trackRef.current;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      gsap.to("#hero-section", {
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0,
        ease: "none",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full z-10 bg-transparent">
      <div
        ref={scrollWrapperRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-center"
      >

        {/* Title Block (Fixed during pin) */}
        <div className="absolute top-16 md:top-24 left-6 md:left-12 lg:left-24 z-20 pointer-events-none">
          <p className="text-[11px] font-mono text-white/40 tracking-[0.3em] uppercase mb-4">What we offer</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tighter drop-shadow-2xl uppercase">
            Services
          </h2>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex gap-8 md:gap-16 items-center px-6 md:px-24 h-full pt-32 md:pt-40 w-max"
        >
          {servicesData.map((cat, i) => {
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="w-[85vw] md:w-[600px] h-auto min-h-[500px] shrink-0 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 flex flex-col justify-between shadow-2xl group"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <span className="text-2xl md:text-4xl font-mono text-white/20 tracking-tighter">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/services#${cat.id}`}
                    className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300 shrink-0"
                  >
                    <ArrowUpRightIcon size={24} weight="bold" />
                  </Link>
                </div>

                <div className="flex-grow">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-6">
                    {cat.name}
                  </h3>
                  <p className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-md font-light">
                    {cat.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {cat.services.slice(0, 3).map(s => (
                    <span
                      key={s.id}
                      className="px-3 md:px-4 py-2 border border-white/10 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50"
                    >
                      {s.name}
                    </span>
                  ))}
                  {cat.services.length > 3 && (
                    <span className="px-3 md:px-4 py-2 bg-white/5 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/30">
                      +{cat.services.length - 3} more
                    </span>
                  )}
                </div>

              </motion.div>
            );
          })}

          {/* End CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: servicesData.length * 0.1 }}
            className="w-[85vw] md:w-[600px] h-[500px] shrink-0 bg-white rounded-[3rem] p-8 md:p-12 flex flex-col justify-center items-center shadow-2xl text-black"
          >
            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8 text-center leading-[0.9]">
              Ready to secure<br />your future?
            </h3>
            <Link
              href="mailto:sales@photonsecurity.in"
              className="px-10 py-5 bg-black text-white rounded-full font-mono uppercase tracking-widest text-sm font-bold hover:scale-105 transition-transform"
            >
              Contact Us
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
