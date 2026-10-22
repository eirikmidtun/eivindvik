# SEO for Eivindvik før og no

Kontrollert 22. oktober 2026 på den publiserte nettstaden, i Google Search Console og i Bing Webmaster Tools. Nettleserkontrollane vart gjennomførte med Chrome DevTools Protocol etter ønsket om å byte frå Playwright. Koderettingane er verifiserte i eit lokalt produksjonsbygg og er ikkje publiserte.

Nettstaden har 134 kanoniske innhaldssider: framsida, fire andre faste sider, 22 kapittel og 107 dikt og tekstar. Begge søkjemotorane kjenner sitemapet. Google har indeksert sider som ikkje er med i den forseinka oversiktsrapporten; dei to enkeltadressene som vart kontrollerte hos Bing, var oppdaga, men ikkje crawla.

## Google

| Kontroll | Observasjon |
| --- | --- |
| Sitemap | Vellukka lesing 19. oktober, 134 oppdaga adresser. |
| Indeksoversikt | Sist oppdatert 16. oktober: 4 indekserte URL-ar, 25 oppdaga utan indeksering og 1 med omdirigering. |
| Steinkrossane | URL Inspection stadfestar at `/kapittel/steinkrossane` er indeksert. |
| Adventstid | `/dikt-og-tekstar/rim-adventstid` er indeksert. Sist crawla 20. oktober av Googlebot for smarttelefon. Crawling og indeksering er tillate, henting lukkast, og Google valde den oppgitte kanoniske adressa. |
| Kart | `/kart` er oppdaga, men ikkje crawla eller indeksert. Ingen refererande side funnen. |

Dei fire URL-ane i den eldre indeksoversikta er variantar av framsida og «Livet i bygda», fordelte på HTTP/HTTPS og med/utan www. Dei er ikkje fire ulike innhaldssider. Ein kan derfor ikkje bruke dette talet som dagens totale indeksdekning.

Resultatrapporten viste **15 klikk, 35 visingar, 42,9 % klikkrate og gjennomsnittleg plassering 5,9**, med diagramdata frå 4. til 20. oktober 2026. Synlege søkjeord var «eivindvik», «julerim» og «gulen kyrkje».

Kart-sida vart send til Google si prioriterte crawl-kø 22. oktober. Search Console stadfesta «Indexing requested»; dette er ei førespurnad, ikkje stadfesting av indeksering.

Kjelder: [indeksoversikt](https://search.google.com/search-console/index?resource_id=sc-domain%3Aeivindvik-for-og-no.no), [sitemap](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aeivindvik-for-og-no.no) og [søkeresultat](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aeivindvik-for-og-no.no).

## Bing

Sitemapet vart lese 19. oktober med status «Success» og 134 oppdaga adresser, utan feil eller åtvaringar. «Indexed URLs» i Site Explorer viste ingen data.

URL Inspection viste «Discovered but not crawled» for både «Steinkrossane» og «Adventstid», begge oppdaga 19. oktober. Live-testen av «Steinkrossane» stadfesta «URL can be indexed by Bing». Bing oppgav dermed ingen konkret teknisk blokkering i live-testen som forklarer kvifor crawling ikkje har skjedd.

Live-testen gav éin merknad om manglande alternativ tekst. Bannerfotoet har medvite `alt=""` fordi det er dekorativt på innhaldssidene; dei historiske bileta har alternativ tekst. Denne merknaden vart ikkje behandla som ein indeksblokkering.

Det vart sendt indekseringsførespurnader for «Adventstid» og «Steinkrossane» 22. oktober. Desse må følgjast opp mot Bing si faktiske indeksstatus.

Kjelder: [sitemap](https://www.bing.com/webmasters/sitemaps?siteUrl=https%3A%2F%2Feivindvik-for-og-no.no%2F), [URL Inspection](https://www.bing.com/webmasters/urlinspection?siteUrl=https%3A%2F%2Feivindvik-for-og-no.no%2F) og [Site Explorer](https://www.bing.com/webmasters/siteexplorer?siteUrl=https%3A%2F%2Feivindvik-for-og-no.no%2F).

## Funn og rettingar

1. **Innhaldet var skjult utan JavaScript.** Den globale `loading.tsx` lét nettlesaren vise berre «Hentar forteljingane …», medan sjølve arkivinnhaldet låg skjult i den servergenererte HTML-en. Lastegrensa og ubrukt spinnerstil er fjerna. Kapittel og dikt er no synlege utan JavaScript. Google sine vellukka indekseringar viser at dette ikkje var ei absolutt blokkering for Google; det er ikkje påvist at det var årsaka til manglande crawling hos Bing.
2. **Kart-sida mangla interne lenker.** Sida fanst i sitemapet, men ingen av dei 134 sidene lenka til henne. Kart er no lenka frå hovudmenyen og botnmenyen. Mobilmenyen bryt linjer slik at den ekstra lenkja ikkje blir klipt bort.
3. **Fem sider mangla `og:url`.** Framsida og oversiktssidene har no eigne Open Graph-adresser. Oversiktssidene beheld det genererte delingsbiletet når dei overstyrer metadata.
4. **To titlar var lite beskrivande.** «Kart» er endra til «Kart over Eivindvik frå 1771», og «Om oss» til «Magnor Midtun – om forfattaren».
5. **Framsida i sitemapet er samordna med canonical.** Ho brukar no same avsluttande skråstrek som den kanoniske adressa.

Dei publiserte sidene hadde allereie unike titlar og beskrivingar, kanoniske www-adresser og nynorsk språkmerking. Robots.txt tillèt crawling og viser til riktig sitemap. Gamle samlingsadresser gir permanent 308-omdirigering, og ugyldige adresser gir 404.

## Verifisering og oppfølging

- `pnpm lint` og `pnpm build` passerte. Alle innhaldssidene er førehandsrenderte.
- Chrome DevTools-kontrollen av alle 134 lokale sider fann ingen feil i HTTP-status, unike titlar, beskrivingar, canonical, Open Graph-adresser og bilete, språk, H1, hovudinnhald, interne lenker eller JSON-LD-syntaks.
- Kapittel og dikt vart kontrollerte med JavaScript slått av. Innhaldet er synleg, med éin `main` og éin H1.
- Gamle adresser gir 308; ukjende sider gir 404 og `noindex`. Robots.txt, sitemap og delingsbilete svarer med 200.
- Lighthouse på mobil gav **SEO 100/100** for framsida og `/kapittel/gulen-kyrkje` i produksjonsbygget.
- Menyen er kontrollert på mobil, nettbrett og skrivebord.

Publiser koderettingane før neste kontroll av live-versjonen. Kontroller deretter kart-sida og eit utval kapittel og dikt i begge verktøya etter ny crawling. Bruk URL Inspection saman med rapportdatoane; oversiktene kan liggje etter faktisk indeksstatus. Sitemapet er allereie registrert på riktig adresse i begge tenestene.

Rettleiing: [Google om beskrivande titlar](https://developers.google.com/search/docs/appearance/title-link) og [kanoniske adresser i sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
