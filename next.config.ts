import type { NextConfig } from "next";
import path from "node:path";

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
      "@better-auth/kysely-adapter": "./lib/better-auth-kysely-stub.ts",
    },
  },
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(typeof config.resolve.alias === "object" && !Array.isArray(config.resolve.alias)
        ? config.resolve.alias
        : {}),
      "@better-auth/kysely-adapter": path.resolve(
        process.cwd(),
        "lib/better-auth-kysely-stub.ts"
      ),
    };
    return config;
  },
};

export default nextConfig;
