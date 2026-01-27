"use client";

import { motion } from "framer-motion";

export function JobDetailWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen"
    >
      {children}
    </motion.main>
  );
}
