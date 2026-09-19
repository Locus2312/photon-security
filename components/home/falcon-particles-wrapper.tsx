"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const FalconParticles = dynamic(
  () => import("@/components/home/falcon-particles"),
  { ssr: false }
);

export function FalconParticlesWrapper() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = containerRef.current;
      if (!el) return;
      // Fade the falcon out across the first viewport of scroll so it only
      // shows behind the hero and never bleeds through the sections below.
      const vh = window.innerHeight || 1;
      const progress = Math.min(window.scrollY / (vh * 0.75), 1);
      el.style.opacity = String(0.85 * (1 - progress));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isMobile]);

  if (isMobile === null) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="particles-container"
      className="fixed top-0 left-0 w-screen h-[100lvh] z-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    >
      <FalconParticles />
    </div>
  );
}
