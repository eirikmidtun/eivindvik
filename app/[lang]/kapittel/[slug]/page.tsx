import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFirstImage, getKapittelPages, getKapittelSections } from "../../../archive";
import { Footer } from "../../../components/Footer";
import { JsonLd } from "../../../components/JsonLd";
import { KapittelBiletegalleri } from "../../../components/KapittelBiletegalleri";
import { KapittelNav } from "../../../components/KapittelNav";
import { KapittelSidebar } from "../../../components/KapittelSidebar";
import { KapittelText } from "../../../components/KapittelText";
import { PageHero } from "../../../components/PageHero";
import { TranslationNote } from "../../../components/TranslationNote";
import { author, nnContent, siteName, siteUrl } from "../../../content";
import { getContent, getDictionary } from "../../../dictionary";
import { defaultLocale, type Locale, localePath } from "../../../i18n";
import { pageMetadata, resolveLocale } from "../../../metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return nnContent.readableKapitler.map((kapittel) => ({ slug: kapittel.slug }));
}

function findKapittel(locale: Locale, slug: string) {
  const { readableKapitler } = getContent(locale);
  const index = readableKapitler.findIndex((kapittel) => kapittel.slug === slug);
  if (index === -1) notFound();
  return { kapittel: readableKapitler[index], previous: readableKapitler[index - 1], next: readableKapitler[index + 1] };
}

function describeKapittel(locale: Locale, kapittel: ReturnType<typeof findKapittel>["kapittel"]) {
  return kapittel.description ?? getDictionary(locale).describeKapittel(kapittel.title, kapittel.number);
}

export async function generateMetadata({ params }: PageProps<"/[lang]/kapittel/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const { kapittel } = findKapittel(locale, slug);

  return pageMetadata(locale, `/kapittel/${kapittel.slug}`, {
    title: kapittel.title,
    description: describeKapittel(locale, kapittel),
    type: "article",
  });
}

export default async function KapittelPage({ params }: PageProps<"/[lang]/kapittel/[slug]">) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const { kapittel, previous, next } = findKapittel(locale, slug);
  const { hero, temaer } = getContent(locale);
  const ui = getDictionary(locale);
  const pages = await getKapittelPages(kapittel.number, locale);
  const path = `/kapittel/${kapittel.slug}`;
  const url = `${siteUrl}${localePath(locale, path)}`;
  const image = getFirstImage(pages);
  const sections = getKapittelSections(pages, kapittel.title);
  const leadImageSources = pages
    .flatMap((page) => page.blocks)
    .filter((block) => block.type === "image")
    .slice(0, 2)
    .map((block) => block.src);
  const isTranslated = locale !== defaultLocale && pages.every((page) => page.language === locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: kapittel.title,
              description: describeKapittel(locale, kapittel),
              inLanguage: locale,
              url,
              image: image ? `${siteUrl}${image.src}` : `${url}/opengraph-image`,
              author: { "@type": "Person", name: author },
              isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
              about: { "@type": "Place", name: "Eivindvik, Gulen" },
              ...(isTranslated ? { translationOfWork: { "@type": "Article", inLanguage: defaultLocale, url: `${siteUrl}${path}` } } : {}),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: ui.frontPage, item: `${siteUrl}${localePath(locale, "/")}`.replace(/\/$/, "") },
                { "@type": "ListItem", position: 2, name: ui.chapters, item: `${siteUrl}${localePath(locale, "/kapittel")}` },
                { "@type": "ListItem", position: 3, name: kapittel.title, item: url },
              ],
            },
          ],
        }}
      />
      <main>
        <PageHero image={hero.image} variant="banner" />
        <div className="kapittel-layout">
          <KapittelSidebar temaer={temaer} currentKapittel={kapittel} sections={sections} />
          <div className="kapittel-main">
            <nav className="breadcrumbs" aria-label={ui.breadcrumbs}>
              <Link href={localePath(locale, "/")}>{ui.frontPage}</Link>
              <span aria-hidden="true">/</span>
              <Link href={localePath(locale, "/kapittel")}>{ui.chapters}</Link>
              <span aria-hidden="true">/</span>
              <Link href={localePath(locale, `/kapittel#${kapittel.temaId}`)}>{kapittel.temaTitle}</Link>
            </nav>
            <header className="kapittel-page-heading">
              <p className="eyebrow">{ui.chapterEyebrow(String(kapittel.number).padStart(2, "0"))}</p>
              <h1>{kapittel.title}</h1>
              <p className="kapittel-author">{ui.byAuthor}</p>
            </header>
            <TranslationNote isTranslated={isTranslated} originalPath={path} />
            <KapittelBiletegalleri pages={pages} fallbackAlt={ui.imageFallbackAlt(kapittel.title)} />
            <article lang={isTranslated || locale === defaultLocale ? undefined : defaultLocale}>
              <KapittelText pages={pages} title={kapittel.title} sections={sections} leadImageSources={leadImageSources} />
            </article>
            <KapittelNav previous={previous} next={next} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
