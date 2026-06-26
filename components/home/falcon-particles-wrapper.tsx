"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const FalconParticles = dynamic(
  () => import("@/components/home/falcon-particles"),
  { ssr: false }
);

export function FalconParticlesWrapper() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile === null) {
    return null;
  }

  return <FalconParticles />;
}
