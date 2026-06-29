"use client";

import { useRef } from "react";
import { ShieldCheckIcon, TargetIcon, LightbulbIcon, UsersIcon } from "@phosphor-icons/react";
import { motion, Variants } from "framer-motion";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import Link from "next/link";

const VALUES = [
  {
    icon: LightbulbIcon,
    title: "Innovation",
    description: "Research-driven approaches to emerging security threats. We don't just use tools; we build them.",
    code: "PROT_01_INN"
  },
  {
    icon: ShieldCheckIcon,
    title: "Integrity",
    description: "Transparent communication and ethical security practices. Your trust is our ultimate perimeter.",
    code: "PROT_02_INT"
  },
  {
    icon: TargetIcon,
    title: "Excellence",
    description: "Commitment to thorough, actionable security assessments. Precision in every packet.",
    code: "PROT_03_EXC"
  },
  {
    icon: UsersIcon,
    title: "Partnership",
    description: "Collaborative approach to long-term security success. We are an extension of your team.",
    code: "PROT_04_PAR"
  },
];

const STATS = [
  { label: "Assets Protected", value: "100K", suffix: "+" },
  { label: "Vulnerabilities Found", value: "2.5K", suffix: "+" },
  { label: "Global Partners", value: "50", suffix: "+" },
  { label: "Threat Response", value: "<15", suffix: "min" },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagneticEffect<HTMLAnchorElement>(0.3);

  return (
    <main ref={containerRef} className="relative flex flex-col min-h-screen bg-transparent selection:bg-white selection:text-black">
      <div className="relative z-10 bg-[#050505] text-white">
        <section ref={heroRef} className="relative min-h-[75vh] md:h-[85vh] flex flex-col items-center justify-center text-center px-6 md:px-8 overflow-hidden py-20 pb-32">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.015] tracking-tighter pointer-events-none select-none uppercase">
            HUMAN_INT
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-5xl"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 md:mb-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">Establishment Brief</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-[9vw] font-bold tracking-tighter leading-[0.95] md:leading-[0.85] mb-10 md:mb-12">
              RESEARCH-FIRST<br className="md:hidden" />{" "}
              <span className="text-white/20 italic">ADVERSARIES.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-white/30 max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0">
              Photon Security is an elite cybersecurity firm born from the need for
              high-fidelity offensive research and defensive architecture.
            </motion.p>
          </motion.div>
        </section>
      </div>

      <div className="relative z-20 bg-[#2d6a6f] text-white rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
            <div className="space-y-8 md:space-y-12">
              <motion.div variants={fadeInUp} className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/60">The Objective</motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                Empowering Global Enterprises <span className="text-white/60 italic">with World-Class Offense.</span>
              </motion.h2>
            </div>
            <div className="space-y-12 md:space-y-16 pt-4">
              <motion.div variants={fadeInUp}>
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-6 flex items-center gap-4">
                  <div className="w-8 h-px bg-white/30" />
                  Our Mission
                </h3>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  To provide comprehensive, research-backed security services that enable
                  organizations to operate with absolute confidence in their digital posture.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-6 flex items-center gap-4">
                  <div className="w-8 h-px bg-white/30" />
                  Our Vision
                </h3>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  A future where global innovation is shielded by an unbreakable
                  standard of security, tailored to the unique global threat landscape.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <div className="w-full h-16 bg-[#2d6a6f]"></div>
      </div>

      <div className="relative z-30 bg-[#c85a3a] text-white rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-[#2d6a6f] selection:text-white">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 md:py-24"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/70 mb-6">Impact Metrics</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">By The <span className="text-white/70">Numbers</span></h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="space-y-4 p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter drop-shadow-sm">
                    {stat.value}<span className="text-white/60 text-3xl md:text-4xl ml-1">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <div className="w-full h-16 bg-[#c85a3a]"></div>
      </div>

      <div data-theme="light" className="relative z-40 bg-[#ede8df] text-black rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-[#0a0a0a] selection:text-white">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 md:py-24"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div variants={fadeInUp} className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-black/50 mb-6">Internal Framework</div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Core <span className="text-black/40">Protocols</span></h2>
              </div>
              <p className="max-w-sm text-black/60 text-sm leading-relaxed">
                The foundational principles that guide every operation, every assessment, and every client partnership.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[200px]">
              {VALUES.map((val) => (
                <motion.div
                  key={val.code}
                  variants={fadeInUp}
                  className="group p-8 md:p-10 bg-white/40 border border-black/5 hover:border-black/10 transition-all duration-500 rounded-3xl relative overflow-hidden cursor-default backdrop-blur-sm hover:bg-white hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="text-[10px] font-mono text-black/30 group-hover:text-[#c85a3a] mb-8 md:mb-12 tracking-[0.2em] transition-colors uppercase font-semibold">
                    {val.code}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-[#c85a3a] group-hover:text-white group-hover:border-[#c85a3a] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 text-black shadow-sm group-hover:shadow-md">
                    <val.icon size={28} weight="light" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold mb-4 text-black">{val.title}</h4>
                  <p className="text-sm text-black/60 leading-relaxed group-hover:text-black/80 transition-colors">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <div className="w-full h-16 bg-[#ede8df]"></div>
      </div>

      <div className="relative z-[60] bg-background text-foreground rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/5">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 md:py-32 text-center px-6 md:px-8"
        >
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold mb-10 md:mb-14 tracking-tighter leading-tight">
              READY TO <span className="text-white/30 italic">EVOLVE?</span>
            </h2>
            <Link
              ref={ctaRef}
              href="/careers"
              className="group relative inline-flex items-center justify-center px-12 md:px-16 py-5 md:py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs overflow-hidden transition-all duration-500 rounded-full"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Join the Collective
              </span>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
