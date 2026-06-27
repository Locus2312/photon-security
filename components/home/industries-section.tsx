"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BankIcon, HeartbeatIcon, BracketsCurlyIcon, FactoryIcon, GavelIcon, BroadcastIcon } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COLORS = {
  obsidian: { bg: "#0a0a0a", text: "#ffffff", muted: "rgba(255,255,255,0.5)", icon: "rgba(255,255,255,0.3)", selectionClass: "selection:bg-white selection:text-black", particleColor: "#ffffff" },
  teal: { bg: "#2d6a6f", text: "#ffffff", muted: "rgba(255,255,255,0.7)", icon: "rgba(255,255,255,0.4)", selectionClass: "selection:bg-[#c85a3a] selection:text-white", particleColor: "#c85a3a" },
  coral: { bg: "#c85a3a", text: "#ffffff", muted: "rgba(255,255,255,0.8)", icon: "rgba(255,255,255,0.4)", selectionClass: "selection:bg-[#2d6a6f] selection:text-white", particleColor: "#2d6a6f" },
  ivory: { bg: "#ede8df", text: "#0a0a0a", muted: "rgba(10,10,10,0.6)", icon: "rgba(10,10,10,0.3)", selectionClass: "selection:bg-[#0a0a0a] selection:text-white", particleColor: "#0a0a0a" },
};

const INDUSTRIES = [
  {
    id: "bfsi",
    name: "BFSI",
    desc: "Next-gen threat intelligence for high-frequency trading platforms and core banking systems.",
    icon: BankIcon,
    color: COLORS.obsidian
  },
  {
    id: "healthcare",
    name: "HEALTHCARE",
    desc: "Securing PHI, medical IoT devices, and critical hospital infrastructure.",
    icon: HeartbeatIcon,
    color: COLORS.teal
  },
  {
    id: "saas",
    name: "SAAS & TECH",
    desc: "Continuous CI/CD pipeline security and multi-tenant isolation testing.",
    icon: BracketsCurlyIcon,
    color: COLORS.coral
  },
  {
    id: "manufacturing",
    name: "MANUFACTURING",
    desc: "Bridging the IT-OT gap. Securing SCADA systems and industrial control networks.",
    icon: FactoryIcon,
    color: COLORS.ivory
  },
  {
    id: "government",
    name: "GOVERNMENT",
    desc: "Nation-state level defense strategies and classified network architecture reviews.",
    icon: GavelIcon,
    color: COLORS.teal
  },
  {
    id: "telecom",
    name: "TELECOM",
    desc: "Securing 5G networks, edge computing nodes, and massive-scale signaling infrastructure.",
    icon: BroadcastIcon,
    color: COLORS.obsidian
  }
];

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>('.industry-card');

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "center center",
          pin: true,
          pinSpacing: false,
          id: `pin-${i}`,
        });

        if (i !== cards.length - 1) {
          const content = card.querySelector('.card-inner-content');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "center center",
              scrub: true,
            }
          });

          tl.to(card, { scale: 0.95 }, 0);

          if (content) {
            tl.to(content, { opacity: 0 }, 0);
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="industries-section" ref={sectionRef} className="relative w-full bg-[#111111] text-white py-32 flex flex-col items-center overflow-x-hidden">


      <div className="max-w-[1500px] w-full px-6 md:px-12 lg:px-24 mb-20 z-10 text-center relative">
        <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-4 opacity-50">
          Sectors
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.9] max-w-4xl mx-auto">
          Industries We Serve
        </h2>
      </div>

      <div className="w-full max-w-[1000px] mx-auto px-6 relative pb-10 lg:pb-[20vh] z-10">
        {INDUSTRIES.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.id}
              className={`industry-card w-full min-h-[400px] md:min-h-[500px] rounded-[3rem] p-10 md:p-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] origin-top mb-8 lg:mb-[50vh] ${ind.color.selectionClass}`}
              style={{
                backgroundColor: ind.color.bg,
                zIndex: i + 1,
              }}
            >
              <div className="card-inner-content w-full h-full flex flex-col justify-between">

                <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 opacity-30" style={{ borderColor: ind.color.text }}></div>
                <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 opacity-30" style={{ borderColor: ind.color.text }}></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 opacity-30" style={{ borderColor: ind.color.text }}></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 opacity-30" style={{ borderColor: ind.color.text }}></div>

                <div className="flex items-center justify-between mb-16 relative z-10">
                  <span
                    className="text-sm font-mono tracking-widest block"
                    style={{ color: ind.color.icon }}
                  >
                    0{i + 1}
                  </span>
                  <Icon size={64} style={{ color: ind.color.icon }} weight="thin" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-end justify-between mt-auto w-full">
                  <h3
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none uppercase tracking-tight w-full md:w-auto shrink-0"
                    style={{ color: ind.color.text }}
                  >
                    {ind.name}
                  </h3>
                  <p
                    className="text-base md:text-xl leading-relaxed font-light max-w-sm text-right self-end md:self-auto"
                    style={{ color: ind.color.muted }}
                  >
                    {ind.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
