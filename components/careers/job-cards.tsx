"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function JobCard({ job }: { job: any }) {
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
        <div className="rounded-xl border border-border/40 bg-card/30 p-6 transition group-hover:border-primary/60 group-hover:shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition">
                {job.title}
              </h3>
              <p className="text-sm text-foreground/60 mt-1">
                {job.department} · {job.location}
              </p>
            </div>

            <Badge variant="outline">{job.type}</Badge>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
