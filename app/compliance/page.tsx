import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, FileCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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
      name: "CERT-In & RBI Compliance",
      description:
        "Indian regulatory compliance for CERT-In guidelines and RBI cybersecurity frameworks.",
      features: [
        "CERT-In guidelines advisory",
        "RBI framework alignment",
        "Incident reporting readiness",
        "IT risk management",
      ],
      icon: CheckCircle,
    },
    {
      name: "SEBI Compliance",
      description:
        "Securities and Exchange Board of India cybersecurity and IT governance requirements.",
      features: [
        "SEBI requirements alignment",
        "IT governance framework",
        "Business continuity planning",
        "Cyber resilience implementation",
      ],
      icon: FileCheck,
    },
    {
      name: "CIS Benchmark Compliance",
      description:
        "Industry-standard security configuration baselines for servers, databases, and network devices.",
      features: [
        "Security configuration implementation",
        "Baseline hardening",
        "Continuous compliance monitoring",
        "Remediation guidance",
      ],
      icon: Shield,
    },
    {
      name: "VAPT Remediation & Audit Closure Support",
      description: "Post-assessment remediation and verification support.",
      features: [
        "Expert guidance on fixing vulnerabilities",
        "Security controls implementation",
        "Re-testing validation",
        "Audit closure support",
      ],
      icon: FileCheck,
    },
  ];

  return (
    <>
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
                    <CardContent className="grow">
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
            <Link href="mailto:sales@photonsecurity.in">
              <Button size="lg">Schedule Compliance Consultation</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
