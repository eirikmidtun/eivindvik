import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { KapittelGroup } from "../../components/KapittelGroup";
import { PageHero } from "../../components/PageHero";
import { siteName } from "../../content";
import { getContent, getDictionary } from "../../dictionary";
import { localePath } from "../../i18n";
import { pageMetadata, resolveLocale } from "../../metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/kapittel">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const { kapittelIndex } = getDictionary(locale);

  return pageMetadata(locale, "/kapittel", {
    title: kapittelIndex.title,
    description: kapittelIndex.description(getContent(locale).kapitler.length),
    siteImage: true,
  });
}

export default async function KapittelIndexPage({ params }: PageProps<"/[lang]/kapittel">) {
  const locale = resolveLocale((await params).lang);
  const { hero, kapitler, temaer, writtenWorksPage } = getContent(locale);
  const { kapittelIndex } = getDictionary(locale);

  return (
    <>
      <main>
        <PageHero image={hero.image} variant="banner" />
        <header className="kapittel-index-intro written-intro">
          <p className="eyebrow">{kapittelIndex.eyebrow}</p>
          <h1>{siteName}</h1>
          <p className="written-intro-byline">{kapittelIndex.byline(kapitler.length)}</p>
          <p className="written-intro-copy">{kapittelIndex.intro}</p>
          <p className="written-intro-copy">
            {kapittelIndex.movedBefore}{" "}
            <Link href={localePath(locale, "/dikt-og-tekstar")}>{writtenWorksPage.eyebrow}</Link>
            {kapittelIndex.movedAfter}
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
