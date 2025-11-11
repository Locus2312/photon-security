import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Photon Security",
  description:
    "Join our team of security experts. We're hiring across multiple roles.",
};

const jobs = [
  {
    slug: "senior-penetration-tester",
    title: "Senior Penetration Tester",
    department: "Security",
    location: "Bangalore",
    experience: "5+ years",
    description:
      "Lead VAPT engagements, mentor junior testers, and develop testing methodologies.",
  },
  {
    slug: "cloud-security-architect",
    title: "Cloud Security Architect",
    department: "Architecture",
    location: "Bangalore",
    experience: "6+ years",
    description:
      "Design cloud security assessments, lead compliance audits, and advise on secure architecture.",
  },
  {
    slug: "security-analyst",
    title: "Security Analyst",
    department: "Analysis",
    location: "Bangalore",
    experience: "2-4 years",
    description:
      "Conduct vulnerability assessments, analyze findings, and support compliance efforts.",
  },
  {
    slug: "incident-response-specialist",
    title: "Incident Response Specialist",
    department: "Operations",
    location: "Bangalore",
    experience: "3-5 years",
    description:
      "Lead incident investigations, develop IR playbooks, and provide 24/7 SOC support.",
  },
  {
    slug: "compliance-consultant",
    title: "Compliance Consultant",
    department: "Compliance",
    location: "Bangalore",
    experience: "4+ years",
    description:
      "Guide clients through compliance frameworks (ISO, SOC 2, GDPR, RBI, SEBI).",
  },
  {
    slug: "business-development-executive",
    title: "Business Development Executive",
    department: "Sales",
    location: "Bangalore",
    experience: "2-3 years",
    description:
      "Build relationships with enterprise clients, identify opportunities, and drive revenue.",
  },
];

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen pt-8">
        {/* Hero */}
        <section className="w-full py-16 md:py-24 border-b border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Team
              </h1>
              <p className="text-xl text-foreground/70">
                Build a career in cybersecurity with a team of passionate
                experts protecting Indian enterprises.
              </p>
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="w-full py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8 text-center mb-16">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Why Join Photon Security?
                </h2>
                <p className="text-foreground/70 text-lg">
                  Work on meaningful projects, grow your expertise, and
                  contribute to India&apos;s cybersecurity landscape.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              {[
                {
                  title: "Expert Team",
                  desc: "Learn from seasoned security professionals.",
                },
                {
                  title: "Growth Opportunities",
                  desc: "Continuous learning and career advancement.",
                },
                {
                  title: "Meaningful Work",
                  desc: "Protect enterprises from real-world threats.",
                },
              ].map((item, idx) => (
                <Card key={idx} className="glass p-6 text-center">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="w-full py-20 bg-card/20 border-y border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Open Positions</h2>

            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <Link key={job.slug} href={`/careers/${job.slug}`}>
                  <Card className="glass hover:border-primary/50 transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl mb-2">
                            {job.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{job.department}</Badge>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <MapPin size={14} />
                              {job.location}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Briefcase size={14} />
                              {job.experience}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70 mb-4">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        View Details <ArrowRight size={16} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Application CTA */}
        <section className="w-full py-20">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Don&apos;t see your fit?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              We&apos;re always looking for talented security professionals.
              Send us your resume.
            </p>
            <Button size="lg">Send Your Resume</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
