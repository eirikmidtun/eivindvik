import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/rim",
        destination: "/dikt-og-tekstar",
        permanent: true,
      },
      {
        source: "/kapittel/:slug(prologar|rim|hoegtider|minneord|bankar)",
        destination: "/dikt-og-tekstar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
