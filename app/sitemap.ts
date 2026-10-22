import type { MetadataRoute } from "next";
import { getWrittenWorkGroups } from "./archive";
import { nnContent, siteUrl } from "./content";
import { languageAlternates, localePath, locales } from "./i18n";

// Every page is listed once per locale, each entry with its hreflang alternates.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getWrittenWorkGroups();
  const pages = [
    { path: "/", priority: 1 },
    { path: "/kapittel", priority: 0.9 },
    { path: "/dikt-og-tekstar", priority: 0.7 },
    { path: "/kart", priority: 0.6 },
    { path: "/om-oss", priority: 0.5 },
    ...nnContent.readableKapitler.map((kapittel) => ({ path: `/kapittel/${kapittel.slug}`, priority: 0.8 })),
    ...groups.flatMap((group) =>
      group.items.map((item) => ({ path: `/dikt-og-tekstar/${item.id}`, priority: 0.6 })),
    ),
  ];
  const absolute = (path: string) => `${siteUrl}${path === "/" ? "/" : path}`;

  return locales.flatMap((locale) =>
    pages.map(({ path, priority }) => ({
      url: absolute(localePath(locale, path)),
      priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([language, href]) => [language, absolute(href)]),
        ),
      },
    })),
  );
}
