import type { MetadataRoute } from "next";
import { kapitler, siteUrl } from "./content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/kapittel`, priority: 0.9 },
    { url: `${siteUrl}/dikt-og-tekstar`, priority: 0.7 },
    { url: `${siteUrl}/kart`, priority: 0.6 },
    { url: `${siteUrl}/om-oss`, priority: 0.5 },
    ...kapitler.map((kapittel) => ({ url: `${siteUrl}/kapittel/${kapittel.slug}`, priority: 0.8 })),
  ];
}
