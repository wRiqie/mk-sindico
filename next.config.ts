import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_SUPABASE_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseUrl
      ? [new URL("/storage/v1/object/public/**", supabaseUrl)]
      : [],
  },
  async rewrites() {
    return [{ source: "/diagnostico", destination: "/diagnostico.html" }];
  },
};

export default nextConfig;
