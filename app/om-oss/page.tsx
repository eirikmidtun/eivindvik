import type { Metadata } from "next";
import { ButtonLink } from "../components/ButtonLink";
import { CaptionedImage } from "../components/CaptionedImage";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { omOssPage } from "../content";

export const metadata: Metadata = {
  title: "Om oss",
  description: omOssPage.description,
  alternates: { canonical: "/om-oss" },
};

export default function OmOssPage() {
  return (
    <>
      <main>
        <PageHero image={omOssPage.heroImage} variant="banner" />
        <div className="content-page">
          <header className="kapittel-page-heading">
            <p className="eyebrow">{omOssPage.eyebrow}</p>
            <h1>{omOssPage.title}</h1>
            <p className="section-text">{omOssPage.text}</p>
          </header>
          <div className="kapittel-text">
            {omOssPage.sections.map((section, index) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {index === 0 && (
                  <div className="about-portrait about-portrait-desktop">
                    <CaptionedImage image={omOssPage.image} caption={omOssPage.caption} sizes="(max-width: 520px) 100vw, 350px" />
                  </div>
                )}
                {section.paragraphs[0] && <p>{section.paragraphs[0]}</p>}
                {index === 0 && (
                  <div className="about-portrait about-portrait-mobile">
                    <CaptionedImage image={omOssPage.image} caption={omOssPage.caption} sizes="(max-width: 520px) 100vw, 350px" />
                  </div>
                )}
                {section.paragraphs.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
          <ButtonLink href={omOssPage.originalSiteLink.href} variant="outline">
            {omOssPage.originalSiteLink.label}
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
