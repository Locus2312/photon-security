"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);


export function MarqueeCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ctaRef.current, start: "top 60%", once: true } }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-32 overflow-hidden relative" style={{ background: "#0a0a0a" }}>

      <div data-theme="light" ref={ctaRef} className="relative z-20 bg-[#ede8df] text-[#0a0a0a] rounded-t-[4rem] min-h-screen flex flex-col justify-center py-24 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] w-full opacity-0 overflow-hidden">

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

          {/* Right — Falcon Logo */}
          <div className="hidden md:flex justify-center items-center pointer-events-auto">
            <Image 
              src="/assets/falcon_no_bg_dark.png" 
              alt="Falcon Security Logo" 
              width={500} 
              height={500} 
              className="w-full max-w-[400px] h-auto object-contain opacity-90 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
