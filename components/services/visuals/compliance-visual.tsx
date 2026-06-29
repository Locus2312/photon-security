"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, FileTextIcon, LockKeyIcon } from "@phosphor-icons/react";

export function ComplianceVisual() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-[#1a1c23] rounded-3xl overflow-hidden relative flex items-center justify-center p-8 border border-white/5">

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative w-full max-w-sm flex flex-col gap-6 items-center">

        {/* Document Pipeline */}
        {[
          { icon: FileTextIcon, title: "Policy Draft", delay: 0 },
          { icon: LockKeyIcon, title: "Security Review", delay: 1.5 },
          { icon: CheckCircleIcon, title: "ISO Certified", delay: 3 },
        ].map((step, i) => (
          <div key={i} className="relative w-full flex items-center justify-center">

            {/* Connecting line to next step */}
            {i < 2 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-6 bg-white/10 overflow-hidden">
                <motion.div
                  className="w-full h-full bg-[#eab308]"
                  initial={{ y: "-100%" }}
                  animate={{ y: ["-100%", "100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: step.delay, ease: "linear" }}
                />
              </div>
            )}

            {/* Document Card */}
            <motion.div
              className="w-64 bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 z-10 shadow-lg relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: step.delay }}
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-white/50">
                <step.icon size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white/90">{step.title}</div>
                <div className="text-[10px] font-mono text-white/40">Status: Pending...</div>
              </div>

              {/* Success Flash Overlay */}
              <motion.div
                className="absolute inset-0 bg-[#eab308]/20 mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, delay: step.delay + 1, repeat: Infinity, repeatDelay: 4.5 }}
              />

              {/* Checkmark update */}
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#eab308]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                transition={{ duration: 0.3, delay: step.delay + 1, repeat: Infinity, repeatDelay: 4.7 }}
              >
                <CheckCircleIcon weight="fill" size={20} />
              </motion.div>
            </motion.div>
          </div>
        ))}

      </div>
    </div>
  );
}
