import { author, flattenKapitler, nnContent, type NavLink, type SiteContent, type TextSection } from "./content";

// English editorial content. Chapter numbers, slugs and images come from the
// Nynorsk content, so only the words are kept here.

const writtenWorksLink: NavLink = { href: "/en/dikt-og-tekstar", label: "Poems and texts" };

const temaText: Record<string, { title: string; description: string; imageAlt: string }> = {
  "stad-og-tru": {
    title: "Place and faith",
    description: "From the old stone crosses to Eivindvik as a place of assembly and a church site.",
    imageAlt: "Aerial photograph of Gulen church in Eivindvik from 1962",
  },
  "folk-og-ferdsel": {
    title: "People and travel",
    description: "The people who came to the village, and the places that tied it to the wider world.",
    imageAlt: "The royal ship at anchor in Prestesundet in Eivindvik while people wait on shore",
  },
  "liv-og-tradisjon": {
    title: "Life and tradition",
    description: "Stories of work, war, customs, festivals and everyday life in the village.",
    imageAlt: "The first members of the youth society Vårbrud, probably photographed in 1899",
  },
  "ord-og-minne": {
    title: "Words and memories",
    description: "Prologues, verses, reflections and memorial tributes keep the voices of the place alive.",
    imageAlt: "Church service at the Gulating Millennium Site the day after the opening in 2005",
  },
};

const kapittelText: Record<number, { title: string; description?: string }> = {
  1: {
    title: "Introduction",
    description:
      "Magnor Midtun explains why he began writing down legends, traditions and events from Eivindvik, with old pictures of the village and Midtunvågen.",
  },
  2: {
    title: "The name",
    description:
      "Where does the name Eivindvik come from? On spellings from Øyuindarviik to Evenvik, and readings such as the bay sheltered by islands.",
  },
  3: {
    title: "The stone crosses",
    description:
      "The two stone crosses in Eivindvik, the Olav cross by the churchyard gate and the cross at Krossteigen, and the legends of St Olav who raised them.",
  },
  4: {
    title: "The baptismal font in the church",
    description:
      "The legend of the stone font St Olav had carved when the people of Sogn knocked the font from the bishop's hands, and where the stone has stood since.",
  },
  5: {
    title: "St Olav's spring at Krossteigen",
    description:
      "The holy spring beneath the cross at Krossteigen, the sacrificial grove on the parsonage bog, and what Dean Dahl and Bishop Neumann wrote in 1824.",
  },
  6: {
    title: "Eivindvik as an ancient assembly site",
    description:
      "What the sources say about Eivindvik as the old site of the Gulating, with the records of Dahl and Furnæs, troubled times and the most important thing.",
  },
  7: {
    title: "Gulen church",
    description:
      "The story of Gulen church and the old parish of Eivindvik, from the old church to its furnishings, church bells, altarpiece and the new organ.",
  },
  8: {
    title: "Dean Niels Griis Alstrup Dahl",
    description:
      "Dean Niels Griis Alstrup Dahl as farmer, schoolman and builder, and all he did for health, land reform and popular education in Eivindvik.",
  },
  9: {
    title: "Eivindvik as a postal station",
    description:
      "Eivindvik as a postal station, from the post office at Fonnevika in 1808 to the office at Haugane and later postmasters, based on postal museum sources.",
  },
  10: {
    title: "The steamship stop",
    description:
      "Eivindvik as a stop for the steamships, with busy traffic at the quays, new routes and the trial run of the express boat Fjordprins in 1987.",
  },
  11: {
    title: "Royal visits",
    description:
      "Kings who have visited Eivindvik, from Christian V, who dined here in 1685, to King Haakon VII, who came ashore at the Sandal quay in 1936.",
  },
  12: {
    title: "Other visitors",
    description:
      "Famous guests in Eivindvik: Henrik Wergeland, Ivar Aasen, P. Chr. Asbjørnsen, the Shetland men, Berge Viking, the training ship Sørlandet and Ragnar Thorseth.",
  },
  13: {
    title: "Change of name – from Evenvik to Gulen",
    description:
      "How the parish of Evenvik became Gulen by royal decree on 17 May 1890, and the debates about the name that came before the decision.",
  },
  14: {
    title: "Other events",
    description:
      "The youth society got its own hall in 1933, and the village saw choir festivals, Gulating gatherings, electricity, the Neverdal landslide and the 1966 road celebration.",
  },
  15: {
    title: "Life in the village",
    description:
      "Everyday life and celebrations in Eivindvik: clubs and societies, summer farms, seasonal work, grain and flour, new tools, farm life and childhood.",
  },
  16: {
    title: "Memories from the war 1940–45",
    description:
      "Magnor Midtun's memories of the war years 1940 to 1945 in Eivindvik, with German raids, boats in the bay and air battles over the mountains.",
  },
  17: {
    title: "Old customs",
    description:
      "Old customs in Eivindvik: wakes, funerals, weddings, births and christenings, confirmation and other traditions that are fading from memory.",
  },
  18: {
    title: "Christmas in the old days",
    description:
      "How Christmas was celebrated in Eivindvik in the old days, with brewing and baking, church on Christmas morning and evenings by the hearth, told in verse.",
  },
  19: {
    title: "Trade and industry",
    description:
      "Trade and industry in Eivindvik: farming, the general store and coaching inn at Fonnevika, a margarine factory, a dye works, P.R. Sandal and the dairy.",
  },
  20: {
    title: "Miscellany",
    description:
      "Miscellany from Eivindvik, including the holly tree by the old town hall, probably the largest in Scandinavia, and the spruces planted around 1870.",
  },
  21: {
    title: "Remembering the Gulating",
    description:
      "A hundred years of debate on how to commemorate the Gulating, until the Millennium Site at Flolid opened in 2005 with sculptures by Bård Breivik.",
  },
  22: {
    title: "Reflections",
    description:
      "Magnor Midtun's reflections on Eivindvik as a gathering place: the village sheltered by islands and hills, the sacrificial grove and the old Gulating.",
  },
  23: { title: "Prologues" },
  24: { title: "Verses" },
  25: { title: "Holy days" },
  26: { title: "Memorial tributes" },
  27: { title: "Banks" },
};

const temaer = nnContent.temaer.map((tema) => ({
  ...tema,
  title: temaText[tema.id].title,
  description: temaText[tema.id].description,
  image: { ...tema.image, alt: temaText[tema.id].imageAlt },
  kapitler: tema.kapitler.map((kapittel) => ({
    ...kapittel,
    ...kapittelText[kapittel.number],
    ...(kapittel.movedTo ? { movedTo: writtenWorksLink } : {}),
  })),
}));

const kapitler = flattenKapitler(temaer);

const readableKapitler = kapitler.filter((kapittel) => !kapittel.movedTo);

const hero = {
  title: "Eivindvik",
  subtitle: "– where the crosses stand",
  lead: "A journey through the history, landscape and people that have shaped Eivindvik, for those who live here and for those who come to visit.",
  image: { ...nnContent.hero.image, alt: "Eivindvik seen from the sea, with the church, boats and the mountains behind" },
};

const omOssSections: TextSection[] = [
  {
    title: "Who he was",
    paragraphs: [
      `${author} lived in Eivindvik in Gulen. He knew the place, its people and its landscape well, and was one of the many who kept the past alive by telling others about it.`,
      "From 1968 to 1990 he was the manager of Gulen Sparebank. He also sat on the municipal council and its executive committee for eight years, and in 2002 he was awarded the King's Medal of Merit in silver.",
      "He served on the Gulen parish council and took part in much of what happened in the village. He guided visitors around the church and the stone crosses, read prologues at festivals and celebrations, and was present when the King and Queen visited Eivindvik. He also loved the outdoors and went hunting in the hills around his home.",
    ],
  },
  {
    title: "His work",
    paragraphs: [
      "Many people encouraged him to write down what he had heard and learned about Eivindvik. The result was a collection of 27 chapters on the name and the stone crosses, the Gulating and the church, royal visits, the war years, old customs, trade and everyday life. He made a point of including only what he could support with sources, and where written sources were lacking, he relied on what people in the village told him.",
      "He also helped make history himself. He took part in the work to raise a memorial to the Gulating, and he helped raise the memorial stone to Dean Niels Griis Alstrup Dahl at the parsonage, which he had the honour of unveiling in 2002, 150 years after Dahl's death.",
      "Many of the prologues and verses he wrote for celebrations and festivals are included in the collection, and they give a warm picture of his love for his home village.",
    ],
  },
  {
    title: "About this site",
    paragraphs: [
      "This site was made by Magnor's grandson Eirik Midtun, in memory of the work he did. The text and pictures come from the website he built himself and last updated in 2010. Here the material has been brought together again, so that the story of Eivindvik can be read by new generations.",
      "The original texts are written in Nynorsk. The English version is a translation of the original, and the Nynorsk text remains the authoritative source.",
    ],
  },
];

export const enContent: SiteContent = {
  siteDescription:
    "Local history archive about Eivindvik and Gulen in western Norway: the Gulating, the stone crosses, Gulen church, royal visits and village memories, by Magnor Midtun.",
  temaer,
  kapitler,
  readableKapitler,
  readLink: { href: `/en/kapittel/${kapitler[0].slug}`, label: "Read the history" },
  navLinks: [
    { href: "/en", label: "Home" },
    { href: "/en/kapittel", label: "Chapters" },
    writtenWorksLink,
    { href: "/en/kart", label: "Map" },
    { href: "/en/om-oss", label: "About" },
  ],
  hero,
  tusenaarsstad: {
    eyebrow: "The Gulating Millennium Site",
    title: "A memorial a hundred years in the making",
    text: "For more than a hundred years people debated how the Gulating should be commemorated. In 1999 the Gulating was chosen as the millennium site for Sogn og Fjordane, and on 27 August 2005 the Millennium Site opened at Flolid, with stone pillars and sculptures by Bård Breivik. Around 2,000 people came to the opening, and Magnor Midtun read a prologue.",
    verse: [
      "On the green banks of the Gulating,",
      "sheltered by islands and rounded hills,",
      "a democracy was built",
      "of such great worth",
      "that learned people now say",
      "here stood the cradle of Norwegian self-rule.",
    ],
    verseSource: "From the prologue for the opening of the Millennium Site, 2005 (translated from Nynorsk)",
    link: { href: "/en/kapittel/gulatingminne", label: "Read the full story of the Gulating memorial" },
    image: {
      ...nnContent.tusenaarsstad.image,
      alt: "Church service at the Gulating Millennium Site, with a choir and audience in front of the tall stone pillars",
    },
    caption: "Church service at the Gulating Millennium Site the day after the opening in 2005.",
  },
  korsIntro: {
    eyebrow: "Symbols in the landscape",
    title: "The two crosses",
    text: "The stone crosses are the best-known historic monuments in Eivindvik. One stands by the churchyard gate, the other at Krossteigen, near the old holy spring. They are often called the Celtic and the Anglian cross, and their shapes point to contact with the British Isles.\n\nWritten sources mention two crosses here as early as 1626, but we do not know for certain who raised them or how old they are. Tradition links them to the coming of Christianity and to gatherings around the church and the assembly.",
    link: { href: "/en/kapittel/steinkrossane", label: "Read more about the crosses" },
  },
  kors: [
    {
      title: "The Olav cross",
      text: "The Celtic cross stands outside the churchyard gate. Legend says that St Olav had it raised.",
      image: { ...nnContent.kors[0].image, alt: "The Celtic stone cross, the Olav cross, outside the churchyard gate" },
    },
    {
      title: "The cross at Krossteigen",
      text: "The Anglian cross has a small Latin cross carved between its arms.",
      image: { ...nnContent.kors[1].image, alt: "The Anglian stone cross at Krossteigen" },
    },
  ],
  utforsk: {
    eyebrow: `${kapitler.length} chapters`,
    title: "Explore the history of Eivindvik",
    text: `Here you will find ${kapitler.length} chapters about the people, places, livelihoods and life in Eivindvik, then and now. You can read them in order or pick whatever interests you.`,
    link: { href: "/en/kapittel", label: `See all ${kapitler.length} chapters` },
  },
  authorIntro: {
    eyebrow: "About the author",
    text: `${author} wrote and collected the local history in Eivindvik før og no ("Eivindvik then and now"). The work is built on written sources, local knowledge and a deep interest in the history, landscape and people of Eivindvik.`,
    link: { href: "/en/om-oss", label: `Read more about ${author}` },
    image: { ...nnContent.authorIntro.image, alt: "Magnor Midtun reading a prologue at a lectern in front of an audience" },
    caption: "Magnor Midtun reads a prologue at the Gulating seminar. Photo: Unknown.",
  },
  kartPage: {
    heroImage: hero.image,
    eyebrow: "Map",
    title: "Eivindvik on the map",
    description:
      "A hand-drawn map from 1771 of the old parish of Evenvig, showing Eivindvik, the farms and the routes around the fjord in Gulen.",
    text: "The map from 1771 shows the old parish of Evenvig as it was drawn more than 250 years ago – with the fjord, the farms and the routes that tied the village together.",
    image: { ...nnContent.kartPage.image, alt: "Hand-drawn map from 1771 of the old parish of Evenvig" },
    caption: "Detail of a hand-drawn map of the area around Eivindvik.",
    source: "Source: Map from 1771 (detail).",
    link: { href: "/en/kapittel/namnet", label: "Read about the name Eivindvik" },
  },
  writtenWorksPage: {
    heroImage: hero.image,
    eyebrow: "Poems and texts",
    title: "Poems and texts by Magnor Midtun",
    description:
      "Poems, prologues, holiday verses, memorial tributes and bank texts written by Magnor Midtun about life and history in Eivindvik and Gulen.",
    text: "A collection of poems and texts by Magnor Midtun.",
  },
  omOssPage: {
    heroImage: hero.image,
    eyebrow: "About",
    title: author,
    description: `${author} wrote and collected the local history of Eivindvik and Gulen. The site was made by his grandson, Eirik Midtun, in memory of his work.`,
    text: "The man who wrote down legends, events and memories from Eivindvik, so that the history would not be lost.",
    image: { ...nnContent.omOssPage.image, alt: "Magnor Midtun in front of the memorial in Gular" },
    caption: `${author} in front of the memorial in Gular raised by telephone workers from Gulen. Photo: Ottar Midtun.`,
    sections: omOssSections,
    originalSiteLink: { href: nnContent.omOssPage.originalSiteLink.href, label: "See the original website (in Nynorsk)" },
  },
};
