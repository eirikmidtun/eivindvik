import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { KapittelGroup } from "../components/KapittelGroup";
import { PageHero } from "../components/PageHero";
import { author, kapitler, kapittelIndexHero, siteName, temaer } from "../content";

export const metadata: Metadata = {
  title: "Alle kapittel",
  description: `Oversikt over alle ${kapitler.length} kapitla i arkivet om Eivindvik – frå steinkrossane og tingstaden til krigsminne, skikkar, rim og minneord.`,
  alternates: { canonical: "/kapittel" },
};

export default function KapittelIndexPage() {
  return (
    <>
      <main>
        <PageHero image={kapittelIndexHero} variant="banner" />
        <header className="kapittel-index-intro written-intro">
          <p className="eyebrow">Lokalhistoriske tekstar</p>
          <h1>{siteName}</h1>
          <p className="written-intro-byline">{kapitler.length} kapittel av {author}</p>
          <p className="written-intro-copy">
            Ei samling tekstar om menneska, stadene og livet i Eivindvik og Gulen. Vel eit kapittel i lista for å lese historia.
          </p>
        </header>
        <div className="kapittel-index section-inner">
          <div className="kapittel-grid">
            {temaer.map((tema) => (
              <KapittelGroup key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
