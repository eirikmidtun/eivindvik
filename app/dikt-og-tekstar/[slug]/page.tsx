import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Dikt, type WrittenWorkGroup, getWrittenWork, getWrittenWorkGroups } from "../../archive";
import { ArrowIcon } from "../../components/ArrowIcon";
import { JsonLd } from "../../components/JsonLd";
import { author, siteName, siteUrl } from "../../content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const groups = await getWrittenWorkGroups();
  return groups.flatMap((group) => group.items.map((item) => ({ slug: item.id })));
}

async function findWork(slug: string) {
  const found = await getWrittenWork(slug);
  if (!found) notFound();
  return found;
}

function titleWork(work: Dikt, group: WrittenWorkGroup) {
  return `${work.title}, ${group.label} av ${author}`;
}

// The opening lines, cut at a word so the whole description stays under 160 characters.
function describeWork(work: Dikt, group: WrittenWorkGroup) {
  const label = group.label.charAt(0).toUpperCase() + group.label.slice(1);
  const intro = `${label} av ${author} i samlinga ${siteName}: «`;
  const excerpt = work.lines.join(" / ");
  const room = 156 - intro.length;
  if (excerpt.length <= room) return `${intro}${excerpt}»`;
  return `${intro}${excerpt.slice(0, excerpt.lastIndexOf(" ", room - 2))} …»`;
}

export async function generateMetadata({ params }: PageProps<"/dikt-og-tekstar/[slug]">): Promise<Metadata> {
  const { work, group } = await findWork((await params).slug);
  const url = `/dikt-og-tekstar/${work.id}`;

  return {
    title: titleWork(work, group),
    description: describeWork(work, group),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName,
      locale: "nn_NO",
      url,
      title: titleWork(work, group),
      authors: [author],
    },
  };
}

export default async function WrittenWorkPage({ params }: PageProps<"/dikt-og-tekstar/[slug]">) {
  const { work, group, index } = await findWork((await params).slug);
  const url = `${siteUrl}/dikt-og-tekstar/${work.id}`;
  const previous = group.items[index - 1];
  const next = group.items[index + 1];
  const unit = group.id === "rim" ? "rim" : "tekst";

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
              description: describeWork(work, group),
              inLanguage: "nn",
              url,
              author: { "@type": "Person", name: author },
              isPartOf: { "@type": "CollectionPage", name: "Dikt og tekstar", url: `${siteUrl}/dikt-og-tekstar` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Framside", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Dikt og tekstar", item: `${siteUrl}/dikt-og-tekstar` },
                { "@type": "ListItem", position: 3, name: work.title, item: url },
              ],
            },
          ],
        }}
      />
      <nav className="breadcrumbs" aria-label="Brødsmuler">
        <Link href="/">Heim</Link>
        <span aria-hidden="true">/</span>
        <Link href="/dikt-og-tekstar">Dikt og tekstar</Link>
        <span aria-hidden="true">/</span>
        <span>{work.title}</span>
      </nav>
      <p className="eyebrow written-work-category">
        Kapittel {group.chapter} · {group.title}
      </p>
      {work.metadata && work.metadata.length > 0 && (
        <aside className="written-work-metadata" aria-label="Tilleggsinformasjon">
          {work.metadata.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </aside>
      )}
      <div className="written-work-heading">
        <span className="written-work-number">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h1>{work.title}</h1>
          <p className="written-byline">Av {author}</p>
        </div>
      </div>
      <article className="written-work-text">
        {work.lines.map((line, lineIndex) => (
          <p key={lineIndex}>{line}</p>
        ))}
      </article>
      <nav className="written-work-pager" aria-label="Bla i samlinga">
        {previous ? (
          <Link href={`/dikt-og-tekstar/${previous.id}`}>
            <span className="eyebrow">
              <ArrowIcon /> Førre {unit}
            </span>
            <span>{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/dikt-og-tekstar/${next.id}`} className="written-work-next">
            <span className="eyebrow">
              Neste {unit} <ArrowIcon />
            </span>
            <span>{next.title}</span>
          </Link>
        )}
      </nav>
    </>
  );
}
