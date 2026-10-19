import Link from "next/link";
import type { WrittenWorkGroup } from "../archive";

type WrittenWorkListProps = {
  groups: WrittenWorkGroup[];
};

export function WrittenWorkList({ groups }: WrittenWorkListProps) {
  return (
    <div className="written-list">
      {groups.map((group) => (
        <section className="written-list-group" key={group.id} aria-labelledby={`gruppe-${group.id}`}>
          <p className="eyebrow">Kapittel {group.chapter}</p>
          <h2 id={`gruppe-${group.id}`}>{group.title}</h2>
          <ol>
            {group.items.map((item) => (
              <li key={item.id}>
                <Link href={`/dikt-og-tekstar/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
