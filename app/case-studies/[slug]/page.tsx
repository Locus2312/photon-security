import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const caseStudyDetails: Record<string, unknown> = {
  "bfsi-api-audit": {
    title: "Comprehensive API Security Audit for Leading Bank",
    industry: "BFSI",
    tags: ["API Security", "VAPT", "Remediation"],
    challenge:
      "A leading private sector bank was concerned about vulnerabilities in their payment processing APIs. Initial reconnaissance revealed multiple attack surfaces including outdated authentication mechanisms, lack of rate limiting, and potential for SQL injection attacks. The organization needed a comprehensive audit to identify and remediate these issues before expanding their digital services.",
    approach: [
      "Reconnaissance and API documentation analysis",
      "Manual API testing for authentication bypass",
      "SQL injection and NoSQL injection testing",
      "Authorization and access control validation",
      "Rate limiting and DoS resilience testing",
      "Cryptography and data exposure assessment",
      "Infrastructure-level API gateway review",
      "Penetration testing with real-world attack scenarios",
    ],
    findings:
      "42 vulnerabilities across severity levels. 8 critical findings including broken authentication, SQL injection, and insufficient access controls. Multiple findings related to API versioning and backward compatibility issues.",
    remediation:
      "Phased remediation approach with 90-day timeline. Our team worked closely with the bank's development team to implement fixes, validate patches, and conduct re-testing. All critical issues were resolved within 60 days.",
    outcome: [
      "98% risk reduction",
      "All critical vulnerabilities remediated",
      "SOC 2 Type II compliance achieved",
      "Secure development practices implemented",
      "Quarterly security assessments initiated",
    ],
    testimonial: {
      text: "Photon Security provided comprehensive insights that transformed our API security posture. Their professionalism and expertise were invaluable.",
      author: "Chief Information Security Officer, Leading Bank",
    },
  },
  "saas-multi-tenant-vapt": {
    title: "Multi-Tenant SaaS Platform Security Assessment",
    industry: "SaaS",
    tags: ["Cloud Security", "VAPT", "Multi-Tenant"],
    challenge:
      "A fast-growing SaaS platform serving 500+ enterprise customers needed to validate their multi-tenant architecture security before scaling further. Multi-tenant isolation was critical to prevent cross-customer data leakage and ensure compliance with enterprise security requirements.",
    approach: [
      "Multi-tenant isolation validation",
      "Cross-tenant data access testing",
      "Role-based access control (RBAC) validation",
      "API endpoint enumeration and testing",
      "Authentication and session management review",
      "Cloud infrastructure security assessment (AWS)",
      "Database isolation and encryption validation",
      "Customer data segregation verification",
    ],
    findings:
      "15 isolation issues identified. Several logic flaws that could allow customers to access other customers' data through carefully crafted API requests. Database-level access controls needed refinement. API rate limiting gaps discovered.",
    remediation:
      "Implemented row-level security (RLS) policies, enhanced API authorization logic, added additional tenant context validation throughout the application stack, and deployed API gateways with request validation.",
    outcome: [
      "Zero data leakage vectors",
      "Tenant isolation validated and certified",
      "SOC 2 Type II compliance achieved",
      "Ready for enterprise sales",
      "Automated testing suite for isolation",
    ],
    testimonial: {
      text: "Their assessment gave us the confidence to scale our enterprise sales with verified security assurances.",
      author: "VP Security, SaaS Platform",
    },
  },
  "manufacturing-ot-hardening": {
    title: "OT Network Hardening for Manufacturing Facility",
    industry: "Manufacturing",
    tags: ["Infrastructure", "Network Security", "OT/IT"],
    challenge:
      "A large manufacturing facility's operational technology (OT) networks were vulnerable to ransomware and nation-state adversary techniques. Legacy systems running outdated software created significant risk. The organization needed comprehensive hardening without disrupting production.",
    approach: [
      "OT network discovery and asset inventory",
      "Vulnerability assessment of industrial systems",
      "Network segmentation design and implementation",
      "Baseline hardening per CIS benchmarks",
      "Firewall rule optimization and IDS/IPS tuning",
      "EDR deployment on critical systems",
      "Incident response plan development",
      "Security awareness training for operators",
    ],
    findings:
      "Legacy systems running unsupported software versions, weak network segmentation, open management ports exposed to internet, lack of monitoring and alerting, outdated firewall ruleset, zero EDR capability.",
    remediation:
      "Implemented network segmentation with DMZs, deployed EDR on 200+ endpoints, updated firewall rules and enabled centralized logging, conducted phased patching program, implemented jump boxes for remote management access.",
    outcome: [
      "75% improvement in security posture score",
      "Network segmentation validated",
      "Ransomware resilience improved",
      "Proactive threat monitoring enabled",
      "Regulatory compliance achieved",
    ],
    testimonial: {
      text: "The hardening initiative significantly improved our ability to withstand threats while maintaining production efficiency.",
      author: "Plant Security Manager, Manufacturing Facility",
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudyDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyDetails[slug];

  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.title} | Photon Security`,
    description: study.challenge,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudyDetails[slug];

  if (!study) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        {/* Hero */}
        <section className="w-full py-16 md:py-24 border-b border-border/40">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{study.industry}</Badge>
                {study.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{study.title}</h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="w-full py-20">
          <div className="container max-w-4xl mx-auto px-4 space-y-20">
            {/* Challenge */}
            <div>
              <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {study.challenge}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.approach.map((item: string, idx: number) => (
                  <div
                    key={idx}
                    className="glass p-4 rounded-lg border border-border/40 flex gap-3"
                  >
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                        <span className="text-sm font-bold text-primary">
                          {idx + 1}
                        </span>
                      </span>
                    </div>
                    <p className="text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings & Remediation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4">Findings</h3>
                <p className="text-foreground/70">{study.findings}</p>
              </Card>
              <Card className="glass p-6">
                <h3 className="text-xl font-bold mb-4">Remediation</h3>
                <p className="text-foreground/70">{study.remediation}</p>
              </Card>
            </div>

            {/* Outcomes */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Outcomes & Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.outcome.map((outcome: string, idx: number) => (
                  <div
                    key={idx}
                    className="glass p-4 rounded-lg border border-primary/20 flex gap-3"
                  >
                    <TrendingUp
                      className="text-primary flex-shrink-0"
                      size={20}
                    />
                    <p className="text-foreground/80">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="glass p-8 rounded-lg border border-primary/30 bg-card/50">
              <div className="flex gap-4 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-primary/20" />
                ))}
              </div>
              <p className="text-lg mb-6 italic">"{study.testimonial.text}"</p>
              <div className="flex items-center gap-2">
                <Users className="text-primary" size={18} />
                <p className="font-semibold">{study.testimonial.author}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 bg-card/20 border-t border-border/40">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Your organization could be next
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Get a customized security assessment from our expert team.
            </p>
            <Button size="lg">Request a Consultation</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
