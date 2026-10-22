import { author, nnContent, siteName, type SiteContent } from "./content";
import { enContent } from "./content-en";
import type { Locale } from "./i18n";

// Interface text that is not page content. Page content lives in content.ts
// (Nynorsk) and content-en.ts (English).
const nn = {
  htmlLang: "nn",
  siteTitle: `${siteName} | Lokalhistorisk arkiv`,
  mainMenu: "Hovudmeny",
  footerMenu: "Botnmeny",
  // Link to the same page in the other language, written in that language.
  languageSwitch: { label: "English", locale: "en" as Locale, title: "Read this page in English" },
  breadcrumbs: "Brødsmuler",
  frontPage: "Framside",
  chapters: "Kapittel",
  chapterEyebrow: (number: string) => `Kapittel ${number}`,
  chapterRange: (range: string) => `Kapittel ${range}`,
  movedTo: (label: string) => `Ligg under ${label}`,
  otherChapters: "Andre kapittel",
  previousChapter: "← Førre kapittel",
  nextChapter: "Neste kapittel →",
  allChapters: "Alle kapittel",
  chapterOverview: "Kapitteloversikt",
  chaptersAndContents: "Kapittel og innhald",
  inThisChapter: "I dette kapittelet",
  imageFallbackAlt: (title: string) => `Bilete frå kapittelet «${title}»`,
  byAuthor: `Av ${author}`,
  describeKapittel: (title: string, number: number) =>
    `${title}, kapittel ${number} i ${siteName}, ${author} si lokalhistoriske samling om Eivindvik og Gulen.`,
  // Shown above archive text that is read in another language than the page.
  translationNote: undefined as { text: string; linkLabel: string } | undefined,
  untranslatedNote: undefined as string | undefined,
  kapittelIndex: {
    title: "Alle kapittel",
    description: (count: number) =>
      `Oversikt over alle ${count} kapitla i arkivet om Eivindvik – frå steinkrossane og tingstaden til krigsminne, skikkar, rim og minneord.`,
    eyebrow: "Lokalhistoriske tekstar",
    byline: (count: number) => `${count} kapittel av ${author}`,
    intro: "Ei samling tekstar om menneska, stadene og livet i Eivindvik og Gulen. Vel eit kapittel i lista for å lese historia.",
    movedBefore: "Kapittel 23 til 27 (Prologar, Rim, Høgtider, Minneord og Bankar) ligg no under",
    movedAfter: ".",
  },
  writtenWorks: {
    title: "Dikt og tekstar",
    home: "Heim",
    eyebrow: "Lokalhistoriske tekstar",
    intro: "Dikt, prologar, høgtidstekstar, minneord og bankar frå Eivindvik og Gulen. Vel eit stykke i lista for å lese det.",
    sidebarLabel: "Innhald i samlinga",
    collection: "Samlinga",
    explore: "Utforsk samlinga",
    total: (count: number) => `${count} dikt og tekstar av ${author}.`,
    indexLabel: "Vel ein del",
    showFewer: "Vis færre",
    showAll: (count: number, isRim: boolean) => `Vis alle ${count} ${isRim ? "rim" : "tekstar"}`,
    extraInformation: "Tilleggsinformasjon",
    browse: "Bla i samlinga",
    previous: (isRim: boolean) => `Førre ${isRim ? "rim" : "tekst"}`,
    next: (isRim: boolean) => `Neste ${isRim ? "rim" : "tekst"}`,
    workTitle: (title: string, label: string) => `${title}, ${label} av ${author}`,
    describeIntro: (label: string) => `${label} av ${author} i samlinga ${siteName}: «`,
    quoteEnd: "»",
  },
  kartTitle: "Kart over Eivindvik frå 1771",
  omOssTitle: `${author} – om forfattaren`,
  legendCite: "Ei segn frå Eivindvik, attgjeven av Magnor Midtun",
  notFound: {
    eyebrow: "404 · Ikkje funnen",
    title: "Denne staden finst ikkje.",
    text: "Lenkja kan vere gammal, eller sida har flytta på seg.",
    link: "Til framsida",
  },
  og: {
    siteEyebrow: "EI LOKALHISTORISK SAMLING",
    siteSubtitle: "før og no",
    siteFooter: `Gulen · Vestland · 27 kapittel av ${author}`,
    chapter: "KAPITTEL",
    writtenWorks: "DIKT OG TEKSTAR",
  },
};

export type Dictionary = typeof nn;

const en: Dictionary = {
  htmlLang: "en",
  siteTitle: `${siteName} | Local history archive`,
  mainMenu: "Main menu",
  footerMenu: "Footer menu",
  languageSwitch: { label: "Norsk", locale: "nn", title: "Les denne sida på nynorsk" },
  breadcrumbs: "Breadcrumbs",
  frontPage: "Home",
  chapters: "Chapters",
  chapterEyebrow: (number) => `Chapter ${number}`,
  chapterRange: (range) => `Chapters ${range}`,
  movedTo: (label) => `Now under ${label}`,
  otherChapters: "Other chapters",
  previousChapter: "← Previous chapter",
  nextChapter: "Next chapter →",
  allChapters: "All chapters",
  chapterOverview: "Chapter overview",
  chaptersAndContents: "Chapters and contents",
  inThisChapter: "In this chapter",
  imageFallbackAlt: (title) => `Image from the chapter “${title}”`,
  byAuthor: `By ${author}`,
  describeKapittel: (title, number) =>
    `${title}, chapter ${number} of ${siteName}, ${author}'s local history collection about Eivindvik and Gulen in western Norway.`,
  translationNote: {
    text: "Translated from the original Nynorsk text by Magnor Midtun.",
    linkLabel: "Read the original",
  },
  untranslatedNote: "This text has not been translated yet and is shown in the original Nynorsk.",
  kapittelIndex: {
    title: "All chapters",
    description: (count) =>
      `An overview of all ${count} chapters in the archive about Eivindvik – from the stone crosses and the assembly site to war memories, customs, verse and tributes.`,
    eyebrow: "Local history texts",
    byline: (count) => `${count} chapters by ${author}`,
    intro: "A collection of texts about the people, the places and life in Eivindvik and Gulen. Choose a chapter from the list to read its story.",
    movedBefore: "Chapters 23 to 27 (Prologues, Verses, Holy days, Memorial tributes and Banks) are now found under",
    movedAfter: ".",
  },
  writtenWorks: {
    title: "Poems and texts",
    home: "Home",
    eyebrow: "Local history texts",
    intro: "Poems, prologues, holiday verses, memorial tributes and bank texts from Eivindvik and Gulen. Choose a piece from the list to read it.",
    sidebarLabel: "Contents of the collection",
    collection: "The collection",
    explore: "Explore the collection",
    total: (count) => `${count} poems and texts by ${author}.`,
    indexLabel: "Choose a section",
    showFewer: "Show fewer",
    showAll: (count, isRim) => `Show all ${count} ${isRim ? "verses" : "texts"}`,
    extraInformation: "Additional information",
    browse: "Browse the collection",
    previous: (isRim) => `Previous ${isRim ? "verse" : "text"}`,
    next: (isRim) => `Next ${isRim ? "verse" : "text"}`,
    workTitle: (title, label) => `${title}, ${label} by ${author}`,
    describeIntro: (label) => `${label} by ${author} in the collection ${siteName}: “`,
    quoteEnd: "”",
  },
  kartTitle: "Map of Eivindvik from 1771",
  omOssTitle: `${author} – about the author`,
  legendCite: "A legend from Eivindvik, retold by Magnor Midtun",
  notFound: {
    eyebrow: "404 · Not found",
    title: "This place does not exist.",
    text: "The link may be old, or the page may have moved.",
    link: "Go to the front page",
  },
  og: {
    siteEyebrow: "A LOCAL HISTORY COLLECTION",
    siteSubtitle: "før og no",
    siteFooter: `Gulen · Western Norway · 27 chapters by ${author}`,
    chapter: "CHAPTER",
    writtenWorks: "POEMS AND TEXTS",
  },
};

const dictionaries: Record<Locale, Dictionary> = { nn, en };
const contents: Record<Locale, SiteContent> = { nn: nnContent, en: enContent };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getContent(locale: Locale) {
  return contents[locale];
}
