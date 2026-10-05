import type { ImageAsset } from "../content";
import { ButtonLink } from "./ButtonLink";
import { CaptionedImage } from "./CaptionedImage";
import { SectionIntro } from "./SectionIntro";
import { SplitSection } from "./SplitSection";

type TusenaarsstadSectionProps = {
  eyebrow: string;
  title: string;
  text: string;
  verse: string[];
  verseSource: string;
  link: { href: string; label: string };
  image: ImageAsset;
  caption: string;
};

export function TusenaarsstadSection({
  eyebrow,
  title,
  text,
  verse,
  verseSource,
  link,
  image,
  caption,
}: TusenaarsstadSectionProps) {
  return (
    <SplitSection
      id="tusenarsstaden"
      labelledBy="tusenaarsstad-title"
      tone="paper"
      text={
        <SectionIntro eyebrow={eyebrow} title={title} titleId="tusenaarsstad-title">
          <p className="section-text">{text}</p>
          <figure className="verse-quote">
            <blockquote>
              {verse.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </blockquote>
            <figcaption>{verseSource}</figcaption>
          </figure>
          <ButtonLink href={link.href} variant="text">
            {link.label}
          </ButtonLink>
        </SectionIntro>
      }
      media={
        <CaptionedImage image={image} caption={caption} sizes="(max-width: 860px) 100vw, 645px" />
      }
    />
  );
}
