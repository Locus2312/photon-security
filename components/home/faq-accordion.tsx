"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlusIcon } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    q: "What is the typical engagement timeline?",
    a: "Timelines vary based on scope. Most VAPT engagements range from 2–6 weeks, while compliance audits typically take 4–8 weeks. We provide a detailed project plan during the discovery phase.",
  },
  {
    q: "Do you provide remediation support?",
    a: "Yes. We provide detailed remediation guidance, implementation support, and re-testing to ensure all identified vulnerabilities are properly resolved before the engagement closes.",
  },
  {
    q: "Are you CERT-In empanelled?",
    a: "We offer CERT-In guidelines compliance advisory and readiness assessments, aligning all engagements with CERT-In frameworks, the DPDP Act, and applicable Indian regulatory requirements.",
  },
  {
    q: "What deliverables can we expect?",
    a: "Each engagement produces a comprehensive PDF report with findings, severity ratings (CVSS-scored), detailed remediation guidance, an executive summary, and a re-test certificate upon completion.",
  },
  {
    q: "Do you serve Indian enterprises only?",
    a: "We specialise in the Indian market and understand RBI, SEBI, CERT-In, and local regulatory nuances. We also serve global enterprises with significant India operations.",
  },
];

function FaqItem({
  faq, idx, open, onToggle,
}: {
  faq: { q: string; a: string };
  idx: number;
  open: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    // Accordion expand/collapse
    if (open) {
      gsap.set(el, { height: "auto", opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.4, ease: "power3.inOut" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power3.inOut" });
    }

    // Icon rotate
    gsap.to(iconRef.current, { rotate: open ? 45 : 0, duration: 0.3, ease: "power3.inOut" });

    // Border highlight
    gsap.to(wrapperRef.current, { borderColor: open ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.05)", duration: 0.3 });

  }, [open]);

  return (
    <div ref={wrapperRef} className="faq-card w-full border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left gap-6 group"
      >
        <div className="flex items-center gap-6">
          <span className="text-[12px] font-mono text-white/30 hidden sm:block">{String(idx + 1).padStart(2, "0")}</span>
          <span className="text-base md:text-lg text-white/80 group-hover:text-white transition-colors duration-200 font-medium tracking-tight">
            {faq.q}
          </span>
        </div>
        <div ref={iconRef} className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
          <PlusIcon size={14} weight="bold" className="text-white/70" />
        </div>
      </button>
      <div ref={bodyRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <p className="px-6 md:px-8 pb-6 md:pb-8 text-sm md:text-base text-white/50 leading-relaxed font-light sm:ml-12">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export function FaqAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {

      // Responsive stagger and scroll triggers
      mm.add("(min-width: 1024px)", () => { // Desktop layout
        // Sticky Header Fade
        gsap.fromTo(headingContainerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }
          }
        );

        // Stagger Cards
        const cards = listRef.current?.querySelectorAll(".faq-card");
        if (cards?.length) {
          gsap.fromTo(cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
              scrollTrigger: { trigger: listRef.current, start: "top 75%", once: true }
            }
          );
        }
      });

      mm.add("(max-width: 1023px)", () => { // Mobile & Tablet
        gsap.fromTo(headingContainerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true }
          }
        );

        const cards = listRef.current?.querySelectorAll(".faq-card");
        if (cards?.length) {
          gsap.fromTo(cards,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05,
              scrollTrigger: { trigger: listRef.current, start: "top 85%", once: true }
            }
          );
        }
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 lg:py-40 relative z-30 rounded-t-[3rem] md:rounded-t-[4rem] -mt-16 pt-32 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]" style={{ background: "#060606" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column - Sticky Heading */}
          <div className="lg:col-span-5 relative">
            <div ref={headingContainerRef} className="lg:sticky lg:top-40">
              <p className="text-[11px] md:text-xs font-mono text-white/30 tracking-[0.3em] uppercase mb-4">Support & FAQ</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tighter uppercase mb-6">
                Frequently<br />Asked.
              </h2>
              <p className="text-base md:text-lg text-white/40 leading-relaxed font-light max-w-md">
                Common questions regarding our engagement model, execution methodologies, and compliance delivery.
              </p>
            </div>
          </div>

          {/* Right Column - FAQ List */}
          <div ref={listRef} className="lg:col-span-7">
            <div className="flex flex-col">
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={i} faq={faq} idx={i}
                  open={openIdx === i}
                  onToggle={() => setOpen(openIdx === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
