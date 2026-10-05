"use client";

import { useState } from "react";
import type { Dikt, WrittenWorkGroup } from "../archive";
import { ArrowIcon } from "./ArrowIcon";

type WrittenWorkReaderProps = {
  groups: WrittenWorkGroup[];
  author: string;
};

export function WrittenWorkReader({ groups, author }: WrittenWorkReaderProps) {
  const firstGroup = groups.find((group) => group.id === "rim") ?? groups[0];
  const firstWork = firstGroup?.items[0];
  const [activeGroupId, setActiveGroupId] = useState(firstGroup?.id ?? "");
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [activeWorkId, setActiveWorkId] = useState(firstWork?.id ?? "");
  const [showAll, setShowAll] = useState(false);

  const activeGroup =
    groups.find((group) => group.id === activeGroupId) ?? firstGroup;
  const activeWork =
    activeGroup?.items.find((item) => item.id === activeWorkId) ??
    activeGroup?.items[0];
  if (!activeGroup || !activeWork) return null;

  const workIndex = activeGroup.items.findIndex(
    (item) => item.id === activeWork.id,
  );
  const previous = activeGroup.items[workIndex - 1];
  const next = activeGroup.items[workIndex + 1];
  const visibleItems = showAll
    ? activeGroup.items
    : activeGroup.items.slice(0, 15);

  function chooseGroup(group: WrittenWorkGroup) {
    if (expandedGroupId === group.id) {
      setExpandedGroupId(null);
      return;
    }

    setExpandedGroupId(group.id);
    setActiveGroupId(group.id);
    setActiveWorkId(group.items[0]?.id ?? "");
    setShowAll(false);
  }

  function chooseWork(group: WrittenWorkGroup, item: Dikt) {
    setActiveGroupId(group.id);
    setActiveWorkId(item.id);
  }

  function chooseAdjacent(item: Dikt) {
    chooseWork(activeGroup, item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const totalWorks = groups.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <div className="written-layout">
      <aside className="written-sidebar" aria-label="Innhald i samlinga">
        <div className="written-sidebar-inner">
          <p className="eyebrow">Samlinga</p>
          <h2>Dikt og tekstar</h2>
          <WorkIndex
            groups={groups}
            expandedGroupId={expandedGroupId}
            activeWorkId={activeWork.id}
            visibleItems={visibleItems}
            showAll={showAll}
            onChooseGroup={chooseGroup}
            onChooseWork={chooseWork}
            onToggleShowAll={() => setShowAll((current) => !current)}
          />
          <p className="written-sidebar-total">
            {totalWorks} dikt og tekstar av {author}.
          </p>
        </div>
      </aside>

      <details className="written-mobile-index">
        <summary>Utforsk samlinga</summary>
        <div className="written-mobile-index-inner">
          <p className="eyebrow">Samlinga</p>
          <WorkIndex
            groups={groups}
            expandedGroupId={expandedGroupId}
            activeWorkId={activeWork.id}
            visibleItems={visibleItems}
            showAll={showAll}
            onChooseGroup={chooseGroup}
            onChooseWork={chooseWork}
            onToggleShowAll={() => setShowAll((current) => !current)}
          />
          <p className="written-sidebar-total">
            {totalWorks} dikt og tekstar av {author}.
          </p>
        </div>
      </details>

      <section className="written-reading" aria-labelledby="written-work-title">
        <nav className="breadcrumbs" aria-label="Brødsmuler">
          <a href="/">Heim</a>
          <span aria-hidden="true">/</span>
          <span>Dikt og tekstar</span>
        </nav>
        <header className="written-intro">
          <p className="eyebrow">Lokalhistoriske tekstar</p>
          <h1>Dikt og tekstar</h1>
          <p className="written-intro-byline">
            {totalWorks} dikt og tekstar av {author}.
          </p>
          <p className="written-intro-copy">
            Dikt, prologar, høgtidstekstar, minneord og bankar frå Eivindvik og Gulen.
            Vel eit stykke i lista for å lese det her.
          </p>
        </header>
        <p className="visually-hidden" aria-live="polite">
          {activeGroup.title}: {activeWork.title}
        </p>
        <p className="eyebrow written-work-category">
          Kapittel {activeGroup.chapter} · {activeGroup.title}
        </p>
        {activeWork.metadata && activeWork.metadata.length > 0 && (
          <aside className="written-work-metadata" aria-label="Tilleggsinformasjon">
            {activeWork.metadata.map((item) => (
              <p key={`${activeWork.id}-metadata-${item}`}>{item}</p>
            ))}
          </aside>
        )}
        <div className="written-work-heading">
          <span className="written-work-number">
            {String(workIndex + 1).padStart(2, "0")}
          </span>
          <div>
            <h2 id="written-work-title">{activeWork.title}</h2>
            <p className="written-byline">Av {author}</p>
          </div>
        </div>
        <article className="written-work-text">
          {activeWork.lines.map((line, index) => (
            <p key={`${activeWork.id}-${index}`}>{line}</p>
          ))}
        </article>
        <nav className="written-work-pager" aria-label="Bla i samlinga">
          {previous ? (
            <button type="button" onClick={() => chooseAdjacent(previous)}>
              <span className="eyebrow">
                <ArrowIcon /> Førre {activeGroup.id === "rim" ? "rim" : "tekst"}
              </span>
              <span>{previous.title}</span>
            </button>
          ) : (
            <span />
          )}
          {next && (
            <button
              type="button"
              className="written-work-next"
              onClick={() => chooseAdjacent(next)}
            >
              <span className="eyebrow">
                Neste {activeGroup.id === "rim" ? "rim" : "tekst"} <ArrowIcon />
              </span>
              <span>{next.title}</span>
            </button>
          )}
        </nav>
      </section>
    </div>
  );
}

type WorkIndexProps = {
  groups: WrittenWorkGroup[];
  expandedGroupId: string | null;
  activeWorkId: string;
  visibleItems: Dikt[];
  showAll: boolean;
  onChooseGroup: (group: WrittenWorkGroup) => void;
  onChooseWork: (group: WrittenWorkGroup, item: Dikt) => void;
  onToggleShowAll: () => void;
};

function WorkIndex({
  groups,
  expandedGroupId,
  activeWorkId,
  visibleItems,
  showAll,
  onChooseGroup,
  onChooseWork,
  onToggleShowAll,
}: WorkIndexProps) {
  return (
    <nav className="written-index" aria-label="Vel ein del">
      {groups.map((group) => {
        const isExpanded = group.id === expandedGroupId;
        return (
          <section className="written-index-group" key={group.id}>
            <button
              type="button"
              className="written-index-group-button"
              aria-expanded={isExpanded}
              onClick={() => onChooseGroup(group)}
            >
              <span className="written-index-chapter" aria-label={`Kapittel ${group.chapter}`}>{group.chapter}</span>
              <span>{group.title}</span>
              <span className="written-index-count">{group.items.length}</span>
              <span className="written-index-chevron">
                <ArrowIcon />
              </span>
            </button>
            {isExpanded && (
              <>
                <ol className="written-index-list">
                  {visibleItems.map((item, index) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-current={
                          item.id === activeWorkId ? "true" : undefined
                        }
                        onClick={() => onChooseWork(group, item)}
                      >
                        <span className="written-index-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.title}</span>
                      </button>
                    </li>
                  ))}
                </ol>
                {group.items.length > 15 && (
                  <button
                    className="written-index-more"
                    type="button"
                    onClick={onToggleShowAll}
                  >
                    {showAll
                      ? "Vis færre"
                      : `Vis alle ${group.items.length} ${group.id === "rim" ? "rim" : "tekstar"}`}
                    {!showAll && <ArrowIcon />}
                  </button>
                )}
              </>
            )}
          </section>
        );
      })}
    </nav>
  );
}
