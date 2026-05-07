"use client";

import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { useMagneticEffect } from "@/lib/gsap-hooks";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react";

const FOOTER_NAV = {
  matrix: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
  connect: [
    { icon: GithubLogo, href: "#" },
    { icon: LinkedinLogo, href: "#" },
    { icon: TwitterLogo, href: "#" },
  ]
};

export function Footer() {
  const logoRef = useMagneticEffect<HTMLAnchorElement>(0.2);

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_0.5px,transparent_0.5px)] bg-[size:40px_40px]" />
      </div>

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-10">
            <Link ref={logoRef} href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/assets/footer.png"
                alt="Photon Security Logo"
                width={160}
                height={60}
                className="h-14 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              />
            </Link>
            <p className="text-xl text-white/30 font-light leading-relaxed max-w-sm">
              {BRAND.tagline}. Leading the frontier of offensive research and defensive architecture.
            </p>
            <div className="flex gap-4">
               {FOOTER_NAV.connect.map((social, i) => (
                 <a 
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                 >
                    <social.icon size={20} weight="light" />
                 </a>
               ))}
            </div>
          </div>

          {/* Matrix Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-10">
              Core_Matrix
            </h4>
            <ul className="space-y-4">
              {FOOTER_NAV.matrix.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-300"
                  >
                    <div className="w-1.5 h-px bg-white/20 group-hover:w-4 group-hover:bg-white transition-all" />
                    <span className="text-sm uppercase tracking-widest">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-10">
              Uplink_Channels
            </h4>
            <div className="space-y-8">
               <div className="space-y-2">
                  <p className="text-[10px] font-mono text-white/10 uppercase tracking-widest">Global HQ</p>
                  <address className="not-italic text-white/50 leading-relaxed text-sm">
                    Lavarpur Road, GIFT City,<br />
                    Gandhinagar, Gujarat, India
                  </address>
               </div>
               <div className="space-y-4 pt-4 border-t border-white/5">
                  <a href="mailto:info@photonsecurity.in" className="block text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest">
                    info@photonsecurity.in
                  </a>
                  <a href="tel:+917990282583" className="block text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest">
                    +91 79902 82583
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
             <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
               © {new Date().getFullYear()} Photon_Security_Systems
             </p>
             <div className="hidden md:block w-px h-4 bg-white/5" />
             <div className="flex gap-6">
                {FOOTER_NAV.legal.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="text-[10px] font-mono text-white/10 hover:text-white/40 transition-colors uppercase tracking-widest"
                  >
                    {item.label}
                  </Link>
                ))}
             </div>
          </div>
          
          <div className="flex items-center gap-4 text-white/20">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[9px] font-mono uppercase tracking-[0.4em]">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

