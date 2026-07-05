"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  obsidian: { bg: "#0a0a0a", text: "#ffffff", muted: "rgba(255,255,255,0.5)", num: "rgba(255,255,255,0.2)" },
  teal: { bg: "#2d6a6f", text: "#ffffff", muted: "rgba(255,255,255,0.7)", num: "rgba(255,255,255,0.3)" },
  coral: { bg: "#c85a3a", text: "#ffffff", muted: "rgba(255,255,255,0.8)", num: "rgba(255,255,255,0.3)" },
  ivory: { bg: "#ffffff", text: "#0a0a0a", muted: "rgba(10,10,10,0.6)", num: "rgba(10,10,10,0.2)" },
};

const STEPS = [
  {
    num: "01",
    title: "DISCOVERY & ENUMERATION",
    desc: "Map your environment, attack surface, and business-critical assets through structured interviews and technical enumeration.",
    color: COLORS.obsidian,
  },
  {
    num: "02",
    title: "VULNERABILITY ASSESSMENT",
    desc: "Execute comprehensive security testing using industry-standard methodologies like PTES, OWASP, NIST, and custom research.",
    color: COLORS.teal,
  },
  {
    num: "03",
    title: "REMEDIATION STRATEGY",
    desc: "Deliver severity-prioritised findings with step-by-step remediation guidance and dedicated developer support.",
    color: COLORS.coral,
  },
  {
    num: "04",
    title: "RETEST & CERTIFICATION",
    desc: "Verify all fixes, issue compliance certificates, and deliver a board-ready final report with executive summary.",
    color: COLORS.ivory,
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".timeline-card");
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-we-work" data-theme="light" className="relative w-full min-h-screen bg-[#ede8df] text-[#0a0a0a] flex flex-col justify-between pt-32">
      {/* Top Header Section */}
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-24 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16 h-full items-center">
          <div>
            <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-6 opacity-50 font-bold">
              Our Methodology
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">
              Methodology.<br />
              Zero Friction.
            </h2>
          </div>
          <div className="flex flex-col justify-end h-full max-w-lg md:ml-auto">
            <hr className="border-[#0a0a0a]/10 mb-8" />
            <p className="text-lg leading-relaxed opacity-80">
              A proven four-phase approach that delivers actionable security outcomes. We integrate directly with your engineering workflows to secure code at the speed of modern deployment.
            </p>

            <div className="mt-12">
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-[#0a0a0a] text-white rounded-full font-mono uppercase tracking-widest text-sm font-bold hover:scale-105 transition-transform shadow-xl"
              >
                Learn More
                <ArrowRightIcon
                  size={20}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Edge-to-Edge Cards */}
      <div ref={cardsRef} className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:rounded-t-[2rem] overflow-hidden">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="timeline-card opacity-0 p-10 lg:p-12 xl:p-16 flex flex-col justify-between min-h-[400px] xl:min-h-[500px]"
            style={{ backgroundColor: step.color.bg }}
          >
            <div className="flex flex-col h-full">
              <h3
                className="text-3xl md:text-4xl lg:text-3xl font-bold mb-12 uppercase tracking-tighter leading-[1.1]"
                style={{ color: step.color.text }}
              >
                {step.title}
              </h3>

              <div
                className="flex-1 flex items-center justify-center text-[10rem] font-bold tracking-tighter leading-none select-none opacity-40 overflow-hidden"
                style={{ color: step.color.num }}
              >
                {step.num}
              </div>
            </div>

            <div className="mt-12 flex items-end justify-between">
              <p
                className="text-sm font-mono tracking-wider max-w-[250px] leading-relaxed uppercase"
                style={{ color: step.color.muted }}
              >
                {step.desc}
              </p>
              <span className="text-sm font-mono tracking-widest opacity-50 block ml-4 shrink-0" style={{ color: step.color.text }}>
                {step.num} / 04
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}