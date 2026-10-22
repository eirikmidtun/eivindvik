import Link from "next/link";
import type { WrittenWorkGroup } from "../archive";
import { getDictionary } from "../dictionary";
import { localePath } from "../i18n";
import { getLocale } from "../locale";

type WrittenWorkListProps = {
  groups: WrittenWorkGroup[];
};

export async function WrittenWorkList({ groups }: WrittenWorkListProps) {
  const locale = await getLocale();
  const ui = getDictionary(locale);

  return (
    <div className="written-list">
      {groups.map((group) => (
        <section className="written-list-group" key={group.id} aria-labelledby={`gruppe-${group.id}`}>
          <p className="eyebrow">{ui.chapterEyebrow(String(group.chapter))}</p>
          <h2 id={`gruppe-${group.id}`}>{group.title}</h2>
          <ol>
            {group.items.map((item) => (
              <li key={item.id}>
                <Link href={localePath(locale, `/dikt-og-tekstar/${item.id}`)}>{item.title}</Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
