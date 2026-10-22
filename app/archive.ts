import { readFile } from "node:fs/promises";
import path from "node:path";
import { defaultLocale, type Locale } from "./i18n";

const archiveDir = path.join(process.cwd(), "content/archive");

export type ArchiveBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph" | "listItem"; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    };

export type ArchivePage = {
  slug: string;
  title: string;
  chapterNumber: number | null;
  blocks: ArchiveBlock[];
  // The language of the blocks. Pages without a translation stay in Nynorsk.
  language: Locale;
};

// A translation file under content/archive/<locale>/ maps block indexes of the
// Nynorsk page to translated text. Image blocks take the translated caption.
type ArchiveTranslation = {
  blocks: Record<string, string>;
};

export type KapittelSection = {
  pageSlug: string;
  blockIndex: number;
  id: string;
  title: string;
};

type ManifestEntry = {
  slug: string;
  chapterNumber: number | null;
  file: string;
};

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(path.join(archiveDir, file), "utf8")) as T;
}

async function readTranslation(locale: Locale, slug: string) {
  try {
    return await readJson<ArchiveTranslation>(`${locale}/${slug}.json`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
}

async function translatePage(page: ArchivePage, locale: Locale): Promise<ArchivePage> {
  const translation = await readTranslation(locale, page.slug);
  if (!translation) return page;

  const blocks = page.blocks.map((block, index): ArchiveBlock => {
    const text = translation.blocks[index];
    if (text === undefined) return block;
    return block.type === "image" ? { ...block, caption: text } : { ...block, text };
  });
  return { ...page, blocks, language: locale };
}

// Returns the chapter's main page and its sub-pages in manifest order, with
// the text translated where a translation exists.
export async function getKapittelPages(kapittelNumber: number, locale: Locale = defaultLocale) {
  const manifest = await readJson<{ pages: ManifestEntry[] }>("manifest.json");
  const entries = manifest.pages.filter(
    (page) => page.chapterNumber === kapittelNumber,
  );
  const pages = await Promise.all(
    entries.map(async (entry) => ({
      ...(await readJson<Omit<ArchivePage, "language">>(entry.file)),
      language: defaultLocale,
    })),
  );
  if (locale === defaultLocale) return pages;
  return Promise.all(pages.map((page) => translatePage(page, locale)));
}

export function getFirstImage(pages: ArchivePage[]) {
  for (const page of pages) {
    const image = page.blocks.find((block) => block.type === "image");
    if (image?.type === "image") return image;
  }
  return undefined;
}

function makeSectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// These editorial sections follow the chapter's existing subject changes.
const kapittelSections: Record<
  string,
  { blockIndex: number; title: Record<Locale, string> }[]
> = {
  "kap03--krossane": [
    { blockIndex: 2, title: { nn: "Olavskrossen", en: "The Olav cross" } },
    { blockIndex: 19, title: { nn: "Den angliske krossen", en: "The Anglian cross" } },
    { blockIndex: 28, title: { nn: "Kor gamle er dei?", en: "How old are they?" } },
    { blockIndex: 33, title: { nn: "Den tredje krossen", en: "The third cross" } },
  ],
};

export function getKapittelSections(pages: ArchivePage[], title: string) {
  const firstPage = pages[0];
  const overrides = firstPage ? kapittelSections[firstPage.slug] : undefined;
  const sections =
    overrides && firstPage
      ? overrides.map((section) => ({
          blockIndex: section.blockIndex,
          title: section.title[firstPage.language],
          pageSlug: firstPage.slug,
        }))
      : pages.flatMap((page) =>
          page.blocks.flatMap((block, blockIndex) => {
            if (
              block.type !== "heading" ||
              block.text.trim().toLowerCase() === title.trim().toLowerCase()
            ) {
              return [];
            }
            return [
              { pageSlug: page.slug, blockIndex, title: block.text.trim() },
            ];
          }),
        );

  const ids = new Map<string, number>();
  return sections.map((section) => {
    const baseId = makeSectionId(section.title);
    const occurrence = ids.get(baseId) ?? 0;
    ids.set(baseId, occurrence + 1);
    return {
      ...section,
      id: occurrence === 0 ? baseId : `${baseId}-${occurrence + 1}`,
    };
  });
}

export type KapittelDikt = {
  pageSlug: string;
  firstBlock: number;
  lastBlock: number;
  stanzas: string[][];
  title?: string;
  source?: string;
};

type KapittelDiktRange = Omit<KapittelDikt, "pageSlug" | "stanzas" | "title" | "source"> & {
  title?: Record<Locale, string>;
  source?: Record<Locale, string>;
  // Number of lines in each stanza. The scraper drops stanza breaks, so the
  // whole poem is one stanza unless this is given.
  stanzaLengths?: number[];
};

// Poems quoted inside chapter text, by page slug and block range (inclusive).
// The scraped lines are separate paragraphs and can't be told apart from short
// prose or tables reliably, so each poem is listed here by hand.
const kapittelDikt: Record<string, KapittelDiktRange[]> = {
  "kap01--innleiing": [
    {
      firstBlock: 9,
      lastBlock: 12,
      source: { nn: "Frå «Bygda vår»", en: "From “Bygda vår” (Our village)" },
    },
  ],
};

export function getKapittelDikt(pages: ArchivePage[]): KapittelDikt[] {
  return pages.flatMap((page) =>
    (kapittelDikt[page.slug] ?? []).map(({ stanzaLengths, title, source, ...range }) => {
      const lines = page.blocks
        .slice(range.firstBlock, range.lastBlock + 1)
        .flatMap((block) =>
          block.type === "paragraph" && block.text.trim()
            ? [block.text.trim()]
            : [],
        );
      const stanzas: string[][] = [];
      let start = 0;
      for (const length of stanzaLengths ?? [lines.length]) {
        stanzas.push(lines.slice(start, start + length));
        start += length;
      }
      if (start < lines.length) stanzas.push(lines.slice(start));
      return {
        ...range,
        pageSlug: page.slug,
        stanzas,
        title: title?.[page.language],
        source: source?.[page.language],
      };
    }),
  );
}

export type Dikt = {
  id: string;
  title: string;
  lines: string[];
  metadata?: string[];
  // The language of the archive page the piece was read from.
  language: Locale;
};

export type WrittenWorkGroup = {
  id: string;
  title: string;
  // Lowercase genre name for a single piece, used in page titles.
  label: string;
  chapter: number;
  items: Dikt[];
};

// A paragraph line with the Nynorsk text it was read from. Titles, markers and
// metadata are recognised from the Nynorsk text, so ids and structure stay the
// same in every language.
type ArchiveLine = {
  source: string;
  text: string;
};

function paragraphLines(page: ArchivePage, sourcePage: ArchivePage): ArchiveLine[] {
  return sourcePage.blocks.flatMap((block, index) => {
    if (block.type !== "paragraph" || !block.text.trim()) return [];
    const translated = page.blocks[index];
    const text = translated?.type === "paragraph" && translated.text.trim() ? translated.text.trim() : block.text.trim();
    return [{ source: block.text.trim(), text }];
  });
}

function isTranslated(line: ArchiveLine) {
  return line.text !== line.source;
}

function isDiktTitle(text: string) {
  return text === text.toUpperCase() && /\p{L}/u.test(text);
}

function formatDiktTitle(text: string) {
  const title = text.replace(/\.$/, "").toLowerCase();
  return title.charAt(0).toUpperCase() + title.slice(1);
}

// Translated titles are written in sentence case already.
function displayDiktTitle(line: ArchiveLine) {
  return isTranslated(line) ? line.text : formatDiktTitle(line.source);
}

const writtenWorkMetadata: Record<string, Record<string, string[]>> = {
  rim: {
    Bytur: ["Den 10.3.1990"],
  },
  prologar: {
    "Eivindvik år 1000 – 2000": ["Eivindvik, nyttårsafta 1999."],
    "50-årskonfirmantar i Gulen kyrkje": ["1.9.1996"],
    "Håkon adelsteinsfostre i gula": ["1997"],
    "Gulen sanitetslag": ["Basar 13.3.1971."],
    "Gulen sjukeheim": ["Overlevering 1.6.1975."],
    Utvær: ["150504."],
    Vatnestemnet: ["Eivindvik Vertshus 25.5.1985."],
  },
  hoegtider: {
    Jolekveld: [
      "Går til tone: “Eg er så glad kvar julekveld”, helst den danske tonen.",
    ],
    Jul: [
      "Eg trur sangen kan gå til tone: «Det lyser i stille grender.» 14.11.1999.",
    ],
    Påske: ["Kan gå til tone: “Namnet Jesus”."],
  },
  bankar: {
    "Funksjonærtreff i Balestrand": ["26.9.1992."],
    "Innviing av nytt bankhus": ["Bygget vart teke i bruk 11.9.1978."],
    Fusjonsfest: ["I sparebanken Sogn og Fjordane, 8.4.1988."],
    "Sparebanken Askvoll 100 år": ["24.4.1993."],
    "Sparebanken Gaular 100 år": ["15.2.1994."],
  },
};

const metadataDisplayText: Record<string, string> = {
  "(1997)": "Skrevet i 1997.",
  "150504.": "15.05.04.",
  "Går til tone: “Eg er så glad kvar julekveld”, helst den danske tonen.":
    "Går til tone: «Eg er så glad kvar julekveld», helst den danske tonen.",
  "Eg trur sangen kan gå til tone: «Det lyser i stille grender.» 14.11.1999.":
    "Går til tone: «Det lyser i stille grender». 14.11.1999.",
  "Kan gå til tone: “Namnet Jesus”.": "Går til tone: «Namnet Jesus».",
};

function getWorkMetadata(groupId: string, title: string) {
  return writtenWorkMetadata[groupId]?.[title] ?? [];
}

function getMetadataDisplayText(line: ArchiveLine) {
  if (isTranslated(line)) return line.text;
  return metadataDisplayText[line.source] ?? line.source;
}

type ParsedDikt = {
  // The formatted Nynorsk title, which gives the id and the metadata lookup.
  sourceTitle: string;
  title: string;
  lines: string[];
  metadata: string[];
  language: Locale;
};

// The Rim chapter stores each line as a paragraph and marks every poem with an
// all-caps title. The first page opens with "Adventstid" and then lists the
// titles of the other poems, so only its first poem is read from there.
async function getDikt(locale: Locale) {
  const [sourcePages, pages] = await Promise.all([
    getKapittelPages(24),
    getKapittelPages(24, locale),
  ]);
  const [adventTitle, ...adventLines] = paragraphLines(pages[0], sourcePages[0]).slice(1);
  const dikt: ParsedDikt[] = [
    {
      sourceTitle: formatDiktTitle(adventTitle.source),
      title: displayDiktTitle(adventTitle),
      lines: adventLines
        .slice(0, adventLines.findIndex((line) => isDiktTitle(line.source)))
        .map((line) => line.text),
      metadata: [],
      language: pages[0].language,
    },
  ];

  for (const [index, page] of pages.entries()) {
    if (index === 0) continue;
    for (const line of paragraphLines(page, sourcePages[index])) {
      if (line.source === "RIM") continue;
      if (isDiktTitle(line.source))
        dikt.push({
          sourceTitle: formatDiktTitle(line.source),
          title: displayDiktTitle(line),
          lines: [],
          metadata: [],
          language: page.language,
        });
      else {
        const current = dikt.at(-1);
        if (!current) continue;
        if (getWorkMetadata("rim", current.sourceTitle).includes(line.source))
          current.metadata.push(getMetadataDisplayText(line));
        else current.lines.push(line.text);
      }
    }
  }

  return dikt.map(({ sourceTitle, metadata, ...item }): Dikt => ({
    ...item,
    id: makeSectionId(sourceTitle),
    ...(metadata.length > 0 ? { metadata } : {}),
  }));
}

const writtenWorkGroups = [
  {
    id: "prologar",
    title: { nn: "Prologar", en: "Prologues" },
    label: { nn: "prolog", en: "prologue" },
    chapter: 23,
    indexPage: "kap23--prologar",
    marker: "PROLOGAR",
  },
  {
    id: "rim",
    title: { nn: "Rim", en: "Verses" },
    label: { nn: "rim", en: "verse" },
    chapter: 24,
    indexPage: "",
    marker: "RIM",
  },
  {
    id: "hoegtider",
    title: { nn: "Høgtider", en: "Holy days" },
    label: { nn: "høgtidsdikt", en: "holiday poem" },
    chapter: 25,
    indexPage: "",
    marker: "HØGTIDER",
  },
  {
    id: "minneord",
    title: { nn: "Minneord", en: "Memorial tributes" },
    label: { nn: "minneord", en: "memorial tribute" },
    chapter: 26,
    indexPage: "kap26--minneord",
    marker: "MINNEORD",
  },
  {
    id: "bankar",
    title: { nn: "Bankar", en: "Banks" },
    label: { nn: "dikt", en: "poem" },
    chapter: 27,
    indexPage: "kap-27--bankar",
    marker: "BANKAR",
  },
] as const;

function parseWrittenWorks(
  pages: ArchivePage[],
  sourcePages: ArchivePage[],
  group: (typeof writtenWorkGroups)[number],
) {
  const parsed: Dikt[] = [];

  for (const [pageIndex, page] of pages.entries()) {
    if (page.slug === group.indexPage) continue;
    let lines = paragraphLines(page, sourcePages[pageIndex]);

    // The Høgtider index stores its table of contents before the first poem.
    if (page.slug === "kap25--hoegtider") lines = lines.slice(2);

    let current: ParsedDikt | undefined;
    const saveCurrent = () => {
      if (current && current.lines.length > 0) {
        const { sourceTitle, ...dikt } = current;
        parsed.push({ ...dikt, id: `${group.id}-${makeSectionId(sourceTitle)}` });
      }
    };

    for (const line of lines) {
      if (line.source.toUpperCase() === group.marker) continue;
      if (isDiktTitle(line.source)) {
        saveCurrent();
        current = {
          sourceTitle: formatDiktTitle(line.source),
          title: displayDiktTitle(line),
          lines: [],
          metadata: [],
          language: page.language,
        };
      } else if (current) {
        if (getWorkMetadata(group.id, current.sourceTitle).includes(line.source))
          current.metadata.push(getMetadataDisplayText(line));
        else current.lines.push(line.text);
      }
    }
    saveCurrent();
  }

  // Some pieces also have a standalone archive page. Keep the fuller copy.
  const unique = new Map<string, Dikt>();
  for (const item of parsed) {
    const existing = unique.get(item.id);
    if (!existing) unique.set(item.id, item);
    else {
      const preferred =
        item.lines.length > existing.lines.length ? item : existing;
      const metadata = [
        ...new Set([...(existing.metadata ?? []), ...(item.metadata ?? [])]),
      ];
      unique.set(item.id, {
        ...preferred,
        ...(metadata.length > 0 ? { metadata } : {}),
      });
    }
  }
  return [...unique.values()];
}

export async function getWrittenWorkGroups(locale: Locale = defaultLocale): Promise<WrittenWorkGroup[]> {
  return Promise.all(
    writtenWorkGroups.map(async (group) => {
      const items =
        group.id === "rim"
          ? (await getDikt(locale)).map((item) => ({ ...item, id: `rim-${item.id}` }))
          : parseWrittenWorks(
              await getKapittelPages(group.chapter, locale),
              await getKapittelPages(group.chapter),
              group,
            );
      return {
        id: group.id,
        title: group.title[locale],
        label: group.label[locale],
        chapter: group.chapter,
        items,
      };
    }),
  );
}

export async function getWrittenWork(id: string, locale: Locale = defaultLocale) {
  const groups = await getWrittenWorkGroups(locale);
  for (const group of groups) {
    const index = group.items.findIndex((item) => item.id === id);
    if (index !== -1) return { group, index, work: group.items[index] };
  }
  return undefined;
}
