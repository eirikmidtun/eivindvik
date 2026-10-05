import type { Metadata } from "next";
import { AuthorSection } from "./components/AuthorSection";
import { Footer } from "./components/Footer";
import { HomeHero } from "./components/HomeHero";
import { JsonLd } from "./components/JsonLd";
import { KorsSection } from "./components/KorsSection";
import { TemaSection } from "./components/TemaSection";
import { TusenaarsstadSection } from "./components/TusenaarsstadSection";
import {
  author,
  authorIntro,
  hero,
  kors,
  korsIntro,
  siteName,
  siteUrl,
  temaer,
  tusenaarsstad,
  utforsk,
} from "./content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: siteName, url: siteUrl, inLanguage: "nn" },
            {
              "@type": "CollectionPage",
              name: siteName,
              url: siteUrl,
              inLanguage: "nn",
              author: { "@type": "Person", name: author },
              about: {
                "@type": "Place",
                name: "Eivindvik",
                containedInPlace: { "@type": "AdministrativeArea", name: "Gulen, Vestland" },
              },
            },
          ],
        }}
      />
      <main>
        <HomeHero {...hero} />
        <TusenaarsstadSection {...tusenaarsstad} />
        <KorsSection {...korsIntro} kors={kors} />
        <TemaSection {...utforsk} temaer={temaer} />
        <AuthorSection {...authorIntro} name={author} />
      </main>
      <Footer />
    </>
  );
}
