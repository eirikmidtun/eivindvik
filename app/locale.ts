import { lang } from "next/root-params";
import { defaultLocale, isLocale } from "./i18n";

// The locale of the current route, read from the root [lang] segment.
export async function getLocale() {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}
