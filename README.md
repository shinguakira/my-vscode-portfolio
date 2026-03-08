**日本語版は [README.ja.md](README.ja.md) をご覧ください。**

# VSCode Portfolio

**Preview:** https://v0-project-steel-nine.vercel.app/

A portfolio website that replicates the Visual Studio Code editor interface. Browse portfolio sections as if they were files in an IDE — complete with tabs, sidebar, terminal, settings panel, and theme customization.

## Features

- **VS Code UI**: Faithful recreation of VS Code with title bar, activity bar, sidebar, tabs, terminal, and status bar
- **3 Theme Variants**: Each portfolio section has Modern, Innovative, and Professional visual styles
- **8 Portfolio Sections**: Profile, Projects, Skills, Contact, Strong Points, FAQ, Experience, README
- **Bilingual**: Full Japanese and English support (next-intl)
- **Interactive Elements**: File explorer, search, git history, extension gallery, settings panel, tutorial overlay
- **Responsive**: Desktop, mobile landscape (with `short:` variant scaling), and portrait layouts
- **Visual Regression Testing**: 184 Playwright snapshot tests (168 section + 16 feature screenshots)
- **SSG Optimized**: Screenshot routes pre-rendered as static HTML at build time
- **No Database**: All data managed as TypeScript constants — type-safe, SSG-friendly, zero infrastructure

## Sections & Themes

Each section is available in 3 visual themes: **Modern**, **Innovative**, and **Professional**.

### Profile

| Modern                                                             | Innovative                                                                 | Professional                                                                   |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Profile Modern](e2e/__snapshots__/ja/desktop/profile-modern.png) | ![Profile Innovative](e2e/__snapshots__/ja/desktop/profile-innovative.png) | ![Profile Professional](e2e/__snapshots__/ja/desktop/profile-professional.png) |

### Projects

| Modern                                                               | Innovative                                                                   | Professional                                                                     |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Projects Modern](e2e/__snapshots__/ja/desktop/projects-modern.png) | ![Projects Innovative](e2e/__snapshots__/ja/desktop/projects-innovative.png) | ![Projects Professional](e2e/__snapshots__/ja/desktop/projects-professional.png) |

### Skills

| Modern                                                           | Innovative                                                               | Professional                                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| ![Skills Modern](e2e/__snapshots__/ja/desktop/skills-modern.png) | ![Skills Innovative](e2e/__snapshots__/ja/desktop/skills-innovative.png) | ![Skills Professional](e2e/__snapshots__/ja/desktop/skills-professional.png) |

### Experience

| Modern                                                                   | Innovative                                                                       | Professional                                                                         |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| ![Experience Modern](e2e/__snapshots__/ja/desktop/experience-modern.png) | ![Experience Innovative](e2e/__snapshots__/ja/desktop/experience-innovative.png) | ![Experience Professional](e2e/__snapshots__/ja/desktop/experience-professional.png) |

### Strong Points

| Modern                                                                         | Innovative                                                                             | Professional                                                                               |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| ![Strong Points Modern](e2e/__snapshots__/ja/desktop/strong-points-modern.png) | ![Strong Points Innovative](e2e/__snapshots__/ja/desktop/strong-points-innovative.png) | ![Strong Points Professional](e2e/__snapshots__/ja/desktop/strong-points-professional.png) |

### Contact

| Modern                                                             | Innovative                                                                 | Professional                                                                   |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Contact Modern](e2e/__snapshots__/ja/desktop/contact-modern.png) | ![Contact Innovative](e2e/__snapshots__/ja/desktop/contact-innovative.png) | ![Contact Professional](e2e/__snapshots__/ja/desktop/contact-professional.png) |

### FAQ

| Modern                                                     | Innovative                                                         | Professional                                                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| ![FAQ Modern](e2e/__snapshots__/ja/desktop/faq-modern.png) | ![FAQ Innovative](e2e/__snapshots__/ja/desktop/faq-innovative.png) | ![FAQ Professional](e2e/__snapshots__/ja/desktop/faq-professional.png) |

## Interactive Features

The VS Code UI includes fully interactive elements beyond the portfolio sections.

| Explorer | Search |
| -------- | ------ |
| ![Explorer](e2e/__snapshots__/en/features/explorer.png) | ![Search](e2e/__snapshots__/en/features/search.png) |

| Git History | Changelog |
| ----------- | --------- |
| ![Git History](e2e/__snapshots__/en/features/git-history.png) | ![Changelog](e2e/__snapshots__/en/features/changelog.png) |

| Extensions | Terminal |
| ---------- | -------- |
| ![Extensions](e2e/__snapshots__/en/features/extensions.png) | ![Terminal](e2e/__snapshots__/en/features/terminal.png) |

| Settings | Tutorial |
| -------- | -------- |
| ![Settings](e2e/__snapshots__/en/features/settings.png) | ![Tutorial](e2e/__snapshots__/en/features/tutorial.png) |

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript (strict)
- **Styling**: Tailwind CSS v4, custom `short:` variant for mobile landscape
- **i18n**: next-intl (ja/en)
- **Icons**: lucide-react
- **Testing**: Playwright (visual regression with `toHaveScreenshot`)
- **Linting**: ESLint 9, oxfmt, knip
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

### Quality Checks

```bash
# All checks at once (TypeScript + format + lint)
npm run check

# Individual
npm run type-check    # TypeScript type checking
npm run format        # oxfmt formatter
npm run lint:fix      # ESLint with auto-fix
npx knip              # Detect unused code/dependencies
```

### Visual Regression Testing

```bash
# Run all 184 snapshot tests
npx playwright test

# Run specific viewport/locale
npx playwright test -g "desktop ja/profile"

# Update baselines after intentional changes
npx playwright test --update-snapshots

# Generate HTML report for failures
npx playwright test --reporter=html
npx playwright show-report
```

Snapshots are stored in `e2e/__snapshots__/{locale}/{viewport}/{section}-{theme}.png`.

## Project Structure

```
app/
  [locale]/
    page.tsx                    # Main VS Code layout (client-rendered)
    layout.tsx                  # Locale layout with SEO metadata
    screenshot/[section]/[theme]/
      page.tsx                  # SSG screenshot pages (42 static routes)
  robots.ts                     # /robots.txt
  sitemap.ts                    # /sitemap.xml

components/
  vscode-layout.tsx             # Main layout shell
  vscode/                       # VS Code chrome (title-bar, activity-bar, tab-bar, status-bar, settings)
  sidebar/                      # Explorer, search, git-history, changelog, extensions panels
  preview/
    preview-panel.tsx           # Section dispatcher
    sections/<feature>/<theme>.tsx  # 24 section components (8 features × 3 themes)
  career-timeline/              # Experience section with shared timeline styles
  editor/                       # Editor area and empty state

constants/                      # All static data (portfolio, career, preview, config, tutorial)
contexts/                       # ThemeContext, LocaleContext
hooks/                          # use-settings, use-tabs, use-file-search, use-responsive
lib/                            # Utilities (color, file, icons)
i18n/                           # next-intl routing and request config
e2e/                            # Playwright visual regression tests + snapshots
```
