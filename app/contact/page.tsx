import { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us | Connect with Photon Security",
  description: "Get in touch with Photon Security for cybersecurity assessments, VAPT services, or research partnerships. We're here to help protect your enterprise.",
  openGraph: {
    title: "Contact Photon Security | Secure Your Perimeter",
    description: "Connect with our elite security team.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
