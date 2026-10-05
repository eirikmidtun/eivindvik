import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/rim",
        destination: "/dikt-og-tekstar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
