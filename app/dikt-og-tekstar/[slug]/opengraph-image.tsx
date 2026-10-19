import { ImageResponse } from "next/og";
import { getWrittenWork, getWrittenWorkGroups } from "../../archive";
import { OgCard } from "../../components/OgCard";
import { author, siteName } from "../../content";

export const alt = `Dikt og tekstar frå ${siteName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const groups = await getWrittenWorkGroups();
  return groups.flatMap((group) => group.items.map((item) => ({ slug: item.id })));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const found = await getWrittenWork((await params).slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`DIKT OG TEKSTAR · ${found?.group.title.toUpperCase() ?? ""}`}
        title={found?.work.title ?? siteName}
        footer={`${siteName} · ${author}`}
      />
    ),
    size,
  );
}
