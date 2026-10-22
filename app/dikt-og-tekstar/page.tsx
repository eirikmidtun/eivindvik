import type { Metadata } from "next";
import Link from "next/link";
import { getWrittenWorkGroups } from "../archive";
import { JsonLd } from "../components/JsonLd";
import { WrittenWorkList } from "../components/WrittenWorkList";
import { author, siteName, siteUrl, writtenWorksPage } from "../content";

export const metadata: Metadata = {
  title: "Dikt og tekstar",
  description: writtenWorksPage.description,
  alternates: { canonical: "/dikt-og-tekstar" },
  openGraph: {
    title: writtenWorksPage.title,
    description: writtenWorksPage.description,
    siteName,
    locale: "nn_NO",
    type: "website",
    url: "/dikt-og-tekstar",
    images: ["/opengraph-image"],
  },
};

export default async function WrittenWorksPage() {
  const groups = await getWrittenWorkGroups();
  const totalWorks = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Dikt og tekstar",
          description: writtenWorksPage.description,
          url: `${siteUrl}/dikt-og-tekstar`,
          inLanguage: "nn",
          author: { "@type": "Person", name: author },
          isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
        }}
      />
      <nav className="breadcrumbs" aria-label="Brødsmuler">
        <Link href="/">Heim</Link>
        <span aria-hidden="true">/</span>
        <span>Dikt og tekstar</span>
      </nav>
      <header className="written-intro">
        <p className="eyebrow">Lokalhistoriske tekstar</p>
        <h1>Dikt og tekstar</h1>
        <p className="written-intro-byline">
          {totalWorks} dikt og tekstar av {author}.
        </p>
        <p className="written-intro-copy">
          Dikt, prologar, høgtidstekstar, minneord og bankar frå Eivindvik og Gulen.
          Vel eit stykke i lista for å lese det.
        </p>
      </header>
      <WrittenWorkList groups={groups} />
    </>
  );
}
