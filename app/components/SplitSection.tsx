import type { ReactNode } from "react";

type SplitSectionProps = {
  id: string;
  labelledBy: string;
  tone: "paper" | "sky";
  text: ReactNode;
  media: ReactNode;
};

// Two-column band: text on the left, media on the right, stacked on small screens.
export function SplitSection({ id, labelledBy, tone, text, media }: SplitSectionProps) {
  return (
    <section className={`split-section tone-${tone}`} id={id} aria-labelledby={labelledBy}>
      <div className="section-inner split-section-grid">
        <div className="split-section-text">{text}</div>
        <div className="split-section-media">{media}</div>
      </div>
    </section>
  );
}
