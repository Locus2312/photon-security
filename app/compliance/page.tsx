import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, FileCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance | Photon Security",
  description:
    "Achieve compliance with ISO 27001, SOC 2, GDPR, PCI-DSS, RBI, SEBI, and CERT-In guidelines.",
};

export default function CompliancePage() {
  const frameworks = [
    {
      name: "ISO 27001 Readiness",
      description:
        "Information security management system implementation and audit readiness.",
      features: [
        "Gap assessment",
        "Policy development",
        "Control implementation",
        "Audit preparation",
      ],
      icon: Shield,
    },
    {
      name: "SOC 2 / SOC 1 Audits",
      description:
        "Service Organization Control audits for SaaS, cloud, and service providers.",
      features: [
        "Type I assessments",
        "Type II audits",
        "Control design review",
        "Remediation support",
      ],
      icon: CheckCircle,
    },
    {
      name: "GDPR Compliance",
      description:
        "Data protection framework for organizations handling EU resident data.",
      features: [
        "Data mapping",
        "Privacy impact assessment",
        "DPA guidance",
        "Consent management",
      ],
      icon: FileCheck,
    },
    {
      name: "PCI-DSS Compliance",
      description:
        "Payment Card Industry Data Security Standard implementation and validation.",
      features: [
        "Network assessment",
        "Vulnerability scanning",
        "Security testing",
        "Compliance validation",
      ],
      icon: Shield,
    },
    {
      name: "CERT-In Guidelines",
      description:
        "Alignment with Indian Computer Emergency Response Team frameworks.",
      features: [
        "Guidelines advisory",
        "Readiness assessment",
        "Implementation support",
        "Incident preparedness",
      ],
      icon: CheckCircle,
    },
    {
      name: "RBI & SEBI Compliance",
      description:
        "Reserve Bank and Securities Board cyber and IT governance requirements.",
      features: [
        "RBI framework alignment",
        "SEBI requirements",
        "IT governance",
        "Business continuity",
      ],
      icon: FileCheck,
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen pt-8">
        <section className="w-full py-16 md:py-24 border-b border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Compliance & Audits
              </h1>
              <p className="text-xl text-foreground/70">
                Achieve and maintain compliance with global and Indian
                regulatory frameworks.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frameworks.map((framework, idx) => {
                const Icon = framework.icon;
                return (
                  <Card key={idx} className="glass flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="text-primary" size={24} />
                        <Badge variant="secondary">{framework.name}</Badge>
                      </div>
                      <CardTitle className="text-xl">
                        {framework.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-foreground/70 mb-4">
                        {framework.description}
                      </p>
                      <ul className="space-y-2">
                        {framework.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
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
              Need compliance guidance?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Our compliance experts will help you navigate the regulatory
              landscape specific to your industry.
            </p>
            <Button size="lg">Schedule Compliance Consultation</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
