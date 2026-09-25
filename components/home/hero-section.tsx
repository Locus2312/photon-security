"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { useMagneticEffect } from "@/lib/gsap-hooks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Line1 = useRef<HTMLSpanElement>(null);
  const h1Line2 = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const magneticBtn = useMagneticEffect<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isPreloaderComplete =
      typeof window !== "undefined" &&
      (window as Window & typeof globalThis & { __preloaderComplete?: boolean }).__preloaderComplete;

    if (typeof window !== "undefined" && !isMobile && !isPreloaderComplete) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }

    const unlockScroll = () => {
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 2000);
    };

    if (typeof window !== "undefined" && !isMobile && !isPreloaderComplete) {
      window.addEventListener("preloaderComplete", unlockScroll);
    }

    let playAnimation: () => void;

    const ctx = gsap.context((self) => {
      const els = [
        eyebrowRef.current,
        h1Line1.current,
        h1Line2.current,
        descRef.current,
        ctaRef.current,
      ].filter(Boolean);

      if (prefersReduced) {
        gsap.set(els, { opacity: 1, y: 0 });
        playAnimation = () => {};
        return;
      }

      gsap.set(els, { opacity: 0, y: 36 });

      self.add("play", () => {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.8");
        tl.to(h1Line1.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.45");
        tl.to(h1Line2.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.65");
        tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.55");
        tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }, "-=0.45");
      });

      playAnimation = () => self.play();
    }, containerRef);

    if (isPreloaderComplete) {
      playAnimation!();
    } else {
      window.addEventListener("preloaderComplete", playAnimation!, { once: true });
    }

    return () => {
      ctx.revert();
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
        window.removeEventListener("preloaderComplete", unlockScroll);
        if (playAnimation) {
          window.removeEventListener("preloaderComplete", playAnimation);
        }
      }
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Mobile legibility scrim */}
      <div className="absolute inset-0 w-full pointer-events-none z-[5] md:hidden bg-gradient-to-t from-black via-black/80 to-black/60" />

      <div className="container mx-auto relative z-10 flex flex-col justify-end pb-[10vh] md:pb-[12vh] h-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
          <span aria-hidden="true" className="h-px w-8 md:w-12 bg-gradient-to-r from-white/50 to-white/10" />
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/55">
            Photon Security
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
          <span className="hidden sm:inline font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/35">
            Trusted by Enterprises Globally
          </span>
        </div>

        {/* Headline */}
        <div className="relative mb-8 md:mb-10">
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -inset-y-6 -z-[1] pointer-events-none blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(60% 55% at 22% 45%, rgba(255,255,255,0.10), transparent 70%)",
            }}
          />
          <h1 className="font-bold leading-[1.02] tracking-[-0.02em]">
            <span
              ref={h1Line1}
              className="block whitespace-nowrap text-[clamp(2rem,4vw,4.25rem)] bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 4px 30px rgba(0,0,0,0.85))" }}
            >
              Energy of a Photon,
            </span>
            <span
              ref={h1Line2}
              className="block whitespace-nowrap text-[clamp(1.6rem,3.3vw,3.25rem)] bg-gradient-to-b from-white/55 to-white/20 bg-clip-text text-transparent"
            >
              Strength of Security.
            </span>
          </h1>
        </div>

        {/* Subcopy */}
        <p
          ref={descRef}
          className="text-[15px] md:text-[18px] text-white/55 max-w-md leading-relaxed font-light mb-10 md:mb-12"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,1)" }}
        >
          Next-generation cybersecurity for enterprises globally — offensive testing,
          compliance, and managed defense under one roof.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
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
            className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-light tracking-wide"
          >
            View Services
            <span aria-hidden="true" className="inline-block w-6 h-px bg-white/30 group-hover:w-9 group-hover:bg-white transition-all duration-300" />
          </Link>
        </div>

      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <span className="relative flex h-8 w-px overflow-hidden bg-white/10">
          <span className="absolute top-0 left-0 h-3 w-full bg-white/60 animate-scroll-hint" />
        </span>
      </div>
    </section>
  );
}
