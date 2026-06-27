"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { servicesData } from "@/lib/services-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTION_COLORS = [
  { bg: "#050505cc", theme: "from-white/10 to-transparent" },
  { bg: "#061012cc", theme: "from-teal-500/10 to-transparent" },
  { bg: "#0f0805cc", theme: "from-orange-500/10 to-transparent" },
  { bg: "#080b0ecc", theme: "from-blue-500/10 to-transparent" },
  { bg: "#050805cc", theme: "from-green-500/10 to-transparent" },
  { bg: "#08050acc", theme: "from-purple-500/10 to-transparent" },
];

export function ServicesGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const leftVisualRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const visualsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#hero-section", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0,
        ease: "none",
      });

      const sections = gsap.utils.toArray(".service-scroll-section") as HTMLElement[];
      const totalSections = sections.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (window.innerWidth >= 768) {
            gsap.to("#particles-container", { opacity: 0.1, duration: 0.5 });
          }
        },
        onLeave: () => {
          if (window.innerWidth >= 768) {
            gsap.to("#particles-container", { opacity: 0.85, duration: 0.5 });
          }
        },
        onEnterBack: () => {
          if (window.innerWidth >= 768) {
            gsap.to("#particles-container", { opacity: 0.1, duration: 0.5 });
          }
        },
        onLeaveBack: () => {
          if (window.innerWidth >= 768) {
            gsap.to("#particles-container", { opacity: 0.85, duration: 0.5 });
          }
        },
      });

      let currentActive = -2;

      function activateVisual(visualIndex: number) {
        if (visualIndex === currentActive) return;
        currentActive = visualIndex;

        const colorIndex = visualIndex;
        let targetBg = SECTION_COLORS[colorIndex].bg;

        if (window.innerWidth < 768) {
          targetBg = targetBg.slice(0, 7) + "66";
        }

        gsap.to(containerRef.current, {
          backgroundColor: targetBg,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });

        visualsRef.current.forEach((visual) => {
          if (!visual) return;
          const targetIndex = Number(visual.dataset.index);
          if (targetIndex === visualIndex) {
            gsap.to(visual, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          } else {
            gsap.to(visual, { autoAlpha: 0, scale: 0.95, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          }
        });
      }

      activateVisual(0);

      sections.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top center",
          end: "bottom center",
          onEnter: () => activateVisual(i),
          onEnterBack: () => activateVisual(i),
        });

        // Content reveal animation
        const contentElements = sec.querySelectorAll(".content-reveal");
        if (contentElements.length) {
          gsap.fromTo(
            contentElements,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services-grid" ref={containerRef} className="relative w-full z-10 transition-colors duration-500 border-t border-white/10" style={{ backgroundColor: SECTION_COLORS[0].bg }}>
      <div className="max-w-[1600px] mx-auto w-full lg:flex relative items-start">

        {/* Mobile Static Header */}
        <div className="lg:hidden relative pt-16 px-6 z-30 pointer-events-none">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2 opacity-50 font-bold text-white">
            Our Focus
          </p>
          <h2 className="text-3xl font-bold tracking-tighter uppercase leading-[0.9] text-white drop-shadow-md">
            Services We Offer.
          </h2>
        </div>

        {/* Mobile Dynamic Gradients */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="sticky top-0 w-full h-[100dvh]">
            {servicesData.map((cat, i) => (
              <div
                key={`visual-mobile-${cat.id}`}
                ref={el => { visualsRef.current[servicesData.length + i] = el; }}
                data-index={i}
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${SECTION_COLORS[i].theme} mix-blend-screen blur-[80px] opacity-70`} />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={leftVisualRef}
          className="hidden lg:flex w-1/2 sticky top-0 h-screen flex-col items-center justify-center"
        >
          {/* Static Header */}
          <div className="absolute top-24 left-12 xl:left-20 z-20">
            <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-4 opacity-50 font-bold text-white">
              Our Focus
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9] text-white drop-shadow-md">
              Services We Offer.
            </h2>
          </div>

          {servicesData.map((cat, i) => (
            <div
              key={`visual-${cat.id}`}
              ref={el => { visualsRef.current[i] = el; }}
              data-index={i}
              className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${SECTION_COLORS[i].theme} mix-blend-screen pointer-events-none blur-3xl`} />

              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                <span className="text-[25vw] font-black leading-none tracking-tighter text-white/5 font-mono select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-4xl xl:text-6xl font-black uppercase tracking-tighter text-white text-center px-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] drop-shadow-2xl">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scrollable Column (moves up naturally via scroll) */}
        <div className="w-full lg:w-1/2 relative">
          <div ref={rightContentRef} className="w-full flex flex-col">

            {/* Service Blocks */}
            {servicesData.map((cat, i) => (
              <div
                key={cat.id}
                className="service-scroll-section min-h-screen lg:h-screen w-full px-6 md:px-12 lg:px-20 flex flex-col justify-center pt-32 pb-16 lg:pt-0 lg:pb-0 border-t border-white/10 lg:border-none"
              >
                <div className="flex flex-col items-start gap-2 mb-8 lg:hidden content-reveal opacity-0">
                  <span className="text-5xl font-black text-white/10 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                    {cat.name}
                  </h3>
                </div>

                <p className="service-desc content-reveal opacity-0 text-lg md:text-xl leading-relaxed text-white/70 mb-6 max-w-2xl">
                  {cat.description}
                </p>

                <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                  {cat.services.map(s => (
                    <div key={s.id} className="service-item content-reveal opacity-0 flex flex-col gap-1 group cursor-default">
                      <div className="flex items-start justify-between gap-4">
                        <strong className="font-bold tracking-wide uppercase text-sm text-white group-hover:text-white transition-colors border-b border-transparent group-hover:border-white/30 pb-1 inline-block">
                          {s.name}
                        </strong>
                      </div>
                      <span className="text-white/50 text-sm leading-relaxed">
                        {s.shortDescription}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 service-link content-reveal opacity-0">
                  <Link
                    href={`/services#${cat.id}`}
                    className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors group"
                  >
                    Explore {cat.name}
                    <ArrowUpRightIcon size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
