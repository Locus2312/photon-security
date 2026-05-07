import { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Cybersecurity Services | VAPT, Audits & Managed Security",
  description: "Explore Photon Security's comprehensive security services, including VAPT, compliance auditing, managed security, and offensive research for modern enterprises.",
  openGraph: {
    title: "Photon Security Services | Beyond Defense",
    description: "High-fidelity security assessments and research-driven defense architecture.",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
