import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type ArchivePage, getFirstImage, getKapittelDescription, getKapittelPages, getKapittelSections } from "../../archive";
import { Footer } from "../../components/Footer";
import { JsonLd } from "../../components/JsonLd";
import { KapittelBiletegalleri } from "../../components/KapittelBiletegalleri";
import { KapittelNav } from "../../components/KapittelNav";
import { KapittelSidebar } from "../../components/KapittelSidebar";
import { KapittelText } from "../../components/KapittelText";
import { PageHero } from "../../components/PageHero";
import { author, hero, readableKapitler, siteName, siteUrl, temaer } from "../../content";

export const dynamicParams = false;

export function generateStaticParams() {
  return readableKapitler.map((kapittel) => ({ slug: kapittel.slug }));
}

function describeKapittel(kapittel: (typeof readableKapitler)[number], pages: ArchivePage[]) {
  return (
    getKapittelDescription(pages, kapittel.title) ??
    `${kapittel.title} – kapittel ${kapittel.number} i ${siteName}, ${author} si lokalhistoriske samling om Eivindvik og Gulen.`
  );
}

function findKapittel(slug: string) {
  const index = readableKapitler.findIndex((kapittel) => kapittel.slug === slug);
  if (index === -1) notFound();
  return { kapittel: readableKapitler[index], previous: readableKapitler[index - 1], next: readableKapitler[index + 1] };
}

export async function generateMetadata({ params }: PageProps<"/kapittel/[slug]">): Promise<Metadata> {
  const { kapittel } = findKapittel((await params).slug);
  const pages = await getKapittelPages(kapittel.number);
  const url = `/kapittel/${kapittel.slug}`;

  return {
    title: kapittel.title,
    description: describeKapittel(kapittel, pages),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName,
      locale: "nn_NO",
      url,
      title: kapittel.title,
      authors: [author],
    },
  };
}

export default async function KapittelPage({ params }: PageProps<"/kapittel/[slug]">) {
  const { kapittel, previous, next } = findKapittel((await params).slug);
  const pages = await getKapittelPages(kapittel.number);
  const url = `${siteUrl}/kapittel/${kapittel.slug}`;
  const image = getFirstImage(pages);
  const sections = getKapittelSections(pages, kapittel.title);
  const leadImageSources = pages
    .flatMap((page) => page.blocks)
    .filter((block) => block.type === "image")
    .slice(0, 2)
    .map((block) => block.src);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: kapittel.title,
              description: describeKapittel(kapittel, pages),
              inLanguage: "nn",
              url,
              image: image ? `${siteUrl}${image.src}` : `${siteUrl}/kapittel/${kapittel.slug}/opengraph-image`,
              author: { "@type": "Person", name: author },
              isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
              about: { "@type": "Place", name: "Eivindvik, Gulen" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Framside", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Kapittel", item: `${siteUrl}/kapittel` },
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
            <nav className="breadcrumbs" aria-label="Brødsmuler">
              <Link href="/">Framside</Link>
              <span aria-hidden="true">/</span>
              <Link href="/kapittel">Kapittel</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/kapittel#${kapittel.temaId}`}>{kapittel.temaTitle}</Link>
            </nav>
            <header className="kapittel-page-heading">
              <p className="eyebrow">Kapittel {String(kapittel.number).padStart(2, "0")}</p>
              <h1>{kapittel.title}</h1>
              <p className="kapittel-author">Av {author}</p>
            </header>
            <KapittelBiletegalleri pages={pages} title={kapittel.title} />
            <article>
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
