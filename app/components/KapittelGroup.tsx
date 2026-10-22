import Link from "next/link";
import type { Tema } from "../content";
import { getDictionary } from "../dictionary";
import { localePath } from "../i18n";
import { getLocale } from "../locale";

type KapittelGroupProps = {
  tema: Tema;
};

export async function KapittelGroup({ tema }: KapittelGroupProps) {
  const locale = await getLocale();
  const ui = getDictionary(locale);

  return (
    <section className="kapittel-group" id={tema.id} aria-labelledby={`${tema.id}-title`}>
      <div className="kapittel-group-heading">
        <p className="eyebrow">{ui.chapterRange(tema.kapittelRange)}</p>
        <h2 id={`${tema.id}-title`}>{tema.title}</h2>
      </div>
      <ol className="kapittel-list">
        {tema.kapitler.map((kapittel) => (
          <li key={kapittel.number}>
            <Link href={kapittel.movedTo?.href ?? localePath(locale, `/kapittel/${kapittel.slug}`)}>
              <span className="kapittel-number">{String(kapittel.number).padStart(2, "0")}</span>
              <span>{kapittel.title}</span>
              {kapittel.movedTo ? (
                <span className="kapittel-moved">{ui.movedTo(kapittel.movedTo.label)}</span>
              ) : null}
              <span className="kapittel-arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
