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
    id: "DMI-001",
    slug: "digital-marketing-intern",
    title: "Digital Marketing Intern",
    department: "Marketing",
    location: "Remote",

    employmentType: "Internship",
    compensationType: "Unpaid",

    description:
      "Photon Security is looking for a Digital Marketing Intern to help grow our online presence across social media, content, and outreach.",
    requirements: [
      "Basic understanding of social media platforms and content trends",
      "Good written communication skills",
      "Familiarity with tools like Canva is a plus",
      "Self-motivated and willing to learn",
    ],
    responsibilities: [
      "Create and schedule content for social media",
      "Assist with SEO and content marketing efforts",
      "Support email and outreach campaigns",
      "Track basic marketing metrics",
    ],
    benefits: [
      "Hands-on marketing experience in cybersecurity",
      "Mentorship from the marketing team",
      "Internship Certificate on completion",
    ],
    applicationNote: "This is an unpaid internship.",
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
