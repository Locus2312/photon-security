import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/lib/services-data";
import ServiceDetailContent from "./service-detail-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Photon Security",
    };
  }

  return {
    title: `${service.name} | Photon Security`,
    description: service.shortDescription,
    alternates: {
      canonical: `https://www.photonsecurity.in/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailContent service={service} />;
}
