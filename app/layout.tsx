import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
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
  metadataBase: new URL("https://photonsecurity.in"),
  title: "Photon Security",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Modern, research-driven cybersecurity services for Indian enterprises. VAPT, audits, MSS, and compliance advisory.",
  alternates: {
    canonical: "https://www.photonsecurity.in/",
  },

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
        <Navbar />
        <main className="pt-20">{children}</main>
        <BackToTop />
        <SpeedInsights />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
