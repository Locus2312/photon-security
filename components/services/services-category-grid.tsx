import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ServiceCategory } from "@/lib/types";

interface ServicesCategoryGridProps {
  category: ServiceCategory;
}

export function ServicesCategoryGrid({ category }: ServicesCategoryGridProps) {
  return (
    <section className="container max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
        <p className="text-foreground/70">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.services.map((service) => (
          <Card
            key={service.slug}
            className="h-full glass hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
          >
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-3">
                {category.name.split(" ")[0]}
              </Badge>
              <CardTitle className="text-xl leading-snug">
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base text-foreground/70">
                {service.shortDescription}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
