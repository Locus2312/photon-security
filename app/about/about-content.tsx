"use client";

import { useRef, useEffect } from "react";
import { ShieldCheck, Target, Lightbulb, Users } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Research-driven approaches to emerging security threats. We don't just use tools; we build them.",
    code: "PROT_01_INN"
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Transparent communication and ethical security practices. Your trust is our ultimate perimeter.",
    code: "PROT_02_INT"
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Commitment to thorough, actionable security assessments. Precision in every packet.",
    code: "PROT_03_EXC"
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Collaborative approach to long-term security success. We are an extension of your team.",
    code: "PROT_04_PAR"
  },
];

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagneticEffect<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".about-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2
      });

      // Values Entrance
      gsap.from(".value-node", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] text-white selection:bg-white selection:text-black min-h-screen">
      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative h-[85vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-bold text-white/[0.015] tracking-tighter pointer-events-none select-none uppercase">
          HUMAN_INT
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10 about-title">
             <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">Establishment Brief</span>
          </div>
          <h1 className="text-7xl md:text-[9vw] font-bold tracking-tighter leading-[0.85] mb-12 about-title">
            RESEARCH-FIRST<br />
            <span className="text-white/20 italic">ADVERSARIES.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/30 max-w-2xl mx-auto font-light leading-relaxed about-title">
            Photon Security is an elite cybersecurity firm born from the need for 
            high-fidelity offensive research and defensive architecture.
          </p>
        </div>
      </section>

      {/* Mission/Vision - Asymmetric Split */}
      <section className="py-32 max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
             <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20">The Objective</div>
             <h2 className="text-5xl font-bold leading-tight tracking-tight">
               Empowering Indian Enterprises <span className="text-white/30 italic">with World-Class Offense.</span>
             </h2>
          </div>
          <div className="space-y-16 pt-4">
             <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-4">
                   <div className="w-8 h-px bg-white/20" />
                   Our Mission
                </h3>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  To provide comprehensive, research-backed security services that enable 
                  organizations to operate with absolute confidence in their digital posture.
                </p>
             </div>
             <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-4">
                   <div className="w-8 h-px bg-white/20" />
                   Our Vision
                </h3>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  A future where Indian innovation is shielded by an unbreakable 
                  standard of security, tailored to the unique global threat landscape.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Core Protocols (Values) */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
         <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-6">Internal Framework</div>
                  <h2 className="text-5xl font-bold tracking-tight">Core <span className="text-white/30">Protocols</span></h2>
               </div>
               <p className="max-w-sm text-white/30 text-sm leading-relaxed">
                  The foundational principles that guide every operation, every assessment, and every client partnership.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 values-grid">
               {VALUES.map((val) => (
                 <div 
                  key={val.code}
                  className="value-node group p-10 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 rounded-2xl relative overflow-hidden"
                 >
                    <div className="text-[9px] font-mono text-white/10 group-hover:text-white/30 mb-12 tracking-[0.2em] transition-colors uppercase">
                       {val.code}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
                       <val.icon size={24} weight="light" />
                    </div>
                    <h4 className="text-xl font-bold mb-4">{val.title}</h4>
                    <p className="text-sm text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">
                       {val.description}
                    </p>
                    
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                       <div className="absolute top-4 right-4 w-1 h-1 bg-white/20 rounded-full" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 text-center px-8">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-14 tracking-tighter leading-tight">
               READY TO <span className="text-white/30 italic">EVOLVE?</span>
            </h2>
            <Link 
              ref={ctaRef}
              href="/careers"
              className="group relative inline-flex items-center justify-center px-16 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-xs overflow-hidden transition-all duration-500 rounded-full"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                 Join the Collective
              </span>
            </Link>
         </div>
      </section>
    </main>
  );
}

