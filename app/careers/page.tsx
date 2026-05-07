import { Metadata } from "next";
import CareersContent from "./careers-content";

export const metadata: Metadata = {
  title: "Careers | Join the Photon Security Collective",
  description: "Explore career opportunities at Photon Security. We are seeking elite security researchers and engineers to build the next generation of defensive infrastructure.",
  openGraph: {
    title: "Join the Photon Security Collective",
    description: "Seeking elite security researchers and engineers.",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersContent />;
}
