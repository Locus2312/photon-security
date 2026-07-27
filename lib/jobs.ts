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

  {
    id: "AOSI-001",
    slug: "ai-offensive-security-intern",
    title: "AI Offensive Security Intern",
    department: "Research & Development",
    location: "Remote",

    employmentType: "Internship",
    compensationType: "Research & Learning Internship",

    description:
      "Photon Security is seeking motivated individuals for our R&D Team to help build our AI Autonomous Offensive Security Platform. You'll contribute to automating security assessments using AI agents and modern offensive techniques.",
    requirements: [
      "Basic knowledge of Web & Network Security",
      "Familiarity with Python",
      "Interest in AI/LLMs (OpenAI, Ollama, LangChain, MCP, etc.)",
      "Understanding of Linux and Git",
      "Curiosity to learn offensive security methodologies",
      "Builders, researchers, and problem solvers who want to shape the future of AI-powered offensive security",
    ],
    responsibilities: [
      "Research and develop AI-driven offensive security techniques",
      "Build AI agents for penetration testing and Attack Surface Management (ASM)",
      "Integrate LLMs with cybersecurity workflows",
      "Develop autonomous vulnerability discovery and exploitation pipelines",
      "Work with modern offensive security tools and automation frameworks",
      "Contribute to real-world cybersecurity product development",
    ],
    benefits: [
      "Hands-on experience with AI cybersecurity products",
      "Mentorship from experienced security professionals",
      "Exposure to autonomous pentesting and AI agents",
      "Opportunity to build GitHub-worthy projects",
      "Letter of Recommendation and Internship Certificate",
    ],
    applicationNote:
      "Duration: 6 Months. High-performing interns may be considered for future paid opportunities as the team grows.",
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
