"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ListIcon,
  XIcon,
  HouseIcon,
  GearIcon,
  ChatCircleDotsIcon,
  InfoIcon,
  BriefcaseIcon,
  ArticleIcon,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagneticEffect } from "@/lib/gsap-hooks";

const NAVIGATION = [
  { label: "Home", href: "/", Icon: HouseIcon },
  { label: "About", href: "/about", Icon: InfoIcon },
  { label: "Services", href: "/services", Icon: GearIcon },
  { label: "Careers", href: "/careers", Icon: BriefcaseIcon },
  { label: "Blog", href: "/blogs", Icon: ArticleIcon },
  { label: "Contact", href: "/contact", Icon: ChatCircleDotsIcon },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const pathname = usePathname();

  const logoRef = useMagneticEffect<HTMLAnchorElement>(0.2);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const navEl = document.getElementById('main-nav');
      if (navEl) navEl.style.pointerEvents = 'none';

      const elUnderNav = document.elementFromPoint(window.innerWidth / 2, 70);

      if (navEl) navEl.style.pointerEvents = '';

      const isLight = elUnderNav?.closest('[data-theme="light"]') !== null;
      setIsLightTheme(isLight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="main-nav" className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 transition-colors duration-200">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "relative flex items-center justify-between lg:justify-center w-full max-w-5xl h-16 px-4 md:px-6 rounded-full transition-all duration-200",
          isLightTheme
            ? "bg-black/5 backdrop-blur-2xl border border-black/10 shadow-xl"
            : "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
          "lg:bg-transparent lg:backdrop-blur-none lg:border-transparent lg:shadow-none",
          scrolled ? "max-w-4xl border-white/15" : "max-w-5xl",
        )}
      >
        <Link
          ref={logoRef}
          href="/"
          className="flex items-center pl-2 lg:hidden"
        >
          <div className="relative w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
            <Image
              src="/assets/falcon_no_bg.png"
              alt="Logo"
              width={80}
              height={80}
              className={cn(
                "object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-200",
                isLightTheme ? "invert" : "invert-0"
              )}
            />
          </div>
        </Link>

        <div
          className={cn(
            "hidden lg:flex items-center rounded-full transition-all duration-200",
            isLightTheme
              ? "bg-black/5 backdrop-blur-2xl border border-black/10 shadow-xl"
              : "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
            scrolled ? "gap-6 px-8 h-12" : "gap-10 px-12 h-14"
          )}
        >
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative group flex items-center justify-center rounded-full transition-all duration-200",
                  scrolled ? "w-8 h-8" : "w-10 h-10",
                  isActive
                    ? (isLightTheme ? "text-white" : "text-black")
                    : (isLightTheme ? "text-black/40 hover:text-black hover:bg-black/5" : "text-white/40 hover:text-white hover:bg-white/10")
                )}
              >
                <item.Icon size={scrolled ? 18 : 20} weight={isActive ? "bold" : "light"} />
                <span className={cn(
                  "absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-[0.3em] font-mono whitespace-nowrap pointer-events-none",
                  isLightTheme ? "text-black/60" : "text-white/40"
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className={cn(
                      "absolute inset-0 rounded-full -z-10",
                      isLightTheme ? "bg-black" : "bg-white"
                    )}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Mobile Toggle */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0">
          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all",
              isLightTheme
                ? "bg-black/5 text-black/50 hover:text-black"
                : "bg-white/5 text-white/50 hover:text-white"
            )}
          >
            {mobileOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

