import { readFile } from "node:fs/promises";
import path from "node:path";

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

// Returns the chapter's main page and its sub-pages in manifest order.
export async function getKapittelPages(kapittelNumber: number) {
  const manifest = await readJson<{ pages: ManifestEntry[] }>("manifest.json");
  const entries = manifest.pages.filter((page) => page.chapterNumber === kapittelNumber);
  return Promise.all(entries.map((entry) => readJson<ArchivePage>(entry.file)));
}

export function getKapittelDescription(pages: ArchivePage[], title: string) {
  const text = pages
    .flatMap((page) => page.blocks)
    .find(
      (block) =>
        block.type === "paragraph" &&
        block.text.trim().length >= 100 &&
        block.text.trim().toLowerCase() !== title.toLowerCase(),
    );
  if (!text || text.type !== "paragraph") return undefined;

  const clean = text.text.replace(/\s+/g, " ").trim();
  if (clean.length <= 155) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", 152))} …`;
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
const kapittelSections: Record<string, { blockIndex: number; title: string }[]> = {
  "kap03--krossane": [
    { blockIndex: 2, title: "Olavskrossen" },
    { blockIndex: 19, title: "Den angliske krossen" },
    { blockIndex: 28, title: "Kor gamle er dei?" },
    { blockIndex: 33, title: "Den tredje krossen" },
  ],
};

export function getKapittelSections(pages: ArchivePage[], title: string) {
  const firstPageSlug = pages[0]?.slug;
  const overrides = firstPageSlug ? kapittelSections[firstPageSlug] : undefined;
  const sections = overrides && firstPageSlug
    ? overrides.map((section) => ({ ...section, pageSlug: firstPageSlug }))
    : pages.flatMap((page) =>
        page.blocks.flatMap((block, blockIndex) => {
          if (block.type !== "heading" || block.text.trim().toLowerCase() === title.trim().toLowerCase()) {
            return [];
          }
          return [{ pageSlug: page.slug, blockIndex, title: block.text.trim() }];
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

export type Dikt = {
  id: string;
  title: string;
  lines: string[];
};

export type WrittenWorkGroup = {
  id: string;
  title: string;
  items: Dikt[];
};

function isDiktTitle(text: string) {
  return text === text.toUpperCase() && /\p{L}/u.test(text);
}

function formatDiktTitle(text: string) {
  const title = text.replace(/\.$/, "").toLowerCase();
  return title.charAt(0).toUpperCase() + title.slice(1);
}

// The Rim chapter stores each line as a paragraph and marks every poem with an
// all-caps title. The first page opens with "Adventstid" and then lists the
// titles of the other poems, so only its first poem is read from there.
export async function getDikt() {
  const [firstPage, ...pages] = await getKapittelPages(24);
  const lines = (blocks: ArchiveBlock[]) =>
    blocks.flatMap((block) => (block.type === "paragraph" && block.text.trim() ? [block.text.trim()] : []));

  const [adventTitle, ...adventLines] = lines(firstPage.blocks.slice(1));
  const dikt = [{ title: adventTitle, lines: adventLines.slice(0, adventLines.findIndex(isDiktTitle)) }];

  for (const page of pages) {
    for (const line of lines(page.blocks)) {
      if (line === "RIM") continue;
      if (isDiktTitle(line)) dikt.push({ title: line, lines: [] });
      else dikt.at(-1)?.lines.push(line);
    }
  }

  return dikt.map(({ title, lines }): Dikt => {
    const formatted = formatDiktTitle(title);
    return { id: makeSectionId(formatted), title: formatted, lines };
  });
}

const writtenWorkGroups = [
  { id: "prologar", title: "Prologar", chapter: 23, indexPage: "kap23--prologar", marker: "PROLOGAR" },
  { id: "rim", title: "Rim", chapter: 24, indexPage: "", marker: "RIM" },
  { id: "hoegtider", title: "Høgtider", chapter: 25, indexPage: "", marker: "HØGTIDER" },
  { id: "minneord", title: "Minneord", chapter: 26, indexPage: "kap26--minneord", marker: "MINNEORD" },
  { id: "bankar", title: "Bankar", chapter: 27, indexPage: "kap-27--bankar", marker: "BANKAR" },
] as const;

function parseWrittenWorks(pages: ArchivePage[], group: (typeof writtenWorkGroups)[number]) {
  const parsed: Dikt[] = [];

  for (const page of pages) {
    if (page.slug === group.indexPage) continue;
    let lines = page.blocks
      .flatMap((block) => (block.type === "paragraph" && block.text.trim() ? [block.text.trim()] : []));

    // The Høgtider index stores its table of contents before the first poem.
    if (page.slug === "kap25--hoegtider") lines = lines.slice(2);

    let current: Dikt | undefined;
    const saveCurrent = () => {
      if (current && current.lines.length > 0) parsed.push(current);
    };

    for (const line of lines) {
      if (line.toUpperCase() === group.marker) continue;
      if (isDiktTitle(line)) {
        saveCurrent();
        const title = formatDiktTitle(line);
        current = { id: `${group.id}-${makeSectionId(title)}`, title, lines: [] };
      } else if (current) {
        current.lines.push(line);
      }
    }
    saveCurrent();
  }

  // Some pieces also have a standalone archive page. Keep the fuller copy.
  const unique = new Map<string, Dikt>();
  for (const item of parsed) {
    const existing = unique.get(item.id);
    if (!existing || item.lines.length > existing.lines.length) unique.set(item.id, item);
  }
  return [...unique.values()];
}

export async function getWrittenWorkGroups(): Promise<WrittenWorkGroup[]> {
  return Promise.all(
    writtenWorkGroups.map(async (group) => {
      const pages = await getKapittelPages(group.chapter);
      const items = group.id === "rim"
        ? (await getDikt()).map((item) => ({ ...item, id: `rim-${item.id}` }))
        : parseWrittenWorks(pages, group);
      return { id: group.id, title: group.title, items };
    }),
  );
}
