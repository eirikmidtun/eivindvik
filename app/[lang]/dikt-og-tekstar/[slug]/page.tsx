import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Dikt, type WrittenWorkGroup, getWrittenWork, getWrittenWorkGroups } from "../../../archive";
import { ArrowIcon } from "../../../components/ArrowIcon";
import { JsonLd } from "../../../components/JsonLd";
import { TranslationNote } from "../../../components/TranslationNote";
import { author, siteUrl } from "../../../content";
import { getDictionary } from "../../../dictionary";
import { defaultLocale, type Locale, localePath } from "../../../i18n";
import { pageMetadata, resolveLocale } from "../../../metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  const groups = await getWrittenWorkGroups();
  return groups.flatMap((group) => group.items.map((item) => ({ slug: item.id })));
}

async function findWork(locale: Locale, slug: string) {
  const found = await getWrittenWork(slug, locale);
  if (!found) notFound();
  return found;
}

function titleWork(locale: Locale, work: Dikt, group: WrittenWorkGroup) {
  return getDictionary(locale).writtenWorks.workTitle(work.title, group.label);
}

// The opening lines, cut at a word so the whole description stays under 160 characters.
function describeWork(locale: Locale, work: Dikt, group: WrittenWorkGroup) {
  const { describeIntro, quoteEnd } = getDictionary(locale).writtenWorks;
  const intro = describeIntro(group.label.charAt(0).toUpperCase() + group.label.slice(1));
  const excerpt = work.lines.join(" / ");
  const room = 156 - intro.length;
  if (excerpt.length <= room) return `${intro}${excerpt}${quoteEnd}`;
  return `${intro}${excerpt.slice(0, excerpt.lastIndexOf(" ", room - 2))} …${quoteEnd}`;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/dikt-og-tekstar/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const { work, group } = await findWork(locale, slug);

  return pageMetadata(locale, `/dikt-og-tekstar/${work.id}`, {
    title: titleWork(locale, work, group),
    description: describeWork(locale, work, group),
    type: "article",
  });
}

export default async function WrittenWorkPage({ params }: PageProps<"/[lang]/dikt-og-tekstar/[slug]">) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const ui = getDictionary(locale);
  const { work, group, index } = await findWork(locale, slug);
  const path = `/dikt-og-tekstar/${work.id}`;
  const url = `${siteUrl}${localePath(locale, path)}`;
  const collectionUrl = `${siteUrl}${localePath(locale, "/dikt-og-tekstar")}`;
  const previous = group.items[index - 1];
  const next = group.items[index + 1];
  const isRim = group.id === "rim";
  const isTranslated = locale !== defaultLocale && work.language === locale;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              name: work.title,
              genre: group.title,
              description: describeWork(locale, work, group),
              inLanguage: work.language,
              url,
              author: { "@type": "Person", name: author },
              isPartOf: { "@type": "CollectionPage", name: ui.writtenWorks.title, url: collectionUrl },
              ...(isTranslated ? { translationOfWork: { "@type": "CreativeWork", inLanguage: defaultLocale, url: `${siteUrl}${path}` } } : {}),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: ui.frontPage, item: `${siteUrl}${localePath(locale, "/")}`.replace(/\/$/, "") },
                { "@type": "ListItem", position: 2, name: ui.writtenWorks.title, item: collectionUrl },
                { "@type": "ListItem", position: 3, name: work.title, item: url },
              ],
            },
          ],
        }}
      />
      <nav className="breadcrumbs" aria-label={ui.breadcrumbs}>
        <Link href={localePath(locale, "/")}>{ui.writtenWorks.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={localePath(locale, "/dikt-og-tekstar")}>{ui.writtenWorks.title}</Link>
        <span aria-hidden="true">/</span>
        <span>{work.title}</span>
      </nav>
      <p className="eyebrow written-work-category">
        {ui.chapterEyebrow(String(group.chapter))} · {group.title}
      </p>
      {work.metadata && work.metadata.length > 0 && (
        <aside className="written-work-metadata" aria-label={ui.writtenWorks.extraInformation}>
          {work.metadata.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </aside>
      )}
      <div className="written-work-heading">
        <span className="written-work-number">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h1>{work.title}</h1>
          <p className="written-byline">{ui.byAuthor}</p>
        </div>
      </div>
      <TranslationNote isTranslated={isTranslated} originalPath={path} />
      <article className="written-work-text" lang={work.language === locale ? undefined : work.language}>
        {work.lines.map((line, lineIndex) => (
          <p key={lineIndex}>{line}</p>
        ))}
      </article>
      <nav className="written-work-pager" aria-label={ui.writtenWorks.browse}>
        {previous ? (
          <Link href={localePath(locale, `/dikt-og-tekstar/${previous.id}`)}>
            <span className="eyebrow">
              <ArrowIcon /> {ui.writtenWorks.previous(isRim)}
            </span>
            <span>{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={localePath(locale, `/dikt-og-tekstar/${next.id}`)} className="written-work-next">
            <span className="eyebrow">
              {ui.writtenWorks.next(isRim)} <ArrowIcon />
            </span>
            <span>{next.title}</span>
          </Link>
        )}
      </nav>
    </>
  );
}
