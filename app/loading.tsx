"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center space-y-6 px-4"
      >
        {/* Brand line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent border border-primary/30"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary tracking-wide">
            Photon Security
          </span>
        </motion.div>

        {/* Title shimmer */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Securing your digital perimeter
        </motion.h1>

        {/* Subtle loading bar */}
        <div className="w-56 h-1.5 mx-auto rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>

        <p className="text-sm text-foreground/60">Loading experience…</p>
      </motion.div>
    </div>
  );
}
