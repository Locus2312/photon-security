export type Job = {
  id: string;
  slug: string;
  title: string;

  department: string;
  location: string;

  employmentType: "Internship" | "Full-time" | "Part-time" | "Contract";
  compensationType?: string;

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
    id: "SDI-001",
    slug: "software-developer-intern",
    title: "Software Developer Intern",
    department: "Engineering",
    location: "Remote",

    employmentType: "Internship",
    compensationType: "Unpaid (Performance-based Stipend)",

    description:
      "Photon Security is seeking a Software Developer Intern to support automation, AI-driven experimentation, and VAPT research initiatives.",
    requirements: [
      "Undergraduate students or recent graduates from any technical background",
      "Basic proficiency in one or more programming languages (Python, JavaScript, etc.)",
      "Strong interest in automation, AI, or cybersecurity",
      "Good analytical and problem-solving skills",
      "Ability to work independently in a remote setup",
    ],
    responsibilities: [
      "Develop automation scripts and internal tools",
      "Assist in VAPT research and security experimentation",
      "Contribute to software development and tooling initiatives",
      "Document technical work and findings",
    ],
    benefits: [
      "100% remote work environment",
      "Hands-on industry experience",
      "Mentorship from security professionals",
      "Performance-based stipend after evaluation",
    ],
    applicationNote:
      "This is an unpaid internship initially. Compensation will be introduced based on performance and contribution.",
    contactEmail: "careers@photonsecurity.in",
  },

  {
    id: "BDE-001",
    slug: "business-development-executive",
    title: "Business Development Executive",
    department: "Business Development",
    location: "Hybrid",

    employmentType: "Full-time",
    compensationType: "Incentive-Based | Salary After Performance Review",

    description:
      "Photon Security is looking for a Business Development Executive to drive client acquisition and sales growth.",
    requirements: [
      "Strong communication and negotiation skills",
      "Experience or interest in sales, business development, or client management",
      "Ability to pitch, present, and close deals effectively",
      "Self-driven and target-oriented mindset",
    ],
    responsibilities: [
      "Lead generation and prospect outreach",
      "Client meetings, pitching, and requirement gathering",
      "Deal negotiation and closure",
      "Ongoing client communication and relationship management",
    ],
    benefits: [
      "Incentive-based earnings from day one",
      "Salary structure introduced after successful deal closures",
      "Hybrid work model",
      "Direct exposure to leadership and decision-making",
    ],
    applicationNote:
      "This role starts on an incentive-only basis. A fixed salary will be introduced after consistent deal closures.",
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
