"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import { servicesData } from "@/lib/services-data";

gsap.registerPlugin(ScrollTrigger);

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }),
        });
      }

      // Cards
      const cards = cardsRef.current?.querySelectorAll(".svc-card");
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(cards, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-28" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Section header */}
        <div ref={headingRef} className="flex items-end justify-between mb-16 border-b border-white/8 pb-8">
          <div>
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase mb-3">
              What we offer
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Our Services
            </h2>
          </div>
          <p className="hidden md:block text-sm text-white/35 max-w-xs text-right leading-relaxed font-light">
            Comprehensive security solutions tailored to your organisation&apos;s needs.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
          {servicesData.map((cat, idx) => (
            <Link key={cat.id} href={`/services#${cat.id}`} className="svc-card block">
              <div
                className="group h-full bg-[#0a0a0a] p-8 flex flex-col justify-between gap-8 transition-colors duration-200 hover:bg-white/4"
                style={{ minHeight: 240 }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-mono text-white/25 tracking-widest">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-white/20 group-hover:text-white/60 transition-colors duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transform"
                    weight="bold"
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="inline-block px-2.5 py-1 border border-white/12 text-[10px] font-mono text-white/35 tracking-widest uppercase mb-4">
                    {cat.services.length} services
                  </div>
                  <h3 className="text-xl font-semibold text-white/85 mb-3 leading-snug group-hover:text-white transition-colors duration-200">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
