import { getWrittenWorkGroups } from "../archive";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { type WorkIndexGroup, WrittenWorkIndex } from "../components/WrittenWorkIndex";
import { author, writtenWorksPage } from "../content";

export default async function WrittenWorksLayout({ children }: LayoutProps<"/dikt-og-tekstar">) {
  const groups = await getWrittenWorkGroups();
  const indexGroups: WorkIndexGroup[] = groups.map(({ id, title, chapter, items }) => ({
    id,
    title,
    chapter,
    items: items.map((item) => ({ id: item.id, title: item.title })),
  }));
  const totalWorks = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <>
      <main>
        <PageHero image={writtenWorksPage.heroImage} variant="banner" />
        <div className="written-layout">
          <aside className="written-sidebar" aria-label="Innhald i samlinga">
            <div className="written-sidebar-inner">
              <p className="eyebrow">Samlinga</p>
              <h2>Dikt og tekstar</h2>
              <WrittenWorkIndex groups={indexGroups} />
              <p className="written-sidebar-total">
                {totalWorks} dikt og tekstar av {author}.
              </p>
            </div>
          </aside>

          <details className="written-mobile-index">
            <summary>Utforsk samlinga</summary>
            <div className="written-mobile-index-inner">
              <p className="eyebrow">Samlinga</p>
              <WrittenWorkIndex groups={indexGroups} />
              <p className="written-sidebar-total">
                {totalWorks} dikt og tekstar av {author}.
              </p>
            </div>
          </details>

          <section className="written-reading">{children}</section>
        </div>
      </main>
      <Footer />
    </>
  );
}
