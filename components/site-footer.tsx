import Link from "next/link";
import { BRAND, NAVIGATION } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-card/30 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="font-mono font-bold text-lg mb-2">{BRAND.name}</h3>
            <p className="text-sm text-foreground/60 mb-4">{BRAND.tagline}</p>
            <p className="text-xs text-foreground/50">Bangalore, India</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              {NAVIGATION.slice(1, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {NAVIGATION.slice(4, 7).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-foreground/60">hello@photonsecurity.com</li>
              <li className="text-foreground/60">+91 1234 567 890</li>
              <li className="text-foreground/60">Bangalore, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-foreground/50 mb-4 md:mb-0">
            © 2025 Photon Security. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/legal/privacy"
              className="text-xs text-foreground/50 hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="text-xs text-foreground/50 hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
