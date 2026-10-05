import Image from "next/image";
import type { ImageAsset } from "../content";

type CaptionedImageProps = {
  image: ImageAsset;
  caption: string;
  source?: string;
  sizes: string;
  maxWidth?: number;
};

export function CaptionedImage({ image, caption, source, sizes, maxWidth }: CaptionedImageProps) {
  return (
    <figure className="captioned-image" style={{ maxWidth: maxWidth ?? image.width }}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} />
      <figcaption>
        {caption}
        {source && <span className="captioned-image-source">{source}</span>}
      </figcaption>
    </figure>
  );
}
