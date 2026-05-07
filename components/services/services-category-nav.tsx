"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface NavProps {
  categories: { id: string; name: string }[];
}

export function ServicesCategoryNav({ categories }: NavProps) {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  useEffect(() => {
    const observers = categories.map((cat) => {
      const el = document.getElementById(cat.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(cat.id);
          }
        },
        { threshold: 0.2, rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [categories]);

  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: `#${id}`, offsetY: 120 },
      ease: "power3.inOut",
    });
  };

  return (
    <div className="sticky top-[88px] z-30 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-y border-white/5 py-4 overflow-x-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 flex items-center gap-8 whitespace-nowrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollTo(cat.id)}
            className={cn(
              "text-[10px] font-mono uppercase tracking-[0.3em] transition-all duration-300 relative py-2",
              activeTab === cat.id ? "text-white" : "text-white/30 hover:text-white/60"
            )}
          >
            {cat.name}
            {activeTab === cat.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
