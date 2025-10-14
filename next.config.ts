import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Enable static export for Firebase Hosting
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true,  // Better for Firebase Hosting
};

export default nextConfig;