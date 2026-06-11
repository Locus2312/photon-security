"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import { servicesData } from "@/lib/services-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);

  const totalItems = servicesData.length;
  // Use a fixed angle instead of 360/totalItems so that items don't wrap around the circle.
  // This prevents the last item from appearing above the first item.
  const anglePerItem = 45;

  useEffect(() => {
    const mm = gsap.matchMedia();
 
    mm.add("(min-width: 768px)", () => {
      // 1. Fade out the hero section as we scroll into the services section
      gsap.to("#hero-section", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        opacity: 0,
        ease: "none",
      });

      // 2. Main Services Timeline (Scrubbed: Draws title & circle, fades items, rotates)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Slide in the title text from the left
      tl.fromTo(".services-title-container", 
        { opacity: 0, x: "-20vw" },
        { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
        0
      );

      // Fade in the subtitle
      tl.to(".services-title-sub", { opacity: 1, duration: 0.6 }, 0.4);

      // Phase 1: Draw the dial line while scrolling
      tl.to(".dial-circle-path", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "none"
      }, 0);

      // Phase 2: Fade in the items just as the line completes its visible portion
      tl.fromTo(".dial-item", 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.0, ease: "power2.out" }, 
        1.0
      );

      // Initial state: Dial starts rotated so the first item is hidden at the bottom-right
      gsap.set(dialRef.current, { rotation: 45 });
      gsap.set(".dial-item-content", {
        rotation: (i) => -(i * anglePerItem + 45)
      });

      // Phase 3: Dial rotation (takes up the rest of the scrub timeline)
      const maxRotation = -(totalItems - 1) * anglePerItem;
      
      tl.to(dialRef.current, {
        rotation: maxRotation,
        duration: 4,
        ease: "none",
        onUpdate: function() {
          const rotation = gsap.getProperty(dialRef.current, "rotation") as number;
          
          // Counter-rotate the contents to keep them upright/horizontal
          gsap.set(".dial-item-content", {
            rotation: (i) => -(i * anglePerItem + rotation)
          });

          let idx = -1; // Default to no active item
          
          if (rotation <= 15) { // Once it reaches near 0, activate the corresponding item
             idx = Math.round(Math.abs(Math.min(0, rotation)) / anglePerItem);
          }
          
          if (idx >= totalItems) idx = totalItems - 1;
          
          if (idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveIndex(idx);
          }
        }
      }, "-=0.8");
    });
 
    return () => mm.revert();
  }, [totalItems]);

  return (
    <section ref={containerRef} className="relative w-full h-auto md:h-[500vh] bg-transparent">
      {/* Sticky container that stays in view on desktop */}
      <div className="relative md:sticky md:top-0 h-auto md:h-[100dvh] w-full overflow-hidden pointer-events-none">
        
        {/* Desktop: The Minimalist Gigantic Media Wheel */}
        <div className="hidden md:block absolute inset-0">
          {/* Section Title */}
          <div 
            className="absolute z-20 pointer-events-auto services-title-container"
            style={{
              left: '8vw',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0,
            }}
          >
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase mb-3 opacity-0 services-title-sub">What we offer</p>
            <h2 className="text-5xl font-bold text-white tracking-tight services-title-main">Services</h2>
          </div>
           {/* Dial SVG Border (Static, draws on scroll) */}
           <svg
             className="absolute top-[50%] -translate-y-1/2 pointer-events-none"
             style={{
               width: '150vh',
               height: '150vh',
               left: 'calc(35vw - 150vh)',
               transform: 'rotate(-90deg)',
               filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.03))'
             }}
             viewBox="0 0 1000 1000"
             preserveAspectRatio="xMidYMid meet"
           >
             <circle 
               className="dial-circle-path"
               cx="500" 
               cy="500" 
               r="498" 
               fill="none"
               stroke="rgba(255,255,255,0.2)" 
               strokeWidth="4"
               strokeDasharray="3130"
               strokeDashoffset="3130"
               strokeLinecap="round"
             />
           </svg>

           {/* Dial Container (Items only) */}
           <div 
             ref={dialRef}
             className="absolute top-[50%] -translate-y-1/2 rounded-full"
             style={{
               width: '150vh',
               height: '150vh',
               left: 'calc(35vw - 150vh)',
             }}
           >
              {servicesData.map((cat, i) => {
                const angle = i * anglePerItem;
                const isActive = i === activeIndex;
                
                return (
                  <div
                    key={cat.id}
                    className="absolute top-1/2 left-1/2 w-[75vh] h-0 flex items-center pointer-events-none dial-item"
                    style={{
                       transform: `rotate(${angle}deg)`,
                       transformOrigin: "0 0",
                       opacity: 0
                    }}
                  >
                     {/* Radiating Line to Center */}
                     <div className="absolute right-0 h-px w-full bg-white/[0.03]" />

                     {/* Anchor point at the end of the radius (on the circle edge) */}
                     <div className="absolute left-full top-0 -translate-y-1/2 flex items-center pointer-events-auto">
                        <div 
                            className="dial-item-content flex items-center"
                            style={{
                               transformOrigin: "0% 50%"
                            }}
                         >
                            {/* Number inside the circle */}
                            <div className={`absolute right-full pr-8 font-mono text-2xl transition-all duration-500 ${isActive ? 'text-white' : 'text-white/20'}`}>
                               {String(i + 1).padStart(2, "0")}
                            </div>
                            
                            {/* Glowing Dot on the circle edge */}
                            <div className="absolute left-0 -translate-x-1/2 flex items-center justify-center">
                               <div className={`rounded-full transition-all duration-500 ${isActive ? 'w-4 h-4 bg-white shadow-[0_0_30px_rgba(255,255,255,0.8)]' : 'w-2 h-2 bg-white/20'}`} />
                            </div>

                            {/* Text Content extending outside the circle */}
                            <div className={`pl-16 w-[45vw] transition-all duration-700 ease-out ${isActive ? 'opacity-100 scale-100' : 'opacity-10 scale-95 blur-[2px]'}`}>
                               <h2 className="text-5xl xl:text-6xl font-bold mb-6 tracking-tight leading-tight text-white drop-shadow-2xl">
                                 {cat.name}
                               </h2>
                               <p className="text-xl text-white/60 max-w-lg leading-relaxed mb-8 drop-shadow-lg">
                                 {cat.description}
                               </p>
                               
                               <div className={`transition-all duration-500 overflow-hidden ${isActive ? 'max-h-[500px] opacity-100 delay-300' : 'max-h-0 opacity-0'}`}>
                                 <ul className="space-y-4 mb-10">
                                   {cat.services.slice(0, 4).map(s => (
                                     <li key={s.id} className="text-sm lg:text-base text-white/80 flex items-start gap-4">
                                       <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 shrink-0" />
                                       <span><strong className="text-white">{s.name}:</strong> {s.shortDescription}</span>
                                     </li>
                                   ))}
                                 </ul>
                                 <Link href={`/services#${cat.id}`} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 hover:bg-gray-200 transition-all duration-300">
                                   Explore Details <ArrowUpRight size={18} />
                                 </Link>
                               </div>
                            </div>
                         </div>
                     </div>
                  </div>
                )
              })}
           </div>
        </div>

        {/* Mobile Fallback: Standard scrolling list instead of dial */}
        <div className="md:hidden w-full h-auto pointer-events-auto px-6 py-28 relative z-10">
          <div className="mb-12">
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase mb-3">What we offer</p>
            <h2 className="text-4xl font-bold text-white leading-tight">Our Services</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {servicesData.map((cat, idx) => (
              <Link key={cat.id} href={`/services#${cat.id}`} className="block">
                <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 p-6 rounded-xl transition-colors hover:bg-white/5">
                  <span className="text-[10px] font-mono text-white/25 tracking-widest mb-2 block">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold text-white/90 mb-2">{cat.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{cat.description}</p>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">{cat.services.length} Services</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
