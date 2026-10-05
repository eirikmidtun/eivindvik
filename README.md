# Eivindvik før og no

Ei enkel heimeside for den lokalhistoriske samlinga om Eivindvik og Gulen.

## Kom i gang

```bash
pnpm install
pnpm dev
```

Opne [http://localhost:3000](http://localhost:3000) i nettlesaren.

## Struktur

- `app/` inneheld sida, rutetilstandar og global stil.
- `app/content.ts` samlar temaa og kapitteltitlane.
- `app/components/` inneheld komponentane som sida er sett saman av.
- `content/archive/` og `public/archive/` tek vare på kjeldematerialet og bileta.
- `.claude/skills/webarkitektur/` skildrar reglane for vidare utvikling.

## Kommandoar

- `pnpm dev` startar utviklingsserveren.
- `pnpm lint` køyrer ESLint.
- `pnpm build` byggjer sida for produksjon.
