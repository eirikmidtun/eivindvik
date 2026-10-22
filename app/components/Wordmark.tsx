import Link from "next/link";
import { siteName } from "../content";
import { localePath } from "../i18n";
import { getLocale } from "../locale";

export async function Wordmark() {
  const locale = await getLocale();

  return (
    <Link className="wordmark" href={localePath(locale, "/")}>
      {siteName}
    </Link>
  );
}
