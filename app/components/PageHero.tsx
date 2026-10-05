import Image from "next/image";
import type { ReactNode } from "react";
import { navLinks, readLink, type ImageAsset } from "../content";
import { ButtonLink } from "./ButtonLink";
import { HeroNav } from "./HeroNav";
import { Wordmark } from "./Wordmark";

type PageHeroProps = {
  image: ImageAsset;
  className?: string;
  children?: ReactNode;
  variant?: "content" | "banner";
};

// The site navigation over a full-width photo; each page passes its own image and title.
export function PageHero({ image, className, children, variant = "content" }: PageHeroProps) {
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
        <HeroNav links={navLinks} />
        <ButtonLink href={readLink.href} variant="solid">{readLink.label}</ButtonLink>
      </div>
      {children && <div className="page-hero-text">{children}</div>}
    </div>
  );
}
