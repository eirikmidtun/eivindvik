import type { Metadata } from "next";
import { ButtonLink } from "../components/ButtonLink";
import { CaptionedImage } from "../components/CaptionedImage";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { kartPage } from "../content";

export const metadata: Metadata = {
  title: "Kart",
  description: kartPage.description,
  alternates: { canonical: "/kart" },
};

export default function KartPage() {
  return (
    <>
      <main>
        <PageHero image={kartPage.heroImage}>
          <p className="eyebrow">{kartPage.eyebrow}</p>
          <h1>{kartPage.title}</h1>
          <p className="section-text">{kartPage.text}</p>
        </PageHero>
        <div className="content-page">
          <CaptionedImage
            image={kartPage.image}
            caption={kartPage.caption}
            source={kartPage.source}
            sizes="(max-width: 760px) 100vw, 640px"
          />
          <ButtonLink href={kartPage.link.href} variant="outline">{kartPage.link.label}</ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
