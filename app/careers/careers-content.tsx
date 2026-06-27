"use client";

import { useRef } from "react";
import { jobs } from "@/lib/jobs";
import { JobCard } from "@/components/careers/job-cards";
import { JobDetailWrapper } from "@/components/careers/job-detail-wrapper";
import { motion, Variants } from "framer-motion";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import { Fingerprint } from "@phosphor-icons/react";

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

export default function CareersContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagneticEffect<HTMLAnchorElement>(0.3);

  return (
    <JobDetailWrapper>
      <main ref={containerRef} className="relative flex flex-col min-h-screen bg-transparent selection:bg-white selection:text-black">
        {/* Cinematic Hero */}
        <div className="relative z-10 bg-[#050505] text-white">
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 overflow-hidden py-20 pb-32">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-bold text-white/[0.012] tracking-tighter pointer-events-none select-none uppercase">
              RECRUITMENT
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative z-10 max-w-4xl"
            >
              <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">
                  Human Capital initialization
                </span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-[13vw] sm:text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-10">
                JOIN THE<br />
                <span className="text-white/30 italic text-[1.1em]">COLLECTIVE.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-white/30 max-w-xl mx-auto font-light leading-relaxed">
                We are seeking elite security researchers and engineers to build
                the next generation of defensive infrastructure.
              </motion.p>
            </motion.div>
          </section>
        </div>

        {/* Jobs List (Teal) */}
        <div className="relative z-20 bg-[#2d6a6f] text-white rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="py-24 md:py-32 max-w-4xl mx-auto px-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-between mb-20">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/50 mb-4">
                  Transmission Feed
                </div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Active <span className="text-white/40">Protocols</span>
                </h2>
              </div>
              <div className="hidden md:block h-px flex-1 mx-12 bg-white/10" />
              <div className="text-[10px] font-mono text-white/40">
                {jobs.length} SLOTS_AVAILABLE
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              {jobs.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
                  <p className="text-white/40 font-mono uppercase tracking-widest text-xs">
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
            </motion.div>
          </motion.section>
          <div className="w-full h-16 bg-[#2d6a6f]"></div>
        </div>

        {/* Global Talent CTA (Coral) */}
        <div className="relative z-30 bg-[#c85a3a] text-white rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-[#2d6a6f] selection:text-white">
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="py-32 md:py-48 text-center px-8"
          >
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
              <Fingerprint size={64} weight="thin" className="mx-auto mb-10 text-white/10" />
              <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
                Don&apos;t see your protocol?
              </h2>
              <p className="text-white/70 mb-14 leading-relaxed max-w-lg mx-auto text-lg md:text-xl font-light">
                We always have room for exceptional talent. If you excel in your field, we&apos;d love to hear from you.
              </p>

              <a
                ref={ctaRef}
                href="mailto:careers@photonsecurity.in"
                className="group relative inline-flex items-center justify-center px-16 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-xs overflow-hidden transition-all duration-500 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Transmit Resume
                </span>
              </a>
            </motion.div>
          </motion.section>
        </div>
      </main>
    </JobDetailWrapper>
  );
}
