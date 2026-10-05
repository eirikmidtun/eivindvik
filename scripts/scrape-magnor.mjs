// Arkiverer den lokalhistoriske heimesida til Magnor Midtun (privat.enivest.net/~magnor.midtun)
// til content/archive (tekst, rå HTML, skjermbilete) og public/archive (bilete).
// Køyr: node scripts/scrape-magnor.mjs

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = "http://privat.enivest.net/~magnor.midtun/";
const START = BASE + "index.htm";
const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content/archive");
const PUBLIC = path.join(ROOT, "public/archive");
const DELAY_MS = 400;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decoder = new TextDecoder("windows-1252");

// "Kap 27/Bankar.htm" -> "kap-27/bankar.htm"; held på mappene, fjernar mellomrom og æøå.
function safePath(rel) {
  return rel
    .split("/")
    .map((seg) =>
      seg
        .toLowerCase()
        .replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")
        .normalize("NFKD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .join("/");
}

const relOf = (url) => decodeURIComponent(new URL(url).pathname.replace(/^\/~magnor\.midtun\//, ""));
const isInternal = (url) => url.startsWith(BASE);
const isPage = (url) => /\.html?$/i.test(new URL(url).pathname);
// Navigasjonsknappar frå FrontPage (_derived/*_cmp_*) er grensesnitt, ikkje innhald.
const isImage = (url) => /\.(jpe?g|gif|png|bmp|webp)$/i.test(new URL(url).pathname) && !/_derived\/[^/]*_cmp_/.test(url);
const slugOf = (rel) => safePath(rel).replace(/\.html?$/, "").replace(/\//g, "--");

function normalize(href, from) {
  try {
    const u = new URL(href, from);
    u.hash = "";
    u.search = "";
    return u.href;
  } catch {
    return null;
  }
}

// Køyrer i nettlesaren: gjer sideinnhaldet om til blokker i rekkjefølgje og samlar lenkjer.
function extract() {
  let blocks = [];
  let images = [];
  const clean = (s) => s.replace(/ /g, " ").replace(/[ \t\r\n]+/g, " ").trim();

  // Navigasjon = ein container der nesten alle lenkjene går til andre kapittel eller startsida.
  const isNav = (el) => {
    const links = [...el.querySelectorAll("a[href]")];
    if (links.length < 5) return false;
    const navLinks = links.filter((a) => /(\.\.\/)?(Kap[^/]*\/[^/]+\.htm|index\.htm)$/i.test(a.getAttribute("href")));
    const linkText = links.reduce((n, a) => n + a.textContent.length, 0);
    return navLinks.length / links.length > 0.8 && linkText / Math.max(1, el.textContent.length) > 0.5;
  };

  const captionFor = (img) => {
    // FrontPage-mønster: <table><tr><td><img></td></tr><tr><td>bilettekst</td></tr></table>
    const table = img.closest("table");
    if (!table || table.querySelector("table") || table.querySelectorAll("td").length > 4) return "";
    const text = clean([...table.querySelectorAll("td")].filter((td) => !td.querySelector("img")).map((td) => td.textContent).join(" "));
    return text.length < 600 ? text : "";
  };

  const seenCaptions = new Set();
  const walk = (node) => {
    if (node.nodeType !== 1) return;
    const el = node;
    const tag = el.tagName;
    if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(tag)) return;
    if (el.closest("a[href*='free-website-hit-counters']")) return;
    if ((tag === "TABLE" || tag === "DIV" || tag === "P") && isNav(el)) return;

    if (tag === "IMG") {
      // Toppbanner og navigasjonsknappar laga av FrontPage.
      if (/\/_derived\//.test(el.src)) return;
      const caption = captionFor(el);
      if (caption) seenCaptions.add(caption);
      const img = {
        src: el.src,
        alt: el.alt || "",
        width: el.getAttribute("width") ? Number(el.getAttribute("width")) : el.naturalWidth || null,
        height: el.getAttribute("height") ? Number(el.getAttribute("height")) : el.naturalHeight || null,
        naturalWidth: el.naturalWidth || null,
        naturalHeight: el.naturalHeight || null,
        caption,
        link: el.closest("a[href]")?.href || null,
      };
      images.push(img);
      blocks.push({ type: "image", ...img });
      return;
    }

    if (/^H[1-6]$/.test(tag)) {
      const text = clean(el.textContent);
      if (text) blocks.push({ type: "heading", level: Number(tag[1]), text });
      el.querySelectorAll("img").forEach(walk);
      return;
    }

    if (tag === "P" || tag === "LI" || tag === "BLOCKQUOTE" || tag === "PRE") {
      if (el.querySelector("img, table, h1, h2, h3, h4, h5, h6")) {
        el.childNodes.forEach(walk);
        return;
      }
      const text = clean(el.innerText || el.textContent);
      if (text && !seenCaptions.has(text)) blocks.push({ type: tag === "LI" ? "listItem" : "paragraph", text, html: el.innerHTML.trim() });
      return;
    }

    if (tag === "TD" && !el.querySelector("p, h1, h2, h3, h4, h5, h6, img, table, div")) {
      const text = clean(el.innerText || el.textContent);
      if (text && !seenCaptions.has(text)) blocks.push({ type: "paragraph", text, html: el.innerHTML.trim() });
      return;
    }

    // Laus tekst rett i containerar (FrontPage hoppar ofte over <p>).
    for (const child of el.childNodes) {
      if (child.nodeType === 3) {
        const text = clean(child.textContent);
        if (text.length > 1) blocks.push({ type: "paragraph", text, html: text });
      } else {
        walk(child);
      }
    }
  };
  // Delte kantar i FrontPage: body > table(topp) + table(venstre | mellomrom | <!--msnavigation--> innhald | høgre) + table(botn).
  // Innhaldscella er den første <td>-en som kjem rett etter ein msnavigation-kommentar.
  const isMsNav = (n) => n?.nodeType === 8 && n.textContent.trim() === "msnavigation";
  const prevNonText = (n) => {
    let p = n.previousSibling;
    while (p && p.nodeType === 3 && !p.textContent.trim()) p = p.previousSibling;
    return p;
  };
  const contentCell = [...document.querySelectorAll("body > table > tbody > tr > td")].find((td) => isMsNav(prevNonText(td)));
  const layoutTables = [...document.querySelectorAll("body > table")].filter((t) => isMsNav(prevNonText(t)));
  const bottomCell = contentCell && layoutTables.length >= 3 ? layoutTables.at(-1).querySelector("td") : null;

  const collect = (root) => {
    blocks = [];
    images = [];
    seenCaptions.clear();
    if (root) walk(root);
    return { blocks, images };
  };
  // Høgre kant: den siste <td>-en i innhaldsrada (etter eit 24px mellomrom), når ho finst.
  const lastTd = contentCell?.parentElement.lastElementChild;
  const rightCell = lastTd && lastTd !== contentCell && lastTd.getAttribute("width") === "1%" ? lastTd : null;
  const sidebar = collect(rightCell);
  const footer = collect(bottomCell);
  const content = collect(contentCell ?? document.body);
  blocks = content.blocks;
  images = content.images;

  const links = [...document.querySelectorAll("a[href], area[href]")].map((a) => a.href);
  const assets = [
    ...[...document.querySelectorAll("img[src]")].map((i) => i.src),
    ...[...document.querySelectorAll("[background]")].map((e) => new URL(e.getAttribute("background"), location.href).href),
  ];
  const title = clean(document.title);
  const h1 = clean(document.querySelector("h1")?.textContent || "");
  return { title, h1, blocks, images, sidebar, footer, links, assets, text: blocks.filter((b) => b.text && b.type !== "image").map((b) => b.text).join("\n\n") };
}

async function main() {
  for (const d of ["pages", "raw", "screenshots"]) await fs.mkdir(path.join(CONTENT, d), { recursive: true });
  await fs.mkdir(PUBLIC, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  // Ikkje la den eksterne besøksteljaren gjere ting treigare.
  await context.route(/free-website-hit-counters/, (r) => r.abort());
  const page = await context.newPage();
  const request = context.request;

  const queue = [START];
  const visited = new Set();
  const pages = [];
  const imageUrls = new Map(); // url -> { referencedBy: Set }
  const errors = [];
  let siteFooter = null; // delt botnkant frå FrontPage, lik på alle sider
  let siteSidebar = null; // delt høgrekant frå FrontPage
  const external = new Set();

  while (queue.length) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    const rel = relOf(url);
    console.log(`[page ${visited.size}] ${rel}`);

    try {
      const res = await request.get(url);
      if (!res.ok()) throw new Error(`HTTP ${res.status()}`);
      const rawHtml = decoder.decode(await res.body());
      const rawFile = path.join(CONTENT, "raw", safePath(rel));
      await fs.mkdir(path.dirname(rawFile), { recursive: true });
      await fs.writeFile(rawFile, rawHtml.replace(/charset=windows-1252/i, "charset=utf-8"));

      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      const data = await page.evaluate(extract);
      const slug = slugOf(rel);
      await page.screenshot({ path: path.join(CONTENT, "screenshots", slug + ".jpg"), fullPage: true, type: "jpeg", quality: 60 });

      for (const link of data.links) {
        const n = normalize(link, url);
        if (!n || !/^https?:/.test(n)) continue;
        if (!isInternal(n)) { external.add(n); continue; }
        if (isPage(n) && !visited.has(n)) queue.push(n);
        else if (isImage(n)) data.assets.push(n);
      }
      for (const a of data.assets) {
        const n = normalize(a, url);
        if (!n || !isInternal(n) || !isImage(n)) continue;
        if (!imageUrls.has(n)) imageUrls.set(n, { referencedBy: new Set() });
        imageUrls.get(n).referencedBy.add(slug);
      }

      if (!siteFooter && data.footer.blocks.length) siteFooter = data.footer;
      if (!siteSidebar && data.sidebar.blocks.length) siteSidebar = data.sidebar;
      const chapter = rel.match(/^Kap\s*0*(\d+)\//i);
      pages.push({
        slug,
        sourceUrl: url,
        sourcePath: rel,
        chapterNumber: chapter ? Number(chapter[1]) : null,
        // Somme sider har eit heilt avsnitt i <h1>; bruk då <title> i staden.
        title: data.h1 && data.h1.length <= 80 ? data.h1 : data.title,
        documentTitle: data.title,
        text: data.text,
        wordCount: data.text.split(/\s+/).filter(Boolean).length,
        blocks: data.blocks,
        images: data.images,
      });
    } catch (e) {
      console.error(`  ! ${rel}: ${e.message}`);
      errors.push({ url, kind: "page", error: e.message });
    }
    await sleep(DELAY_MS);
  }

  // Last ned bileta som originalfiler.
  const imageRecords = [];
  for (const [url, { referencedBy }] of imageUrls) {
    const rel = relOf(url);
    const localRel = safePath(rel);
    try {
      const res = await request.get(url);
      if (!res.ok()) throw new Error(`HTTP ${res.status()}`);
      const buf = await res.body();
      const file = path.join(PUBLIC, localRel);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, buf);
      imageRecords.push({ sourceUrl: url, sourcePath: rel, publicPath: "/archive/" + localRel, bytes: buf.length, referencedBy: [...referencedBy] });
      console.log(`[img] ${rel}`);
    } catch (e) {
      console.error(`  ! img ${rel}: ${e.message}`);
      errors.push({ url, kind: "image", error: e.message });
    }
    await sleep(100);
  }

  // Skriv om bilete-src i sidedata til lokale stiar under public.
  const localByUrl = new Map(imageRecords.map((r) => [r.sourceUrl, r.publicPath]));
  for (const p of pages) {
    for (const img of [...p.images, ...p.blocks.filter((b) => b.type === "image")]) {
      img.sourceUrl = img.src;
      img.src = localByUrl.get(normalize(img.src, p.sourceUrl)) ?? img.src;
    }
    await fs.writeFile(path.join(CONTENT, "pages", p.slug + ".json"), JSON.stringify(p, null, 2));
  }
  for (const img of [siteSidebar, siteFooter].flatMap((s) => (s ? [...s.images, ...s.blocks.filter((b) => b.type === "image")] : []))) {
    img.sourceUrl = img.src;
    img.src = localByUrl.get(img.src) ?? img.src;
  }

  pages.sort((a, b) => (a.chapterNumber ?? -1) - (b.chapterNumber ?? -1) || a.slug.localeCompare(b.slug));
  const manifest = {
    source: BASE,
    author: "Magnor Midtun",
    siteTitle: "Eivindvik før og no",
    siteSidebar,
    siteFooter,
    scrapedAt: new Date().toISOString(),
    pages: pages.map(({ slug, sourceUrl, sourcePath, chapterNumber, title, wordCount, images }) => ({
      slug, sourceUrl, sourcePath, chapterNumber, title, wordCount, imageCount: images.length, file: `pages/${slug}.json`,
    })),
    images: imageRecords,
    externalLinks: [...external].sort(),
    errors,
  };
  await fs.writeFile(path.join(CONTENT, "manifest.json"), JSON.stringify(manifest, null, 2));

  const report = [
    `# Scrape report`,
    ``,
    `Source: ${BASE}  `,
    `Scraped: ${manifest.scrapedAt}  `,
    `Pages: ${pages.length} · Images: ${imageRecords.length} · Errors: ${errors.length}`,
    ``,
    `| # | Page | Words | Images |`,
    `|---|------|------:|-------:|`,
    ...pages.map((p) => `| ${p.chapterNumber ?? ""} | ${p.title} (\`${p.sourcePath}\`) | ${p.wordCount} | ${p.images.length} |`),
    ``,
    errors.length ? `## Errors\n\n${errors.map((e) => `- ${e.kind} ${e.url}: ${e.error}`).join("\n")}` : `No errors.`,
    ``,
  ].join("\n");
  await fs.writeFile(path.join(CONTENT, "REPORT.md"), report);

  await browser.close();
  console.log(`\nDone: ${pages.length} pages, ${imageRecords.length} images, ${errors.length} errors.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
