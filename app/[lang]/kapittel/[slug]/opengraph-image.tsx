import { ImageResponse } from "next/og";
import { OgCard } from "../../../components/OgCard";
import { author, nnContent, siteName } from "../../../content";
import { getContent, getDictionary } from "../../../dictionary";
import { resolveLocale } from "../../../metadata";

export const alt = `${siteName} · ${author}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return nnContent.readableKapitler.map((kapittel) => ({ slug: kapittel.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const kapittel = getContent(locale).readableKapitler.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`${getDictionary(locale).og.chapter} ${String(kapittel?.number ?? "").padStart(2, "0")} · ${kapittel?.temaTitle.toUpperCase() ?? ""}`}
        title={kapittel?.title ?? siteName}
        footer={`${siteName} · ${author}`}
      />
    ),
    size,
  );
}
