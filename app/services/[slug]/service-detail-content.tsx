"use client";

import Link from "next/link";
import { ArrowLeftIcon, TargetIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { motion, Variants } from "framer-motion";

interface ServiceProps {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  features?: string[];
  headline?: string;
  subheadline?: string;
  serviceOverview?: string;
  whatWeTest?: { title: string; description: string }[];
  deliverables?: { title: string; description: string }[];
}

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

export default function ServiceDetailContent({ service }: { service: ServiceProps }) {
  return (
    <main className="relative flex flex-col min-h-screen bg-transparent selection:bg-white selection:text-black">

      {/* HERO SECTION */}
      <div className="relative z-10 bg-[#050505] text-white">
        <section className="relative min-h-[75vh] md:h-[85vh] flex flex-col items-center justify-center text-center px-6 md:px-8 overflow-hidden py-20 pb-32">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          {/* Background massive text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.015] tracking-tighter pointer-events-none select-none uppercase whitespace-nowrap">
            {service.slug.replace(/-/g, '_').substring(0, 10)}
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-6xl mt-12"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 md:mb-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">Service Protocol</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] md:leading-[1] mb-8 md:mb-12 uppercase max-w-5xl mx-auto text-balance">
              {service.headline || service.name}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-white/30 max-w-4xl mx-auto font-light leading-relaxed px-4 md:px-0">
              {service.subheadline || service.shortDescription}
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white"
              >
                <ArrowLeftIcon size={16} />
                Return to Matrix
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* OVERVIEW SECTION */}
      <div data-theme="light" className="relative z-20 bg-[#ede8df] text-black rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-[#0a0a0a] selection:text-white">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
            <div className="space-y-8 md:space-y-12">
              <motion.div variants={fadeInUp} className="text-[10px] font-mono uppercase tracking-[0.5em] text-black/40">Domain Overview</motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold leading-tight tracking-tight uppercase">
                {service.name}
              </motion.h2>
            </div>
            <div className="space-y-12 md:space-y-16 pt-4">
              <motion.div variants={fadeInUp}>
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-black/40 mb-6 flex items-center gap-4">
                  <div className="w-8 h-px bg-black/10" />
                  Execution Strategy
                </h3>
                <p className="text-lg md:text-xl text-black/70 leading-relaxed font-light">
                  {service.serviceOverview || service.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <div className="w-full h-16 bg-[#ede8df]"></div>
      </div>

      {/* WHAT WE TEST */}
      {(service.whatWeTest && service.whatWeTest.length > 0) || (service.features && service.features.length > 0) ? (
        <div className="relative z-30 bg-[#c85a3a] text-white rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-[#2d6a6f] selection:text-white">
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="py-20 md:py-24 max-w-7xl mx-auto px-6 md:px-12"
          >
            <motion.div variants={fadeInUp} className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/70 mb-6">Attack Surface</div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">WHAT WE <span className="text-white/70">TEST</span></h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.whatWeTest ? service.whatWeTest.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="group p-8 bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 rounded-3xl relative overflow-hidden backdrop-blur-sm hover:bg-white/10 hover:-translate-y-3 hover:shadow-2xl cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-[#c85a3a] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-sm group-hover:shadow-lg">
                    <TargetIcon size={28} weight="light" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-4 text-white group-hover:text-white transition-colors">{item.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              )) : service.features?.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="group p-8 bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 rounded-3xl relative overflow-hidden backdrop-blur-sm hover:bg-white/10 hover:-translate-y-3 hover:shadow-2xl cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-[#c85a3a] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-sm group-hover:shadow-lg">
                    <TargetIcon size={28} weight="light" />
                  </div>
                  <p className="text-sm md:text-base font-bold text-white leading-relaxed group-hover:text-white transition-colors">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          <div className="w-full h-16 bg-[#c85a3a]"></div>
        </div>
      ) : null}

      {/* DELIVERABLES & CTA */}
      <div className="relative z-[60] bg-[#050505] text-white rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/5">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
        >
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="mb-24">
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/40 mb-6">Business Value</div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">DELIVERABLES</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.deliverables.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="group p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-default"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#3b49f4] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <CheckCircleIcon size={32} weight="light" className="text-[#3b49f4] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{item.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold mb-10 md:mb-14 tracking-tighter leading-tight uppercase">
              READY TO <span className="text-white/30 italic">SECURE?</span>
            </h2>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-12 md:px-16 py-5 md:py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs overflow-hidden transition-all duration-500 rounded-full"
            >
              <div className="absolute inset-0 bg-[#3b49f4] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Initialize Assessment
              </span>
            </Link>
          </motion.div>
        </motion.section>
      </div>

    </main>
  );
}
