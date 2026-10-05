# Eivindvik før og no

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11.20.0-F69220?logo=pnpm)](https://pnpm.io/)

Lokalhistoria om Eivindvik i Gulen, skriven og samla av Magnor Midtun. Besøk siden på: **[eivindvik-for-og-no.no](https://www.eivindvik-for-og-no.no/)**.

Magnor budde i Eivindvik og kjende staden, folket og landskapet godt. Han var banksjef i Gulen Sparebank, sat i kommunestyret og soknerådet, guida gjester rundt kyrkja og steinkrossane og las prologar ved høgtider og tilstelningar. Etter oppmoding frå mange skreiv han ned det han visste om bygda.

Resultatet vart 27 kapittel, som han oppsummerte og la ut på si eiga heimeside og sist oppdaterte i 2010.

### Kva du finn på sida

- **Stad og tru.** Namnet, steinkrossane, tingstaden og Gulen kyrkje.
- **Folk og ferdsel.** Prost Dahl, posten, dampskipa og kongevitjingar.
- **Liv og tradisjon.** Kvardagsliv, krigsåra, skikkar og næringsliv.
- **Ord og minne.** Gulatingminnet, Tusenårsstaden og tankar.
- **Dikt og tekstar.** Prologar, rim og minneord Magnor skreiv.
- **Kart.** Eit handteikna kart frå 1771 over Evenvig prestegjeld.

### Kvifor sida finst

Den opphavlege heimesida til Magnor ligg framleis på [privat.enivest.net/~magnor.midtun](https://privat.enivest.net/~magnor.midtun/index.htm), men ho er gamal og vanskeleg å lese på mobil. Denne sida er laga som eit minne om arbeidet han gjorde. Teksten og bileta er henta frå den gamle sida og sett opp på nytt, slik at historia om Eivindvik kan lesast vidare av nye generasjonar, både av dei som bur der og av dei som kjem på vitjing.

## Teknisk

### Kom i gang

```bash
git clone https://github.com/eirikmidtun/eivindvik.git
cd eivindvik
pnpm install
pnpm dev
# opne http://localhost:3000
```

### Prosjektstruktur

```text
app/
├── components/              # komponentane sidene er sette saman av
├── kapittel/
│   ├── [slug]/              # kvart kapittel, med eige delingsbilete
│   └── page.tsx             # oversikt over alle kapitla
├── dikt-og-tekstar/         # prologar, rim og minneord
├── kart/                    # kart frå 1771
├── om-oss/                  # om Magnor Midtun
├── archive.ts               # les arkivteksten frå content/archive/
├── content.ts               # tema, kapittel og redaksjonell tekst
├── globals.css              # global stil og fargevariablar
├── layout.tsx               # metadata og rotlayout
├── page.tsx                 # framsida
└── ...
content/archive/             # originalteksten frå Magnor si heimeside
public/archive/              # originalbileta frå Magnor si heimeside
scripts/
└── scrape-magnor.mjs        # hentar heimesida til Magnor på nytt
```

Repoet inneheld òg ein kopi av den opphavlege heimesida til Magnor. Skriptet [scripts/scrape-magnor.mjs](scripts/scrape-magnor.mjs) hentar alle sidene og bileta derifrå med Playwright. Teksten blir lagra i [content/archive/](content/archive/) og bileta i [public/archive/](public/archive/), og det er dette materialet sida byggjer på. Meir om oppbygginga av koden står i [CLAUDE.md](CLAUDE.md).

### Lisens

Koden er lisensiert under [MIT](LICENSE). Lisensen gjeld ikkje teksten og bileta i `content/archive/` og `public/archive/`. Teksten er skriven av Magnor Midtun, og bileta tilhøyrer dei som tok dei.
