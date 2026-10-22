import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { author, siteName } from "./content";
import { isLocale, languageAlternates, type Locale, localePath, locales, ogLocales } from "./i18n";

// Narrows the [lang] route param; dynamicParams = false on the root layout
// already limits it to the supported locales.
export function resolveLocale(lang: string): Locale {
  if (!isLocale(lang)) notFound();
  return lang;
}

type PageMetadataOptions = {
  // Short content title; the root layout's template adds the site name.
  title?: string;
  ogTitle?: string;
  description: string;
  type?: "website" | "article";
  // Use the site-wide sharing image instead of one generated for the route.
  siteImage?: boolean;
};

// Canonical URL, hreflang alternates and Open Graph for a page, given its
// default-locale path. Next.js merges metadata shallowly, so openGraph repeats
// siteName and locale from the root layout.
export function pageMetadata(
  locale: Locale,
  path: string,
  { title, ogTitle, description, type = "website", siteImage = false }: PageMetadataOptions,
): Metadata {
  const url = localePath(locale, path);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: ogTitle ?? title,
      description,
      siteName,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
      type,
      url,
      ...(type === "article" ? { authors: [author] } : {}),
      ...(siteImage ? { images: [localePath(locale, "/opengraph-image")] } : {}),
    },
  };
}
