import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: [
    "10.20.115.94",
  ],

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async redirects() {
    return [
      // The ASM service was renamed to CTEM; keep old links and search results working.
      {
        source: "/services/attack-surface-management",
        destination: "/services/continuous-threat-exposure-management",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;