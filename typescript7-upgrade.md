# TypeScript 7 (tsgo) upgrade — my-vscode-portfolio

**What:** Replaced classic `tsc` with the TypeScript 7 native (Go) compiler for the
`type-check` script. TS 7 ships officially from Microsoft as the npm package
`@typescript/native-preview`, whose CLI binary is `tsgo`.

- Package installed: `@typescript/native-preview` (official — maintained by the TS
  team: microsoft1es, typescript-bot, andrewbranch, jakebailey, weswigham; repo
  `github.com/microsoft/typescript-go`).
- Binary you actually run: `tsgo` (relationship is the same as `typescript` → `tsc`).
- "preview" in the name = pre-release/dev-preview status only, **not** unofficial.

## Stack

- Next.js 16.0.10 (App Router), React 19.2, package manager **npm** (`package-lock.json`).
- Node v23.4.0.

## Results (~117 TS files)

Measured end-to-end via `npm run`:

| Compiler   | Mode                  | Time        | Exit |
| ---------- | --------------------- | ----------- | ---- |
| tsc 5.x    | cold (first run)      | ~17.9 s     | 0    |
| tsc 5.x    | warm (incremental)    | ~3.3 s      | 0    |
| **tsgo 7.0** | full, every run     | **~1.3–1.6 s** | 0  |

≈2.5× faster than warm tsc, ≈11× vs cold. tsgo keeps no `.tsbuildinfo` cache, so it
runs a full check (~1.3–1.6 s) every time. Both compilers exit 0 on identical code
→ **parity verified**. `next build` also validated (73 pages, exit 0).

## Changes made

1. `npm install -D @typescript/native-preview` — pinned exactly to
   `7.0.0-dev.20260707.2` (dev preview → pin, don't caret).
2. `package.json`:
   - `"type-check": "tsgo --noEmit"`
   - added `"type-check:tsc": "tsc --noEmit"` (fallback / cross-check)
   - `"check"` script switched to `tsgo`.
3. `tsconfig.json`: added `"noUncheckedSideEffectImports": false` to fix TS2882 on
   the global CSS import in `app/layout.tsx` (`import "./globals.css"`).

## Gotchas — which applied here

- **TS5102 (`baseUrl` removed in TS 7): DID NOT apply.** This repo's tsconfig already
  used the `@/*` path alias with no `baseUrl`, so no import rewrites were needed.
- **TS2882 (global CSS side-effect import): applied.** tsgo defaults
  `noUncheckedSideEffectImports` to `true`; classic tsc defaults it `false`. Fixed
  with the one-line `"noUncheckedSideEffectImports": false` (alternative: declare
  `module "*.css"` in a `.d.ts`).

## Caveats

- tsgo is a dev preview (stable targeted ~late 2026); kept `type-check:tsc` as a
  cross-check.
- `next build` still uses Next's own bundled classic tsc, so CI build safety is
  unchanged — the speedup is only the standalone `type-check` step.
- Pre-existing lint failures (unrelated to this change, left alone):
  `react-hooks/set-state-in-effect` in `hooks/use-pwa-install.ts:18`, and an
  unused-arg warning in `public/sw.js:3`.

## Gates

- tsgo `--noEmit`: **PASS** (exit 0)
- tsc `--noEmit` parity: **PASS** (exit 0)
- `next build`: **PASS** (73 pages)
