import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eivindvik før og no | Lokalhistorisk arkiv",
  description: "Utforsk forteljingane, stadene og minna frå Eivindvik og Gulen.",
  appleWebApp: {
    title: "Eivindvik",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nn">
      <body>{children}</body>
    </html>
  );
}
