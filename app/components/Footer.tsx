import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <Link className="wordmark wordmark-footer" href="#toppen">
        <span className="wordmark-symbol" aria-hidden="true">E</span>
        <span>Eivindvik <span className="wordmark-small">før og no</span></span>
      </Link>
      <p>Ei lokalhistorisk samling om bygda og folket hennar.</p>
      <Link className="footer-link" href="#toppen">Til toppen ↑</Link>
    </footer>
  );
}
