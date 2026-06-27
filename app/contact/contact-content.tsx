"use client";

import { ContactForm } from "@/components/forms/contact-form";
import {
  EnvelopeSimpleIcon,
  PhoneCallIcon,
  MapPinIcon,
  ClockIcon,
  ChatCircleTextIcon
} from "@phosphor-icons/react";
import { motion, Variants } from "framer-motion";

const CONTACT_NODES = [
  {
    icon: EnvelopeSimpleIcon,
    label: "Email Us",
    value: "info@photonsecurity.in",
    href: "mailto:sales@photonsecurity.in",
    status: "READY_TO_REPLY"
  },
  {
    icon: PhoneCallIcon,
    label: "Call Us",
    value: "+91 79902 82583",
    href: "tel:+917990282583",
    status: "LINE_ACTIVE"
  },
  {
    icon: MapPinIcon,
    label: "Visit Us",
    value: "GIFT City, Gujarat, India",
    href: "#",
    status: "OFFICE_LOCATED"
  },
  {
    icon: ClockIcon,
    label: "Business Hours",
    value: "Mon-Fri: 9AM - 6PM IST",
    href: "#",
    status: "OPEN_NOW"
  },
];

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

export default function ContactContent() {
  return (
    <main className="bg-transparent selection:bg-black selection:text-white min-h-screen">
      {/* Cinematic Hero */}
      <div className="relative z-10 bg-[#050505] text-white selection:bg-white selection:text-black">
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden py-20 pb-32">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.012] tracking-tighter pointer-events-none select-none uppercase">
            CONTACT_US
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">We&apos;re here to help</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-10">
              GET IN<br />
              <span className="text-white/30 italic">TOUCH.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-white/30 max-w-xl mx-auto font-light leading-relaxed">
              Have a question or ready to start an assessment? Reach out through any of our channels below.
            </motion.p>
          </motion.div>
        </section>
      </div>

      {/* Main Interface */}
      <div
        className="relative z-20 bg-[#2d6a6f] text-white rounded-t-[4rem] overflow-hidden -mt-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 max-w-7xl mx-auto px-8 lg:px-12"
        >
          <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
            <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-teal-100/50 mb-6">Contact Info</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our <span className="text-teal-100/40 italic">Details</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Left: Info Nodes */}
            <motion.div variants={fadeInUp} className="lg:col-span-5">
              <div className="space-y-4">
                {CONTACT_NODES.map((node) => (
                  <div
                    key={node.status}
                    className="group p-8 bg-white/[0.05] border border-white/10 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-500 rounded-3xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-[9px] font-mono text-white/40 group-hover:text-white/70 tracking-[0.2em] transition-colors uppercase">
                        {node.status}
                      </div>
                      <node.icon size={20} weight="light" className="text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-white/50">{node.label}</p>
                      {node.href !== "#" ? (
                        <a href={node.href} className="text-xl font-bold text-white/90 hover:text-white transition-colors block mt-2">
                          {node.value}
                        </a>
                      ) : (
                        <p className="text-xl font-bold text-white/90 mt-2">{node.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Message Form */}
            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <div
                data-theme="light"
                className="bg-[#ede8df] text-black border border-black/10 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-[#c85a3a]/10 border border-[#c85a3a]/20 flex items-center justify-center">
                      <ChatCircleTextIcon size={24} weight="light" className="text-[#c85a3a]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">Send us a Message</h3>
                      <p className="text-[10px] text-black/40 font-mono uppercase tracking-widest mt-1">We&apos;ll get back to you shortly</p>
                    </div>
                  </div>
                  <ContactForm />
                </div>

                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-8">
                  <div className="w-2 h-2 rounded-full bg-[#c85a3a] animate-pulse shadow-[0_0_10px_rgba(200,90,58,0.5)]" />
                </div>
              </div>

              <div className="mt-12 flex items-center justify-center gap-4 md:gap-8 py-6 border-y border-white/10">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white hidden sm:inline">Direct Support Node {i}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.section>
      </div>
    </main>
  );
}
