---
name: webarkitektur
description: >-
  Følg denne arkitekturen når du bygger eller endrer sider og React-komponenter
  i dette Next.js-prosjektet. Bruk den for lesbar, skalerbar kode med få mapper,
  tydelig komposisjon og gode ytelsesvaner.
---

# Webarkitektur for Eivindvik

Skriv domeneord i koden på bokmål (`Tema`, `Kapittel`, `Arkiv`, flertall som
`temaer` og `kapitler`). Alt annet i koden – mapper, filer, tekniske navn,
props, CSS-klasser og kommentarer – skrives på engelsk, for eksempel
`TemaCard`, `KapittelGroup`, `Header` og `.section-heading`. Brukerrettet tekst
og URL-ankre er innhold og skrives på nynorsk.

## Struktur

- Bruk `app/` for ruter, global stil, innholdsdata og delte sidekomponenter.
- Legg gjenbrukbare komponenter direkte i `app/components/`. Ikke opprett
  flere mapper før det finnes nok innhold til at en mappe gjør navigeringen
  enklere.
- Legg statisk sideinnhold og typer i en egen fil som `app/content.ts` når det
  tjener flere komponenter. Hold data atskilt fra presentasjonen.
- Hold `app/page.tsx` som en kort sidekomposisjon. Flytt større eller
  gjenbrukbare deler ut i navngitte komponenter.
- Importer komponenter direkte fra filen de kommer fra. Ikke lag samlefiler
  eller barrel-filer med re-eksporter.

## Komponenter og komposisjon

- Gi komponenter ett tydelig ansvar og forklarende navn etter navneregelen over.
- Sett sammen siden av komponenter i stedet for å samle hele grensesnittet i én
  stor JSX-blokk.
- Bruk `children` når en komponent skal ta imot sammensatt innhold.
- Unngå mange boolske props som velger mellom ulike strukturer. Lag heller en
  tydelig komponent for hver reell variant.
- Bruk eksplisitte props-typer, og send bare data komponenten faktisk trenger.
- Opprett aldri komponentdefinisjoner inne i andre komponenter.
- Bruk React 19-mønstre: `ref` kan være en vanlig prop, og bruk `use()` for
  kontekst når kontekst er nødvendig. Ikke bruk `forwardRef`.
- Bruk sammensatt komponentmønster og kontekst bare når flere deler faktisk
  deler tilstand. En statisk innholdsseksjon trenger ikke en provider.

## Next.js og ytelse

- Les relevant dokumentasjon under `node_modules/next/dist/docs/` før bruk av
  Next.js-API-er. Følg versjonen som er installert i prosjektet.
- Bruk `preload` på `next/image` når et bilde faktisk skal forhåndslastes i
  Next.js 16. Ikke bruk den utdaterte `priority`-propen.
- Bruk Server Components som standard. Legg bare til `'use client'` der det
  trengs for tilstand, hendelser eller nettleser-API-er.
- Start uavhengige asynkrone forespørsler parallelt med `Promise.all()`.
  Vent med `await` til resultatet trengs, og flytt betingelser før unødvendige
  kall.
- Hold klientgrensen smal og send bare feltene klientkomponenten bruker.
- Bruk direkte importstier. Last tunge, sjelden brukte deler dynamisk når det
  faktisk reduserer startpakken.
- Utled verdier under rendering i stedet for å kopiere dem inn i tilstand med
  effekter. Bruk `memo`, `useMemo` og `useCallback` bare når måling eller en
  konkret stabilitetsgrunn tilsier det.
- Unngå delbar, muterbar modulnivåtilstand i server-rendering.
- Bruk semantisk HTML, tastaturtilgjengelig navigering, beskrivende alternativ
  tekst for meningsbærende bilder og norske navn på tilgjengelige kontroller.

## Før du leverer

- Kontroller at nye komponenter brukes fra ruten de hører til.
- Kontroller at lenker har gyldige mål, og at data holdes atskilt fra visningen.
- Hold endringene små og samlet. Ikke innfør avhengigheter eller abstraksjoner
  uten et konkret behov.
