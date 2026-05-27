"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock } from "@phosphor-icons/react";
import gsap from "gsap";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import { Job } from "@/lib/jobs";
import { getApplyMailto } from "@/lib/apply-mail";

interface JobDetailViewProps {
  job: Job;
}

export function JobDetailView({ job }: JobDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagneticEffect<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".job-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] text-white selection:bg-white selection:text-black min-h-screen">
      {/* Header Section */}
      <section className="relative pt-32 pb-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <Link 
            href="/careers" 
            className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors mb-12 group job-reveal"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Back to Transmissions</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-4 mb-8 job-reveal">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono uppercase tracking-widest text-white/50">
                  {job.department}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30">
                  <MapPin size={14} />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30">
                  <Clock size={14} />
                  {job.employmentType}
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 job-reveal">
                {job.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/30 font-light leading-relaxed job-reveal">
                {job.description}
              </p>
            </div>

            {job.compensationType && (
              <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl md:w-64 job-reveal">
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 mb-3">Estimated_Comp</div>
                <div className="text-sm font-semibold text-white/70 leading-snug">
                  {job.compensationType}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Requirements & Responsibilities */}
          <div className="lg:col-span-8 space-y-20">
            {job.requirements && (
              <div className="job-reveal">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-10 flex items-center gap-4">
                  <div className="w-8 h-px bg-white/20" />
                  Mission Requirements
                </h2>
                <ul className="space-y-6">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex gap-6 group">
                      <span className="text-[10px] font-mono text-white/15 group-hover:text-white/40 transition-colors pt-1">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <p className="text-lg text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors">
                        {req}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.responsibilities && (
              <div className="job-reveal">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-10 flex items-center gap-4">
                  <div className="w-8 h-px bg-white/20" />
                  Operational Duties
                </h2>
                <ul className="space-y-6">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex gap-6 group">
                      <span className="text-[10px] font-mono text-white/15 group-hover:text-white/40 transition-colors pt-1">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <p className="text-lg text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors">
                        {resp}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar / Perks */}
          <div className="lg:col-span-4 space-y-12">
            {job.benefits && (
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl job-reveal">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 mb-8">
                  Protocol_Perks
                </h2>
                <ul className="space-y-4">
                  {job.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-white/40 leading-relaxed font-light">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl job-reveal">
               <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 mb-6">Security Clearance</h3>
               <p className="text-xs text-white/40 leading-relaxed font-light italic">
                 All candidates must undergo a background verification and sign a non-disclosure agreement (NDA) before initialization.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Application CTA */}
      <section className="py-32 md:py-48 bg-white/[0.01] border-t border-white/5 text-center px-6">
        <div className="max-w-3xl mx-auto job-reveal">
          <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tighter leading-tight">
            COMMENCE <span className="text-white/30 italic">UPLINK.</span>
          </h2>
          <p className="text-white/30 mb-14 leading-relaxed max-w-lg mx-auto font-light">
            Review the requirements above. If you are ready to contribute to our mission, initialize your transmission below.
          </p>

          <a
            ref={ctaRef}
            href={getApplyMailto(job.title)}
            className="group relative inline-flex items-center justify-center px-16 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] overflow-hidden transition-all duration-500 rounded-full"
          >
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Transmit Resume
            </span>
          </a>

          {job.contactEmail && (
             <div className="mt-12 text-[10px] font-mono text-white/15 uppercase tracking-widest">
               Direct Uplink: {job.contactEmail}
             </div>
          )}
        </div>
      </section>
    </main>
  );
}
