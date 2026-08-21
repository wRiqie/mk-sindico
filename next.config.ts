import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/diagnostico", destination: "/diagnostico.html" }];
  },
};

export default nextConfig;
