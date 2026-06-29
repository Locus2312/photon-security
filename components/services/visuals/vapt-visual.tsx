"use client";

import { motion } from "framer-motion";

export function VaptVisual() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-[#050505] rounded-3xl overflow-hidden relative flex items-center justify-center p-8 border border-white/5">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Scanner overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c85a3a]/10 to-transparent w-full h-[20%]"
        animate={{ y: ["-100%", "500%"] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />

      <svg viewBox="0 0 400 300" className="w-full h-full max-w-lg z-10 overflow-visible">
        {/* Paths between nodes */}
        <motion.path
          d="M 100 150 L 200 100 L 300 150 L 200 200 Z"
          fill="none"
          stroke="#333"
          strokeWidth="1"
        />
        <motion.path
          d="M 200 100 L 200 50"
          fill="none"
          stroke="#333"
          strokeWidth="1"
        />
        <motion.path
          d="M 200 200 L 200 250"
          fill="none"
          stroke="#333"
          strokeWidth="1"
        />
        <motion.path
          d="M 100 150 L 50 150"
          fill="none"
          stroke="#333"
          strokeWidth="1"
        />
        <motion.path
          d="M 300 150 L 350 150"
          fill="none"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Animated active path (attack vector) */}
        <motion.path
          d="M 50 150 L 100 150 L 200 100 L 300 150"
          fill="none"
          stroke="#c85a3a"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Nodes */}
        {[
          { cx: 50, cy: 150, delay: 0 },
          { cx: 100, cy: 150, delay: 0.2 },
          { cx: 200, cy: 100, delay: 0.4 },
          { cx: 300, cy: 150, delay: 0.6, highlight: true },
          { cx: 200, cy: 200, delay: 0.3 },
          { cx: 200, cy: 50, delay: 0.5 },
          { cx: 200, cy: 250, delay: 0.4 },
          { cx: 350, cy: 150, delay: 0.7 },
        ].map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.highlight ? 12 : 6}
              fill="#0a0a0a"
              stroke={node.highlight ? "#c85a3a" : "#666"}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: node.delay, type: "spring" }}
            />
            {node.highlight && (
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={16}
                fill="none"
                stroke="#c85a3a"
                strokeWidth="1"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              />
            )}
          </g>
        ))}
        
        {/* Terminal Text Overlay */}
        <motion.text
          x="180"
          y="70"
          fill="#c85a3a"
          fontSize="8"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.8, 1] }}
        >
          [!] VULN_DETECTED
        </motion.text>
      </svg>
    </div>
  );
}
