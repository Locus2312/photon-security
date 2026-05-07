"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bank,
  FirstAid,
  Code,
  Factory,
  ShieldStar,
  WifiHigh,
} from "@phosphor-icons/react";
import { useCountUp } from "@/lib/gsap-hooks";

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES = [
  { Icon: Bank,       name: "BFSI" },
  { Icon: FirstAid,   name: "Healthcare" },
  { Icon: Code,       name: "SaaS" },
  { Icon: Factory,    name: "Manufacturing" },
  { Icon: ShieldStar, name: "Government" },
  { Icon: WifiHigh,   name: "Telecom" },
];

const STATS = [
  { end: 200, suffix: "+", label: "Assessments" },
  { end: 99,  suffix: "%", label: "Client Retention" },
  { end: 50,  suffix: "+", label: "Critical CVEs" },
  { end: 12,  suffix: "+", label: "Yrs Combined Exp." },
];

function Stat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const numRef = useCountUp(end, { suffix, duration: 2 });
  return (
    <div className="text-center py-6">
      <div className="text-4xl font-bold text-white tabular-nums mb-1">
        <span ref={numRef} />
      </div>
      <p className="text-[11px] font-mono text-white/30 tracking-[0.2em] uppercase">{label}</p>
    </div>
  );
}

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: headingRef.current, start: "top 85%", once: true,
          onEnter: () => gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }),
        });
      }

      // Industry icons bounce in
      if (gridRef.current) {
        const icons = gridRef.current.querySelectorAll(".ind-item");
        if (icons?.length) {
          gsap.set(icons, { opacity: 0, scale: 0.8 });
          ScrollTrigger.create({
            trigger: gridRef.current, start: "top 80%", once: true,
            onEnter: () => gsap.to(icons, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)", stagger: 0.07 }),
          });
        }
      }

      // Stats
      if (statsRef.current) {
        gsap.set(statsRef.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: statsRef.current, start: "top 85%", once: true,
          onEnter: () => gsap.to(statsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-28" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <div ref={headingRef} className="flex items-end justify-between mb-16 border-b border-white/8 pb-8">
          <div>
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase mb-3">Sectors</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Industries We Serve</h2>
          </div>
          <p className="hidden md:block text-sm text-white/35 max-w-xs text-right leading-relaxed font-light">
            Specialised expertise across regulated and critical-infrastructure sectors.
          </p>
        </div>

        {/* Industry grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 md:grid-cols-6 gap-px bg-white/6 mb-px"
        >
          {INDUSTRIES.map(({ Icon, name }) => (
            <div key={name} className="ind-item">
              <div className="group flex flex-col items-center justify-center gap-3 py-8 px-4 bg-[#0a0a0a] hover:bg-white/4 transition-colors duration-200 cursor-default">
                <div className="w-12 h-12 rounded-sm border border-white/10 bg-white/3 flex items-center justify-center group-hover:border-white/20 transition-colors duration-200">
                  <Icon size={22} weight="light" className="text-white/45 group-hover:text-white/70 transition-colors duration-200" />
                </div>
                <span className="text-[11px] font-mono text-white/35 tracking-widest uppercase group-hover:text-white/60 transition-colors duration-200">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#0a0a0a]">
              <Stat end={s.end} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
