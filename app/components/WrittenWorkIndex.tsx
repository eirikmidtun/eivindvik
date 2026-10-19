"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

export type WorkIndexGroup = {
  id: string;
  title: string;
  chapter: number;
  items: { id: string; title: string }[];
};

type WrittenWorkIndexProps = {
  groups: WorkIndexGroup[];
};

const collapsedLength = 15;

export function WrittenWorkIndex({ groups }: WrittenWorkIndexProps) {
  const activeWorkId = usePathname().split("/")[2];
  const activeGroup = groups.find((group) =>
    group.items.some((item) => item.id === activeWorkId),
  );
  const [expandedGroupId, setExpandedGroupId] = useState(
    activeGroup?.id ?? null,
  );
  const [showAll, setShowAll] = useState(
    () =>
      (activeGroup?.items.findIndex((item) => item.id === activeWorkId) ?? 0) >=
      collapsedLength,
  );

  function toggleGroup(group: WorkIndexGroup) {
    setExpandedGroupId((current) => (current === group.id ? null : group.id));
    setShowAll(false);
  }

  return (
    <nav className="written-index" aria-label="Vel ein del">
      {groups.map((group) => {
        const isExpanded = group.id === expandedGroupId;
        const visibleItems = showAll
          ? group.items
          : group.items.slice(0, collapsedLength);
        return (
          <section className="written-index-group" key={group.id}>
            <button
              type="button"
              className="written-index-group-button"
              aria-expanded={isExpanded}
              onClick={() => toggleGroup(group)}
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
                      <Link
                        href={`/dikt-og-tekstar/${item.id}`}
                        aria-current={item.id === activeWorkId ? "page" : undefined}
                      >
                        <span className="written-index-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                {group.items.length > collapsedLength && (
                  <button
                    className="written-index-more"
                    type="button"
                    onClick={() => setShowAll((current) => !current)}
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
