import type { Metadata } from "next";
import { author, siteName, siteUrl } from "../content";
import { getContent, getDictionary } from "../dictionary";
import { locales, ogLocales } from "../i18n";
import { resolveLocale } from "../metadata";
import "../globals.css";

// Only the supported locales are rendered. Nynorsk paths without a prefix are
// rewritten to /nn in next.config.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const ui = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: ui.siteTitle,
      template: `%s | ${siteName}`,
    },
    description: getContent(locale).siteDescription,
    authors: [{ name: author }],
    openGraph: {
      siteName,
      locale: ogLocales[locale],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    appleWebApp: {
      title: "Eivindvik",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const locale = resolveLocale((await params).lang);

  return (
    <html lang={getDictionary(locale).htmlLang} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
