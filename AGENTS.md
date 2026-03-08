# Agent Instructions

## Project Summary

VS Code editor-themed portfolio site. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Japanese/English (next-intl). All data is static constants — no API or database.

## Architecture

- **Main page** (`app/[locale]/page.tsx`): Client-rendered interactive VS Code layout
- **Screenshot pages** (`app/[locale]/screenshot/[section]/[theme]/page.tsx`): SSG (42 static pages)
- **Preview sections**: `components/preview/sections/<feature>/<theme>.tsx` (8 features × 3 themes = 24 files)
- **VS Code chrome**: `components/vscode/` (title-bar, activity-bar, tab-bar, status-bar, settings)
- **Sidebar**: `components/sidebar/` (explorer, search, git-history, changelog, extensions)
- **Career timeline**: `components/career-timeline/` with shared theme styles
- **Contexts**: ThemeContext, LocaleContext
- **Hooks**: use-settings (localStorage), use-tabs, use-file-search, use-responsive
- **Constants**: `constants/` (portfolio-data, career-data, preview-data, vscode-config, tutorial-steps)
- **i18n config**: `lib/i18n/` (routing + request config for next-intl)

## Conventions

- **No barrel exports** — always import directly from source files, never via `index.ts`
- **File size** — keep under 300 lines, split by feature if needed
- **Imports** — use `@/` for cross-directory, relative (`./`) only for siblings
- **Components** — all use `"use client"` (except SSG pages)
- **i18n** — NO JSON message files. Inline translations via `locale === "en" ? "..." : "..."` with `useLocale()`. next-intl is for routing only. Do NOT create `messages/` directory.
- **Theme colors** — derived from `adjustBrightness()` in `lib/color-utils.ts`
- **Settings** — hydrated via useEffect to avoid SSR mismatch
- **No database** — data volume is small and static; TypeScript constants give type safety, SSG compatibility, and zero infrastructure

## Quality

- `npm run check` — tsc + oxfmt + eslint --fix
- `npx knip` — detect unused code/dependencies
- `npx playwright test` — 184 visual regression snapshots (168 section + 16 interactive feature)
- `npx playwright test --update-snapshots` — update baselines after intentional changes
