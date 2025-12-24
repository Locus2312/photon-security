import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const jobDetails: Record<string, any> = {
  "graphic-designer": {
    title: "Graphic Designer",
    department: "Design",
    location: "Remote",
    type: "Part-time | Paid",
    description:
      "We're hiring a part-time Graphic Designer for email design, brochure design, invoices, website graphics, and other misc design work. This role is for someone who moves fast and takes pride in clean work.",
    requirements: [
      "Portfolio demonstrating professional design work (emails, brochures, web graphics)",
      "Experience with email design and HTML email templates",
      "Strong skills in brochure and print design",
      "Proficiency in design tools (Figma, Adobe Creative Suite, etc.)",
      "Ability to work independently and move fast",
      "Reliable communication and meeting deadlines",
    ],
    responsibilities: [
      "Design professional email templates and campaigns",
      "Create marketing brochures and sales collateral",
      "Design invoices, proposals, and business documents",
      "Develop website graphics and visual assets",
      "Handle misc design requests as needed",
      "Maintain brand consistency across all materials",
    ],
    benefits: [
      "Remote work - work from anywhere",
      "Part-time flexibility",
      "Competitive compensation",
      "Opportunity to shape brand identity",
    ],
    applicationNote:
      "If design is your weapon, join Photon Security. We're building something serious.",
    contactEmail: "careers@photonsecurity.in",
  },
};

export async function generateStaticParams() {
  return Object.keys(jobDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobDetails[slug];

  if (!job) return { title: "Job Not Found" };

  return {
    title: `${job.title} | Photon Security Careers`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobDetails[slug];

  if (!job) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full py-16 md:py-20 border-b border-border/40">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{job.department}</Badge>
            <Badge variant="outline">{job.location}</Badge>
            <Badge variant="outline">{job.type}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>
          <p className="text-lg text-foreground/70">{job.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16">
        <div className="container max-w-4xl mx-auto px-4 space-y-12">
          {/* Requirements */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req: string, idx: number) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span className="text-foreground/80">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsibilities */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((resp: string, idx: number) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span className="text-foreground/80">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-card/20 p-6 rounded-lg border border-border/40">
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">✓</span>
                  <span className="text-foreground/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

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

      {/* CTA */}
      <section className="w-full py-16 bg-card/20 border-t border-border/40">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Join Us?</h2>
          <p className="text-foreground/70 mb-6">
            Send your application to {job.contactEmail}
          </p>
          <Button size="lg" asChild>
            <a href={`mailto:${job.contactEmail}`}>Apply Now</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
