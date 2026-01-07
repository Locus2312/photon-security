import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      // Redirect all http://photonsecurity.in/* to https://www.photonsecurity.in/*
      {
        source: "/:path*",
        has: [{ type: "host", value: "photonsecurity.in" }],
        destination: "https://www.photonsecurity.in/:path*",
        permanent: true,
      },
      // Redirect all https://photonsecurity.in/* to https://www.photonsecurity.in/*
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.photonsecurity.in" }],
        destination: "https://www.photonsecurity.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

