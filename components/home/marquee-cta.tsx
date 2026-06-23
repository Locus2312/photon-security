"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);
import { FalconStaticParticlesWrapper } from "@/components/home/falcon-static-particles-wrapper";

const ITEMS = [
  "VAPT", "Penetration Testing", "Cloud Security", "Compliance Advisory",
  "Red Team", "Application Security", "Network Security", "CERT-In",
  "DPDP Act", "RBI Guidelines", "SEBI Compliance", "ISO 27001",
];

export function MarqueeCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const falconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfW = track.scrollWidth / 2;
    const anim = gsap.to(track, { x: `-${halfW}px`, duration: 35, ease: "none", repeat: -1 });

    const wrap = track.parentElement;
    const pause = () => anim.pause();
    const play = () => anim.play();
    wrap?.addEventListener("mouseenter", pause);
    wrap?.addEventListener("mouseleave", play);

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ctaRef.current, start: "top 60%", once: true } });
      }
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: isMobile ? "top 80%" : "top top",
        end: isMobile ? "+=10" : "+=3000",
        pin: !isMobile,
        scrub: true,
        onUpdate: (self) => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("scrub-turmoil", { detail: self.progress }));
          }
        }
      });
    }, sectionRef);

    return () => {
      anim.kill();
      wrap?.removeEventListener("mouseenter", pause);
      wrap?.removeEventListener("mouseleave", play);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-32 overflow-hidden relative" style={{ background: "#0a0a0a" }}>
      {/* Marquee */}
      <div className="overflow-hidden mb-32 cursor-default select-none">
        <div ref={trackRef} className="flex items-center gap-6 whitespace-nowrap will-change-transform px-6">
          {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <span className="px-6 md:px-8 py-3 md:py-4 border border-white/10 rounded-full text-xs md:text-sm font-mono text-white/40 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 tracking-widest uppercase shadow-sm">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div data-theme="light" ref={ctaRef} className="relative z-20 bg-[#ede8df] text-[#0a0a0a] rounded-t-[4rem] min-h-screen flex flex-col justify-center py-24 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] w-full opacity-0 overflow-hidden">

        <div className="absolute inset-0 z-0" style={{ willChange: "transform" }} ref={falconRef}>
          <FalconStaticParticlesWrapper />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center pointer-events-none">
          {/* Left — text */}
          <div className="pointer-events-auto">
            <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-8 opacity-50 font-bold">
              Get Started
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-12">
              Secure your<br />enterprise<br />today.
            </h2>
            <Link
              href="mailto:sales@photonsecurity.in"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-[#0a0a0a] text-white rounded-full font-mono uppercase tracking-widest text-sm font-bold hover:scale-105 transition-transform shadow-xl"
            >
              Request an Assessment
              <ArrowRightIcon
                size={20}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>
          </div>

          {/* Right — Empty placeholder for grid layout */}
          <div className="hidden md:block"></div>
        </div>
      </div>
    </section>
  );
}
