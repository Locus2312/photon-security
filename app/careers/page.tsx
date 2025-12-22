import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Photon Security",
  description:
    "Join our team of security experts. We're hiring across multiple roles.",
};

const jobs = [
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    department: "Design",
    location: "Remote",
    type: "Part-time",
    description:
      "Design emails, brochures, invoices, and website graphics. Move fast and deliver clean work.",
    featured: true,
  },
];

export default function CareersPage() {
  return (
    <main className="flex flex-col min-h-screen pt-8">
      {/* Hero */}
      <section className="w-full py-16 md:py-20 border-b border-border/40">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-foreground/70">
            Build a career in cybersecurity protecting Indian enterprises.
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="w-full py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link key={job.slug} href={`/careers/${job.slug}`}>
                <Card
                  className={`hover:border-primary/50 transition-all cursor-pointer ${
                    job.featured ? "border-primary/30 bg-primary/5" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">
                            {job.title}
                          </CardTitle>
                          {job.featured && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin size={12} />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock size={12} />
                            {job.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-foreground/70 text-sm mb-3">
                      {job.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      View Details <ArrowRight size={14} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 bg-card/20 border-t border-border/40">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Don&apos;t see your fit?
          </h2>
          <p className="text-foreground/70 mb-6">
            We&apos;re always looking for talented security professionals.
          </p>
          <Button size="lg">Send Your Resume</Button>
        </div>
      </section>
    </main>
  );
}
