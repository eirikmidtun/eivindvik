import Link from "next/link";
import type { ReactNode } from "react";
import type { NavLink } from "../content";

type HeroNavProps = {
  links: NavLink[];
  label: string;
  children?: ReactNode;
};

export function HeroNav({ links, label, children }: HeroNavProps) {
  return (
    <nav className="hero-nav" aria-label={label}>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        {children && <li>{children}</li>}
      </ul>
    </nav>
  );
}
