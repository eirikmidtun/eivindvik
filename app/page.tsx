import { ArkivHero } from "./components/ArkivHero";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { KapittelGroup } from "./components/KapittelGroup";
import { TemaCard } from "./components/TemaCard";
import { temaer } from "./content";

export default function HomePage() {
  return (
    <div className="container">
      <Header />
      <main>
        <ArkivHero />

        <section className="tema-section" id="tema" aria-labelledby="tema-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ei bygd · mange forteljingar</p>
              <h2 id="tema-title">Utforsk etter tema</h2>
            </div>
            <p className="section-description">Vel eit tema og finn fram til kapitla i arkivet.</p>
          </div>

          <div className="tema-grid">
            {temaer.map((tema, index) => (
              <TemaCard
                key={tema.id}
                tema={tema}
                index={String(index + 1).padStart(2, "0")}
              />
            ))}
          </div>
        </section>

        <section className="arkiv-section" id="kapitteloversikt" aria-labelledby="arkiv-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Heile samlinga</p>
              <h2 id="arkiv-title">Kapitla i arkivet</h2>
            </div>
            <p className="section-description">27 kapittel om historia, kvardagen og minna frå Eivindvik.</p>
          </div>

          <div className="kapittel-grid">
            {temaer.map((tema) => (
              <KapittelGroup key={tema.id} tema={tema} />
            ))}
          </div>
        </section>

        <section className="about-arkiv" id="om-arkivet" aria-labelledby="about-title">
          <span className="about-arkiv-badge" aria-hidden="true">E</span>
          <div>
            <p className="eyebrow">Om samlinga</p>
            <h2 id="about-title">Historia blir til av dei som hugsar.</h2>
          </div>
          <p className="about-arkiv-text">
            Arkivet tek vare på lokalhistoriske tekstar av Magnor Midtun om Eivindvik og bygdene rundt.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
