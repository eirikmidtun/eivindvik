import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageAsset } from "../content";
import { getContent, getDictionary } from "../dictionary";
import { getLocale } from "../locale";
import { ButtonLink } from "./ButtonLink";
import { HeroNav } from "./HeroNav";
import { LanguageSwitch } from "./LanguageSwitch";
import { Wordmark } from "./Wordmark";

type PageHeroProps = {
  image: ImageAsset;
  className?: string;
  children?: ReactNode;
  variant?: "content" | "banner";
};

// The site navigation over a full-width photo; each page passes its own image and title.
export async function PageHero({ image, className, children, variant = "content" }: PageHeroProps) {
  const locale = await getLocale();
  const { navLinks, readLink } = getContent(locale);
  const ui = getDictionary(locale);
  const heroClassName = ["page-hero", variant === "banner" ? "page-hero-banner" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={heroClassName}>
      <Image
        className="page-hero-image"
        src={image.src}
        alt={variant === "banner" ? "" : image.alt}
        fill
        preload
        sizes="100vw"
      />
      <div className="section-inner page-hero-bar">
        <Wordmark />
        <HeroNav links={navLinks} label={ui.mainMenu}>
          <LanguageSwitch {...ui.languageSwitch} />
        </HeroNav>
        <ButtonLink href={readLink.href} variant="solid">{readLink.label}</ButtonLink>
      </div>
      {children && <div className="page-hero-text">{children}</div>}
    </div>
  );
}
