import type { Metadata } from "next";
import { author, siteDescription, siteName, siteUrl } from "./content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Lokalhistorisk arkiv`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  authors: [{ name: author }],
  openGraph: {
    siteName,
    locale: "nn_NO",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: {
    title: "Eivindvik",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nn" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
