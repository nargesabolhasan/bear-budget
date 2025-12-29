import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "bear-budget-production.up.railway.app",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
