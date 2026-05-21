import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      }
    ],
    domains: [
      "utfs.io",
    ]
  }
};

export default nextConfig;
