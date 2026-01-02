import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Careers | Photon Security",
  description:
    "Join our team of security experts. We're hiring across multiple roles.",
};

export default function CareersPage() {
  return (
    <main className="flex flex-col min-h-screen pt-8">
      {/* Hero */}
      <section className="w-full py-16 md:py-20 border-b border-border/40">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
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
            {jobs.length === 0 ? (
              <p className="text-foreground/70">
                No open positions at the moment. Please check back soon.
              </p>
            ) : (
              jobs.map((job) => (
                <Link key={job.id} href={`/careers/${job.slug}`}>
                  {/* existing job card code stays exactly the same */}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 bg-card/20 border-t border-border/40">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Don&apos;t see your fit?</h2>
          <p className="text-foreground/70 mb-6">
            We&apos;re always looking for talented security professionals.
          </p>
          <a href="mailto:careers@photonsecurity.in">
            <Button size="lg">Send Your Resume</Button>
          </a>
        </div>
      </section>
    </main>
  );
}
