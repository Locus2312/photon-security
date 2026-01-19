"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center space-y-8 px-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent border border-primary/30 pointer-events-auto"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              Trusted by Indian Enterprises
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.2,
                },
              },
            }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight"
          >
            <motion.span
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                  filter: "blur(12px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="block"
            >
              Energy of a Photon,
            </motion.span>

            <motion.span
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                  filter: "blur(12px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="block bg-linear-to-r from-primary to-primary bg-clip-text text-transparent"
            >
              Strength of Security
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Next-generation cybersecurity designed for Indian Enterprises.
            <br />
            VAPT, compliance, and MSS powered by cutting-edge research.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center pt-4 pointer-events-auto"
          >
            <Link href="mailto:sales@photonsecurity.in">
              <Button size="lg" className="gap-2">
                Request Assessment <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
