# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@.claude/skills/webarkitektur/SKILL.md

## Commands

- `pnpm dev` — dev server at http://localhost:3000
- `pnpm build` — production build (also the closest thing to a type-check; there is no separate `tsc` script)
- `pnpm lint` — ESLint (flat config in `eslint.config.mjs`, Next core-web-vitals + TypeScript rules); lint one file with `pnpm exec eslint app/page.tsx`

There is no test framework set up yet.

## Stack

- Next.js 16.3 (App Router only, in `app/`), React 19.2, TypeScript strict. Next 16 differs from older versions — check `node_modules/next/dist/docs/` (`01-app/`, `03-architecture/`) before relying on remembered APIs. For example, `app/layout.tsx` uses the globally generated `LayoutProps<"/">` type helper rather than hand-written props types.
- Styling is plain CSS in `app/globals.css`, using the color variables defined there. The project does not use Tailwind or external font loading.
- Import alias `@/*` maps to the repo root.

## Notes

- `AGENTS.md` is written and re-added by `next dev`; don't remove its block. Keep project guidance in this file and the detailed architecture rules in `.claude/skills/webarkitektur/SKILL.md`.
- Naming: domain words in code are Bokmål (`Tema`, `Kapittel`, `Arkiv`; plurals `temaer`, `kapitler`); everything else — folders, files, technical names, props, CSS classes, comments — is English (`TemaCard`, `KapittelGroup`, `Header`, `.section-heading`). User-facing copy and URL anchors are content and stay in Nynorsk (`lang="nn"`).
- Keep page data in `app/content.ts` and shared page components directly in `app/components/`. Keep `app/page.tsx` as a readable composition; avoid extra directory layers and barrel files.
- Server Components are the default. Add a client boundary only for UI that needs state, event handlers, or browser APIs. Use composition instead of boolean props to select different layouts.
- In Next.js 16, use `preload` when a `next/image` asset must be preloaded; `priority` is deprecated.
- Route feedback lives in `app/loading.tsx`, `app/error.tsx`, and `app/not-found.tsx`. Keep all messages in Norwegian and follow the installed Next.js file conventions.
- Keep the README specific to this archive. Remove unused starter assets and empty configuration files instead of carrying generic scaffold content forward.
