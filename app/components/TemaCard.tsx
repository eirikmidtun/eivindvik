import Link from "next/link";
import type { Tema } from "../content";

type TemaCardProps = {
  tema: Tema;
  index: string;
};

export function TemaCard({ tema, index }: TemaCardProps) {
  return (
    <Link className="tema-card" href={`#${tema.id}`}>
      <span className="tema-card-index">{index} <span>{tema.kapittelRange}</span></span>
      <span className="tema-card-text">
        <span className="tema-card-title">{tema.title}</span>
        <span className="tema-card-description">{tema.description}</span>
      </span>
      <span className="tema-card-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
