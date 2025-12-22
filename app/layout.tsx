import type React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
