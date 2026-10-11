import { Metadata } from "next";
import ParallaxContent from "./parallax-content";
import { PARALLAX, PARALLAX_FAQS, PARALLAX_PILLARS } from "@/lib/parallax-data";

const TITLE = "Parallax — CTEM Platform by Photon Security";
const DESCRIPTION =
  "Parallax is the continuous threat exposure management (CTEM) platform from Photon Security: continuous asset discovery, exposure monitoring, phishing domain and fake app detection, and dark web and credential leak monitoring.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "CTEM",
    "continuous threat exposure management",
    "CTEM platform",
    "threat exposure management",
    "attack surface management",
    "EASM",
    "asset discovery",
    "subdomain discovery",
    "exposure monitoring",
    "dark web monitoring",
    "credential leak monitoring",
    "phishing domain detection",
    "typosquatting detection",
    "rogue app detection",
    "brand protection",
    "Parallax",
    "Photon Security",
  ],
  alternates: {
    canonical: PARALLAX.url,
  },
  openGraph: {
    title: "Parallax | Shift your perspective, secure your perimeter",
    description: PARALLAX.description,
    url: PARALLAX.url,
    siteName: "Photon Security",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parallax — CTEM Platform by Photon Security",
    description: PARALLAX.description,
    site: "@GoPhotonSec",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${PARALLAX.url}#software`,
      name: PARALLAX.name,
      alternateName: "Parallax CTEM",
      applicationCategory: "SecurityApplication",
      applicationSubCategory: "Continuous Threat Exposure Management (CTEM)",
      operatingSystem: "Web",
      url: PARALLAX.url,
      description: DESCRIPTION,
      image: "https://www.photonsecurity.in/parallax/parallax-lockup-alro-white.svg",
      featureList: PARALLAX_PILLARS.flatMap((p) => p.capabilities.map((c) => c.title)),
      provider: {
        "@type": "Organization",
        name: "Photon Security",
        url: "https://www.photonsecurity.in",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.photonsecurity.in" },
        { "@type": "ListItem", position: 2, name: "Parallax", item: PARALLAX.url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PARALLAX_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function ParallaxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ParallaxContent />
    </>
  );
}
