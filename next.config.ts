import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "imgs.search.brave.com" },
      { protocol: "https", hostname: "cloud.appwrite.io" },
      { protocol: "https", hostname: "fra.cloud.appwrite.io" },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "node-fetch-native-with-agent": "commonjs node-fetch-native-with-agent",
      });
    }
    return config;
  },

  serverExternalPackages: ["node-appwrite", "node-fetch-native-with-agent"],
};

export default nextConfig;
