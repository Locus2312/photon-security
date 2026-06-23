"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "@/lib/services-data";
import {
  ShieldCheckIcon,
  EyeIcon,
  CloudIcon,
  ClipboardTextIcon,
  UsersIcon,
  TargetIcon,
  ArrowRightIcon,
  FingerprintIcon,
  Icon as IconType,
} from "@phosphor-icons/react";
import { useMagneticEffect } from "@/lib/gsap-hooks";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, IconType> = {
  vapt: ShieldCheckIcon,
  mss: EyeIcon,
  "cloudIcon-infra": CloudIcon,
  compliance: ClipboardTextIcon,
  awareness: UsersIcon,
  specialized: TargetIcon,
};

interface ServiceProps {
  id: string;
  name: string;
  shortDescription: string;
}

function ServiceCard({ service, index }: { service: ServiceProps; index: number }) {
  const cardRef = useMagneticEffect<HTMLDivElement>(0.15);

  return (
    <div
      ref={cardRef}
      className="service-card group w-[300px] md:w-[450px] h-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all duration-500 rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

      <div>
        <div className="text-[10px] font-mono text-white/20 mb-6 md:mb-10 tracking-[0.2em] uppercase">
          Protocol_0{index + 1}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white/80 group-hover:text-white transition-colors mb-4 md:mb-6 leading-tight tracking-tight">
          {service.name}
        </h3>
        <p className="text-sm md:text-base text-white/30 leading-relaxed group-hover:text-white/50 transition-colors font-light">
          {service.shortDescription}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1 h-5 bg-white/10 rounded-full group-hover:bg-white/40 transition-all duration-500"
              />
            ))}
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
            <ArrowRightIcon
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500 transition-colors" />
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/10 group-hover:text-white/30">
            Active_Intelligence
          </span>
        </div>
      </div>

      {/* Grainy Noise Overlay on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

export function HorizontalServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useMagneticEffect<HTMLAnchorElement>(0.3);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const timeout = setTimeout(() => {
      gsap.context(() => {
        const horizontalSection = horizontalRef.current;
        if (!horizontalSection) return;

        const totalWidth = horizontalSection.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollDistance = totalWidth - windowWidth;

        gsap.set(containerRef.current, { height: "100vh" });

        gsap.to(horizontalSection, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>(".bg-label").forEach((label) => {
          gsap.to(label, {
            x: -200,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              scrub: true,
            }
          });
        });

        const proxy = { skew: 0 },
          skewSetter = gsap.quickSetter(".service-card", "skewX", "deg"),
          clamp = gsap.utils.clamp(-5, 5);

        ScrollTrigger.create({
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -600);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 1,
                ease: "power2",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew),
              });
            }
          },
        });
      }, containerRef);
    }, 100);

    return () => {
      clearTimeout(timeout);
      html.style.scrollBehavior = originalScrollBehavior;
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#050505] overflow-hidden w-full">
      <div ref={horizontalRef} className="flex h-[100dvh] w-fit will-change-transform">
        <section className="w-screen h-full flex flex-col items-center justify-center relative flex-shrink-0 px-6 md:px-12 lg:px-24">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff15_0.5px,transparent_0.5px)] bg-[size:30px_30px]" />
          </div>

          <div className="relative z-10 text-center max-w-6xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 md:mb-12 overflow-hidden group">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">
                Secure Perimeter Established
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[13vw] font-bold tracking-tighter text-white leading-[0.85] md:leading-[0.75] mb-8 md:mb-14 select-none">
              BEYOND
              <br />
              <span className="text-white/10 italic">DEFENSE.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/20 max-w-2xl mx-auto font-light leading-relaxed tracking-wide px-4 md:px-0">
              Navigate our unified security matrix. A horizontal journey through
              offensive research and defensive frameworks.
            </p>
          </div>

          <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 md:gap-6 opacity-30">
            <span className="text-[9px] font-mono uppercase tracking-[0.5em] animate-bounce">
              Scroll Down
            </span>
            <div className="w-px h-12 md:h-20 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {servicesData.map((category) => {
          const Icon = ICON_MAP[category.id] || ShieldCheckIcon;
          return (
            <section
              key={category.id}
              className="w-fit h-full flex items-center relative flex-shrink-0 px-12 md:px-24 border-l border-white/5"
            >
              <div className="bg-label absolute top-1/2 left-0 -translate-y-1/2 text-[30vh] md:text-[35vh] font-bold text-white/[0.01] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap leading-none">
                {category.name}
              </div>

              <div className="relative z-10 flex flex-col md:flex-row gap-10 md:gap-16 items-center h-[85vh] md:h-[75vh] py-10">
                <div className="w-full md:w-[450px] flex-shrink-0 space-y-6 md:space-y-10 text-center md:text-left">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner mx-auto md:mx-0">
                    <Icon size={32} weight="light" className="md:hidden text-white/60" />
                    <Icon size={48} weight="light" className="hidden md:block text-white/60" />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-8 leading-tight tracking-tight">
                      {category.name}
                    </h2>
                    <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-5 text-white/20 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em]">
                    <div className="w-8 md:w-12 h-px bg-white/20" />
                    {category.services.length} Specialized Protocols
                  </div>
                </div>

                <div className="flex gap-6 md:gap-10 h-full py-2 md:py-6 overflow-visible">
                  {category.services.map((service, sIdx) => (
                    <ServiceCard key={service.id} service={service} index={sIdx} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="w-screen h-full flex flex-col items-center justify-center relative flex-shrink-0 px-6 md:px-12 border-l border-white/5">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff15_0.5px,transparent_0.5px)] bg-[size:30px_30px]" />
          </div>

          <div className="relative z-10 text-center">
            <FingerprintIcon
              size={60}
              weight="thin"
              className="md:hidden mx-auto mb-6 text-white/10"
            />
            <FingerprintIcon
              size={80}
              weight="thin"
              className="hidden md:block mx-auto mb-10 text-white/10"
            />
            <h2 className="text-5xl md:text-[10vw] font-bold text-white mb-10 md:mb-14 tracking-tighter leading-none select-none">
              READY FOR
              <br />
              <span className="text-white/20 italic">INITIALIZATION?</span>
            </h2>
            <a
              ref={finalCtaRef}
              href="mailto:sales@photonsecurity.in"
              className="group relative inline-flex items-center justify-center px-10 md:px-16 py-4 md:py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs overflow-hidden transition-all duration-500 rounded-full"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Start Assessment
              </span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
