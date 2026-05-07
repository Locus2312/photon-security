"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "@phosphor-icons/react";

const ITEMS = [
  "VAPT", "Penetration Testing", "Cloud Security", "Compliance Advisory",
  "Red Team", "Application Security", "Network Security", "CERT-In",
  "DPDP Act", "RBI Guidelines", "SEBI Compliance", "ISO 27001",
];

export function MarqueeCta() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const eagleRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfW = track.scrollWidth / 2;
    const anim = gsap.to(track, { x: `-${halfW}px`, duration: 35, ease: "none", repeat: -1 });

    const wrap = track.parentElement;
    const pause = () => anim.pause();
    const play  = () => anim.play();
    wrap?.addEventListener("mouseenter", pause);
    wrap?.addEventListener("mouseleave", play);

    // Eagle parallax / float
    if (eagleRef.current) {
      gsap.to(eagleRef.current, { y: -20, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true });
    }

    // CTA reveal
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && ctaRef.current) {
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => {
      anim.kill();
      wrap?.removeEventListener("mouseenter", pause);
      wrap?.removeEventListener("mouseleave", play);
      obs.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-28 overflow-hidden relative" style={{ background: "#0a0a0a" }}>
      {/* Top rule */}
      <div className="w-full h-px bg-white/6 mb-20" />

      {/* Marquee */}
      <div className="overflow-hidden mb-24 cursor-default select-none">
        <div ref={trackRef} className="flex items-center gap-14 whitespace-nowrap will-change-transform">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-14 flex-shrink-0">
              <span className="text-base font-mono text-white/20 hover:text-white/50 transition-colors duration-200 tracking-widest uppercase">
                {item}
              </span>
              <span className="text-white/8 text-xs">—</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA block */}
      <div ref={ctaRef} className="relative max-w-7xl mx-auto px-8 lg:px-12 pb-28 opacity-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase mb-6">
              Get Started
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
              Secure your
              <br />
              enterprise today.
            </h2>
            <Link
              href="mailto:sales@photonsecurity.in"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-semibold rounded-sm hover:bg-white/90 transition-colors"
            >
              Request an Assessment
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right — eagle image */}
          <div
            ref={eagleRef}
            className="hidden md:flex items-center justify-center"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/assets/eagle_no_bg.png"
              alt="Photon Security"
              width={360}
              height={360}
              className="rounded-sm"
              style={{ filter: "brightness(0.85) contrast(1.1)" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="w-full h-px bg-white/6" />
    </section>
  );
}
