import type { Metadata } from "next";
import Link from "next/link";
import { getWrittenWorkGroups } from "../../archive";
import { JsonLd } from "../../components/JsonLd";
import { WrittenWorkList } from "../../components/WrittenWorkList";
import { author, siteName, siteUrl } from "../../content";
import { getContent, getDictionary } from "../../dictionary";
import { localePath } from "../../i18n";
import { pageMetadata, resolveLocale } from "../../metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/dikt-og-tekstar">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const { writtenWorksPage } = getContent(locale);

  return pageMetadata(locale, "/dikt-og-tekstar", {
    title: getDictionary(locale).writtenWorks.title,
    ogTitle: writtenWorksPage.title,
    description: writtenWorksPage.description,
    siteImage: true,
  });
}

export default async function WrittenWorksPage({ params }: PageProps<"/[lang]/dikt-og-tekstar">) {
  const locale = resolveLocale((await params).lang);
  const { writtenWorksPage } = getContent(locale);
  const ui = getDictionary(locale);
  const { writtenWorks } = ui;
  const groups = await getWrittenWorkGroups(locale);
  const totalWorks = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: writtenWorks.title,
          description: writtenWorksPage.description,
          url: `${siteUrl}${localePath(locale, "/dikt-og-tekstar")}`,
          inLanguage: locale,
          author: { "@type": "Person", name: author },
          isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
        }}
      />
      <nav className="breadcrumbs" aria-label={ui.breadcrumbs}>
        <Link href={localePath(locale, "/")}>{writtenWorks.home}</Link>
        <span aria-hidden="true">/</span>
        <span>{writtenWorks.title}</span>
      </nav>
      <header className="written-intro">
        <p className="eyebrow">{writtenWorks.eyebrow}</p>
        <h1>{writtenWorks.title}</h1>
        <p className="written-intro-byline">{writtenWorks.total(totalWorks)}</p>
        <p className="written-intro-copy">{writtenWorks.intro}</p>
      </header>
      <WrittenWorkList groups={groups} />
    </>
  );
}
