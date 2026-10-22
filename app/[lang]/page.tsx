import type { Metadata } from "next";
import { AuthorSection } from "../components/AuthorSection";
import { Footer } from "../components/Footer";
import { HomeHero } from "../components/HomeHero";
import { JsonLd } from "../components/JsonLd";
import { KorsSection } from "../components/KorsSection";
import { TemaSection } from "../components/TemaSection";
import { TusenaarsstadSection } from "../components/TusenaarsstadSection";
import { author, siteName, siteUrl } from "../content";
import { getContent, getDictionary } from "../dictionary";
import { localePath } from "../i18n";
import { pageMetadata, resolveLocale } from "../metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);

  return pageMetadata(locale, "/", {
    ogTitle: getDictionary(locale).siteTitle,
    description: getContent(locale).siteDescription,
  });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = resolveLocale((await params).lang);
  const { authorIntro, hero, kors, korsIntro, temaer, tusenaarsstad, utforsk } = getContent(locale);
  const url = `${siteUrl}${localePath(locale, "/")}`.replace(/\/$/, "");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: siteName, url, inLanguage: locale },
            {
              "@type": "CollectionPage",
              name: siteName,
              url,
              inLanguage: locale,
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
