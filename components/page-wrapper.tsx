"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GsapPreloader } from "@/components/gsap-preloader";
import { GsapCursor } from "@/components/gsap-cursor";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect

    // Bypass logic for 404s
    const validPaths = ["/", "/about", "/services", "/careers", "/contact", "/legal"];
    const currentPath = window.location.pathname;
    const isValid = validPaths.some(p => currentPath === p || currentPath.startsWith("/legal/") || currentPath.startsWith("/careers/"));

    if (!isValid) {
      setShowPreloader(false);
    }
  }, []);

  if (!mounted) {
    // SSR Fallback: Render content hidden to preserve SEO but prevent flashes
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <>
      <GsapCursor />

      {/* Cinematic Preloader Gatekeeper */}
      <AnimatePresence mode="wait">
        {showPreloader && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <GsapPreloader onComplete={() => setShowPreloader(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        Main Content Layout
        The key change between 'loading' and the actual 'pathname' forces a clean 
        remount of animations exactly when the preloader finishes.
      */}
      <motion.div
        key={showPreloader ? "loading-cloak" : pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreloader ? 0 : 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
