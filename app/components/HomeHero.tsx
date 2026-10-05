import type { ImageAsset } from "../content";
import { PageHero } from "./PageHero";

type HomeHeroProps = {
  title: string;
  subtitle: string;
  lead: string;
  image: ImageAsset;
};

export function HomeHero({ title, subtitle, lead, image }: HomeHeroProps) {
  return (
    <PageHero image={image} className="home-hero">
      <h1>
        {title}
        <span className="home-hero-subtitle">{subtitle}</span>
      </h1>
      <p className="home-hero-lead">{lead}</p>
    </PageHero>
  );
}
