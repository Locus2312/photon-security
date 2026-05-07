"use client";

import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <CircleNotch size={32} className="text-white/40 animate-spin" weight="light" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 animate-pulse">
          Loading Data...
        </span>
      </div>
    </div>
  );
}
