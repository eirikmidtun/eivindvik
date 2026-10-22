import Image from "next/image";
import Link from "next/link";
import type { Tema } from "../content";
import { localePath } from "../i18n";
import { getLocale } from "../locale";
import { ArrowIcon } from "./ArrowIcon";

type TemaCardProps = {
  tema: Tema;
  index: string;
};

export async function TemaCard({ tema, index }: TemaCardProps) {
  const locale = await getLocale();

  return (
    <Link className="tema-card" href={localePath(locale, `/kapittel/${tema.kapitler[0].slug}`)}>
      <Image
        className="tema-card-image"
        src={tema.image.src}
        alt={tema.image.alt}
        width={tema.image.width}
        height={tema.image.height}
        sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 280px"
      />
      <span className="tema-card-body">
        <span className="tema-card-index">{index}</span>
        <span className="tema-card-title">{tema.title}</span>
        <span className="tema-card-description">{tema.description}</span>
        <ArrowIcon />
      </span>
    </Link>
  );
}
