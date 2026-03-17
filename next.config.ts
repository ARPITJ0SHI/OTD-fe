import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // You can also add wildcards for broader match
      // {
      //   protocol: 'https',
      //   hostname: '*.unsplash.com',
      // },
    ],
  },
};

export default nextConfig;
