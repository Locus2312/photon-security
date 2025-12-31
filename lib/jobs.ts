export type Job = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  featured?: boolean;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  applicationNote?: string;
  contactEmail?: string;
  lastDateToApply?: string;
};

export const jobs: Job[] = [
  {
    id: "483921",
    slug: "graphic-designer",
    title: "Graphic Designer",
    department: "Design",
    location: "Remote",
    type: "Part-time | Paid",
    description:
      "We're hiring a part-time Graphic Designer for email design, brochure design, invoices, website graphics, and other misc design work.",
    featured: true,
    lastDateToApply: "31st December 2025", // ✅ NEW
    requirements: [
      "Portfolio demonstrating professional design work (emails, brochures, web graphics)",
      "Experience with email design and HTML email templates",
      "Strong skills in brochure and print design",
      "Proficiency in design tools (Figma, Adobe Creative Suite, etc.)",
      "Ability to work independently and move fast",
      "Reliable communication and meeting deadlines",
    ],
    responsibilities: [
      "Design professional email templates and campaigns",
      "Create marketing brochures and sales collateral",
      "Design invoices, proposals, and business documents",
      "Develop website graphics and visual assets",
      "Handle misc design requests as needed",
      "Maintain brand consistency across all materials",
    ],
    benefits: [
      "Remote work - work from anywhere",
      "Part-time flexibility",
      "Competitive compensation",
      "Opportunity to shape brand identity",
    ],
    applicationNote:
      "If design is your weapon, join Photon Security. We're building something serious.",
    contactEmail: "careers@photonsecurity.in",
  },
];

const ids = new Set<string>();
for (const job of jobs) {
  if (ids.has(job.id)) {
    throw new Error(`Duplicate job ID detected: ${job.id}`);
  }
  ids.add(job.id);
}
