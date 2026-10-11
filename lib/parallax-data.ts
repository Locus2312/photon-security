// Public-facing description of Parallax, Photon Security's attack surface
// management platform. Keep vendor and internal tool names out of this file:
// the platform is white-label and clients never see third-party sources.
// Copy here sells outcomes; it should not explain how the platform works.

export const PARALLAX = {
  name: "Parallax",
  path: "/parallax",
  url: "https://www.photonsecurity.in/parallax",
  tagline: "CTEM by Photon Security",
  description:
    "See every asset you expose to the internet, catch weaknesses before attackers do, and know the moment your brand, people or data turn up where they shouldn't.",
  // Launch moment the countdown runs to (IST). Change this when the date moves.
  launchDate: "2026-10-11T20:00:00+05:30",
} as const;

export const PARALLAX_SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/photonsec/" },
  { label: "X", href: "https://x.com/GoPhotonSec" },
] as const;

export type ParallaxCapability = { title: string; description: string };

export type ParallaxPillar = {
  id: string;
  code: string;
  name: string;
  headline: string;
  /** Exactly three per pillar, so every panel has the same shape. */
  capabilities: [ParallaxCapability, ParallaxCapability, ParallaxCapability];
};

export const PARALLAX_PILLARS: ParallaxPillar[] = [
  {
    id: "discover",
    code: "01",
    name: "Discover",
    headline: "Find what you forgot you had.",
    capabilities: [
      { title: "Asset discovery", description: "Every domain, subdomain and IP tied to your organisation." },
      { title: "Asset map", description: "How each exposed system connects to the rest of the business." },
      { title: "Exposure monitoring", description: "Open ports, weak encryption and expiring certificates." },
    ],
  },
  {
    id: "harden",
    code: "02",
    name: "Harden",
    headline: "Close the gaps attackers look for first.",
    capabilities: [
      { title: "Email security", description: "Stop attackers sending email that looks like yours." },
      { title: "API security", description: "Find exposed APIs before someone else does." },
      { title: "IP reputation", description: "Know the moment your IPs land on a blocklist." },
    ],
  },
  {
    id: "protect",
    code: "03",
    name: "Protect",
    headline: "Stop impersonators in their tracks.",
    capabilities: [
      { title: "Lookalike domains", description: "Typosquats and phishing sites built to look like you." },
      { title: "Fake mobile apps", description: "Apps pretending to be yours, in stores and beyond." },
      { title: "Executive protection", description: "Leadership shielded from attacks built on leaked data." },
    ],
  },
  {
    id: "detect",
    code: "04",
    name: "Detect",
    headline: "Know the moment your data leaks.",
    capabilities: [
      { title: "Credential and card leaks", description: "Passwords and payment cards exposed in breaches." },
      { title: "Dark web monitoring", description: "Your name on ransomware sites, forums and Telegram." },
      { title: "Code and secret leaks", description: "Keys and passwords published in public code." },
    ],
  },
];

export const PARALLAX_SCORE_BANDS = [
  { grade: "A", label: "Minimal" },
  { grade: "B", label: "Low" },
  { grade: "C", label: "Moderate" },
  { grade: "D", label: "High" },
  { grade: "F", label: "Critical" },
];

export const PARALLAX_SCORE_SIGNALS = [
  "Exposed passwords",
  "Threat-actor attention",
  "Payment cards",
  "Data leaks",
  "Third-party risk",
  "Executive exposure",
];

export const PARALLAX_AUDIENCES = [
  {
    title: "Security leaders",
    description: "One view of your external risk, and a grade you can take to the board.",
  },
  {
    title: "Security teams",
    description: "A short list of real issues to fix, not a pile of scan output to sort through.",
  },
  {
    title: "Brand and fraud teams",
    description: "Fake domains and apps taken seriously before customers get hurt.",
  },
  {
    title: "Risk and compliance",
    description: "Ongoing proof that your internet-facing footprint is being watched.",
  },
];

export const PARALLAX_FAQS = [
  {
    question: "What is CTEM?",
    answer:
      "Continuous Threat Exposure Management (CTEM) is an ongoing programme for finding, prioritising and fixing the exposures an attacker could use: domains, servers, apps, certificates and leaked data. It shows you what an attacker can see, as it changes, instead of once a year.",
  },
  {
    question: "We already do VAPT. Why do we need Parallax?",
    answer:
      "A VAPT tests what you know about, at one point in time. Parallax keeps watching all year and finds what you didn't know about: forgotten systems, lookalike domains and leaked credentials. Used together, Parallax also shows you what your next VAPT should cover.",
  },
  {
    question: "Do we need to install anything?",
    answer:
      "No. Parallax sees your organisation from the outside, the way an attacker does. Share your domains and brand names and you're set.",
  },
  {
    question: "Who is Parallax for?",
    answer:
      "Any organisation with a presence online: banks and fintechs, SaaS companies, healthcare, retail, government bodies and growing enterprises that need to know what they expose without hiring a team to look.",
  },
  {
    question: "How do we get started?",
    answer:
      "Write to info@photonsecurity.in and we'll set up your organisation on Parallax. Follow Photon Security on LinkedIn or X for product news.",
  },
];
