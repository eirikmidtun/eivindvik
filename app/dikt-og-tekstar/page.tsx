import type { Metadata } from "next";
import { getWrittenWorkGroups } from "../archive";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { WrittenWorkReader } from "../components/WrittenWorkReader";
import { author, writtenWorksPage } from "../content";

export const metadata: Metadata = {
  title: "Dikt og tekstar",
  description: writtenWorksPage.description,
  alternates: { canonical: "/dikt-og-tekstar" },
};

export default async function WrittenWorksPage() {
  const groups = await getWrittenWorkGroups();

  return (
    <>
      <main>
        <PageHero image={writtenWorksPage.heroImage} variant="banner" />
        <WrittenWorkReader groups={groups} author={author} />
      </main>
      <Footer />
    </>
  );
}
