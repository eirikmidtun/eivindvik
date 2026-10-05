import type { ImageAsset } from "../content";
import { CaptionedImage } from "./CaptionedImage";
import { SectionIntro } from "./SectionIntro";
import { SplitSection } from "./SplitSection";

type IntroSectionProps = {
  eyebrow: string;
  title: string;
  text: string;
  image: ImageAsset;
  caption: string;
  source: string;
};

export function IntroSection({ eyebrow, title, text, image, caption, source }: IntroSectionProps) {
  return (
    <SplitSection
      id="kart"
      labelledBy="intro-title"
      tone="paper"
      text={
        <SectionIntro eyebrow={eyebrow} title={title} titleId="intro-title">
          <p className="section-text">{text}</p>
        </SectionIntro>
      }
      media={
        <CaptionedImage
          image={image}
          caption={caption}
          source={source}
          sizes="(max-width: 860px) 100vw, 640px"
        />
      }
    />
  );
}
