"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, localePath, stripLocale } from "../i18n";

type LanguageSwitchProps = {
  // The language the link leads to; the label and title are written in it.
  locale: Locale;
  label: string;
  title: string;
};

// Links to the current page in the other language.
export function LanguageSwitch({ locale, label, title }: LanguageSwitchProps) {
  const path = stripLocale(usePathname());

  return (
    <Link className="language-switch" href={localePath(locale, path)} hrefLang={locale} lang={locale} title={title}>
      {label}
    </Link>
  );
}
