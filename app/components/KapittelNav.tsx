import Link from "next/link";
import type { Kapittel } from "../content";
import { getDictionary } from "../dictionary";
import { localePath } from "../i18n";
import { getLocale } from "../locale";

type KapittelNavProps = {
  previous?: Kapittel;
  next?: Kapittel;
};

export async function KapittelNav({ previous, next }: KapittelNavProps) {
  const locale = await getLocale();
  const ui = getDictionary(locale);

  return (
    <nav className="kapittel-nav" aria-label={ui.otherChapters}>
      {previous && (
        <Link className="kapittel-nav-previous" href={localePath(locale, `/kapittel/${previous.slug}`)}>
          <span className="eyebrow">{ui.previousChapter}</span>
          <span>{previous.title}</span>
        </Link>
      )}
      {next && (
        <Link className="kapittel-nav-next" href={localePath(locale, `/kapittel/${next.slug}`)}>
          <span className="eyebrow">{ui.nextChapter}</span>
          <span>{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
