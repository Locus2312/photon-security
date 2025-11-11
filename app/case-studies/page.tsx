import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link  from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Photon Security",
  description:
    "Real-world examples of how we helped organizations secure their infrastructure.",
};

const caseStudies = [
  {
    slug: "bfsi-api-audit",
    title: "Comprehensive API Security Audit for Leading Bank",
    industry: "BFSI",
    tags: ["API Security", "VAPT"],
    challenge:
      "Critical payment APIs were exposed to multiple vulnerability classes including broken authentication and SQL injection.",
    outcome:
      "98% risk reduction. All critical findings remediated. SOC 2 compliance achieved.",
    metric: "42 vulnerabilities identified and resolved",
  },
  {
    slug: "saas-multi-tenant-vapt",
    title: "Multi-Tenant SaaS Platform Security Assessment",
    industry: "SaaS",
    tags: ["Cloud Security", "VAPT"],
    challenge:
      "Multi-tenant architecture posed isolation and data leakage risks across customer environments.",
    outcome:
      "Tenant isolation validated. Zero data leakage vectors. SOC 2 Type II compliant.",
    metric: "15 isolation issues identified and fixed",
  },
  {
    slug: "manufacturing-ot-hardening",
    title: "OT Network Hardening for Manufacturing Facility",
    industry: "Manufacturing",
    tags: ["Infrastructure", "Network Security"],
    challenge:
      "Legacy OT networks were exposed to ransomware and nation-state adversary techniques.",
    outcome:
      "Network segmentation implemented. Baseline hardening applied. EDR deployed.",
    metric: "75% improvement in security posture score",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen pt-8">
        <section className="w-full py-16 md:py-24 border-b border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-foreground/70">
                Real-world examples of how we helped organizations strengthen
                their security posture.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 gap-6">
              {caseStudies.map((study, idx) => (
                <Link key={study.slug} href={`/case-studies/${study.slug}`}>
                  <Card className="glass hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* Visual */}
                      <div className="bg-linear-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center min-h-64 md:min-h-auto">
                        <div className="text-center">
                          <TrendingUp
                            size={40}
                            className="text-primary mx-auto mb-3"
                          />
                          <p className="text-sm text-foreground/60 font-mono">
                            {study.metric}
                          </p>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="col-span-2 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary">{study.industry}</Badge>
                            {study.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold mb-3">
                            {study.title}
                          </h3>
                          <p className="text-foreground/70 mb-6">
                            {study.challenge}
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            Outcome: {study.outcome}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-primary mt-4">
                          Read full case study <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-card/20 border-t border-border/40">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Your case study could be next
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Partner with us to secure your organization and become a case
              study of success.
            </p>
            <Button size="lg">Start Your Assessment</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
