"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ShieldCheck } from "@phosphor-icons/react";
import { useMagneticEffect } from "@/lib/gsap-hooks";

const ThreeHero = dynamic(() => import("@/components/home/three-hero"), {
  ssr: false,
});

const STATS = [
  { value: "200+", label: "Assessments" },
  { value: "99%", label: "Retention" },
  { value: "50+", label: "CVEs Disclosed" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Line1 = useRef<HTMLSpanElement>(null);
  const h1Line2 = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const magneticBtn = useMagneticEffect<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [
        badgeRef.current,
        h1Line1.current,
        h1Line2.current,
        descRef.current,
        ctaRef.current,
        statsRef.current,
      ].filter(Boolean);
      gsap.set(els, { opacity: 0, y: 36 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(
        badgeRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.8",
      );
      tl.to(
        h1Line1.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      );
      tl.to(
        h1Line2.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      );
      tl.to(
        descRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5",
      );
      tl.to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" },
        "-=0.5",
      );
      tl.to(
        statsRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Particle bg */}
      <div className="absolute inset-0 opacity-40">
        <Suspense fallback={null}>
          <ThreeHero />
        </Suspense>
      </div>

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 lg:px-32 py-20 flex flex-col items-start justify-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-sm border border-white/12 bg-white/4"
        >
          <ShieldCheck size={13} weight="bold" className="text-white/60" />
          <span className="text-[10px] md:text-[11px] font-mono text-white/55 tracking-[0.25em] uppercase">
            Trusted by Indian Enterprises
          </span>
          <span className="relative flex h-1.5 w-1.5 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-8 font-bold leading-[1.04] tracking-tight">
          <span
            ref={h1Line1}
            className="block text-[clamp(2.5rem,8vw,5.5rem)] text-white"
          >
            Energy of a Photon,
          </span>
          <span
            ref={h1Line2}
            className="block text-[clamp(2.5rem,8vw,4.5rem)] text-white/40"
          >
            Strength of Security
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-[14px] md:text-[15px] text-white/40 max-w-md leading-relaxed mb-10 font-light"
        >
          Next-generation cybersecurity for Indian enterprises.
          <br className="hidden sm:block" />
          VAPT · Compliance · Managed Security Services.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10 mb-16">
          <Link
            ref={magneticBtn}
            href="mailto:sales@photonsecurity.in"
            className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 text-[13px] font-bold text-black bg-white rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />

            <span className="relative z-10">Request Assessment</span>
            <ArrowRight
              size={18}
              weight="bold"
              className="relative z-10 transition-transform duration-500 group-hover:translate-x-1.5"
            />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors font-light tracking-wide px-2"
          >
            View Services
          </Link>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 sm:flex items-center gap-8 md:gap-16">
          {STATS.map((s, i) => (
            <div key={i} className="text-left">
              <div className="text-xl md:text-2xl font-bold text-white tabular-nums tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase mt-1 font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/6" />
    </section>
  );
}
