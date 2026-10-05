import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="#toppen" aria-label="Eivindvik før og no – til toppen">
        <span className="wordmark-symbol" aria-hidden="true">E</span>
        <span>Eivindvik <span className="wordmark-small">før og no</span></span>
      </Link>

      <nav className="main-nav" aria-label="Hovudmeny">
        <Link href="#tema">Utforsk tema</Link>
        <Link href="#om-arkivet">Om arkivet</Link>
      </nav>
    </header>
  );
}
