import { Card } from "@/components/ui/card";

export function ProcessTimeline() {
  const steps = [
    {
      num: 1,
      title: "Discovery",
      desc: "Understand your environment, assets, and security posture.",
    },
    {
      num: 2,
      title: "Assessment",
      desc: "Conduct comprehensive security testing and analysis.",
    },
    {
      num: 3,
      title: "Remediation",
      desc: "Provide detailed findings and remediation guidance.",
    },
    {
      num: 4,
      title: "Retest & Report",
      desc: "Verify fixes and deliver comprehensive final report.",
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
          <p className="text-foreground/70">
            Our proven methodology ensures thorough and actionable security
            insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative">
              <Card className="glass p-6 text-center h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-foreground/60">{step.desc}</p>
                </div>
              </Card>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-linear-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
