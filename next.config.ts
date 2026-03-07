import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
    ],
  },
  // Allow pdf-parse to be used in scripts (server-side only)
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
