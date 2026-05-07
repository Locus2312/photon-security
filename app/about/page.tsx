import { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "About Photon Security | Elite Cybersecurity Research & Defense",
  description: "Photon Security is a research-first cybersecurity firm providing VAPT, compliance advisory, and managed security services for modern enterprises.",
  openGraph: {
    title: "About Photon Security | Research-First Adversaries",
    description: "An elite cybersecurity firm born from the need for high-fidelity offensive research.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
