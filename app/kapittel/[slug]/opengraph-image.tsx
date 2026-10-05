import { ImageResponse } from "next/og";
import { OgCard } from "../../components/OgCard";
import { author, kapitler, siteName } from "../../content";

export const alt = `Kapittel frå ${siteName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return kapitler.map((kapittel) => ({ slug: kapittel.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kapittel = kapitler.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`KAPITTEL ${String(kapittel?.number ?? "").padStart(2, "0")} · ${kapittel?.temaTitle.toUpperCase() ?? ""}`}
        title={kapittel?.title ?? siteName}
        footer={`${siteName} · ${author}`}
      />
    ),
    size,
  );
}
