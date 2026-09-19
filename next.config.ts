import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-**",
        // Every src is built by `unsplash()` in src/lib/content.ts, so the
        // query string is fixed and can be pinned exactly.
        search: "?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  },
};

export default nextConfig;
