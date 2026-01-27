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
  // {
  //   id: "483921",
  //   slug: "graphic-designer",
  //   title: "Graphic Designer",
  //   department: "Design",
  //   location: "Remote",
  //   type: "Part-time | Paid",
  //   description:
  //     "We're hiring a part-time Graphic Designer for email design, brochure design, invoices, website graphics, and other misc design work.",
  //   featured: true,
  //   lastDateToApply: "31st December 2025", // ✅ NEW
  //   requirements: [
  //     "Portfolio demonstrating professional design work (emails, brochures, web graphics)",
  //     "Experience with email design and HTML email templates",
  //     "Strong skills in brochure and print design",
  //     "Proficiency in design tools (Figma, Adobe Creative Suite, etc.)",
  //     "Ability to work independently and move fast",
  //     "Reliable communication and meeting deadlines",
  //   ],
  //   responsibilities: [
  //     "Design professional email templates and campaigns",
  //     "Create marketing brochures and sales collateral",
  //     "Design invoices, proposals, and business documents",
  //     "Develop website graphics and visual assets",
  //     "Handle misc design requests as needed",
  //     "Maintain brand consistency across all materials",
  //   ],
  //   benefits: [
  //     "Remote work - work from anywhere",
  //     "Part-time flexibility",
  //     "Competitive compensation",
  //     "Opportunity to shape brand identity",
  //   ],
  //   applicationNote:
  //     "If design is your weapon, join Photon Security. We're building something serious.",
  //   contactEmail: "careers@photonsecurity.in",
  // },

  {
  id: "SDI-001",
  slug: "software-developer-intern",
  title: "Software Developer Intern",
  department: "Engineering",
  location: "Remote",
  type: "Internship | Unpaid (Performance-based Stipend)",
  description:
    "Photon Security is seeking a Software Developer Intern to support automation, AI-driven experimentation, and VAPT research initiatives. The role offers hands-on exposure to real-world software development and cybersecurity projects in a fast-paced, remote environment.",
  requirements: [
    "Undergraduate students or recent graduates from any technical background",
    "Basic proficiency in one or more programming languages (Python, JavaScript, etc.)",
    "Strong interest in automation, AI, or cybersecurity",
    "Good analytical and problem-solving skills",
    "Ability to work independently in a remote setup"
  ],
  responsibilities: [
    "Develop automation scripts and internal tools",
    "Assist in VAPT research and security experimentation",
    "Contribute to software development and tooling initiatives",
    "Document technical work and findings"
  ],
  benefits: [
    "100% remote work environment",
    "Hands-on industry experience",
    "Mentorship from security professionals",
    "Performance-based stipend after evaluation"
  ],
  applicationNote:
    "This is an unpaid internship initially. Compensation will be introduced based on performance and contribution.",
  contactEmail: "careers@photonsecurity.in"
},



{
  id: "BDE-001",
  slug: "business-development-executive",
  title: "Business Development Executive",
  department: "Business Development",
  location: "Hybrid",
  type: "Incentive-Based | Salary After Performance Review",
  description:
    "Photon Security is looking for a Business Development Executive to drive client acquisition, sales growth, and strategic partnerships. The role involves end-to-end ownership of the sales lifecycle and direct client engagement.",
  requirements: [
    "Strong communication and negotiation skills",
    "Experience or interest in sales, business development, or client management",
    "Ability to pitch, present, and close deals effectively",
    "Self-driven and target-oriented mindset"
  ],
  responsibilities: [
    "Lead generation and prospect outreach",
    "Client meetings, pitching, and requirement gathering",
    "Deal negotiation and closure",
    "Ongoing client communication and relationship management"
  ],
  benefits: [
    "Incentive-based earnings from day one",
    "Salary structure introduced after successful deal closures",
    "Hybrid work model",
    "Direct exposure to leadership and decision-making"
  ],
  applicationNote:
    "This role starts on an incentive-only basis. A fixed salary will be introduced after consistent deal closures.",
  contactEmail: "careers@photonsecurity.in"
}

];

const ids = new Set<string>();
for (const job of jobs) {
  if (ids.has(job.id)) {
    throw new Error(`Duplicate job ID detected: ${job.id}`);
  }
  ids.add(job.id);
}
