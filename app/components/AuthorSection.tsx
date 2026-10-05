import type { ImageAsset } from "../content";
import { ButtonLink } from "./ButtonLink";
import { CaptionedImage } from "./CaptionedImage";
import { SectionIntro } from "./SectionIntro";
import { SplitSection } from "./SplitSection";

type AuthorSectionProps = {
  eyebrow: string;
  name: string;
  text: string;
  link: { href: string; label: string };
  image: ImageAsset;
  caption: string;
};

export function AuthorSection({ eyebrow, name, text, link, image, caption }: AuthorSectionProps) {
  return (
    <SplitSection
      id="om-prosjektet"
      labelledBy="author-title"
      tone="sky"
      text={
        <SectionIntro eyebrow={eyebrow} title={name} titleId="author-title">
          <p className="section-text">{text}</p>
          <ButtonLink href={link.href} variant="text">
            {link.label}
          </ButtonLink>
        </SectionIntro>
      }
      media={<CaptionedImage image={image} caption={caption} sizes="(max-width: 860px) 100vw, 560px" maxWidth={400} />}
    />
  );
}
