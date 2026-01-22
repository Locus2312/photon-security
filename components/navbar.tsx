"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setIsScrolled(current > 50);

      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (current / windowHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center transition-all duration-500 ${"justify-between h-20"}`}
          >
            <div className="flex items-center">
              <Link href="/" className="relative z-10">
                <Image
                  src="/assets/logo.png"
                  alt="Photon Security"
                  width={192}
                  height={48}
                  priority
                  className={`transition-all duration-500 ${
                    isScrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                />
              </Link>
            </div>

            <div
              className={`pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
    transition-all duration-500
    ${isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
  `}
            >
              <Link href="/">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full blur-xl bg-white/20 animate-pulse scale-125" />
                  <Image
                    src="/assets/eagle_no_bg.png"
                    alt="Photon Security Eagle"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            <div
              className={`hidden md:flex items-center space-x-8 transition-all duration-500 ${
                isScrolled
                  ? "opacity-0 pointer-events-none absolute"
                  : "opacity-100"
              }`}
            >
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div
              className={`hidden md:block transition-all duration-500 ${
                isScrolled
                  ? "opacity-0 pointer-events-none absolute"
                  : "opacity-100"
              }`}
            >
              <Link href="mailto:sales@photonsecurity.in">
                <button className="px-4 py-2 text-sm bg-white text-black font-medium rounded-md hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20">
                  Request Assessment
                </button>
              </Link>
            </div>

            {/* Mobile Menu Toggle - Always visible on mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 hover:bg-card rounded-md transition-all duration-500 ${
                isScrolled ? "absolute right-4" : ""
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Progress Bar Container - Only visible when scrolled */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-transparent overflow-visible transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Left Progress Line */}
          <div
            className="absolute left-0 bottom-0 h-0.5 bg-linear-to-r from-white via-white to-transparent"
            style={{
              width: `${scrollProgress / 2}%`,
              transition: "width 0.1s ease-out",
              boxShadow:
                "0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)",
            }}
          />

          {/* Right Progress Line */}
          <div
            className="absolute right-0 bottom-0 h-0.5 bg-linear-to-l from-white via-white to-transparent"
            style={{
              width: `${scrollProgress / 2}%`,
              transition: "width 0.1s ease-out",
              boxShadow:
                "0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)",
            }}
          />

          {/* Center glow effect when lines are close */}
          <div
            className="absolute left-1/2 -top-8 -translate-x-1/2 w-24 h-24 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: scrollProgress > 80 ? 0.4 : 0,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="mailto:sales@photonsecurity.in"
                  onClick={() => setMobileOpen(false)}
                >
                  <button className="w-full px-4 py-2.5 text-sm bg-white text-black font-medium rounded-md hover:bg-white/90 transition-all duration-300">
                    Request Assessment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
