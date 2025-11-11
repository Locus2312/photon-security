import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const jobDetails: Record<string, any> = {
  "senior-penetration-tester": {
    title: "Senior Penetration Tester",
    department: "Security",
    location: "Bangalore",
    experience: "5+ years",
    description:
      "Join us as a Senior Penetration Tester to lead comprehensive security assessments for enterprise clients. You'll manage VAPT engagements, mentor junior testers, and drive continuous improvement of our testing methodologies.",
    requirements: [
      "Proven experience in web, API, network, and infrastructure penetration testing",
      "Deep understanding of OWASP Top 10 and common vulnerability classes",
      "Knowledge of cloud platforms (AWS, Azure, GCP)",
      "Excellent documentation and report writing skills",
      "Leadership and mentoring experience",
      "Relevant certifications (CEH, OSCP, or equivalent)",
    ],
    responsibilities: [
      "Lead VAPT engagements from scoping to final reporting",
      "Conduct manual and automated security testing",
      "Mentor junior penetration testers",
      "Develop and refine testing methodologies",
      "Collaborate with clients on remediation strategies",
      "Stay current with emerging threats and techniques",
    ],
    benefits: [
      "Competitive salary + performance bonus",
      "Flexible work arrangements",
      "Professional development budget",
      "Training and certification support",
      "Health insurance",
      "Paid time off",
    ],
  },
  "cloud-security-architect": {
    title: "Cloud Security Architect",
    department: "Architecture",
    location: "Bangalore",
    experience: "6+ years",
    description:
      "Design and lead cloud security assessments and compliance audits. You'll architect secure solutions, advise clients on cloud security best practices, and lead complex security initiatives.",
    requirements: [
      "6+ years in cloud security and architecture",
      "Deep expertise in AWS, Azure, or GCP",
      "IAM, encryption, and network security knowledge",
      "Compliance frameworks (SOC 2, ISO 27001, GDPR)",
      "Infrastructure-as-Code and DevSecOps experience",
      "Relevant certifications (AWS, Azure, GCP security)",
    ],
    responsibilities: [
      "Lead cloud security assessment projects",
      "Design secure cloud architectures",
      "Audit cloud compliance and remediation",
      "Advise clients on security best practices",
      "Develop security frameworks and policies",
      "Provide expert consultation on complex security challenges",
    ],
    benefits: [
      "Competitive salary + performance bonus",
      "Flexible work arrangements",
      "Professional development budget",
      "Training and certification support",
      "Health insurance",
      "Paid time off",
    ],
  },
  "security-analyst": {
    title: "Security Analyst",
    department: "Analysis",
    location: "Bangalore",
    experience: "2-4 years",
    description:
      "Conduct vulnerability assessments, analyze security findings, and support compliance efforts for diverse clients. You'll work closely with our senior team and develop your expertise in cybersecurity.",
    requirements: [
      "2-4 years in security analysis or testing",
      "Knowledge of web application security",
      "Understanding of network and infrastructure security",
      "Familiarity with security tools and frameworks",
      "Strong analytical and communication skills",
      "Relevant certifications (Security+, CEH, or equivalent)",
    ],
    responsibilities: [
      "Conduct vulnerability assessments",
      "Analyze security findings and prioritize risks",
      "Support penetration testing activities",
      "Document findings and recommendations",
      "Assist with compliance audits",
      "Contribute to security reports and presentations",
    ],
    benefits: [
      "Competitive salary",
      "Flexible work arrangements",
      "Professional development budget",
      "Training and certification support",
      "Health insurance",
      "Paid time off",
    ],
  },
  "incident-response-specialist": {
    title: "Incident Response Specialist",
    department: "Operations",
    location: "Bangalore",
    experience: "3-5 years",
    description:
      "Lead incident investigations, develop IR playbooks, and provide 24/7 SOC support. You'll be on the front line of incident response, working with clients to mitigate threats and recover from incidents.",
    requirements: [
      "3-5 years in incident response",
      "Forensics and malware analysis knowledge",
      "SIEM and log analysis expertise",
      "Threat intelligence and hunting capabilities",
      "Communication and crisis management skills",
      "Relevant certifications (GCIH, GCFE, or equivalent)",
    ],
    responsibilities: [
      "Lead incident investigations and response",
      "Analyze security logs and indicators",
      "Develop and update incident response procedures",
      "Provide 24/7 on-call support",
      "Document lessons learned and recommendations",
      "Assist with threat hunting initiatives",
    ],
    benefits: [
      "Competitive salary + on-call allowance",
      "Flexible work arrangements",
      "Professional development budget",
      "Training and certification support",
      "Health insurance",
      "Paid time off",
    ],
  },
  "compliance-consultant": {
    title: "Compliance Consultant",
    department: "Compliance",
    location: "Bangalore",
    experience: "4+ years",
    description:
      "Guide clients through compliance frameworks and audits. You'll develop compliance strategies, conduct assessments, and help organizations achieve their regulatory goals.",
    requirements: [
      "4+ years in compliance and auditing",
      "Knowledge of ISO 27001, SOC 2, GDPR, PCI-DSS",
      "Indian compliance frameworks (RBI, SEBI, CERT-In)",
      "Audit and assessment experience",
      "Strong documentation skills",
      "Relevant certifications (CISA, CISSP, ISO LA)",
    ],
    responsibilities: [
      "Lead compliance assessment and audit projects",
      "Develop compliance roadmaps and recommendations",
      "Advise on regulatory requirements",
      "Document compliance findings and gaps",
      "Support remediation and implementation",
      "Maintain compliance documentation",
    ],
    benefits: [
      "Competitive salary + performance bonus",
      "Flexible work arrangements",
      "Professional development budget",
      "Training and certification support",
      "Health insurance",
      "Paid time off",
    ],
  },
  "business-development-executive": {
    title: "Business Development Executive",
    department: "Sales",
    location: "Bangalore",
    experience: "2-3 years",
    description:
      "Build relationships with enterprise clients, identify business opportunities, and drive revenue growth. You'll be the face of Photon Security in the market.",
    requirements: [
      "2-3 years in B2B sales or business development",
      "Enterprise sales experience",
      "Understanding of cybersecurity or IT services",
      "Strong relationship-building skills",
      "Target-driven mindset",
      "Excellent communication abilities",
    ],
    responsibilities: [
      "Identify and qualify enterprise leads",
      "Build and maintain client relationships",
      "Present solutions to prospective clients",
      "Achieve quarterly sales targets",
      "Collaborate with delivery teams",
      "Expand into new market segments",
    ],
    benefits: [
      "Competitive base salary + attractive commission",
      "Flexible work arrangements",
      "Performance incentives",
      "Professional development budget",
      "Health insurance",
      "Paid time off",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(jobDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobDetails[slug];

  if (!job) return { title: "Job Not Found" };

  return {
    title: `${job.title} | Photon Security Careers`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobDetails[slug];

  if (!job) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        {/* Header */}
        <section className="w-full py-16 md:py-24 border-b border-border/40">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{job.department}</Badge>
                <Badge variant="outline">{job.location}</Badge>
                <Badge variant="outline">{job.experience}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{job.title}</h1>
            </div>
            <p className="text-lg text-foreground/70">{job.description}</p>
          </div>
        </section>

        {/* Content */}
        <section className="w-full py-20">
          <div className="container max-w-4xl mx-auto px-4 space-y-16">
            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span className="text-foreground/80">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span className="text-foreground/80">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-card/20 p-8 rounded-lg border border-border/40">
              <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-primary font-bold shrink-0">✓</span>
                    <span className="text-foreground/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 bg-card/20 border-t border-border/40">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Submit your application and let&apos;s talk about your next career
              move.
            </p>
            <Button size="lg">Apply Now</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
