import Link from "next/link";
import Image from "next/image";
import { BRAND, NAVIGATION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/footer.png"
                alt="Photon Security Logo"
                width={150}      
                height={80}
                className="h-auto w-auto"
              />
            </Link>

            <p className="text-sm text-foreground/60 mb-4">{BRAND.tagline}</p>
            <p className="text-xs text-foreground/50">GIFT City, India</p>
          </div>

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

          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {NAVIGATION.slice(3, 8).map((item) => (
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

          <div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-foreground/60">admin@photonsecurity.in</li>
              <li className="text-foreground/60">+91 957473 7506</li>
              <li className="text-foreground/60"> GIFT City, India</li>
            </ul>
          </div>
        </div>

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

