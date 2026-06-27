"use client";

import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon, ClockIcon, ArrowUpRight } from "@phosphor-icons/react";
import { motion, Variants } from "framer-motion";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import { Job } from "@/lib/jobs";
import { getApplyMailto } from "@/lib/apply-mail";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

interface JobDetailViewProps {
  job: Job;
}

export function JobDetailView({ job }: JobDetailViewProps) {
  const ctaRef = useMagneticEffect<HTMLAnchorElement>(0.3);

  return (
    <main className="relative flex flex-col min-h-screen bg-transparent selection:bg-white selection:text-black">
      {/* Header Section (Dark Cinematic) */}
      <div className="relative z-10 bg-[#050505] text-white">
        <section className="relative pt-32 pb-32 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container max-w-5xl mx-auto px-6 relative z-10"
          >
            <motion.div variants={fadeInUp}>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors mb-12 group"
              >
                <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Back to Transmissions</span>
              </Link>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="max-w-3xl">
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-8">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono uppercase tracking-widest text-white/50">
                    {job.department}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30">
                    <MapPinIcon size={14} />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30">
                    <ClockIcon size={14} />
                    {job.employmentType}
                  </div>
                </motion.div>

                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
                  {job.title}
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/30 font-light leading-relaxed">
                  {job.description}
                </motion.p>
              </div>

              {job.compensationType && (
                <motion.div variants={fadeInUp} className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl md:w-64">
                  <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 mb-3">Estimated_Comp</div>
                  <div className="text-sm font-semibold text-white/70 leading-snug">
                    {job.compensationType}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </section>
      </div>

      {/* Main Content (Ivory) */}
      <div data-theme="light" className="relative z-20 bg-[#ede8df] text-black rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-[#0a0a0a] selection:text-white">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 max-w-5xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

            {/* Requirements & Responsibilities */}
            <div className="lg:col-span-8 space-y-20">
              {job.requirements && (
                <motion.div variants={fadeInUp}>
                  <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-black/50 mb-10 flex items-center gap-4">
                    <div className="w-8 h-px bg-black/20" />
                    Mission Requirements
                  </h2>
                  <ul className="space-y-6">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex gap-6 group">
                        <span className="text-[10px] font-mono text-black pt-1">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                        <p className="text-lg text-black leading-relaxed font-light">
                          {req}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {job.responsibilities && (
                <motion.div variants={fadeInUp}>
                  <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-black/50 mb-10 flex items-center gap-4">
                    <div className="w-8 h-px bg-black/20" />
                    Operational Duties
                  </h2>
                  <ul className="space-y-6">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex gap-6 group">
                        <span className="text-[10px] font-mono text-black pt-1">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                        <p className="text-lg text-black leading-relaxed font-light">
                          {resp}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar / Perks */}
            <div className="lg:col-span-4 space-y-12">
              {job.benefits && (
                <motion.div variants={fadeInUp} className="bg-white/40 backdrop-blur-sm border border-black/5 p-8 rounded-3xl">
                  <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-black/50 mb-8">
                    Protocol_Perks
                  </h2>
                  <ul className="space-y-4">
                    {job.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20 mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-black/60 leading-relaxed font-light">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div variants={fadeInUp} className="bg-black/5 border border-black/10 p-8 rounded-3xl">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-black/50 mb-6">Security Clearance</h3>
                <p className="text-xs text-black/60 leading-relaxed font-light italic">
                  All candidates must undergo a background verification and sign a non-disclosure agreement (NDA) before initialization.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <div className="w-full h-16 bg-[#ede8df]"></div>
      </div>

      {/* Final Application CTA (Coral) */}
      <div className="relative z-30 bg-[#c85a3a] text-white rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-[#2d6a6f] selection:text-white">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 md:py-48 text-center px-6"
        >
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tighter leading-tight">
              COMMENCE <span className="text-white/40 italic">UPLINK.</span>
            </h2>
            <p className="text-white/70 mb-14 leading-relaxed max-w-lg mx-auto font-light">
              Review the requirements above. If you are ready to contribute to our mission, initialize your transmission below.
            </p>

            <a
              ref={ctaRef}
              href={getApplyMailto(job.title)}
              className="group relative inline-flex items-center justify-center px-16 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] overflow-hidden transition-all duration-500 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-2">
                Apply Now <ArrowUpRight size={12} weight="bold" />
              </span>
            </a>

            {job.contactEmail && (
              <div className="mt-12 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Direct Uplink: {job.contactEmail}
              </div>
            )}
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
