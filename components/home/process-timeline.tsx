"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MagnifyingGlass,
  ClipboardText,
  Wrench,
  CheckCircle,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Map your environment, attack surface, and business-critical assets through structured interviews and technical enumeration.",
    Icon: MagnifyingGlass,
  },
  {
    num: "02",
    title: "Assessment",
    desc: "Execute comprehensive security testing using industry-standard methodologies: PTES, OWASP, NIST, and custom research.",
    Icon: ClipboardText,
  },
  {
    num: "03",
    title: "Remediation",
    desc: "Deliver severity-prioritised findings with step-by-step remediation guidance and implementation support.",
    Icon: Wrench,
  },
  {
    num: "04",
    title: "Retest & Report",
    desc: "Verify all fixes, issue re-test certificates, and deliver a board-ready final report with executive summary.",
    Icon: CheckCircle,
  },
];

export function ProcessTimeline() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const stepsRef    = useRef<HTMLDivElement>(null);

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

      // Animate connecting line
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: stepsRef.current,
          start: "top 75%",
          once: true,
          onEnter: () =>
            gsap.to(lineRef.current, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }),
        });
      }

      // Cards
      const cards = stepsRef.current?.querySelectorAll(".step-card");
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: stepsRef.current,
          start: "top 78%",
          once: true,
          onEnter: () =>
            gsap.to(cards, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-28" style={{ background: "#060606" }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <div ref={headingRef} className="flex items-end justify-between mb-20 border-b border-white/8 pb-8">
          <div>
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase mb-3">
              Methodology
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              How We Work
            </h2>
          </div>
          <p className="hidden md:block text-sm text-white/35 max-w-xs text-right leading-relaxed font-light">
            A proven four-phase approach that delivers actionable security outcomes.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[28px] right-[calc(25%-52px)] h-px bg-white/8">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-white/20"
              style={{ transformOrigin: "left center" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step) => {
              const Icon = step.Icon;
              return (
                <div key={step.num} className="step-card">
                  {/* Step dot with icon */}
                  <div className="flex flex-col items-center md:items-start mb-6">
                    <div className="w-14 h-14 rounded-sm border border-white/12 bg-white/4 flex items-center justify-center mb-4 group-hover:bg-white/8">
                      <Icon size={22} weight="light" className="text-white/60" />
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-white/25 tracking-widest mb-2">
                    {step.num}
                  </p>
                  <h3 className="text-lg font-semibold text-white/85 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
