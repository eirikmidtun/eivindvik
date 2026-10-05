import Link from "next/link";
import type { NavLink } from "../content";

type HeroNavProps = {
  links: NavLink[];
};

export function HeroNav({ links }: HeroNavProps) {
  return (
    <nav className="hero-nav" aria-label="Hovudmeny">
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
