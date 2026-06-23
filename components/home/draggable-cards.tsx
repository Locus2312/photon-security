"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ShieldIcon, LockKeyIcon, DesktopIcon, CrosshairIcon } from "@phosphor-icons/react";

const CARDS = [
  {
    id: 1,
    title: "NOVYRA",
    desc: "ZERO-DAY EXPLOIT MITIGATION FOR DEFI PLATFORMS.",
    tag: "FINTECH",
    bg: "#0a0a0a",
    text: "#ffffff",
    icon: ShieldIcon,
  },
  {
    id: 2,
    title: "STRATAHUB",
    desc: "NATION-STATE LEVEL INFRASTRUCTURE AUDITS.",
    tag: "GOVERNMENT",
    bg: "#2d6a6f",
    text: "#ffffff",
    icon: DesktopIcon,
  },
  {
    id: 3,
    title: "REMIX LABS",
    desc: "CI/CD PIPELINE HARDENING AT HYPERSCALE.",
    tag: "SAAS",
    bg: "#c85a3a",
    text: "#ffffff",
    icon: CrosshairIcon,
  },
  {
    id: 4,
    title: "EDDA",
    desc: "RANSOMWARE RESILIENCE FOR MEDICAL IOT.",
    tag: "HEALTHCARE",
    bg: "#ffffff",
    text: "#0a0a0a",
    icon: LockKeyIcon,
  },
];

export function DraggableCards() {
  const [cards, setCards] = useState(CARDS);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      setCards((prev) => {
        const newCards = [...prev];
        const topCard = newCards.shift();
        if (topCard) newCards.push(topCard);
        return newCards;
      });
      x.set(0);
    } else {
      x.set(0);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#ede8df] text-[#0a0a0a] py-32 flex flex-col items-center overflow-hidden">

      <div className="max-w-[1200px] w-full px-6 text-center mb-16 md:mb-32 z-10">
        <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-4 opacity-50">
          Case Studies
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.9]">
          Our Clients don&apos;t just<br />adapt to threats.<br />They eliminate them.
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-[1000px] h-[500px] flex justify-center items-center cursor-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >

        <motion.div
          className="pointer-events-none absolute z-50 flex items-center justify-center"
          animate={{
            x: cursorPos.x - 40,
            y: cursorPos.y - 40,
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
          <div className="bg-[#0a0a0a] text-white rounded-full w-[80px] h-[80px] flex flex-col items-center justify-center shadow-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
              <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" fill="currentColor" />
            </svg>
            <span className="text-[10px] font-mono font-bold tracking-widest">DRAG</span>
          </div>
        </motion.div>

        {/* Stacked Cards */}
        <div className="relative w-full max-w-[400px] h-[500px]">
          <AnimatePresence mode="popLayout">
            {cards.map((card, index) => {
              const isTop = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;

              return (
                <motion.div
                  key={card.id}
                  layout
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={isTop ? handleDragEnd : undefined}
                  style={{
                    x: isTop ? x : 0,
                    rotate: isTop ? rotate : 0,
                    opacity: isTop ? opacity : 1,
                    backgroundColor: card.bg,
                    color: card.text,
                  }}
                  animate={{
                    scale: isTop ? 1 : isSecond ? 0.95 : isThird ? 0.9 : 0.85,
                    y: isTop ? 0 : isSecond ? 20 : isThird ? 40 : 60,
                    zIndex: cards.length - index,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    opacity: { duration: 0.2 }
                  }}
                  className={`absolute top-0 left-0 w-full h-full rounded-[2rem] p-10 flex flex-col justify-between shadow-2xl origin-bottom ${isTop ? "cursor-grab active:cursor-grabbing" : ""}`}
                >
                  {/* Card Corner Borders */}
                  <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 opacity-30" style={{ borderColor: card.text }}></div>
                  <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 opacity-30" style={{ borderColor: card.text }}></div>
                  <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 opacity-30" style={{ borderColor: card.text }}></div>
                  <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 opacity-30" style={{ borderColor: card.text }}></div>

                  {/* Card Content */}
                  <div className="text-center w-full flex justify-center mt-4">
                    <h3 className="text-3xl font-bold tracking-widest">{card.title}</h3>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <card.icon size={80} weight="thin" />
                  </div>

                  <div className="text-center w-full mb-4">
                    <p className="text-sm font-mono tracking-widest leading-relaxed max-w-[250px] mx-auto opacity-70">
                      {card.desc}
                    </p>
                  </div>

                  <div className="w-full text-center">
                    <span className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase border px-3 py-1 rounded-full opacity-50" style={{ borderColor: card.text }}>
                      {card.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
