import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, FileText, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Photon Security",
  description:
    "Security guides, playbooks, checklists, and runbooks for Indian enterprises.",
};

const resources = [
  {
    type: "Checklist",
    title: "Web VAPT Checklist 2025",
    description:
      "Comprehensive checklist for web application penetration testing aligned with OWASP Top 10.",
    date: "Dec 2024",
    icon: FileText,
  },
  {
    type: "Playbook",
    title: "Cloud Misconfiguration Playbook",
    description:
      "Step-by-step guide to identify and remediate common cloud security misconfigurations.",
    date: "Nov 2024",
    icon: BookOpen,
  },
  {
    type: "Runbook",
    title: "Incident Response Runbook: First 24 Hours",
    description:
      "Critical actions and procedures for the first 24 hours after a security incident.",
    date: "Oct 2024",
    icon: FileText,
  },
  {
    type: "Guide",
    title: "CERT-In Compliance Checklist for SMBs",
    description:
      "Practical checklist for Indian SMBs to achieve CERT-In guidelines compliance.",
    date: "Sep 2024",
    icon: Download,
  },
  {
    type: "Best Practice",
    title: "Zero Trust Architecture Implementation",
    description:
      "Guide to designing and implementing zero trust security architecture.",
    date: "Aug 2024",
    icon: BookOpen,
  },
  {
    type: "Tool Guide",
    title: "Security Testing Tools: 2025 Edition",
    description:
      "Overview of top open-source and commercial tools for security assessment.",
    date: "Jan 2025",
    icon: FileText,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen pt-8">
        <section className="w-full py-16 md:py-24 border-b border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
              <p className="text-xl text-foreground/70">
                Free guides, playbooks, checklists, and runbooks to strengthen
                your security posture.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <Card
                    key={idx}
                    className="glass flex flex-col hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        <Icon className="text-primary" size={20} />
                      </div>
                      <CardTitle className="text-xl leading-snug">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <p className="text-foreground/70 mb-6">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/50">
                          {resource.date}
                        </span>
                        <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                          Download <ArrowRight size={14} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-card/20 border-y border-border/40">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay updated with security insights
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Subscribe to our newsletter for latest resources, threat updates,
              and security best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="grow px-4 py-3 bg-card border border-border/40 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
