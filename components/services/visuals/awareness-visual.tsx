"use client";

import { motion } from "framer-motion";
import { EnvelopeIcon, WarningCircleIcon, CheckCircleIcon } from "@phosphor-icons/react";

export function AwarenessVisual() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-[#050505] rounded-3xl overflow-hidden relative flex flex-col items-center justify-center p-8 border border-white/5">

      <div className="absolute inset-0 opacity-10 flex items-center justify-center">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 border border-white/50 rounded-full"
            animate={{ scale: [1, 2], opacity: [1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-4">
        {/* Email Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="text-[10px] font-mono text-white/30 uppercase">Inbox (1 New)</div>
        </div>

        {/* Incoming Email Animation */}
        <div className="relative h-32 flex items-center justify-center">
          <motion.div
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 flex gap-4 cursor-pointer relative overflow-hidden"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
          >
            <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-400">
              <EnvelopeIcon size={20} />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="w-1/2 h-3 bg-white/20 rounded-full" />
              <div className="w-3/4 h-2 bg-white/10 rounded-full" />
              <div className="w-full h-2 bg-white/10 rounded-full" />
            </div>

            {/* Phishing Scan Overlay */}
            <motion.div
              className="absolute inset-0 bg-red-500/20 mix-blend-overlay border border-red-500/50"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />

            {/* Alert Badge */}
            <motion.div
              className="absolute top-2 right-2 flex items-center gap-1 bg-red-500/20 text-red-400 text-[9px] font-mono px-2 py-1 rounded-full border border-red-500/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.3, repeat: Infinity, repeatDelay: 3.7 }}
            >
              <WarningCircleIcon size={12} weight="fill" />
              PHISHING
            </motion.div>
          </motion.div>
        </div>

        {/* Training Module Prompt */}
        <motion.div
          className="mt-4 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <CheckCircleIcon size={24} weight="fill" className="text-green-400" />
          <div className="text-xs text-white/70">
            User identified threat. Training module complete.
          </div>
        </motion.div>
      </div>

    </div>
  );
}
