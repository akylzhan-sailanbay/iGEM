# OncoNose — iGEM 2026 project website

The wiki for **OncoNose**, an iGEM 2026 team from Kazakhstan. The project, *a biological nose for
breath*, asks whether an array of engineered biological sensing modules can respond to volatile
organic compounds in exhaled breath and produce a pattern that may help identify people at elevated
risk of lung cancer.

The site is a static build: no framework runs in the browser, no external service is contacted at
run time, and every font and asset is served from the site itself, as iGEM requires.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the production build
```

Node 22 or newer.

### Build for a sub-path

The site can be served from a sub-path (both iGEM and GitHub Pages do this). Set `ONCONOSE_BASE`:

```bash
ONCONOSE_BASE=/onconose/ npm run build     # https://2026.igem.wiki/onconose/
npm run build:igem                         # the same thing, as a script
```

Every internal link goes through `href()` in `src/lib/paths.ts`, so nothing breaks when the base
changes. **Always use `href('some-page')` instead of writing `/some-page` by hand.**

## Where the content lives

Content is data, presentation is components. To update the site you normally edit a file in
`src/data/`, not a page.

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Project and team names, links, year |
| `src/data/chapters.ts` | The nine chapters, their order, navigation labels |
| `src/data/references.ts` | Every citation. Numbers are global and stable |
| `src/data/signals.ts` | Signal families, sensing modules, example breath profiles |
| `src/data/pipeline.ts` | The six steps on *How it works* |
| `src/data/experiments.ts` | Hypotheses, workflow, variables, engineering cycles |
| `src/data/results.ts` | **Experimental results. Empty on purpose** |
| `src/data/human-practices.ts`, `team.ts`, `judging.ts` | Stakeholders, members, judging map |
| `src/data/home.ts` | The nine questions and the project status timeline |

### Rules the site is built on

1. **Never invent results, statistics, citations or quotes.** If something is missing, use the
   `<Placeholder>` component so the gap is visible and says which file it belongs in.
2. **Every number in the text carries a citation** via `<Cite id="..." />`.
3. **Simulations and schematics are labelled** as illustrative wherever they appear.
4. **Claims we have not shown are marked** with `<Note kind="hypothesis">`, and known weaknesses with
   `<Note kind="limitation">`.

Find every open item before a deadline:

```bash
grep -rn "<Placeholder" src/pages src/components
grep -rn "TODO" src
```

## Adding real content

**Team members** — add entries to `members` in `src/data/team.ts`. The page switches from placeholder
cards to real ones automatically.

**Results** — add datasets to `src/data/results.ts`. Each chart renders as soon as its data exists:

```ts
export const doseResponse: DoseResponseSet[] = [
  {
    moduleId: 'm1',
    family: 'metabolism',
    compound: 'compound name',
    unit: 'µM',
    points: [{ x: 1, y: 0.05, error: 0.01 }],
    notebook: 'Notebook entry 2026-07-14',
  },
];
```

**References** — append to `references` in `src/data/references.ts` (appending keeps existing numbers
stable), then cite with `<Cite id="yourNewId" />`. The references page works out which pages cite
what by scanning the sources at build time.

**Images** — for the official iGEM wiki, upload files with the iGEM uploads tool to
`static.igem.wiki` and reference that URL. Do not hotlink other sites.

## Component gallery

Run `npm run dev` and open `/dev/components` to see every component with example values, including
the charts with data in them. That page is **only built in development** and never ends up in
`dist/`.

## Project structure

```
src/
├── components/
│   ├── charts/     ChartFrame, LineChart, ResponseHeatmap
│   ├── content/    Section, Cite, Note, Placeholder, Figure, Table, FigureStrip, StatusPill, TechDetail
│   ├── home/       Hero, the breath instrument and its simulation
│   ├── layout/     Header, footer, chapter rail, table of contents, prev/next
│   └── science/    Diagrams: concept flow, pathway, pipeline explorer, SBOL constructs, Hill explorer
├── data/           All content (see table above)
├── layouts/        BaseLayout, ChapterLayout, PageLayout
├── lib/            paths.ts (base-aware links), scale.ts (chart maths), instrument-geometry.ts
├── pages/          One file per route
└── styles/         tokens.css (design tokens), global.css
```

## Deployment

**GitHub Pages** — `.github/workflows/deploy.yml` builds and deploys on every push to `main`. The
repository must be public, or on a plan that allows Pages for private repositories.

**The official iGEM wiki** — `.gitlab-ci.yml` builds with the team base path and publishes to
`public/`, which is what GitLab Pages serves. Check it against the current iGEM wiki instructions
before the freeze, and set the team slug in the base path.

### iGEM wiki rules this site already follows

- No external CDNs: fonts are self-hosted in `public/fonts`, and no third-party script is loaded.
- Static HTML only, no server needed.
- Works without JavaScript: the diagram, all text and the navigation still render.
- Content licensed CC BY 4.0, stated in the footer.

## Accessibility and performance

Semantic HTML, keyboard-operable menus and tabs, visible focus rings, `prefers-reduced-motion`
respected in the simulation, colour contrast checked against WCAG AA, alt text required for every
image, and tables that scroll and can be reached by keyboard. Charts and diagrams are SVG generated
at build time, so the only JavaScript shipped is the small amount that powers the navigation, the
tabs, the table of contents and the breath simulation.
