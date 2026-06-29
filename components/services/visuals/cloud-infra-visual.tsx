"use client";

import { motion } from "framer-motion";

export function CloudInfraVisual() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-[#050505] rounded-3xl overflow-hidden relative flex items-center justify-center p-8 border border-white/5">

      {/* Deep cloud background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#c85a3a_0%,transparent_50%)] opacity-20" />

      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">

        {/* Central Cloud Node */}
        <motion.div
          className="absolute z-20 w-32 h-20 bg-white/5 border border-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(200,90,58,0.3)]"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Core</div>
        </motion.div>

        {/* Orbiting Satellites / Servers */}
        {[
          { angle: 0, delay: 0 },
          { angle: 72, delay: 0.2 },
          { angle: 144, delay: 0.4 },
          { angle: 216, delay: 0.6 },
          { angle: 288, delay: 0.8 },
        ].map((satellite, i) => {
          const radius = 120;
          const x = Math.cos((satellite.angle * Math.PI) / 180) * radius;
          const y = Math.sin((satellite.angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={i}
              className="absolute z-10 flex flex-col items-center justify-center"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x, y, opacity: 1 }}
              transition={{ duration: 1.5, delay: satellite.delay, type: "spring", bounce: 0.4 }}
            >
              {/* Connecting Line (simulated with a pseudo element) */}
              <svg className="absolute w-64 h-64 pointer-events-none -z-10" style={{ transform: `translate(${-x}px, ${-y}px)` }}>
                <motion.line
                  x1="128" y1="128"
                  x2={128 + x} y2={128 + y}
                  stroke="#c85a3a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ strokeDashoffset: 20 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  opacity={0.5}
                />
              </svg>

              <motion.div
                className="w-12 h-16 bg-[#050505] border border-[#c85a3a]/50 rounded-lg flex flex-col gap-1 p-2 shadow-lg"
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: satellite.delay }}
              >
                <div className="w-full h-1 bg-[#c85a3a]/80 rounded-full" />
                <div className="w-2/3 h-1 bg-white/20 rounded-full" />
                <div className="w-1/2 h-1 bg-white/20 rounded-full" />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Data Packets flowing */}
        <motion.div
          className="absolute z-30 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"
          initial={{ x: 0, y: 0, scale: 0 }}
          animate={{ x: 120, y: 0, scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute z-30 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"
          initial={{ x: 0, y: 0, scale: 0 }}
          animate={{ x: -97, y: -70, scale: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

      </div>
    </div>
  );
}
