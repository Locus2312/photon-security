import { Building2, Zap, Shield, Brain, HardDrive, Radio } from "lucide-react";

export function IndustriesSection() {
  const industries = [
    { icon: Building2, name: "BFSI" },
    { icon: Brain, name: "Healthcare" },
    { icon: Zap, name: "SaaS" },
    { icon: HardDrive, name: "Manufacturing" },
    { icon: Shield, name: "Government" },
    { icon: Radio, name: "Telecom" },
  ];

  return (
    <section className="w-full py-20 bg-card/20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industries We Serve
          </h2>
          <p className="text-foreground/70">
            Specialized expertise across critical sectors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="flex flex-col items-center justify-center p-6 glass rounded-lg border border-border/40 hover:border-primary/40 transition-colors"
              >
                <Icon className="w-8 h-8 text-primary mb-3" />
                <span className="text-sm font-semibold text-center">
                  {industry.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
