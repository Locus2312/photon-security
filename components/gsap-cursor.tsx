"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function GsapCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const isFinePointer = !window.matchMedia("(pointer: coarse)").matches;
    const isLargeScreen = window.innerWidth >= 1024;
    if (!isFinePointer || !isLargeScreen) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { display: "block" });

    document.body.style.cursor = "none";

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.set(dot, { x: mouse.x - 3, y: mouse.y - 3 });
    };

    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;
      gsap.set(ring, { x: ringPos.x - 16, y: ringPos.y - 16 });
      raf = requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener("mousemove", onMove);

    const expand = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.25, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const contract = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        expand();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        contract();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(dot, { scale: 1, duration: 0.2 });
  }, [pathname]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[99999]"
        style={{ willChange: "transform", display: "none", mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[99998]"
        style={{ willChange: "transform", display: "none", mixBlendMode: "difference" }}
      />
    </>
  );
}
