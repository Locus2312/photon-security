export const BRAND = {
  name: "Photon Security",
  tagline: "Energy of a Photon. Strength of Security.",
  description:
    "Modern, research-driven cybersecurity services for Indian enterprises.",
} as const;

export const COLORS = {
  cyan: "#00E5FF",
  purple: "#7C3AED",
} as const;

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Compliance", href: "/compliance" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
