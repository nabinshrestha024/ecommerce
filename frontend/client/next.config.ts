import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.shop.com",
      },
      {
        protocol: "http",
        hostname: "192.168.80.229",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
