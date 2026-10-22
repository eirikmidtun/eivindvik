import { ImageResponse } from "next/og";
import { OgCard } from "../components/OgCard";
import { siteName } from "../content";
import { getDictionary } from "../dictionary";
import { locales } from "../i18n";
import { resolveLocale } from "../metadata";

export const alt = `${siteName} – Eivindvik, Gulen`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { og } = getDictionary(resolveLocale((await params).lang));

  return new ImageResponse(
    (
      <OgCard
        eyebrow={og.siteEyebrow}
        title="Eivindvik"
        subtitle={og.siteSubtitle}
        footer={og.siteFooter}
      />
    ),
    size,
  );
}
