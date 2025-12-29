/** @type {import('next').NextConfig} */
const withPWA = require("@imbios/next-pwa")({
  dest: "public", // service worker + workbox files go here
  disable: process.env.NODE_ENV === "development", // disable in dev
  register: true, // auto register the SW
  publicExcludes: ["!robots.txt", "!sitemap.xml"],
});

const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // good for many hosts (incl. Railway)

  // Image settings
  images: {
    // Allow remote images from your domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bear-budget-production.up.railway.app",
        port: "",
        pathname: "/**",
      },
    ],
    // (Optional) If you use images from other domains, add them here:
    // domains: ['example.com', 'cdn.example.com'],
    // You could also use remotePatterns for more flexible matching
  },

  // Headers (Optional: improves caching/security)
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|gif|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
