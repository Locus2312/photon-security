"use client";

import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

export function TestimonialCarousel() {
  const testimonials = [
    {
      text: "Photon Security provided actionable recommendations that helped us strengthen our security posture significantly.",
      author: "Rajesh Kumar",
      role: "CISO, Tech Company",
      rating: 5,
    },
    {
      text: "Their expertise in cloud security was instrumental in achieving SOC 2 compliance ahead of schedule.",
      author: "Priya Sharma",
      role: "Security Lead, SaaS Startup",
      rating: 5,
    },
    {
      text: "Professional, thorough, and tailored to our specific business needs. Highly recommended.",
      author: "Anil Desai",
      role: "VP Engineering, Manufacturing",
      rating: 5,
    },
  ];

  const [idx, setIdx] = useState(0);
  const current = testimonials[idx];

  return (
    <section className="w-full py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Clients Say
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="glass p-8 md:p-12">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={18} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-lg md:text-xl mb-8 italic text-foreground/80">
              &quot;{current.text}&quot;
            </p>
            <div className="border-t border-border/40 pt-6">
              <p className="font-semibold">{current.author}</p>
              <p className="text-sm text-foreground/60">{current.role}</p>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() =>
                setIdx((idx - 1 + testimonials.length) % testimonials.length)
              }
              className="p-2 hover:bg-card rounded-md transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === idx ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((idx + 1) % testimonials.length)}
              className="p-2 hover:bg-card rounded-md transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
