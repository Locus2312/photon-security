"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ThreeHero = dynamic(() => import("@/components/home/three-hero"), {
  ssr: false,
});

export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-linear-to-br from-background via-primary/5 to-background">
      <Suspense fallback={<div className="w-full h-full bg-background" />}>
        <ThreeHero />
      </Suspense>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative z-10 text-center space-y-8 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent border border-primary/30 pointer-events-auto">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              Trusted by Indian Enterprises
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
              Energy of a Photon
              <br />
              <span className="bg-linear-to-r from-primary to-primary bg-clip-text text-transparent">
                Strength of Security
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 text-balance max-w-2xl mx-auto">
              Next-generation cybersecurity designed for Indian enterprises.
              VAPT, compliance, and MSS powered by cutting-edge research.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pointer-events-auto">
            <Link href="mailto:sales@photonsecurity.in">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                Request Audit <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-foreground/50 pt-4">
            <span className="font-semibold text-primary">Rapid response:</span>{" "}
            Our security team responds within 24 hours.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-primary/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
