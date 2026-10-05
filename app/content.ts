export const siteUrl = "https://eivindvik-for-og-no.no";
export const siteName = "Eivindvik før og no";
export const author = "Magnor Midtun";

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type NavLink = {
  href: string;
  label: string;
};

export type Kapittel = {
  number: number;
  title: string;
  slug: string;
  // Set when the chapter is read on another page instead of /kapittel/[slug].
  movedTo?: NavLink;
};

const writtenWorksLink: NavLink = { href: "/dikt-og-tekstar", label: "Dikt og tekstar" };

export type Tema = {
  id: string;
  kapittelRange: string;
  title: string;
  description: string;
  image: ImageAsset;
  kapitler: Kapittel[];
};

export const temaer: Tema[] = [
  {
    id: "stad-og-tru",
    kapittelRange: "01–07",
    title: "Stad og tru",
    description:
      "Frå dei gamle steinkrossane til Eivindvik som tingstad og kyrkjestad.",
    image: {
      src: "/archive/kap07/gulen-kyrkje.jpg",
      alt: "Flyfoto av Gulen kyrkje i Eivindvik frå 1962",
      width: 331,
      height: 238,
    },
    kapitler: [
      { number: 1, title: "Innleiing", slug: "innleiing" },
      { number: 2, title: "Namnet", slug: "namnet" },
      { number: 3, title: "Steinkrossane", slug: "steinkrossane" },
      { number: 4, title: "Døypefonten i kyrkja", slug: "doeypefonten" },
      { number: 5, title: "Olavskjelda i Krossteigen", slug: "olavskjelda" },
      { number: 6, title: "Eivindvik som gamal tingstad", slug: "tingstad" },
      { number: 7, title: "Gulen kyrkje", slug: "gulen-kyrkje" },
    ],
  },
  {
    id: "folk-og-ferdsel",
    kapittelRange: "08–14",
    title: "Folk og ferdsel",
    description:
      "Menneska som kom til bygda, og stadene som batt bygda saman med omverda.",
    image: {
      src: "/archive/kap11/kongeskipet.jpg",
      alt: "Kongeskipet ligg til ankers i Prestesundet i Eivindvik medan folk ventar på land",
      width: 427,
      height: 245,
    },
    kapitler: [
      {
        number: 8,
        title: "Prost Niels Griis Alstrup Dahl",
        slug: "prost-dahl",
      },
      { number: 9, title: "Eivindvik som poststad", slug: "poststad" },
      {
        number: 10,
        title: "Dampskipsstoppestaden",
        slug: "dampskipsstoppestaden",
      },
      { number: 11, title: "Kongevitjingar", slug: "kongevitjingar" },
      { number: 12, title: "Andre vitjingar", slug: "andre-vitjingar" },
      {
        number: 13,
        title: "Namnebyte – frå Evenvik til Gulen",
        slug: "namnebyte",
      },
      { number: 14, title: "Andre hendingar", slug: "andre-hendingar" },
    ],
  },
  {
    id: "liv-og-tradisjon",
    kapittelRange: "15–20",
    title: "Liv og tradisjon",
    description:
      "Forteljingar om arbeid, krig, skikkar, høgtider og livet i bygda.",
    image: {
      src: "/archive/kap15/vaarbrud.jpg",
      alt: "Dei første medlemmane i ungdomslaget Vårbrud, truleg fotografert i 1899",
      width: 644,
      height: 472,
    },
    kapitler: [
      { number: 15, title: "Livet i bygda", slug: "livet-i-bygda" },
      { number: 16, title: "Minne frå krigen 1940–45", slug: "krigen" },
      { number: 17, title: "Gamle skikkar", slug: "gamle-skikkar" },
      { number: 18, title: "Gamal julefeiring", slug: "gamal-julefeiring" },
      { number: 19, title: "Næringslivet", slug: "naeringslivet" },
      { number: 20, title: "Ymse", slug: "ymse" },
    ],
  },
  {
    id: "ord-og-minne",
    kapittelRange: "21–27",
    title: "Ord og minne",
    description:
      "Prologar, rim, tankar og minneord tek vare på røystene frå staden.",
    image: {
      src: "/archive/kap21/gudsteneste.jpg",
      alt: "Gudsteneste på Tusenårsstaden Gulatinget dagen etter opninga i 2005",
      width: 645,
      height: 437,
    },
    kapitler: [
      { number: 21, title: "Gulatingminne", slug: "gulatingminne" },
      { number: 22, title: "Tankar", slug: "tankar" },
      { number: 23, title: "Prologar", slug: "prologar", movedTo: writtenWorksLink },
      { number: 24, title: "Rim", slug: "rim", movedTo: writtenWorksLink },
      { number: 25, title: "Høgtider", slug: "hoegtider", movedTo: writtenWorksLink },
      { number: 26, title: "Minneord", slug: "minneord", movedTo: writtenWorksLink },
      { number: 27, title: "Bankar", slug: "bankar", movedTo: writtenWorksLink },
    ],
  },
];

export const kapitler = temaer.flatMap((tema) =>
  tema.kapitler.map((kapittel) => ({
    ...kapittel,
    temaId: tema.id,
    temaTitle: tema.title,
  })),
);

// Chapters with their own page under /kapittel/[slug].
export const readableKapitler = kapitler.filter((kapittel) => !kapittel.movedTo);

export const readLink: NavLink = {
  href: `/kapittel/${kapitler[0].slug}`,
  label: "Les historia",
};

// Shown in the PageHero on every page and in the footer.
export const navLinks: NavLink[] = [
  { href: "/", label: "Heim" },
  { href: "/kapittel", label: "Kapittel" },
  writtenWorksLink,
  { href: "/om-oss", label: "Om oss" },
];

export const hero = {
  title: "Eivindvik",
  subtitle: "– der krossane står",
  lead: "Ei reise gjennom historia, landskapet og menneska som har forma Eivindvik, for deg som bur her og for deg som kjem på vitjing.",
  image: {
    src: "/archive/kap01/midtunvaag.jpg",
    alt: "Utsyn over Midtunvågen med gardar, sjø og fjell",
    width: 635,
    height: 451,
  },
};

export const tusenaarsstad = {
  eyebrow: "Tusenårsstaden Gulatinget",
  title: "Eit minne etter hundre år",
  text: "I over hundre år drøfta folk korleis Gulatinget skulle minnast. I 1999 vart Gulatinget valt til tusenårsstad for Sogn og Fjordane, og 27. august 2005 vart Tusenårsstaden opna på Flolid, med steinsøyler og skulpturar av Bård Breivik. Kring 2000 menneske kom til opninga, og Magnor Midtun las prolog.",
  verse: [
    "På Gulatinget sine vollar,",
    "i ly av øyar og runde kollar,",
    "vart bygt opp eit demokrati",
    "av så stor verdi",
    "at lærde folk seier no,",
    "her norsk folkestyre si vogge stod.",
  ],
  verseSource: "Frå prologen til opninga av Tusenårsstaden, 2005",
  link: { href: "/kapittel/gulatingminne", label: "Les heile soga om gulatingsminnet" },
  image: {
    src: "/archive/kap21/gudsteneste.jpg",
    alt: "Gudsteneste på Tusenårsstaden Gulatinget, med kor og publikum framfor dei høge steinsøylene",
    width: 645,
    height: 437,
  },
  caption: "Gudsteneste på Tusenårsstaden Gulatinget dagen etter opninga i 2005.",
};

export type Kors = {
  title: string;
  text: string;
  image: ImageAsset;
};

export const korsIntro = {
  eyebrow: "Symbol i landskapet",
  title: "Dei to krossane",
  text: "Steinkrossane er dei mest kjende sogeminna i Eivindvik. Den eine står ved kyrkjegardsporten, den andre i Krossteigen, nær den gamle heilage kjelda. Dei blir gjerne kalla den keltiske og den angliske krossen, og formene deira peikar mot kontakt med dei britiske øyane.\n\nSkriftlege kjelder omtalar to krossar her alt i 1626, men vi veit ikkje sikkert kven som reiste dei eller kor gamle dei er. Tradisjonane knyter dei til overgangen til kristendomen og til samlingar kring kyrkja og tinget.",
  link: { href: "/kapittel/steinkrossane", label: "Les meir om krossane" },
};

export const kors: Kors[] = [
  {
    title: "Olavskrossen",
    text: "Den keltiske krossen står utanfor kyrkjegardsporten. Segna seier at Olav den heilage fekk han reist.",
    image: {
      src: "/archive/kap03/keltisk-kross.jpg",
      alt: "Den keltiske steinkrossen, Olavskrossen, utanfor kyrkjegardsporten",
      width: 194,
      height: 291,
    },
  },
  {
    title: "Krossen i Krossteigen",
    text: "Den angliske krossen har ein liten latinsk kross hoggen ut mellom armane.",
    image: {
      src: "/archive/kap03/anglisk-kross.jpg",
      alt: "Den angliske steinkrossen i Krossteigen",
      width: 196,
      height: 297,
    },
  },
];

export const utforsk = {
  eyebrow: `${kapitler.length} kapittel`,
  title: "Utforsk historia om Eivindvik",
  text: `Her finn du ${kapitler.length} kapittel om menneska, stadene, næringane og livet i Eivindvik før og no. Du kan lese dei kronologisk eller velje fritt etter det som interesserer deg.`,
  link: { href: "/kapittel", label: `Sjå alle ${kapitler.length} kapitla` },
};

export const authorIntro = {
  eyebrow: "Om forfattaren",
  text: `${author} har skrive og samla det lokalhistoriske stoffet i Eivindvik før og no. Arbeidet byggjer på kjelder, stadkunnskap og ei sterk interesse for historia, landskapet og folket i Eivindvik.`,
  link: { href: "/om-oss", label: `Les meir om ${author}` },
  image: {
    src: "/archive/kap21/prolog-home.jpg",
    alt: "Magnor Midtun les prolog ved ein talarstol framfor ei forsamling",
    width: 400,
    height: 257,
  },
  caption: "Magnor Midtun les prolog på Gulatingseminaret. Foto: Ukjent.",
};

// The band above the footer repeats the bottom of the front page hero photo.
export const landscape: ImageAsset = hero.image;

export const kartPage = {
  heroImage: hero.image,
  eyebrow: "Kart",
  title: "Eivindvik på kartet",
  description:
    "Handteikna kart frå 1771 over det gamle Evenvig prestegjeld, med Eivindvik, gardane og ferdselsleiene kring fjorden i Gulen.",
  text: "Kartet frå 1771 viser det gamle Evenvig prestegjeld slik det vart teikna for meir enn 250 år sidan – med fjorden, gardane og ferdselsleiene som batt bygda saman.",
  image: {
    src: "/archive/kap02/kart.jpg",
    alt: "Handteikna kart frå 1771 over det gamle Evenvig prestegjeld",
    width: 640,
    height: 367,
  },
  caption: "Utsnitt av handteikna kart over området kring Eivindvik.",
  source: "Kjelde: Kart frå 1771 (utsnitt).",
  link: { href: "/kapittel/namnet", label: "Les om namnet Eivindvik" },
};

export const writtenWorksPage = {
  heroImage: hero.image,
  eyebrow: "Dikt og tekstar",
  title: "Dikt og tekstar av Magnor Midtun",
  description:
    "Dikt, prologar, høgtidstekstar, minneord og bankar skrivne av Magnor Midtun om livet og historia i Eivindvik og Gulen.",
  text: "Ei samling dikt og tekstar av Magnor Midtun.",
};

export type TextSection = {
  title: string;
  paragraphs: string[];
};

export const omOssPage = {
  heroImage: hero.image,
  eyebrow: "Om oss",
  title: `${author}`,
  description: `${author} skreiv og samla lokalhistoria om Eivindvik og Gulen. Sida er laga av barnebarnet hans, Eirik Midtun, som eit minne om arbeidet han gjorde.`,
  text: `Mannen som skreiv ned segner, hendingar og minne frå Eivindvik, slik at historia ikkje skulle gå tapt.`,
  image: {
    src: "/archive/_borders/magnor-midtun.jpg",
    alt: "Magnor Midtun framfor minnestøtta i Gular",
    width: 350,
    height: 213,
  },
  caption: `${author} framfor minnestøtta i Gular reist av telefonarbeidarar i frå Gulen. Foto: Ottar Midtun.`,
  sections: [
    {
      title: "Kven han var",
      paragraphs: [
        `${author} budde i Eivindvik i Gulen. Han kjende staden, folket og landskapet godt, og var ein av dei mange som heldt liv i fortida ved å fortelje om ho.`,
        "Frå 1968 til 1990 var han banksjef i Gulen Sparebank. Han sat òg i kommunestyret og formannskapet i åtte år, og i 2002 vart han tildelt Kongens fortenestemedalje i sølv.",
        "Han var med i Gulen sokneråd og tok del i mykje av det som skjedde i bygda. Han guida gjester rundt kyrkja og steinkrossane, las prologar ved høgtider og tilstelningar, og fekk vere med då kongeparet vitja Eivindvik. Ved sida av dette var han glad i naturen og gjekk på jakt i heimlege lier.",
      ],
    },
    {
      title: "Arbeidet hans",
      paragraphs: [
        "Frå mange vart han oppmoda om å skrive ned det han hadde høyrt og fått kjennskap til om Eivindvik. Det resulterte i ei samling på 27 kapittel om namnet og steinkrossane, Gulatinget og kyrkja, kongevitjingar, krigsåra, gamle skikkar, næringsliv og kvardagsliv. Han la vekt på å ta med berre det han kunne vise til kjelder for, og der skriftlege kjelder mangla, bygde han på munnlege opplysningar frå folk i bygda.",
        "Han var òg sjølv med på å skape historie. Han var med i arbeidet for å få reist eit minne over Gulatinget, og han var med på å få reist minnesteinen over prost Niels Griis Alstrup Dahl på prestegarden, som han fekk æra av å avduke i 2002, 150 år etter at Dahl døydde.",
        "Mange av prologane og rima han skreiv til fest og høgtid er tekne med i samlinga, og gjev eit varmt bilete av kjærleiken han hadde til heimbygda.",
      ],
    },
    {
      title: "Om denne sida",
      paragraphs: [
        `Denne sida er laga av Magnor sitt barnebarn Eirik Midtun, som eit minne om arbeidet han gjorde. Teksten og bileta kjem frå heimesida han sjølv bygde opp og sist oppdaterte i 2010. Her er stoffet samla på nytt, slik at historia om Eivindvik kan lesast vidare av nye generasjonar.`,
      ],
    },
  ] satisfies TextSection[],
  originalSiteLink: {
    href: "https://privat.enivest.net/~magnor.midtun/index.htm",
    label: "Sjå den opphavlege heimesida",
  } satisfies NavLink,
};
