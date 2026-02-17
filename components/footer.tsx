import Link from "next/link";
import Image from "next/image";
import { BRAND, NAVIGATION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 py-12 navigation">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/footer.png"
                alt="Photon Security Logo"
                width={120}
                height={80}
                className="h-16 w-auto"
              />
            </Link>

            <p className="text-sm text-foreground/60 mb-4">{BRAND.tagline}</p>

            <p className="text-xs text-foreground/50">GIFT City, India</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              {NAVIGATION.slice(1, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    scroll
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
                    scroll
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

            <div className="space-y-3 text-sm text-foreground/60">
              <a
                href="mailto:info@photonsecurity.in"
                className="block hover:text-primary transition-colors"
              >
                info@photonsecurity.in
              </a>

              <a
                href="tel:+917990282583"
                className="block hover:text-primary transition-colors"
              >
                +91 79902 82583
              </a>

              <address className="not-italic leading-relaxed pt-2">
                <div className="font-medium text-foreground/80">
                  Photon Security
                </div>
                <div>Lavarpur Road, GIFT City, Gandhinagar</div>
                <div>Gujarat, India</div>
              </address>

              <div className="text-xs text-foreground/40 pt-1">
                GSTIN: 24ABIFP6524D1ZE
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-foreground/50 mb-4 md:mb-0">
            © {new Date().getFullYear()} Photon Security. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link
              href="/legal/privacy"
              scroll
              className="text-xs text-foreground/50 hover:text-primary transition-colors"
            >
              Privacy
            </Link>

            <Link
              href="/legal/terms"
              scroll
              className="text-xs text-foreground/50 hover:text-primary transition-colors"
            >
              Terms
            </Link>

            <Link
              href="/legal/cookies"
              scroll
              className="text-xs text-foreground/50 hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
