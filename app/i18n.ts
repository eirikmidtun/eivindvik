export const locales = ["nn", "en"] as const;

export type Locale = (typeof locales)[number];

// Nynorsk is the original language and lives at the site root; English lives under /en.
export const defaultLocale: Locale = "nn";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Turns a site path such as "/kapittel/namnet" into the path for the given locale.
export function localePath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// The inverse of localePath: the default-locale path for any localized path.
// It also strips the default locale, which appears in the route path that
// pages are prerendered under (/nn/kapittel/namnet is served at /kapittel/namnet).
export function stripLocale(path: string) {
  for (const locale of locales) {
    if (path === `/${locale}`) return "/";
    if (path.startsWith(`/${locale}/`)) return path.slice(locale.length + 1);
  }
  return path;
}

export const ogLocales: Record<Locale, string> = {
  nn: "nn_NO",
  en: "en_GB",
};

// hreflang alternates for a default-locale path, shared by metadata and the sitemap.
export function languageAlternates(path: string) {
  return {
    nn: localePath("nn", path),
    en: localePath("en", path),
    "x-default": localePath(defaultLocale, path),
  };
}
