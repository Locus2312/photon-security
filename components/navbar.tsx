"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  List,
  X,
  House,
  Gear,
  ChatCircleDots,
  Info,
  Briefcase,
  BookOpen,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagneticEffect } from "@/lib/gsap-hooks";

const NAVIGATION = [
  { label: "Home", href: "/", Icon: House },
  { label: "About", href: "/about", Icon: Info },
  { label: "Services", href: "/services", Icon: Gear },
  { label: "Careers", href: "/careers", Icon: Briefcase },
  { label: "Blog", href: "/blogs", Icon: BookOpen },
  { label: "Contact", href: "/contact", Icon: ChatCircleDots },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  const logoRef = useMagneticEffect<HTMLAnchorElement>(0.2);
  const ctaRef = useMagneticEffect<HTMLDivElement>(0.3);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex items-center justify-between w-full max-w-5xl h-16 px-4 md:px-6 rounded-full transition-all duration-500",
          "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
          scrolled ? "max-w-4xl border-white/15" : "max-w-5xl",
        )}
      >
        {/* Left: Logo */}
        <Link 
          ref={logoRef}
          href="/" 
          className="flex items-center pl-2"
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-transform hover:scale-110">
            <Image
              src="/assets/falcon_no_bg.png"
              alt="Logo"
              width={110}
              height={110}
              className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
            />
          </div>
        </Link>

        {/* Center: Navigation Icons */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] rounded-full p-1 border border-white/5">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                  isActive ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/10"
                )}
              >
                <item.Icon size={20} weight={isActive ? "bold" : "light"} />
                <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-[0.3em] font-mono text-white/40 whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <div ref={ctaRef}>
            <Link
              href="mailto:sales@photonsecurity.in"
              className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-widest text-white bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all duration-300 group shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Request Assessment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white/50 hover:text-white transition-all"
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-24 left-6 right-6 p-6 rounded-3xl bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/10 z-40 lg:hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col gap-4">
              {NAVIGATION.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl transition-all",
                      isActive ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5"
                    )}
                  >
                    <item.Icon size={24} weight={isActive ? "bold" : "light"} />
                    <span className="text-lg font-light tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              <hr className="border-white/5 my-2" />
              <Link
                href="mailto:sales@photonsecurity.in"
                onClick={() => setMobileOpen(false)}
                className="relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                Request Assessment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

