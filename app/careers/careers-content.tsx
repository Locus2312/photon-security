"use client";

import { useRef, useEffect } from "react";
import { jobs } from "@/lib/jobs";
import { JobCard } from "@/components/careers/job-cards";
import { JobDetailWrapper } from "@/components/careers/job-detail-wrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import { Fingerprint } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export default function CareersContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagneticEffect<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".careers-hero-content", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <JobDetailWrapper>
      <main
        ref={containerRef}
        className="bg-[#050505] text-white selection:bg-white selection:text-black min-h-screen"
      >
        {/* Cinematic Hero */}
        <section className="relative h-[70vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-bold text-white/[0.012] tracking-tighter pointer-events-none select-none uppercase">
            RECRUITMENT
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10 careers-hero-content">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">
                Human Capital initialization
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-10 careers-hero-content">
              JOIN THE
              <br />
              <span className="text-white/30 italic text-[1.1em]">
                COLLECTIVE.
              </span>
            </h1>
            <p className="text-xl text-white/30 max-w-xl mx-auto font-light leading-relaxed careers-hero-content">
              We are seeking elite security researchers and engineers to build
              the next generation of defensive infrastructure.
            </p>
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-32 max-w-4xl mx-auto px-8">
          <div className="flex items-center justify-between mb-20">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-4">
                Transmission Feed
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Active <span className="text-white/30">Protocols</span>
              </h2>
            </div>
            <div className="hidden md:block h-px flex-1 mx-12 bg-white/5" />
            <div className="text-[10px] font-mono text-white/20">
              {jobs.length} SLOTS_AVAILABLE
            </div>
          </div>

          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-white/30 font-mono uppercase tracking-widest text-xs">
                  No Active Transmissions Found
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Global Talent CTA */}
        <section className="py-48 bg-white/[0.01] border-t border-white/5 text-center px-8">
          <div className="max-w-2xl mx-auto">
            <Fingerprint
              size={64}
              weight="thin"
              className="mx-auto mb-10 text-white/10"
            />
            <h2 className="text-5xl font-bold mb-8 tracking-tight">
              Don&apos;t see your protocol?
            </h2>
            <p className="text-white/30 mb-14 leading-relaxed max-w-lg mx-auto">
              We always have room for exceptional talent. If you excel in your
              field, we&apos;d love to hear from you.
            </p>

            <a
              ref={ctaRef}
              href="mailto:careers@photonsecurity.in"
              className="group relative inline-flex items-center justify-center px-16 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-xs overflow-hidden transition-all duration-500 rounded-full"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Transmit Resume
              </span>
            </a>
          </div>
        </section>
      </main>
    </JobDetailWrapper>
  );
}
