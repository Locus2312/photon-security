"use client";

import { useEffect, useState } from "react";

export function StatsStrip() {
  const stats = [
    { label: "500+", sublabel: "Security Assessments" },
    { label: "50+", sublabel: "Enterprise Clients" },
    { label: "10+", sublabel: "Years Combined Expertise" },
    { label: "24h", sublabel: "Average Response Time" },
  ];

  const [counters, setCounters] = useState<Record<string, number>>({});

  useEffect(() => {
    const targets: Record<string, number> = {};
    stats.forEach((stat) => {
      const num = Number.parseInt(stat.label);
      if (!isNaN(num)) targets[stat.label] = num;
    });

    const interval = setInterval(() => {
      setCounters((prev) => {
        const updated = { ...prev };
        Object.keys(targets).forEach((key) => {
          if (!updated[key]) updated[key] = 0;
          if (updated[key] < targets[key]) {
            updated[key] = Math.min(
              updated[key] + Math.ceil(targets[key] / 20),
              targets[key]
            );
          }
        });
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  });

  return (
    <section className="w-full py-16 bg-card/30 border-y border-border/40">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {counters[stat.label] || 0}
                {stat.label.includes("h")
                  ? "+"
                  : stat.label.includes("Years")
                  ? ""
                  : "+"}
              </div>
              <p className="text-sm text-foreground/60">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
