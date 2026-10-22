import { getWrittenWorkGroups } from "../../archive";
import { Footer } from "../../components/Footer";
import { PageHero } from "../../components/PageHero";
import { type WorkIndexGroup, type WorkIndexLabels, WrittenWorkIndex } from "../../components/WrittenWorkIndex";
import { getContent, getDictionary } from "../../dictionary";
import { localePath } from "../../i18n";
import { resolveLocale } from "../../metadata";

export default async function WrittenWorksLayout({ children, params }: LayoutProps<"/[lang]/dikt-og-tekstar">) {
  const locale = resolveLocale((await params).lang);
  const { writtenWorksPage } = getContent(locale);
  const ui = getDictionary(locale);
  const groups = await getWrittenWorkGroups(locale);
  const indexGroups: WorkIndexGroup[] = groups.map(({ id, title, chapter, items }) => ({
    id,
    title,
    chapter,
    items: items.map((item) => ({ id: item.id, title: item.title })),
  }));
  const labels: WorkIndexLabels = {
    index: ui.writtenWorks.indexLabel,
    showFewer: ui.writtenWorks.showFewer,
    chapter: Object.fromEntries(groups.map((group) => [group.id, ui.chapterEyebrow(String(group.chapter))])),
    showAll: Object.fromEntries(
      groups.map((group) => [group.id, ui.writtenWorks.showAll(group.items.length, group.id === "rim")]),
    ),
  };
  const basePath = localePath(locale, "/dikt-og-tekstar");
  const totalWorks = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <>
      <main>
        <PageHero image={writtenWorksPage.heroImage} variant="banner" />
        <div className="written-layout">
          <aside className="written-sidebar" aria-label={ui.writtenWorks.sidebarLabel}>
            <div className="written-sidebar-inner">
              <p className="eyebrow">{ui.writtenWorks.collection}</p>
              <h2>{ui.writtenWorks.title}</h2>
              <WrittenWorkIndex groups={indexGroups} basePath={basePath} labels={labels} />
              <p className="written-sidebar-total">{ui.writtenWorks.total(totalWorks)}</p>
            </div>
          </aside>

          <details className="written-mobile-index">
            <summary>{ui.writtenWorks.explore}</summary>
            <div className="written-mobile-index-inner">
              <p className="eyebrow">{ui.writtenWorks.collection}</p>
              <WrittenWorkIndex groups={indexGroups} basePath={basePath} labels={labels} />
              <p className="written-sidebar-total">{ui.writtenWorks.total(totalWorks)}</p>
            </div>
          </details>

          <section className="written-reading">{children}</section>
        </div>
      </main>
      <Footer />
    </>
  );
}
