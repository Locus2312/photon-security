import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { jobs } from "@/lib/jobs";
import { getApplyMailto } from "@/lib/apply-mail";
import { MotionPage } from "@/components/careers/motion-page";
import { MotionSection } from "@/components/careers/motion-section";

type Props = {
  params: { slug: string };
};

function getJobBySlug(slug: string) {
  return jobs.find((job) => job.slug === slug);
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found | Photon Security",
      robots: { index: false },
    };
  }

  return {
    title: `${job.title} | Photon Security Careers`,
    description: job.description,
    alternates: {
      canonical: `https://photonsecurity.in/careers/${slug}`,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;

  const job = getJobBySlug(slug);

  if (!job) notFound();

  return (
    <MotionPage>
      {/* Header */}
      <section className="w-full py-16 md:py-20 border-b border-border/40">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{job.department}</Badge>
            <Badge variant="outline">{job.location}</Badge>
            <Badge variant="outline">{job.type}</Badge>
          </div>

          <p className="text-sm text-foreground/50 mb-2">Job ID: {job.id}</p>
          {job.lastDateToApply && (
            <p className="text-sm text-foreground/60 mb-4">
              Last date to apply:{" "}
              <span className="font-semibold">{job.lastDateToApply}</span>
            </p>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>
          <p className="text-lg text-foreground/70">{job.description}</p>
        </div>
      </section>

      {/* Content */}
      <MotionSection>
        <section className="w-full py-16">
          <div className="container max-w-4xl mx-auto px-4 space-y-12">
            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements?.map((req, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-foreground/80">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <MotionSection delay={0.1}>
              {/* Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
                <ul className="space-y-2">
                  {job.responsibilities?.map((resp, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground/80">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionSection>

            <MotionSection delay={0.1}>
              {/* Benefits */}
              <div className="bg-card/20 p-6 rounded-lg border border-border/40">
                <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits?.map((benefit, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MotionSection>

            {/* Application Note */}

            {job.applicationNote && (
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/30 text-center">
                <p className="text-lg font-semibold mb-2">
                  {job.applicationNote}
                </p>
                {job.contactEmail && (
                  <p className="text-foreground/70">
                    Contact:{" "}
                    <a
                      href={`mailto:${job.contactEmail}`}
                      className="text-primary hover:underline"
                    >
                      {job.contactEmail}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </MotionSection>

      {/* CTA */}
      {/* CTA */}
      <MotionSection delay={0.25}>
        <section className="w-full py-16 bg-card/20 border-t border-border/40">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Join Us?</h2>
            <p className="text-foreground/70 mb-6">
              Email your resume to careers@photonsecurity.in
            </p>

            <Button size="lg" asChild>
              <a href={getApplyMailto(job.title)}>Apply Now</a>
            </Button>
          </div>
        </section>
      </MotionSection>
    </MotionPage>
  );
}
