import type { Metadata } from "next";
import Link from "next/link";
import { siteName } from "./content";
import "./globals.css";

// Unmatched URLs skip the [lang] root layout, so this page can't know the
// language of the request and shows both. notFound() inside a route renders
// the localized app/[lang]/not-found.tsx instead.
export const metadata: Metadata = {
  title: `Ikkje funnen · Not found | ${siteName}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="nn">
      <body>
        <main className="status-page">
          <p className="eyebrow">404 · Ikkje funnen</p>
          <h1>Denne staden finst ikkje.</h1>
          <p>Lenkja kan vere gammal, eller sida har flytta på seg.</p>
          <p lang="en">This page does not exist. The link may be old, or the page may have moved.</p>
          <p className="status-links">
            <Link className="status-button" href="/">Til framsida</Link>
            <Link className="status-button" href="/en" hrefLang="en" lang="en">English front page</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
