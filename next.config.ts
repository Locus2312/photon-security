import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/terms",
        destination: "/legal/terms",
        permanent: true,
      },
      {
        source: "/quote/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/resources/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/case-studies/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/:slug+",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "photonsecurity.in" }],
        destination: "https://www.photonsecurity.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
