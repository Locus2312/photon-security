import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { servicesData } from "@/lib/services-data";
import { ArrowRight } from "lucide-react";

export function ServicesGrid() {
  return (
    <section className="w-full py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-foreground/70">
            Comprehensive security solutions tailored to your
            organization&apos;s needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((category) => (
            <Link key={category.id} href={`/services/${category.id}`}>
              <Card className="h-full glass hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {category.services.length} services
                  </Badge>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    Explore <ArrowRight size={16} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
