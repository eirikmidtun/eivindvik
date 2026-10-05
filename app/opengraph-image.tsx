import { ImageResponse } from "next/og";
import { OgCard } from "./components/OgCard";

export const alt = "Eivindvik før og no – lokalhistorisk arkiv om Eivindvik og Gulen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="EI LOKALHISTORISK SAMLING"
        title="Eivindvik"
        subtitle="før og no"
        footer="Gulen · Vestland · 27 kapittel av Magnor Midtun"
      />
    ),
    size,
  );
}
