import type { NavLink, Tema } from "../content";
import { ButtonLink } from "./ButtonLink";
import { SectionIntro } from "./SectionIntro";
import { TemaCard } from "./TemaCard";

type TemaSectionProps = {
  eyebrow: string;
  title: string;
  text: string;
  link: NavLink;
  temaer: Tema[];
};

export function TemaSection({ eyebrow, title, text, link, temaer }: TemaSectionProps) {
  return (
    <section className="tema-section" id="utforsk" aria-labelledby="tema-title">
      <div className="section-inner">
        <div className="tema-section-heading">
          <SectionIntro eyebrow={eyebrow} title={title} titleId="tema-title">
            <p className="section-text">{text}</p>
          </SectionIntro>
          <ButtonLink href={link.href} variant="text">{link.label}</ButtonLink>
        </div>
        <div className="tema-grid">
          {temaer.map((tema, index) => (
            <TemaCard key={tema.id} tema={tema} index={String(index + 1).padStart(2, "0")} />
          ))}
        </div>
      </div>
    </section>
  );
}
