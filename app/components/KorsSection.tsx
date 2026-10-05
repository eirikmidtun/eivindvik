import type { Kors, NavLink } from "../content";
import { ButtonLink } from "./ButtonLink";
import { KorsCard } from "./KorsCard";
import { SectionIntro } from "./SectionIntro";
import { SplitSection } from "./SplitSection";

type KorsSectionProps = {
  eyebrow: string;
  title: string;
  text: string;
  link: NavLink;
  kors: Kors[];
};

export function KorsSection({ eyebrow, title, text, link, kors }: KorsSectionProps) {
  return (
    <SplitSection
      id="krossane"
      labelledBy="kors-title"
      tone="sky"
      text={
        <SectionIntro eyebrow={eyebrow} title={title} titleId="kors-title">
          {text.split(/\n\s*\n/).map((paragraph) => (
            <p className="section-text kors-intro-paragraph" key={paragraph}>{paragraph}</p>
          ))}
          <ButtonLink href={link.href} variant="outline">{link.label}</ButtonLink>
        </SectionIntro>
      }
      media={
        <div className="kors-grid">
          {kors.map((item) => (
            <KorsCard key={item.title} kors={item} />
          ))}
        </div>
      }
    />
  );
}
