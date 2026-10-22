import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // There is no root layout outside app/[lang], so unmatched URLs need app/global-not-found.tsx.
    globalNotFound: true,
  },
  async redirects() {
    return [
      // Nynorsk is served without a prefix, so /nn is only the internal route.
      // Generated sharing images keep their /nn URLs, which Next.js writes into og:image.
      { source: "/nn", destination: "/", permanent: true },
      { source: "/nn/:path((?!(?:.*/)?opengraph-image).*)", destination: "/:path", permanent: true },
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
      {
        source: "/en/kapittel/:slug(prologar|rim|hoegtider|minneord|bankar)",
        destination: "/en/dikt-og-tekstar",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      // Checked after public files and static routes such as /sitemap.xml, so
      // only page paths reach the Nynorsk routes under app/[lang].
      afterFiles: [{ source: "/:path((?!(?:en|nn)(?:/|$)).*)", destination: "/nn/:path" }],
      fallback: [],
    };
  },
};

export default nextConfig;
