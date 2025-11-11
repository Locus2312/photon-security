import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceDetailView } from "@/components/services/service-detail-view";
import { servicesData, getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.name} | Photon Security`,
    description: service.description,
  };
}

export async function generateStaticParams() {
  const allServices = servicesData.flatMap((cat) => cat.services);
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        <ServiceDetailView service={service} />
      </main>
      <SiteFooter />
    </>
  );
}
