import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Photon Security | Energy of a Photon. Strength of Security.",
  description:
    "Modern, research-driven cybersecurity services for Indian enterprises. VAPT, audits, MSS, and compliance advisory.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark scroll-smooth ${farray.variable}`}>
      <head>
        <meta name="theme-color" content="#00E5FF" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

