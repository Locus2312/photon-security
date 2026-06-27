"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/constants";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import { LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FOOTER_NAV = {
  matrix: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blogs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
  connect: [
    { icon: LinkedinLogoIcon, href: "https://linkedin.com/company/photonsec/" },
    { icon: XLogoIcon, href: "https://x.com/GoPhotonSec" },
  ]
};

export function Footer() {
  const logoRef = useMagneticEffect<HTMLAnchorElement>(0.2);
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer content fading in
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          }
        }
      );

      // Animate the huge background text slightly on scroll
      gsap.fromTo(bigTextRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 0.03, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0a0a0a] text-white relative z-50 pt-16 md:pt-24 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">

      {/* Background radial pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* Massive Background Text */}
      <div ref={bigTextRef} className="absolute bottom-[-5%] md:bottom-[-10%] left-0 w-full text-center pointer-events-none select-none overflow-hidden flex justify-center z-0">
        <span className="text-[22vw] font-bold leading-none tracking-tighter text-white whitespace-nowrap">
          PHOTON
        </span>
      </div>

      <div ref={contentRef} className="container max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-24 relative z-10 flex flex-col justify-between min-h-[50vh]">

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">

          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-10">
            <Link ref={logoRef} href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/assets/footer.png"
                alt="Photon Security Logo"
                width={180}
                height={65}
                className="h-14 md:h-16 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              />
            </Link>
            <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-sm">
              {BRAND.tagline}. No silos. No noise. No guesswork.
            </p>
            <div className="flex gap-4">
              {FOOTER_NAV.connect.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <social.icon size={22} weight="light" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">

            {/* Matrix */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/30 mb-8 border-b border-white/10 pb-4 inline-block">
                Core Matrix
              </h4>
              <ul className="space-y-5">
                {FOOTER_NAV.matrix.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-4 text-white/50 hover:text-white transition-all duration-300 w-fit"
                    >
                      <div className="w-2 h-px bg-white/20 group-hover:w-6 group-hover:bg-white transition-all duration-300" />
                      <span className="text-sm md:text-base uppercase tracking-widest">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/30 mb-8 border-b border-white/10 pb-4 inline-block">
                Uplink Channels
              </h4>
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-[11px] font-mono text-white/20 uppercase tracking-widest">Global HQ</p>
                  <address className="not-italic text-white/60 leading-relaxed text-sm md:text-base font-light">
                    Lavarpur Road, GIFT City,<br />
                    Gandhinagar, Gujarat, India
                  </address>
                </div>
                <div className="space-y-5 pt-4">
                  <a href="mailto:info@photonsecurity.in" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm md:text-base tracking-widest group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                    info@photonsecurity.in
                  </a>
                  <a href="tel:+917990282583" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm md:text-base tracking-widest group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                    +91 79902 82583
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 md:pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <p className="text-[10px] md:text-[11px] font-mono text-white/30 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Photon Security
            </p>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="flex flex-wrap justify-center gap-6">
              {FOOTER_NAV.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[10px] md:text-[11px] font-mono text-white/20 hover:text-white/60 transition-colors uppercase tracking-[0.15em]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
