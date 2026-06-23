"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon, QuotesIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    text: "Photon Security provided actionable recommendations that significantly strengthened our security posture. Their team understood our regulated environment from day one.",
    author: "Rajesh Kumar",
    role: "CISO",
    company: "Leading Technology Firm",
    rating: 5,
  },
  {
    text: "Their offensive security expertise uncovered critical vulnerabilities our internal team had missed for years. The final report was board-ready and highly actionable.",
    author: "Priya Sharma",
    role: "Security Lead",
    company: "SaaS Startup",
    rating: 5,
  },
  {
    text: "Professional, thorough, and tailored to our industry-specific compliance requirements. The re-test process was seamless. Highly recommended for any BFSI organisation.",
    author: "Anil Desai",
    role: "VP Engineering",
    company: "Manufacturing Conglomerate",
    rating: 5,
  },
];

export function TestimonialCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [busy, setBusy] = useState(false);

  const navigate = useCallback((next: number) => {
    if (busy || !cardRef.current) return;
    setBusy(true);
    gsap.to(cardRef.current, {
      opacity: 0, y: -18, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setIdx(next);
        if (cardRef.current) {
          gsap.fromTo(cardRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", onComplete: () => setBusy(false) }
          );
        } else {
          setBusy(false);
        }
      },
    });
  }, [busy]);

  useEffect(() => {
    const id = setInterval(() => navigate((idx + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, [idx, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (revealRef.current) {
        gsap.set(revealRef.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: revealRef.current, start: "top 82%", once: true,
          onEnter: () => gsap.to(revealRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }),
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section ref={sectionRef} className="w-full py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex items-end justify-between mb-16 border-b border-white/8 pb-8">
          <div>
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">What Clients Say</h2>
          </div>
        </div>

        <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6">
          <div ref={cardRef} className="md:col-span-2 bg-black/40 backdrop-blur-sm p-10 md:p-14">
            <QuotesIcon size={32} weight="fill" className="text-white/10 mb-6" />
            <p className="text-xl md:text-2xl text-white/65 leading-relaxed font-light mb-10">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-white/8 border border-white/12 flex items-center justify-center text-sm font-bold text-white/60">
                {t.author[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-white/70">{t.author}</p>
                <p className="text-xs text-white/30 font-mono">{t.role} · {t.company}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-10 flex flex-col justify-between">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <StarIcon key={i} size={14} weight="fill" className="text-white/50" />
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-10">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`text-left text-xs font-mono tracking-wide transition-all duration-200 ${i === idx ? "text-white/70" : "text-white/20 hover:text-white/40"
                    }`}
                >
                  <span className="mr-2 text-white/15">{String(i + 1).padStart(2, "0")}</span>
                  {item.author}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {TESTIMONIALS.map((_, i) => (
                <div key={i} className="h-px bg-white/8 w-full overflow-hidden">
                  {i === idx && (
                    <div
                      className="h-full bg-white/40 animate-[slideProgress_6s_linear_forwards]"
                      key={`${i}-${idx}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
