import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { ChatBot } from "@/components/chatBot";
import { PageWrapper } from "@/components/page-wrapper";
import "./globals.css";

const farray = localFont({
  src: [
    {
      path: "../public/fonts/farray/FARRAY.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-farray",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.photonsecurity.in"),
  title: "Photon Security",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Modern, research-driven cybersecurity services for Indian enterprises. VAPT, audits, MSS, and compliance advisory.",
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00E5FF" },
    { media: "(prefers-color-scheme: dark)", color: "#00E5FF" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${farray.variable}`}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Photon Security",
              "url": "https://www.photonsecurity.in",
              "logo": "https://www.photonsecurity.in/assets/eagle_dark_bg.png",
              "sameAs": [
                "https://www.linkedin.com/company/photon-security"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "sales",
                "email": "sales@photonsecurity.in"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "SiteNavigationElement",
                  "position": 1,
                  "name": "About Us",
                  "url": "https://www.photonsecurity.in/about"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 2,
                  "name": "Our Services",
                  "url": "https://www.photonsecurity.in/services"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 3,
                  "name": "Careers",
                  "url": "https://www.photonsecurity.in/careers"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 4,
                  "name": "Contact Us",
                  "url": "https://www.photonsecurity.in/contact"
                }
              ]
            })
          }}
        />
        <Navbar />

        <PageWrapper>
          <main className="pt-20">{children}</main>
          <BackToTop />
          <ChatBot />
          <Footer />
        </PageWrapper>


      </body>
    </html>
  );
}
