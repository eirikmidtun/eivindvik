"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

export type WorkIndexGroup = {
  id: string;
  title: string;
  chapter: number;
  items: { id: string; title: string }[];
};

export type WorkIndexLabels = {
  index: string;
  showFewer: string;
  // Per group id: the chapter label and the "show all" button text.
  chapter: Record<string, string>;
  showAll: Record<string, string>;
};

type WrittenWorkIndexProps = {
  groups: WorkIndexGroup[];
  // The localized /dikt-og-tekstar path that work ids are appended to.
  basePath: string;
  labels: WorkIndexLabels;
};

const collapsedLength = 15;

export function WrittenWorkIndex({ groups, basePath, labels }: WrittenWorkIndexProps) {
  const activeWorkId = useParams<{ slug?: string }>().slug;
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
    <nav className="written-index" aria-label={labels.index}>
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
              <span className="written-index-chapter" aria-label={labels.chapter[group.id]}>{group.chapter}</span>
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
                        href={`${basePath}/${item.id}`}
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
                    {showAll ? labels.showFewer : labels.showAll[group.id]}
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
