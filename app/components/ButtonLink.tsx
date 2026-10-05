import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./ArrowIcon";

type ButtonLinkProps = {
  href: string;
  variant: "solid" | "outline" | "text";
  children: ReactNode;
};

export function ButtonLink({ href, variant, children }: ButtonLinkProps) {
  return (
    <Link className={`button-link button-link-${variant}`} href={href}>
      {children}
      <ArrowIcon />
    </Link>
  );
}
