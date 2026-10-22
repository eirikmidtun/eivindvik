import { ImageResponse } from "next/og";
import { getWrittenWork, getWrittenWorkGroups } from "../../../archive";
import { OgCard } from "../../../components/OgCard";
import { author, siteName } from "../../../content";
import { getDictionary } from "../../../dictionary";
import { resolveLocale } from "../../../metadata";

export const alt = `${siteName} · ${author}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const groups = await getWrittenWorkGroups();
  return groups.flatMap((group) => group.items.map((item) => ({ slug: item.id })));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const found = await getWrittenWork(slug, locale);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`${getDictionary(locale).og.writtenWorks} · ${found?.group.title.toUpperCase() ?? ""}`}
        title={found?.work.title ?? siteName}
        footer={`${siteName} · ${author}`}
      />
    ),
    size,
  );
}
