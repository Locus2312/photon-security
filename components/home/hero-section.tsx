"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ArrowRightIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import { useMagneticEffect } from "@/lib/gsap-hooks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Line1 = useRef<HTMLSpanElement>(null);
  const h1Line2 = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const magneticBtn = useMagneticEffect<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (typeof window !== "undefined" && !isMobile) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }

    const unlockScroll = () => {
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 2800);
    };

    if (typeof window !== "undefined" && !isMobile) {
      if ((window as Window & typeof globalThis & { __preloaderComplete?: boolean }).__preloaderComplete) {
        unlockScroll();
      } else {
        window.addEventListener("preloaderComplete", unlockScroll);
      }
    }

    const ctx = gsap.context(() => {
      const els = [
        badgeRef.current,
        h1Line1.current,
        h1Line2.current,
        descRef.current,
        ctaRef.current,
      ].filter(Boolean);

      gsap.set(els, { opacity: 0, y: 36 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.8");
      tl.to(h1Line1.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
      tl.to(h1Line2.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
      tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5");
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }, "-=0.5");
    }, containerRef);

    return () => {
      ctx.revert();
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
        window.removeEventListener("preloaderComplete", unlockScroll);
      }
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="container mx-auto relative z-10 flex flex-col justify-end pb-[15vh] md:pb-[20vh] h-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-sm border border-white/12 bg-white/4 w-fit">
          <ShieldCheckIcon size={13} weight="bold" className="text-white/60" />
          <span className="text-[10px] md:text-[11px] font-mono text-white/55 tracking-[0.25em] uppercase">
            Trusted by Enterprises Globally
          </span>
          <span className="relative flex h-1.5 w-1.5 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
        </div>

        {/* Headline */}
        <h1 
          className="mb-16 md:mb-24 font-bold leading-[1.05] tracking-tight max-w-[900px] md:w-[70%] lg:w-[60%]"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 100px rgba(0,0,0,1)" }}
        >
          <span ref={h1Line1} className="block text-[clamp(2.2rem,4.5vw,4.5rem)] text-white">
            Energy of a Photon,
          </span>
          <span ref={h1Line2} className="block text-[clamp(1.8rem,4vw,3.5rem)] text-white/40">
            Strength of Security.
          </span>
        </h1>

        <div className="flex flex-col gap-10 items-start mt-4 max-w-[900px] md:w-[70%] lg:w-[60%]">

          {/* Description */}
          <p 
            ref={descRef} 
            className="text-[15px] md:text-[17px] text-white/40 max-w-lg leading-relaxed font-light"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,1)" }}
          >
            Next-generation cybersecurity for enterprises globally.<br className="hidden sm:block" />
            VAPT · Compliance · Managed Security Services.
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10">
            <Link
              ref={magneticBtn}
              href="mailto:sales@photonsecurity.in"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 text-[13px] font-bold text-black bg-white rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10">Request Assessment</span>
              <ArrowRightIcon
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
        </div>

      </div>

    </section>
  );
}
