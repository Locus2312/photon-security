"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export function GsapPreloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      // Animate counter
      const obj = { value: 0 };
      tl.to(
        obj,
        {
          value: 100,
          duration: 2.4,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.floor(obj.value)),
        },
        0,
      );

      // Progress bar
      tl.fromTo(
        barRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 2.4, ease: "power2.inOut" },
        0,
      );

      // Fade in logo
      tl.from(
        logoRef.current,
        { opacity: 0, scale: 0.92, duration: 0.8, ease: "power3.out" },
        0.2,
      );
      tl.from(
        labelRef.current,
        { opacity: 0, y: 10, duration: 0.6, ease: "power3.out" },
        0.5,
      );

      // Panels slide out
      tl.to(
        topPanelRef.current,
        { yPercent: -100, duration: 1, ease: "power4.inOut" },
        2.5,
      );
      tl.to(
        bottomPanelRef.current,
        { yPercent: 100, duration: 1, ease: "power4.inOut" },
        2.5,
      );
      tl.to(
        overlayRef.current,
        { opacity: 0, pointerEvents: "none", duration: 0.2 },
        3.4,
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999]"
      style={{ pointerEvents: "all" }}
    >
      {/* Top panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 flex flex-col items-center justify-end pb-10"
        style={{ background: "#0a0a0a", willChange: "transform" }}
      >
        <div ref={logoRef} className="flex flex-col items-center gap-4">
          <Image
            src="/assets/falcon_no_bg.png"
            alt="Photon Security"
            width={80}
            height={80}
            className="rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col items-start justify-start pt-8 px-10"
        style={{ background: "#0a0a0a", willChange: "transform" }}
      >
        {/* Progress bar */}
        <div className="w-full h-px bg-white/10 mb-6 overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-white/50"
            style={{ transformOrigin: "left center" }}
          />
        </div>

        <div className="w-full flex items-end justify-between">
          <div
            ref={counterRef}
            className="font-mono text-7xl font-bold text-white tabular-nums leading-none"
          >
            {String(count).padStart(3, "0")}
          </div>
          <div
            ref={labelRef}
            className="text-xs font-mono text-white/30 tracking-[0.3em] uppercase mb-3"
          >
            Loading
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/8 -translate-y-1/2" />
    </div>
  );
}
