import Image from "next/image";
import type { ImageAsset } from "../content";

type LandscapeBandProps = {
  image: ImageAsset;
};

export function LandscapeBand({ image }: LandscapeBandProps) {
  return (
    <div className="landscape-band">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" />
    </div>
  );
}
