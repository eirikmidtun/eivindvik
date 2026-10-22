"use client";

import { useParams } from "next/navigation";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Client code can't read the dictionary module without bundling all page content,
// so the few error strings live here.
const messages = {
  nn: {
    eyebrow: "Noko gjekk gale",
    title: "Vi fann ikkje vegen akkurat no.",
    text: "Prøv ein gong til, så ser vi om forteljingane kjem fram.",
    retry: "Prøv igjen",
  },
  en: {
    eyebrow: "Something went wrong",
    title: "We could not find the way just now.",
    text: "Try once more and we will see if the stories come through.",
    retry: "Try again",
  },
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  const { lang } = useParams<{ lang: string }>();
  const text = lang === "en" ? messages.en : messages.nn;

  return (
    <main className="status-page">
      <p className="eyebrow">{text.eyebrow}</p>
      <h1>{text.title}</h1>
      <p>{text.text}</p>
      <button className="status-button" onClick={retry}>{text.retry}</button>
    </main>
  );
}
