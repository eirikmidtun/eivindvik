import Link from "next/link";
import type { KapittelSection } from "../archive";
import type { Kapittel, Tema } from "../content";

type KapittelSidebarProps = {
  temaer: Tema[];
  currentKapittel: Kapittel & { temaId: string };
  sections: KapittelSection[];
};

function KapittelList({ temaer, currentKapittel, sections }: KapittelSidebarProps) {
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
                      href={kapittel.movedTo?.href ?? `/kapittel/${kapittel.slug}`}
                      className={kapittel.movedTo ? "kapittel-sidebar-moved" : undefined}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      <span className="kapittel-sidebar-number">{String(kapittel.number).padStart(2, "0")}</span>
                      <span>
                        {kapittel.title}
                        {kapittel.movedTo ? (
                          <span className="kapittel-sidebar-moved-note">Ligg under {kapittel.movedTo.label}</span>
                        ) : null}
                      </span>
                    </Link>
                    {isCurrent && sections.length > 0 && (
                      <div className="kapittel-sidebar-toc">
                        <p>I dette kapittelet</p>
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

export function KapittelSidebar(props: KapittelSidebarProps) {
  return (
    <>
      <aside className="kapittel-sidebar" aria-label="Kapitteloversikt">
        <p className="eyebrow">Alle kapittel</p>
        <KapittelList {...props} />
      </aside>
      <details className="kapittel-sidebar-mobile">
        <summary>Kapittel og innhald</summary>
        <nav aria-label="Kapitteloversikt">
          <KapittelList {...props} />
        </nav>
      </details>
    </>
  );
}
