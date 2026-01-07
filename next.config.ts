import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Redirect photonsecurity.in (non-www) to www.photonsecurity.in
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
