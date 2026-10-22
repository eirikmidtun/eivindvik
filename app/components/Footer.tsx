import Link from "next/link";
import { getContent, getDictionary } from "../dictionary";
import { getLocale } from "../locale";
import { LanguageSwitch } from "./LanguageSwitch";
import { Wordmark } from "./Wordmark";

export async function Footer() {
  const locale = await getLocale();
  const { navLinks } = getContent(locale);
  const ui = getDictionary(locale);

  return (
    <footer className="site-footer">
      <div className="section-inner site-footer-inner">
        <Wordmark />
        <nav className="footer-nav" aria-label={ui.footerMenu}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <LanguageSwitch {...ui.languageSwitch} />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
