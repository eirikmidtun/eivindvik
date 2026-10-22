import Image from "next/image";
import { type ArchiveBlock, type ArchivePage, getKapittelDikt, type KapittelSection } from "../archive";
import { getDictionary } from "../dictionary";
import type { Locale } from "../i18n";
import { getLocale } from "../locale";
import { KapittelDikt } from "./KapittelDikt";

type KapittelTextProps = {
  pages: ArchivePage[];
  title: string;
  sections: KapittelSection[];
  leadImageSources: string[];
};

// Lifted out of the Steinkrossane text as a pull quote, in the language of the page.
const legendExcerpt: Record<Locale, string> = {
  nn: "Ei anna segn eg har høyrt seier at kong Olav, truleg Olav den heilage, frå tingstaden skaut 3 pilar, og der kvar av pilene fall ned vart det reist ein kross.",
  en: "Another legend I have heard says that King Olav, probably St Olav, shot 3 arrows from the assembly site, and where each of the arrows fell a cross was raised.",
};

export async function KapittelText({ pages, title, sections, leadImageSources }: KapittelTextProps) {
  const ui = getDictionary(await getLocale());
  const firstParagraph = pages
    .flatMap((page) => page.blocks)
    .find((block) => block.type === "paragraph" && block.text.trim().length > 140);
  const dikt = getKapittelDikt(pages);

  return (
    <div className="kapittel-text">
      {pages.map((page) => (
        <div className="kapittel-part" key={page.slug}>
          {page.blocks.map((block, index) => {
            const poem = dikt.find(
              (item) => item.pageSlug === page.slug && index >= item.firstBlock && index <= item.lastBlock,
            );
            if (poem) {
              if (index !== poem.firstBlock) return null;
              return <KapittelDikt key={index} stanzas={poem.stanzas} title={poem.title} source={poem.source} />;
            }

            const section = sections.find((item) => item.pageSlug === page.slug && item.blockIndex === index);
            const isLead = block === firstParagraph;
            const isLegend = page.slug === "kap03--krossane" && index === 2 && block.type === "paragraph";
            const text = isLegend && block.type === "paragraph"
              ? block.text.replace(/\u00ad/g, "").replace(legendExcerpt[page.language], "").trim()
              : undefined;
            const renderBlock: ArchiveBlock =
              isLegend && block.type === "paragraph" && text ? { ...block, text } : block;

            return (
              <div key={index}>
                {section && block.type !== "heading" && <h2 id={section.id}>{section.title}</h2>}
                <KapittelBlock
                  block={renderBlock}
                  title={title}
                  fallbackAlt={ui.imageFallbackAlt(title)}
                  isLead={isLead}
                  leadImageSources={leadImageSources}
                  section={section}
                />
                {isLegend && (
                  <blockquote className="kapittel-quote">
                    <p>{legendExcerpt[page.language]}</p>
                    <cite>{ui.legendCite}</cite>
                  </blockquote>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

type KapittelBlockProps = {
  block: ArchiveBlock;
  title: string;
  fallbackAlt: string;
  isLead: boolean;
  leadImageSources: string[];
  section?: KapittelSection;
};

function KapittelBlock({ block, title, fallbackAlt, isLead, leadImageSources, section }: KapittelBlockProps) {
  if (block.type === "image") {
    if (leadImageSources.includes(block.src)) return null;
    return (
      <figure className="kapittel-figure">
        <Image
          src={block.src}
          alt={block.alt || block.caption || fallbackAlt}
          width={block.width}
          height={block.height}
          sizes="(max-width: 720px) 100vw, 680px"
        />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }

  const text = block.text.trim();
  if (!text) return null;

  // The scraped heading levels follow old font sizes, so every real heading
  // becomes an h2 under the page's only h1, and long "headings" stay paragraphs.
  if (block.type === "heading" && text.length <= 120) {
    if (text.toLowerCase() === title.toLowerCase()) return null;
    return <h2 id={section?.id}>{text}</h2>;
  }

  return <p className={isLead ? "kapittel-lead" : undefined}>{text}</p>;
}
