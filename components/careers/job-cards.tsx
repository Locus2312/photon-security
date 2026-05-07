"use client";

import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import { ArrowRight, MapPin, Clock } from "@phosphor-icons/react";

export function JobCard({ job }: { job: Job }) {
  const cardRef = useMagneticEffect<HTMLDivElement>(0.1);

  return (
    <Link href={`/careers/${job.slug}`} className="block group">
      <div
        ref={cardRef}
        className="relative p-8 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 rounded-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                ACTIVE_TRANSMISSION_{job.id.toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors tracking-tight">
              {job.title}
            </h3>
            <div className="flex items-center gap-6 text-white/30 text-[11px] font-mono uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-white/10" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-white/10" />
                {job.employmentType}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:block px-4 py-1 border border-white/5 rounded-full text-[9px] font-mono text-white/20 uppercase tracking-tighter">
                Security_Clearance_Required
             </div>
             <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
             </div>
          </div>
        </div>

        {/* Hover Accents */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  );
}

