import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
      {
        hostname: "**",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
