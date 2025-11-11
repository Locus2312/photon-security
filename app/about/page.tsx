import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb, Heart, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Photon Security",
  description:
    "Learn about Photon Security, our mission, values, and leadership team.",
};

export default function AboutPage() {                                                                                                                                                                                                               
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Research-driven approaches to emerging security threats.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Transparent communication and ethical security practices.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Commitment to thorough, actionable security assessments.",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Collaborative approach to long-term security success.",
    },
  ];

  const leaders = [
    {
      name: "Rajesh Kumar",
      role: "Founder & Chief Security Officer",
      bio: "15+ years in cybersecurity, former CISO at major tech company.",
    },
    {
      name: "Priya Sharma",
      role: "VP Engineering",
      bio: "12 years building secure systems, AWS certified security specialist.",
    },
    {
      name: "Anil Desai",
      role: "VP Compliance & Audits",
      bio: "10 years in security audits, ISO 27001 lead auditor certified.",
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        {/* Hero */}
        <section className="w-full py-16 md:py-24 border-b border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Photon Security
              </h1>
              <p className="text-xl text-foreground/70">
                Research-driven cybersecurity firm dedicated to protecting
                Indian enterprises from evolving threats.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  To empower Indian organizations with comprehensive,
                  research-backed cybersecurity services that protect their
                  digital assets, ensure regulatory compliance, and enable
                  secure business growth.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  A future where Indian enterprises operate with confidence in
                  their security posture, leveraging world-class local expertise
                  tailored to the unique threat landscape and regulatory
                  environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-20 bg-card/20 border-y border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={idx}
                    className="glass p-6 flex flex-col items-center text-center"
                  >
                    <Icon className="text-primary mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-foreground/70 text-sm">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="w-full py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, idx) => (
                <Card key={idx} className="glass p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
                    <Users className="text-primary" size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">
                    {leader.role}
                  </p>
                  <p className="text-foreground/70">{leader.bio}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 bg-card/20 border-t border-border/40">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Let&apos;s Build a Secure Future
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Partner with us to strengthen your security posture and achieve
              your compliance goals.
            </p>
            <Button size="lg">Start Your Journey</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
