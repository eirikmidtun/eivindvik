import type { MetadataRoute } from "next";
import { getWrittenWorkGroups } from "./archive";
import { readableKapitler, siteUrl } from "./content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getWrittenWorkGroups();

  return [
    { url: `${siteUrl}/`, priority: 1 },
    { url: `${siteUrl}/kapittel`, priority: 0.9 },
    { url: `${siteUrl}/dikt-og-tekstar`, priority: 0.7 },
    { url: `${siteUrl}/kart`, priority: 0.6 },
    { url: `${siteUrl}/om-oss`, priority: 0.5 },
    ...readableKapitler.map((kapittel) => ({ url: `${siteUrl}/kapittel/${kapittel.slug}`, priority: 0.8 })),
    ...groups.flatMap((group) =>
      group.items.map((item) => ({ url: `${siteUrl}/dikt-og-tekstar/${item.id}`, priority: 0.6 })),
    ),
  ];
}
