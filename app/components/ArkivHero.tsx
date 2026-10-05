import Image from "next/image";
import Link from "next/link";

export function ArkivHero() {
  return (
    <section className="arkiv-hero" id="toppen" aria-labelledby="page-title">
      <div className="arkiv-hero-image">
        <Image
          src="/archive/_borders/_derived/top.htm_txt_eivindvik.gif"
          alt="Utsyn over Eivindvik med fjell, sjø og bygningar langs stranda"
          width={825}
          height={282}
          preload
          sizes="(max-width: 760px) 100vw, 1200px"
        />
        <span className="image-badge">Eivindvik · Gulen</span>
      </div>

      <div className="arkiv-hero-text">
        <p className="eyebrow">Ei lokalhistorisk samling</p>
        <h1 id="page-title">Eivindvik<br /><em>før og no</em></h1>
        <p className="arkiv-hero-lead">
          Gå på oppdagingsferd i forteljingane, stadene og minna som har forma bygda.
        </p>
        <Link className="button button-dark" href="#tema">
          Utforsk arkivet <span aria-hidden="true">↓</span>
        </Link>
      </div>

      <div className="arkiv-hero-note" aria-hidden="true">
        <span>60°59′ N</span>
        <span>Gulen · Vestland</span>
      </div>
    </section>
  );
}
