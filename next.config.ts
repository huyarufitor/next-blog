import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.25"],
  webpack(config) {
    config.module.rules.push({
      test: /\.(md|mdx)$/i,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
