import Image from "next/image";
import type { ArchiveBlock, ArchivePage } from "../archive";

type KapittelBiletegalleriProps = {
  pages: ArchivePage[];
  title: string;
};

export function KapittelBiletegalleri({ pages, title }: KapittelBiletegalleriProps) {
  const images = pages.flatMap((page) => page.blocks).filter((block): block is Extract<ArchiveBlock, { type: "image" }> => block.type === "image").slice(0, 2);
  if (images.length === 0) return null;

  return (
    <div className={`kapittel-gallery${images.length === 1 ? " kapittel-gallery-single" : ""}`}>
      {images.map((image) => (
        <figure className="kapittel-gallery-figure" key={image.src}>
          <Image
            src={image.src}
            alt={image.alt || image.caption || `Bilete frå kapittelet «${title}»`}
            width={image.width}
            height={image.height}
            sizes="(max-width: 720px) 100vw, (max-width: 1100px) 45vw, 520px"
          />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
