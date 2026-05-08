import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { jobs } from "@/lib/jobs";
import { JobDetailView } from "@/components/careers/job-detail-view";

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
      canonical: `https://www.photonsecurity.in/careers/${slug}`,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) notFound();

  return <JobDetailView job={job} />;
}
