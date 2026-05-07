"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "@/lib/services-data";
import {
  ShieldCheck,
  Eye,
  Cloud,
  ClipboardText,
  Users,
  Target,
  ArrowRight,
  Fingerprint,
  Icon as IconType,
} from "@phosphor-icons/react";
import { useMagneticEffect } from "@/lib/gsap-hooks";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, IconType> = {
  vapt: ShieldCheck,
  mss: Eye,
  "cloud-infra": Cloud,
  compliance: ClipboardText,
  awareness: Users,
  specialized: Target,
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
      className="service-card group w-[350px] md:w-[450px] h-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all duration-500 rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

      <div>
        <div className="text-[10px] font-mono text-white/20 mb-10 tracking-[0.2em] uppercase">
          Protocol_0{index + 1}
        </div>
        <h3 className="text-3xl font-bold text-white/80 group-hover:text-white transition-colors mb-6 leading-tight tracking-tight">
          {service.name}
        </h3>
        <p className="text-base text-white/30 leading-relaxed group-hover:text-white/50 transition-colors font-light">
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
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
            <ArrowRight
              size={20}
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
    // Disable smooth scrolling on HTML as it conflicts with ScrollTrigger pinning
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    // We delay the initialization slightly to ensure the PageWrapper animation 
    // is finished and the transform is removed, preventing calculation jitter.
    const timeout = setTimeout(() => {
      gsap.context(() => {
        const horizontalSection = horizontalRef.current;
        if (!horizontalSection) return;

        const totalWidth = horizontalSection.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollDistance = totalWidth - windowWidth;

        // Ensure the container is exactly the viewport height
        gsap.set(containerRef.current, { height: "100vh" });

        // The Main Horizontal Scroll + Pinning
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

        // Parallax Background Labels
        gsap.utils.toArray<HTMLElement>(".bg-label").forEach((label) => {
          gsap.to(label, {
            x: -300,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              scrub: true,
            }
          });
        });

        // Skew on scroll effect - reduced for readability
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
    }, 100); // 100ms buffer to ensure Next.js layout is fully painted


    return () => {
      clearTimeout(timeout);
      html.style.scrollBehavior = originalScrollBehavior;
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  return (
    <div ref={containerRef} className="relative bg-[#050505] overflow-hidden w-full">
      <div ref={horizontalRef} className="flex h-screen w-fit will-change-transform">
        {/* Slide 1: Welcome Hero */}
        <section className="w-screen h-full flex flex-col items-center justify-center relative flex-shrink-0 px-12 lg:px-24">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff15_0.5px,transparent_0.5px)] bg-[size:30px_30px]" />
          </div>

          <div className="relative z-10 text-center max-w-6xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-12 overflow-hidden group">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">
                Secure Perimeter Established
              </span>
            </div>
            <h1 className="text-8xl md:text-[13vw] font-bold tracking-tighter text-white leading-[0.75] mb-14 select-none">
              BEYOND
              <br />
              <span className="text-white/10 italic">DEFENSE.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/20 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
              Navigate our unified security matrix. A horizontal journey through
              offensive research and defensive frameworks.
            </p>
          </div>

          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
            <span className="text-[9px] font-mono uppercase tracking-[0.5em] animate-bounce">
              Scroll Down
            </span>
            <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {/* Dynamic Category Slides */}
        {servicesData.map((category) => {
          const Icon = ICON_MAP[category.id] || ShieldCheck;
          return (
            <section
              key={category.id}
              className="w-fit h-full flex items-center relative flex-shrink-0 px-24 border-l border-white/5"
            >
              {/* Massive Parallax Background Label */}
              <div className="bg-label absolute top-1/2 left-0 -translate-y-1/2 text-[35vh] font-bold text-white/[0.01] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap leading-none">
                {category.name}
              </div>

              <div className="relative z-10 flex gap-16 items-center h-[75vh]">
                {/* Category Info Header */}
                <div className="w-[450px] flex-shrink-0 space-y-10">
                  <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    <Icon size={48} weight="light" className="text-white/60" />
                  </div>
                  <div>
                    <h2 className="text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                      {category.name}
                    </h2>
                    <p className="text-white/40 text-xl leading-relaxed font-light">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 text-white/20 font-mono text-[11px] uppercase tracking-[0.3em]">
                    <div className="w-12 h-px bg-white/20" />
                    {category.services.length} Specialized Protocols
                  </div>
                </div>

                {/* Service Cards Horizontal Row */}
                <div className="flex gap-10 h-full py-6">
                  {category.services.map((service, sIdx) => (
                    <ServiceCard key={service.id} service={service} index={sIdx} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Slide Final: Contact / Outro */}
        <section className="w-screen h-full flex flex-col items-center justify-center relative flex-shrink-0 px-12 border-l border-white/5">
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff15_0.5px,transparent_0.5px)] bg-[size:30px_30px]" />
          </div>
          
          <div className="relative z-10 text-center">
            <Fingerprint
              size={80}
              weight="thin"
              className="mx-auto mb-10 text-white/10"
            />
            <h2 className="text-7xl md:text-[10vw] font-bold text-white mb-14 tracking-tighter leading-none select-none">
              READY FOR
              <br />
              <span className="text-white/20 italic">INITIALIZATION?</span>
            </h2>
            <a
              ref={finalCtaRef}
              href="mailto:sales@photonsecurity.in"
              className="group relative inline-flex items-center justify-center px-16 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-xs overflow-hidden transition-all duration-500 rounded-full"
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


