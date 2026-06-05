import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      }
    ],
  },
  cacheComponents: true,
  turbopack: {
    resolveAlias: {
      "@better-auth/kysely-adapter": "./lib/empty.ts"
    },
  },
};

export default nextConfig;
