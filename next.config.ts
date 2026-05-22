import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "countriehoodlums.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/instagram",
        destination: "https://www.instagram.com/countriehoodlums",
        permanent: false,
      },
      {
        source: "/tiktok",
        destination: "https://www.tiktok.com/@countriehoodlums",
        permanent: false,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@countriehoodlums",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
