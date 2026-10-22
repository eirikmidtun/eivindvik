---
name: seo
description: >-
  Følg disse reglene når du legger til eller endrer ruter, sideinnhold,
  metadata, bilder eller lenker i dette Next.js-prosjektet. Bruk den også når
  noen ber om å forbedre eller kontrollere SEO, delingsbilete, sitemap eller
  strukturerte data.
---

# SEO for Eivindvik

Nettstedet er et lokalhistorisk arkiv på nynorsk, med engelsk versjon under
`/en`. Det viktigste for søk er at
arkivteksten er tilgjengelig som egne, lenkede sider med god metadata. Følg
også navne- og strukturreglene i `webarkitektur`.

## Kilder til sannhet

- `app/content.ts` eier `siteUrl`, `siteName`, `author`, `temaer` og den flate
  listen `kapitler`. `app/content-en.ts` har de engelske titlene og
  beskrivelsene, og `app/dictionary.ts` har grensesnittekstene. Bygg URL-er, sitemap og navigasjon fra disse. Ikke skriv
  domenet eller kapittellister inn andre steder.
- `app/archive.ts` leser kapitteltekst fra `content/archive/` (og engelsk
  omsetjing fra `content/archive/en/`) med `getKapittelPages`,
  `getKapittelDescription` og `getFirstImage`.
- `app/metadata.ts` har `pageMetadata(locale, path, …)`, som setter
  `canonical`, `hreflang`-alternativer og `openGraph` for en side. Bruk den for
  nye sider.
- `app/components/JsonLd.tsx` er eneste måte å skrive strukturerte data på. Den
  escaper `<` slik Next.js-dokumentasjonen krever.
- `app/components/OgCard.tsx` er felles oppsett for genererte delingsbilete.

## Metadata

- Les `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
  og mappen `03-file-conventions/01-metadata/` før du endrer metadata.
- Rotlayouten `app/[lang]/layout.tsx` setter `metadataBase`, tittelmalen
  `%s | Eivindvik før og no`, standardbeskrivelse per språk, `openGraph`
  (`siteName`, `locale` fra `ogLocales`: `nn_NO` eller `en_GB`) og
  `twitter.card`. Den setter ikke `canonical` eller `openGraph.url`.
- Hver side setter sin egen `alternates.canonical` med relativ sti og
  `alternates.languages` (`nn`, `en`, `x-default`) via `pageMetadata`.
  Nynorsk-URL-er har ikke språkprefiks; engelske starter med `/en`.
- Next.js slår sammen metadata grunt. Når en side setter `openGraph`, må den ta
  med `siteName`, `locale` og `alternateLocale` på nytt. `pageMetadata` gjør det.
- Sidetitler er korte innholdsnavn uten nettstedsnavn. Malen legger det til.
- Beskrivelser er 110–160 tegn på sidens språk og skal beskrive innholdet på
  siden. Har siden ikke et egnet tekstavsnitt, bruker du en skrevet reserve
  slik `describeKapittel` i `app/[lang]/kapittel/[slug]/page.tsx` gjør.
- Bruk filkonvensjonen `opengraph-image.tsx` med `OgCard` for delingsbilete.
  Ikke bruk de små arkivbildene som `og:image`. De er for lave til store kort.

## Ruter og lenker

- Nye innholdssider er statiske: `generateStaticParams` fra `content.ts`,
  `dynamicParams = false` og `notFound()` for ukjente verdier.
- URL-er er lesbare nynorske slugs, også på engelsk, med små bokstaver og bindestrek, uten
  æ/ø/å (`hoegtider`, `naeringslivet`). En publisert slug endres ikke uten en
  omdirigering.
- Hver indekserbar side må kunne nås med en vanlig `<Link>` fra en annen side.
  Lenker i delte komponenter som `Header` og `Footer` bruker `/#anker`, ikke
  bare `#anker`, slik at de virker fra alle ruter.
- Legg nye ruter til i `app/sitemap.ts` ved å bygge dem fra innholdsdataene,
  for begge språk med `alternates.languages`. Bare kanoniske URL-er hører
  hjemme der.

## Innhold og markup

- Hver side har nøyaktig én `<h1>`. Arkivoverskrifter blir `<h2>` i
  `KapittelText`, fordi nivåene i skrapet kommer fra gamle skriftstørrelser.
- Bruk semantiske elementer: `main`, `article`, `nav` med `aria-label` på sidens språk,
  `figure` og `figcaption`.
- Bilder bruker `next/image` med lagret bredde og høyde. Alt-teksten er
  `alt`, så `caption`, så en beskrivende reserve på sidens språk. Bruk aldri tom
  alt-tekst på meningsbærende bilder.
- Strukturerte data følger mønsteret som finnes: `WebSite` og `CollectionPage`
  på forsiden, `Article` og `BreadcrumbList` på kapittelsider. Forfatteren er
  `Person` Magnor Midtun, og `inLanguage` er språket som faktisk vises
  (`"nn"` eller `"en"`). Omsette sider peker til originalen med
  `translationOfWork`.

## Kontroll før levering

1. `pnpm lint` og `pnpm build`. Byggutskriften skal vise nye sider som
   statiske (`○` eller `●`) sammen med `/robots.txt`, `/sitemap.xml` og
   delingsbildene.
2. Start med `pnpm start -p 3123` og kontroller `<head>` med `curl`:
   ```bash
   curl -s localhost:3123/kapittel/gulen-kyrkje \
     | grep -oE '<(title|meta|link rel="canonical")[^>]*>|<title>[^<]*'
   curl -s localhost:3123/en/kapittel/gulen-kyrkje \
     | grep -oE '<(title|meta|link rel="(canonical|alternate)")[^>]*>'
   curl -s localhost:3123/sitemap.xml | head -20
   curl -s -o /dev/null -w "%{http_code}\n" localhost:3123/kapittel/finst-ikkje  # 404
   ```
   Se etter tittel, beskrivelse, `canonical`, `og:*`, `twitter:*` og
   `application/ld+json`.
3. Kjør Lighthouse-revisjon (mobil) med chrome-devtools MCP på forsiden og én
   berørt side. SEO skal være 100. Rett nye feil, og nevn eksisterende funn
   (for eksempel kontrast i `--muted`) i stedet for å endre designet uten avtale.
4. Stopp serveren etterpå. Bruk `kill $(lsof -ti tcp:3123)`, ikke `pkill`, fordi
   prosessnavnet er `next-server`.
