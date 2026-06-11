"use client";

import dynamic from "next/dynamic";

const FalconParticles = dynamic(
  () => import("@/components/home/falcon-particles"),
  { ssr: false }
);

export function FalconParticlesWrapper() {
  return <FalconParticles />;
}
