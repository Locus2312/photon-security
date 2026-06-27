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

    const validPaths = ["/", "/about", "/services", "/careers", "/contact", "/legal"];
    const currentPath = window.location.pathname;
    const isValid = validPaths.some(p => currentPath === p || currentPath.startsWith("/legal/") || currentPath.startsWith("/careers/"));

    if (!isValid) {
      setShowPreloader(false);
      if (typeof window !== "undefined") {
        (window as Window & typeof globalThis & { __preloaderComplete?: boolean }).__preloaderComplete = true;
        window.dispatchEvent(new Event("preloaderComplete"));
      }
    }
  }, []);

  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <>
      <GsapCursor />

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
