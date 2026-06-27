"use client";

export function SectionSkeleton() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-8 opacity-40 animate-pulse">
      <div className="w-48 h-4 bg-white/10 rounded-full mb-8" />
      <div className="w-full max-w-4xl h-64 bg-white/5 rounded-3xl" />
    </div>
  );
}
