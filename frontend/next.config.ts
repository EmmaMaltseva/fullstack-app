import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.[jt]sx?$/], // <-- Важно: только для .js/.ts/.jsx/.tsx файлов
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
