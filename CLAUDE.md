# Working on the OncoNose wiki

This repository is the iGEM 2026 wiki for team **OncoNose** (Kazakhstan). The project is a
breath-based biological screening concept for lung cancer. Read `README.md` first for the commands
and the content map; this file covers how to work in the codebase without breaking what it is for.

## The rule that matters most

**Never invent scientific content.** No results, statistics, citations, quotes, team members,
interviews or part numbers that do not exist. If content is missing:

- prose or a section → `<Placeholder title="..." where="src/..." />`
- a chart → pass `hasData={false}` to `<ChartFrame>` with `awaiting` and `where`
- a claim we expect but have not shown → `<Note kind="hypothesis">`
- a known weakness → `<Note kind="limitation">`

An empty, labelled figure is correct. A plausible-looking invented one is a serious failure: judges,
clinicians and future teammates all read this site as a record of what was actually done.

Every statistic in the prose carries `<Cite id="..." />`. Before adding a reference to
`src/data/references.ts`, verify it against Crossref or PubMed — the existing entries were all
checked, including DOIs.

## Stack

Astro 7, static output, TypeScript, plain CSS with custom properties. No UI framework, no CSS
framework, no charting library, no runtime dependencies. Keep it that way unless there is a real
reason: iGEM forbids external CDNs, and every added dependency is weight the team has to maintain.

Commands: `npm run dev`, `npm run build`, `npm run preview`, `npm run build:igem`.

## Conventions

**Links** — always `href('page')` from `src/lib/paths.ts`. Hard-coded `/page` breaks the sub-path
builds used by both GitHub Pages and the iGEM wiki.

**Content vs presentation** — content belongs in `src/data/*.ts`, presentation in components. If you
find yourself writing a list of facts inside a component, move it to a data file.

**Design tokens** — colours, type, spacing and radii live in `src/styles/tokens.css`. Use the tokens;
do not introduce new raw hex values.

Two surfaces carry meaning:

- **paper** (light) is the reading surface, for explanation;
- **darkfield** (dark) is the instrument surface, used only for simulations and measured data.

Three signal-family colours are **data encodings, never decoration**: green = tumour metabolism,
amber = oxidative stress, pink = chronic inflammation. Set `data-family="metabolism"` on an element
and the `--family*` variables resolve for it. Colour is always paired with a shape or a label so the
meaning does not depend on colour alone.

**Typography** — Mona Sans for headings, UI and data; Source Serif 4 for prose. Both self-hosted in
`public/fonts` and declared in `BaseLayout.astro`. Do not add Google Fonts or any other CDN.

**Motion** — one orchestrated moment (the breath simulation) plus interaction feedback. No
scroll-triggered reveals. Everything animated must check `prefers-reduced-motion` and have a
sensible static state.

**Accessibility is part of "done"** — semantic elements, real buttons and links, visible focus, alt
text, keyboard support for anything interactive, and a working no-JavaScript state. The breath
diagram is server-rendered SVG with a visually hidden data table, so it survives without scripts.

## Layouts

- `BaseLayout` — HTML shell, fonts, header, footer, skip link.
- `ChapterLayout` — the nine story chapters. Takes `slug`, `toc`, `brief` and `refs`, and renders the
  chapter rail, the in-brief panel, the table of contents, per-page sources and prev/next.
- `PageLayout` — supporting pages (team, attributions, references, judging).

Adding a chapter means adding it to `src/data/chapters.ts` (which drives navigation, the rail and
prev/next) and creating the page with `ChapterLayout`.

## Before saying the work is done

```bash
npm run build                       # must succeed
npm run preview                     # then check the pages you touched
grep -rn "<Placeholder" src/pages   # every gap still visible and accurate?
```

Check at 390 px, 768 px and 1440 px, with no horizontal overflow; keyboard through any new
interactive element; and look at `/dev/components` if you changed a shared component.

## Deployment

`.github/workflows/deploy.yml` (GitHub Pages, base `/iGEM/`) and `.gitlab-ci.yml` (the official iGEM
wiki, base `/onconose/`). Assets for the iGEM wiki must be uploaded to `static.igem.wiki`.

Commits in this repository do not carry Claude co-authorship or generated-by trailers.
