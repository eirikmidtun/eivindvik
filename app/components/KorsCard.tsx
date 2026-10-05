import Image from "next/image";
import type { Kors } from "../content";

type KorsCardProps = {
  kors: Kors;
};

export function KorsCard({ kors }: KorsCardProps) {
  return (
    <figure className="kors-card">
      <Image
        src={kors.image.src}
        alt={kors.image.alt}
        width={kors.image.width}
        height={kors.image.height}
        sizes="(max-width: 520px) 50vw, 300px"
      />
      <figcaption>
        <span className="kors-card-title">{kors.title}</span>
        <span className="kors-card-text">{kors.text}</span>
      </figcaption>
    </figure>
  );
}
