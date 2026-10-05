import Link from "next/link";
import { navLinks } from "../content";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-inner site-footer-inner">
        <Wordmark />
        <nav className="footer-nav" aria-label="Botnmeny">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
