"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { Badge } from "@/components/ui/badge";

export function JobCard({ job }: { job: Job }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.015 }}
      className="group"
    >
      <Link href={`/careers/${job.slug}`} className="block">
        <div
          className="rounded-xl border border-border/40 bg-card/30 p-5 sm:p-6 transition
                group-hover:border-primary/60 group-hover:shadow-lg
                active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition">
              {job.title}
            </h3>

            <Badge variant="outline" className="shrink-0 text-xs">
              {job.location}
            </Badge>
          </div>

          <p className="text-sm text-foreground/60 mt-2">
            {job.employmentType}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
