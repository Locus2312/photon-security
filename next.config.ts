import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.photonsecurity.in" }],
        destination: "https://photonsecurity.in/:path*",
        permanent: true,
      },
    ];
},
};

export default nextConfig;
