import Link from "next/link";
import type { KapittelSection } from "../archive";
import type { Kapittel, Tema } from "../content";
import { type Dictionary, getDictionary } from "../dictionary";
import { type Locale, localePath } from "../i18n";
import { getLocale } from "../locale";

type KapittelSidebarProps = {
  temaer: Tema[];
  currentKapittel: Kapittel & { temaId: string };
  sections: KapittelSection[];
};

type KapittelListProps = KapittelSidebarProps & {
  locale: Locale;
  ui: Dictionary;
};

function KapittelList({ temaer, currentKapittel, sections, locale, ui }: KapittelListProps) {
  return (
    <>
      {temaer.map((tema) => {
        const isCurrentTema = tema.id === currentKapittel.temaId;
        return (
          <details className="kapittel-sidebar-group" key={tema.id} open={isCurrentTema}>
            <summary>
              <span>{tema.title}</span>
              <span className="kapittel-sidebar-range">{tema.kapittelRange}</span>
            </summary>
            <ul>
              {tema.kapitler.map((kapittel) => {
                const isCurrent = kapittel.slug === currentKapittel.slug;
                return (
                  <li key={kapittel.slug}>
                    <Link
                      href={kapittel.movedTo?.href ?? localePath(locale, `/kapittel/${kapittel.slug}`)}
                      className={kapittel.movedTo ? "kapittel-sidebar-moved" : undefined}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      <span className="kapittel-sidebar-number">{String(kapittel.number).padStart(2, "0")}</span>
                      <span>
                        {kapittel.title}
                        {kapittel.movedTo ? (
                          <span className="kapittel-sidebar-moved-note">{ui.movedTo(kapittel.movedTo.label)}</span>
                        ) : null}
                      </span>
                    </Link>
                    {isCurrent && sections.length > 0 && (
                      <div className="kapittel-sidebar-toc">
                        <p>{ui.inThisChapter}</p>
                        <ul>
                          {sections.map((section) => (
                            <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </>
  );
}

export async function KapittelSidebar(props: KapittelSidebarProps) {
  const locale = await getLocale();
  const ui = getDictionary(locale);

  return (
    <>
      <aside className="kapittel-sidebar" aria-label={ui.chapterOverview}>
        <p className="eyebrow">{ui.allChapters}</p>
        <KapittelList {...props} locale={locale} ui={ui} />
      </aside>
      <details className="kapittel-sidebar-mobile">
        <summary>{ui.chaptersAndContents}</summary>
        <nav aria-label={ui.chapterOverview}>
          <KapittelList {...props} locale={locale} ui={ui} />
        </nav>
      </details>
    </>
  );
}
