"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { ParallaxBackdrop } from "@/components/parallax/parallax-backdrop";
import { ParallaxWordmark } from "@/components/parallax/parallax-wordmark";
import { LaunchCountdown } from "@/components/parallax/launch-countdown";
import { PARALLAX } from "@/lib/parallax-data";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** Home-page teaser for Parallax, in the platform's own sign-in design. */
export function ParallaxSpotlight() {
  return (
    <section aria-labelledby="parallax-spotlight-heading" className="pxl-root relative overflow-hidden">
      <ParallaxBackdrop />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col items-center text-center"
      >
        <motion.h2 id="parallax-spotlight-heading" variants={reveal} className="mb-6">
          <ParallaxWordmark className="w-[200px] md:w-[300px] h-auto mx-auto text-white" title="Parallax" />
          <span className="sr-only"> — continuous threat exposure management (CTEM) by Photon Security</span>
        </motion.h2>

        <motion.p variants={reveal} className="pxl-tagline mb-5">
          Shift your perspective, <span className="pxl-word-muted">secure your perimeter.</span>
        </motion.p>

        <motion.p variants={reveal} className="text-white/65 leading-relaxed max-w-xl mb-10">
          {PARALLAX.description}
        </motion.p>

        <motion.div variants={reveal} className="w-full max-w-xl mb-10">
          <LaunchCountdown launchDate={PARALLAX.launchDate} />
        </motion.div>

        <motion.div variants={reveal}>
          <Link
            href={PARALLAX.path}
            className="pxl-glass group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white/90 hover:text-white transition-colors"
          >
            See what&apos;s coming
            <ArrowUpRightIcon size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
