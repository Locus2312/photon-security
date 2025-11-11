import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/lib/types";
import { Check, Clock, FileText, TrendingUp } from "lucide-react";

interface ServiceDetailViewProps {
  service: Service;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <>
      {/* Hero section */}
      <section className="w-full py-16 md:py-24 border-b border-border/40">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {service.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Request Quote</Button>
              <Button size="lg" variant="outline">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <section className="w-full py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Who it's for */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="text-primary" size={20} />
                  Who It's For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Mid to large enterprises</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Organizations handling sensitive data</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Regulated industries (BFSI, Healthcare)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>SaaS and service providers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Methodology */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  Methodology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Industry-standard frameworks (OWASP, NIST)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Manual + automated testing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Expert-led assessment and analysis</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Context-aware risk prioritization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Deliverables */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary" size={20} />
                  Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Comprehensive PDF report</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Executive summary</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Remediation roadmap</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Re-test certificate</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Timeline & Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-primary" size={20} />
                  Typical Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">Small Engagement (S)</p>
                  <p className="text-sm text-foreground/70">2–4 weeks</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Medium Engagement (M)</p>
                  <p className="text-sm text-foreground/70">4–8 weeks</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Large Engagement (L)</p>
                  <p className="text-sm text-foreground/70">8–12 weeks</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>
                  Transparent pricing based on scope
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">₹2–5L (S)</Badge>
                  <Badge variant="outline">₹5–15L (M)</Badge>
                  <Badge variant="outline">₹15–50L+ (L)</Badge>
                </div>
                <p className="text-sm text-foreground/70">
                  Final pricing determined after discovery call. Custom quotes
                  for enterprise engagements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-20 border-t border-border/40">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Service FAQs</h2>
          <div className="space-y-4">
            {[
              {
                q: "How long does a typical engagement take?",
                a: "Depends on scope. See timeline section above. We provide detailed estimates during discovery.",
              },
              {
                q: "Can you help with remediation after findings?",
                a: "Absolutely. We provide guidance, support implementation, and conduct re-tests to verify fixes.",
              },
              {
                q: "What if we want ongoing monitoring?",
                a: "We offer managed services packages with continuous monitoring, quarterly assessments, and threat reporting.",
              },
              {
                q: "Do you handle regulatory compliance?",
                a: "Yes. Our audits are aligned with ISO 27001, SOC 2, GDPR, PCI-DSS, RBI, SEBI, and CERT-In guidelines.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-lg border border-border/40"
              >
                <p className="font-semibold mb-2">{faq.q}</p>
                <p className="text-foreground/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 bg-card/20 border-t border-border/40">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to secure your environment?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Contact our team for a detailed discussion of your security needs.
          </p>
          <Button size="lg" className="gap-2">
            Get in Touch
          </Button>
        </div>
      </section>
    </>
  );
}
