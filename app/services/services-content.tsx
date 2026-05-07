import { HorizontalServices } from "@/components/services/horizontal-services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Photon Security",
  description:
    "Explore our offensive research and defensive frameworks through a cinematic unified security matrix.",
  alternates: {
    canonical: `https://www.photonsecurity.in/services`,
  },
};

export default function ServicesContent() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      <HorizontalServices />
    </main>
  );
}
