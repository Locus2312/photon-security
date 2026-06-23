"use client";

import { useRef, useEffect } from "react";
import type { ServiceCategory } from "@/lib/types";
import {
  ShieldCheckIcon,
  EyeIcon,
  CloudIcon,
  ClipboardTextIcon,
  UsersIcon,
  TargetIcon,
  ArrowRightIcon,
  Icon as IconType
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  category: ServiceCategory;
}

const ICON_MAP: Record<string, IconType> = {
  "vapt": ShieldCheckIcon,
  "mss": EyeIcon,
  "cloudIcon-infra": CloudIcon,
  "compliance": ClipboardTextIcon,
  "awareness": UsersIcon,
  "specialized": TargetIcon,
};

export function ServiceCategorySection({ category }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const Icon = ICON_MAP[category.id] || ShieldCheckIcon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".service-cell");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <div
      id={category.id}
      ref={containerRef}
      className="max-w-7xl mx-auto px-8 lg:px-12 py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Sticky Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-48 h-fit space-y-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <Icon size={32} weight="light" className="text-white/60" />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30 mb-4">
              Category {category.id.toUpperCase()}
            </p>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              {category.name}
            </h2>
            <p className="text-white/40 leading-relaxed max-w-sm">
              {category.description}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.services.map((service, idx) => (
            <div
              key={service.id}
              className="service-cell group relative p-8 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 rounded-lg overflow-hidden"
            >
              {/* Index Number */}
              <div className="absolute top-8 right-8 text-[10px] font-mono text-white/10 group-hover:text-white/30 transition-colors">
                {String(idx + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-semibold text-white/80 group-hover:text-white transition-colors leading-tight">
                  {service.name}
                </h3>
                <p className="text-sm text-white/30 leading-relaxed min-h-[60px]">
                  {service.shortDescription}
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between group-hover:border-white/10 transition-colors">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white/40">
                    Technical Protocol
                  </span>
                  <ArrowRightIcon size={14} className="text-white/20 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
