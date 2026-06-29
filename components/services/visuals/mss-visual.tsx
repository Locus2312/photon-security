"use client";

import { motion } from "framer-motion";

const bars = Array.from({ length: 30 }).map(() => ({
  heights: [
    `${Math.random() * 40 + 10}%`, 
    `${Math.random() * 80 + 20}%`, 
    `${Math.random() * 40 + 10}%`
  ],
  duration: 2 + Math.random() * 2,
  delay: Math.random()
}));

export function MssVisual() {

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-[#050505] rounded-3xl overflow-hidden relative flex flex-col items-center justify-center p-8 md:p-12 border border-white/5">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,106,111,0.1)_0%,transparent_70%)]" />

      {/* Dashboard container */}
      <div className="w-full max-w-lg bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#2d6a6f] shadow-[0_0_8px_#2d6a6f]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">SOC Active</span>
          </div>
          <span className="text-[10px] font-mono text-white/30">00:00:00:00</span>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "CRITICAL", color: "#c85a3a", target: 0 },
            { label: "HIGH", color: "#eab308", target: 3 },
            { label: "LOW", color: "#2d6a6f", target: 12 }
          ].map((metric, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-[9px] font-mono text-white/40">{metric.label}</span>
              <span className="text-2xl font-bold text-white" style={{ color: metric.color }}>
                {metric.target}
              </span>
            </div>
          ))}
        </div>

        {/* Activity Graph */}
        <div className="h-32 bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-end gap-1 overflow-hidden relative">
          <div className="absolute top-2 left-4 text-[9px] font-mono text-white/30">Traffic Analysis</div>
          
          {/* Animated bars */}
          {bars.map((bar, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-[#2d6a6f]/30 rounded-t-sm"
              initial={{ height: "10%" }}
              animate={{ 
                height: bar.heights
              }}
              transition={{
                duration: bar.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar.delay
              }}
            />
          ))}

          {/* Sweeping scan line */}
          <motion.div 
            className="absolute top-0 bottom-0 w-px bg-white/50 shadow-[0_0_10px_white]"
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

      </div>
    </div>
  );
}
