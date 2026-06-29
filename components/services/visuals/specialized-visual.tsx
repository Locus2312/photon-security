"use client";

import { motion } from "framer-motion";

export function SpecializedVisual() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-[#020202] rounded-3xl overflow-hidden relative flex items-center justify-center p-8 border border-white/5">
      
      {/* Dark Web Grime Background */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-sm aspect-square flex items-center justify-center perspective-[1000px]">
        
        {/* Rotating wireframe sphere (simulated with overlapping ellipses) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center transform-style-preserve-3d"
          animate={{ rotateY: 360, rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[0, 45, 90, 135].map((angle, i) => (
            <div 
              key={i} 
              className="absolute w-64 h-64 border border-white/10 rounded-full"
              style={{ transform: `rotateY(${angle}deg)` }}
            />
          ))}
          {[0, 45, 90, 135].map((angle, i) => (
            <div 
              key={i + 4} 
              className="absolute w-64 h-64 border border-white/10 rounded-full"
              style={{ transform: `rotateX(${angle}deg)` }}
            />
          ))}

          {/* Threat Nodes */}
          {[
            { top: "20%", left: "30%", delay: 0 },
            { top: "70%", left: "80%", delay: 0.5 },
            { top: "50%", left: "20%", delay: 1 },
            { top: "80%", left: "40%", delay: 1.5 },
            { top: "30%", left: "70%", delay: 2 },
          ].map((node, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_red]"
              style={{ top: node.top, left: node.left }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: node.delay, repeat: Infinity, repeatDelay: 3 }}
            >
              <div className="absolute inset-0 w-full h-full border border-red-500 rounded-full animate-ping" />
            </motion.div>
          ))}
        </motion.div>

        {/* Overlay scanning overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="w-full h-1/2 bg-gradient-to-b from-transparent to-red-500/10 border-b border-red-500/30"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Status text */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1">
          <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Target Vector</span>
          <span className="text-xs font-mono text-red-400">Monitoring...</span>
        </div>

      </div>
    </div>
  );
}
