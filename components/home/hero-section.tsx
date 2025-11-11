import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent border border-primary/30">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              Trusted by Indian Enterprises
            </span>
          </div>

          {/* H1 */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              {BRAND.tagline}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 text-balance">
              Modern cybersecurity services for Indian SMBs, enterprises, BFSI,
              SaaS, and Government organizations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Request Audit <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
            >
              Book Consultation
            </Button>
          </div>

          {/* Sub-CTA */}
          <p className="text-sm text-foreground/50 pt-4">
            <span className="font-semibold text-primary">Quick setup:</span> Our
            team responds within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
