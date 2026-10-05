import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  titleId: string;
  children: ReactNode;
};

export function SectionIntro({ eyebrow, title, titleId, children }: SectionIntroProps) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {children}
    </div>
  );
}
