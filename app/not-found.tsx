import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <p className="eyebrow">404 · Ikkje funnen</p>
      <h1>Denne staden finst ikkje.</h1>
      <p>Lenkja kan vere gammal, eller sida har flytta på seg.</p>
      <Link className="status-button" href="/">Til framsida</Link>
    </main>
  );
}
