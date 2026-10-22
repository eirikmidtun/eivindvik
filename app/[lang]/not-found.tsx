import Link from "next/link";
import { getDictionary } from "../dictionary";
import { localePath } from "../i18n";
import { getLocale } from "../locale";

export default async function NotFound() {
  const locale = await getLocale();
  const { notFound } = getDictionary(locale);

  return (
    <main className="status-page">
      <p className="eyebrow">{notFound.eyebrow}</p>
      <h1>{notFound.title}</h1>
      <p>{notFound.text}</p>
      <Link className="status-button" href={localePath(locale, "/")}>{notFound.link}</Link>
    </main>
  );
}
