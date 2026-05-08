"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { height: "auto", opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.38, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
    gsap.to(iconRef.current, { rotate: open ? 45 : 0, duration: 0.25, ease: "power2.out" });
  }, [open]);

  return (
    <div className="faq-item border-b border-white/6 last:border-0" style={{ overflow: "hidden" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left gap-6 group"
      >
        <div className="flex items-center gap-5">
          <span className="text-[11px] font-mono text-white/20">{String(idx + 1).padStart(2, "0")}</span>
          <span className="text-[15px] text-white/65 group-hover:text-white/85 transition-colors duration-200 font-light">
            {faq.q}
          </span>
        </div>
        <div ref={iconRef} className="flex-shrink-0 w-7 h-7 border border-white/12 flex items-center justify-center rounded-sm">
          <Plus size={13} weight="bold" className="text-white/40" />
        </div>
      </button>
      <div ref={bodyRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <p className="pb-6 pl-10 md:pl-16 text-sm text-white/35 leading-relaxed font-light">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export function FaqAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const [openIdx, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: headingRef.current, start: "top 85%", once: true,
        onEnter: () => gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }),
      });

      const items = listRef.current?.querySelectorAll(".faq-item");
      if (items?.length) {
        gsap.set(items, { opacity: 0, x: -20 });
        ScrollTrigger.create({
          trigger: listRef.current, start: "top 82%", once: true,
          onEnter: () => gsap.to(items, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.07 }),
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-28" style={{ background: "#060606" }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/8 pb-8">
          <div>
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase mb-3">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Frequently Asked</h2>
          </div>
          <p className="hidden md:block text-sm text-white/35 max-w-xs text-right leading-relaxed font-light">
            Common questions about our methodology and engagement model.
          </p>
        </div>

        <div ref={listRef} className="max-w-3xl">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i} faq={faq} idx={i}
              open={openIdx === i}
              onToggle={() => setOpen(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
