import Image from "next/image";
import type { ArchiveBlock, ArchivePage, KapittelSection } from "../archive";

type KapittelTextProps = {
  pages: ArchivePage[];
  title: string;
  sections: KapittelSection[];
  leadImageSources: string[];
};

const legendExcerpt =
  "Ei anna segn eg har høyrt seier at kong Olav, truleg Olav den heilage, frå tingstaden skaut 3 pilar, og der kvar av pilene fall ned vart det reist ein kross.";

export function KapittelText({ pages, title, sections, leadImageSources }: KapittelTextProps) {
  const firstParagraph = pages
    .flatMap((page) => page.blocks)
    .find((block) => block.type === "paragraph" && block.text.trim().length > 140);

  return (
    <div className="kapittel-text">
      {pages.map((page) => (
        <div className="kapittel-part" key={page.slug}>
          {page.blocks.map((block, index) => {
            const section = sections.find((item) => item.pageSlug === page.slug && item.blockIndex === index);
            const isLead = block === firstParagraph;
            const isLegend = page.slug === "kap03--krossane" && index === 2 && block.type === "paragraph";
            const text = isLegend && block.type === "paragraph"
              ? block.text.replace(/\u00ad/g, "").replace(legendExcerpt, "").trim()
              : undefined;
            const renderBlock: ArchiveBlock =
              isLegend && block.type === "paragraph" && text ? { ...block, text } : block;

            return (
              <div key={index}>
                {section && block.type !== "heading" && <h2 id={section.id}>{section.title}</h2>}
                <KapittelBlock
                  block={renderBlock}
                  title={title}
                  isLead={isLead}
                  leadImageSources={leadImageSources}
                  section={section}
                />
                {isLegend && (
                  <blockquote className="kapittel-quote">
                    <p>{legendExcerpt}</p>
                    <cite>Ei segn frå Eivindvik, attgjeven av Magnor Midtun</cite>
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
  isLead: boolean;
  leadImageSources: string[];
  section?: KapittelSection;
};

function KapittelBlock({ block, title, isLead, leadImageSources, section }: KapittelBlockProps) {
  if (block.type === "image") {
    if (leadImageSources.includes(block.src)) return null;
    return (
      <figure className="kapittel-figure">
        <Image
          src={block.src}
          alt={block.alt || block.caption || `Bilete frå kapittelet «${title}»`}
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
