import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: '**.seadn.io',
      },
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
      },
    ],
  },
};

export default nextConfig;
