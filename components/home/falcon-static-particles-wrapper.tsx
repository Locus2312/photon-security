"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const FalconStaticParticles = dynamic(
  () => import("@/components/home/falcon-static-particles"),
  { ssr: false }
);

export function FalconStaticParticlesWrapper() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Return null on mobile or before detecting screen size to prevent flash/unnecessary load
  if (isMobile === null) {
    return null;
  }

  return <FalconStaticParticles />;
}
