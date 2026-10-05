"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <main className="status-page">
      <p className="eyebrow">Noko gjekk gale</p>
      <h1>Vi fann ikkje vegen akkurat no.</h1>
      <p>Prøv ein gong til, så ser vi om forteljingane kjem fram.</p>
      <button className="status-button" onClick={retry}>Prøv igjen</button>
    </main>
  );
}
