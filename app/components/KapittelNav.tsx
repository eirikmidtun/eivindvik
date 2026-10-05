import Link from "next/link";
import type { Kapittel } from "../content";

type KapittelNavProps = {
  previous?: Kapittel;
  next?: Kapittel;
};

export function KapittelNav({ previous, next }: KapittelNavProps) {
  return (
    <nav className="kapittel-nav" aria-label="Andre kapittel">
      {previous && (
        <Link className="kapittel-nav-previous" href={`/kapittel/${previous.slug}`}>
          <span className="eyebrow">← Førre kapittel</span>
          <span>{previous.title}</span>
        </Link>
      )}
      {next && (
        <Link className="kapittel-nav-next" href={`/kapittel/${next.slug}`}>
          <span className="eyebrow">Neste kapittel →</span>
          <span>{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
