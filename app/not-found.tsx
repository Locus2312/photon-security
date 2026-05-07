"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden px-6 text-white">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-6 block"
        >
          Error Code: 404
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-8xl font-bold tracking-tighter mb-6"
        >
          Page not found.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 font-light mb-12 max-w-sm mx-auto leading-relaxed"
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white/90 transition-all duration-300"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Home
          </Link>
        </motion.div>
      </div>


      {/* Bottom subtle detail */}
      <div className="absolute bottom-12 text-[10px] font-mono text-white/5 uppercase tracking-[0.3em]">
        Photon Security // Digital Assets Matrix
      </div>
    </main>
  );
}
