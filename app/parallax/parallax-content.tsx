"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { PlusIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { ParallaxBackdrop } from "@/components/parallax/parallax-backdrop";
import { ParallaxWordmark } from "@/components/parallax/parallax-wordmark";
import { LaunchCountdown } from "@/components/parallax/launch-countdown";
import { useLaunchClock } from "@/components/parallax/use-launch-clock";
import { AssetPixels, CheckRun, ExposureTrend, LeakAlert, LookalikeTree } from "@/components/parallax/visuals";
import {
  PARALLAX,
  PARALLAX_AUDIENCES,
  PARALLAX_FAQS,
  PARALLAX_PILLARS,
  PARALLAX_SCORE_BANDS,
  PARALLAX_SOCIALS,
} from "@/lib/parallax-data";

const TAGLINE: { words: string[]; muted?: boolean }[] = [
  { words: ["Shift", "your", "perspective,"] },
  { words: ["secure", "your", "perimeter."], muted: true },
];

const CHIPS = ["Attack Surface", "Threat Intelligence", "Brand Protection", "Dark Web Monitoring"];

const EASE = [0.16, 1, 0.3, 1] as const;

// One reveal for everything below the hero: fade up from a blur, once.
const reveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const inView = { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-120px" } } as const;

const PANELS: Record<string, () => ReactNode> = {
  discover: AssetPixels,
  harden: CheckRun,
  protect: LookalikeTree,
  detect: LeakAlert,
};

// Neon-style staggered columns: each starts a little lower or higher.
const STAGGER = ["lg:mt-0", "lg:mt-16", "lg:mt-32", "lg:mt-8"];

// Audience callouts sit at different indents, as on neon.com.
const INDENT = ["lg:ml-[22%]", "lg:ml-0", "lg:ml-[38%]", "lg:ml-[10%]"];

/** Section with a solid background and generous vertical rhythm. */
function Section({
  tone,
  children,
  ...rest
}: { tone: "black" | "charcoal"; children: ReactNode } & ({ "aria-labelledby": string } | { "aria-label": string })) {
  return (
    <section {...rest} className={`relative px-4 sm:px-6 lg:px-8 py-28 md:py-40 ${tone === "black" ? "bg-black" : "bg-[#111214]"}`}>
      <div className="relative w-full max-w-[1280px] mx-auto">{children}</div>
    </section>
  );
}

/**
 * Section header after neon.com: "▶ LABEL" and a huge dim index on the left,
 * a statement on the right whose first sentence is white and the rest grey.
 */
function SectionHeader({ id, index, label, lead, rest }: { id: string; index: string; label: string; lead: string; rest: string }) {
  return (
    <motion.div {...inView} variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      <motion.div variants={reveal} className="lg:col-span-3">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/85">
          <span className="text-[#f6a04d] text-[9px]" aria-hidden="true">▶</span>
          {label}
        </p>
        <p className="mt-4 font-mono text-[88px] md:text-[120px] leading-none tracking-[-0.06em] text-white/[0.09]" aria-hidden="true">
          {index}
        </p>
      </motion.div>
      <motion.h2 id={id} variants={reveal} className="pxl-statement lg:col-span-9">
        <span className="text-white">{lead}</span> <span className="text-white/45">{rest}</span>
      </motion.h2>
    </motion.div>
  );
}

export default function ParallaxContent() {
  const { launched, mounted } = useLaunchClock(PARALLAX.launchDate);

  return (
    <div className="pxl-root -mt-20 overflow-hidden selection:bg-white selection:text-black">
      {/* ---- Hero ----------------------------------------------------------- */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 pt-32 pb-28">
        <ParallaxBackdrop />

        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
          <h1 className="mb-8">
            <ParallaxWordmark className="pxl-wordmark mx-auto" title="Parallax" />
            <span className="sr-only"> — continuous threat exposure management (CTEM) by Photon Security</span>
          </h1>

          <p className="pxl-tagline mb-6">
            {TAGLINE.map((line, l) => (
              <Fragment key={l}>
                {l > 0 && " "}
                <span className={line.muted ? "pxl-word-muted" : undefined}>
                  {line.words.map((word, w) => (
                    <Fragment key={word}>
                      {w > 0 && " "}
                      <span className="pxl-word-mask">
                        <span className="pxl-word" style={{ "--w": l * 3 + w } as CSSProperties}>
                          {word}
                        </span>
                      </span>
                    </Fragment>
                  ))}
                </span>
              </Fragment>
            ))}
          </p>

          <p className="pxl-enter max-w-xl text-[15px] sm:text-base leading-relaxed text-white/65 mb-12" style={{ "--d": "1.6s" } as CSSProperties}>
            See your organisation the way attackers do. Every exposed system, every weak spot,
            every leak, found and flagged so you can fix it first.
          </p>

          <div className="pxl-enter w-full max-w-2xl mb-12" style={{ "--d": "1.9s" } as CSSProperties}>
            <LaunchCountdown launchDate={PARALLAX.launchDate} celebrate />
          </div>

          <ul className="flex flex-wrap justify-center gap-2" aria-label="Capabilities">
            {CHIPS.map((chip, i) => (
              <li key={chip} className="pxl-chip pxl-enter" style={{ "--d": `${2.3 + i * 0.1}s` } as CSSProperties}>
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-7 left-0 right-0 flex justify-center">
          <p className="pxl-enter text-[13px] text-white/75" style={{ "--d": "2.8s" } as CSSProperties}>
            A product of <strong className="ml-1 font-bold uppercase tracking-[0.04em] text-white">Photon Security</strong>
          </p>
        </div>
      </section>

      {/* ---- 01 Platform --------------------------------------------------- */}
      <Section tone="black" aria-labelledby="pxl-platform">
        <SectionHeader
          id="pxl-platform"
          index="01"
          label="See your exposure"
          lead="Not just a scanner."
          rest="Parallax is a complete CTEM platform that discovers, hardens, protects and watches everything you expose."
        />
        <motion.div {...inView} variants={stagger} className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 items-start">
          {PARALLAX_PILLARS.map((pillar, i) => {
            const Panel = PANELS[pillar.id];
            return (
              <motion.article key={pillar.id} variants={reveal} className={STAGGER[i]}>
                <h3 className="text-[17px] leading-snug max-w-[260px]">
                  <span className="font-medium text-white">{pillar.name}.</span>{" "}
                  <span className="text-white/50">{pillar.headline}</span>
                </h3>
                <div className="mt-5">{Panel && <Panel />}</div>
                <ul className="mt-4 space-y-1.5 font-mono text-[11px] text-white/40">
                  {pillar.capabilities.map((cap) => (
                    <li key={cap.title}>— {cap.title}</li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>

      {/* ---- 02 Exposure score --------------------------------------------- */}
      <Section tone="charcoal" aria-labelledby="pxl-score">
        <SectionHeader
          id="pxl-score"
          index="02"
          label="Measure what matters"
          lead="One grade for the board."
          rest="Parallax turns every finding into a single A-to-F exposure score you can track week after week."
        />
        <motion.div {...inView} variants={stagger} className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.ol variants={reveal} className="lg:col-span-3 flex flex-wrap lg:flex-col gap-x-6 gap-y-3 font-mono text-[13px]">
            {PARALLAX_SCORE_BANDS.map((band, i) => (
              <li key={band.grade} className={`flex items-center gap-3 ${i === 0 ? "text-white" : "text-white/40"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-transparent"}`} aria-hidden="true" />
                <span className="w-4">{band.grade}</span>
                <span className="hidden sm:inline">{band.label}</span>
              </li>
            ))}
          </motion.ol>
          <motion.div variants={reveal} className="lg:col-span-9">
            <ExposureTrend />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <p className="text-[15px] leading-relaxed text-white/55">
                Built from exposed passwords, threat-actor attention, data leaks, third-party risk and
                executive exposure.
              </p>
              <p className="text-[15px] leading-relaxed text-white/80">
                Recent findings count for more than old ones, so the grade moves as soon as you fix
                what matters.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ---- 03 Who it's for ------------------------------------------------ */}
      <Section tone="black" aria-labelledby="pxl-for">
        <SectionHeader
          id="pxl-for"
          index="03"
          label="Built for every team"
          lead="From the SOC to the boardroom."
          rest="Parallax gives every team that guards the perimeter the view it needs."
        />
        <div className="mt-20 md:mt-28 space-y-16 md:space-y-24">
          {PARALLAX_AUDIENCES.map((item, i) => (
            <motion.div key={item.title} {...inView} variants={reveal} className={INDENT[i]}>
              <h3 className="pxl-mark">For {item.title}</h3>
              <p className="mt-4 max-w-md font-mono text-[12px] md:text-[13px] uppercase leading-relaxed tracking-[0.04em] text-[#cffafe]/80 pl-[0.45em]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ---- 04 FAQ --------------------------------------------------------- */}
      <Section tone="charcoal" aria-labelledby="pxl-faq">
        <SectionHeader
          id="pxl-faq"
          index="04"
          label="Questions"
          lead="Questions, answered."
          rest="What teams ask us most about Parallax and CTEM."
        />
        <motion.div {...inView} variants={reveal} className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-start-4 lg:col-span-9 border-t border-white/10">
            {PARALLAX_FAQS.map((faq) => (
              <details key={faq.question} className="pxl-faq group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base sm:text-lg font-medium tracking-[-0.01em]">
                  {faq.question}
                  <PlusIcon size={18} className="pxl-faq-icon shrink-0 text-white/50 transition-transform duration-300" aria-hidden="true" />
                </summary>
                <p className="pb-6 -mt-2 max-w-2xl text-[15px] leading-relaxed text-white/55">{faq.answer}</p>
              </details>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ---- Sign-off: gradient --------------------------------------------- */}
      <section className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 py-32" aria-label="Updates">
        <ParallaxBackdrop />
        <motion.div {...inView} variants={stagger} className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          <motion.div variants={reveal}>
            <ParallaxWordmark title="" className="w-[200px] sm:w-[280px] h-auto text-white mb-8" />
          </motion.div>
          <motion.p variants={reveal} className="pxl-tagline mb-4">
            {mounted && launched ? (
              <>Parallax is live. <span className="pxl-word-muted">Get on board.</span></>
            ) : (
              <>The countdown is on. <span className="pxl-word-muted">Be there when it lands.</span></>
            )}
          </motion.p>
          <motion.p variants={reveal} className="text-white/60 mb-10 max-w-md">
            Follow Photon Security for product news, or write to{" "}
            <a href="mailto:info@photonsecurity.in" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              info@photonsecurity.in
            </a>
            .
          </motion.p>
          <motion.ul variants={reveal} className="flex flex-wrap justify-center gap-3">
            {PARALLAX_SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pxl-glass group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white/85 hover:text-white transition-colors"
                >
                  {social.label}
                  <ArrowUpRightIcon size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>
    </div>
  );
}
