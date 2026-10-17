# Plan: Redesign pascal-vogel.com to "1a Editorial" direction

## Context

The user wants the live site (Astro 7 + Tailwind v4, repo at
`/Users/pascal/Developer/pascal-vogel.com`) updated to match the **first**
design direction from the Claude redesign session:
`/Users/pascal/Downloads/Pascal Vogel website redesign/Website Directions.dc.html`
(the artifact at https://claude.ai/code/artifact/8cf13989-... is this document —
confirmed via the folder's `.thumbnail` OCR: "TURN 1 / Three directions …
1a Editorial …" with the 1a page rendered first).

**Direction 1a — "Editorial"** (the first version in the doc):
"Serif, narrow measure, hairline rules. Reads like a considered index of work."

The design doc's intro also notes: *"Project copy is placeholder."* Per the
user's instruction, **copy is used verbatim** (no rewriting).

## Design spec — 1a (from the design doc)

- **Canvas**: bg `#0d0e10`; column `max-width: 700px`, centered, padding
  `96px 40px 120px`; text `#ece9e3`.
- **Fonts** (Google Fonts): `Newsreader` (300/400/500 + italics) for body/serif;
  `JetBrains Mono` (400/500/700) for labels/eyebrows/meta.
- **Header block** (margin-bottom 56px): portrait `src/media/pv.png` (56px
  circle) + name "Dr. Pascal Vogel" (19px serif) + eyebrow
  "SENIOR SOLUTIONS ARCHITECT · DATABRICKS · HAMBURG" (JetBrains Mono 11px,
  uppercase, `letter-spacing 0.1em`, color `#86867e`).
- **Intro copy** (Newsreader):
  - 25px/1.5 weight 300 `#f4f1eb`: "I help enterprises build data and AI
    products that actually ship — and write down what I learn along the way."
  - 18px/1.75 `#c8c5bd`: "Previously a Solutions Architect at [AWS]… Chair of
    IT Management and Consulting at the University of Hamburg, where I studied
    how neighborhoods organize online."
  - 18px/1.75 `#c8c5bd`: "Reach out if you want to chat about apps on the
    lakehouse, serverless, or side projects that get out of hand."
  - Links: `#e0b354`, no underline, `border-bottom: 1px solid rgba(224,179,84,0.4)`,
    hover `#f2cd7c`.
- **Socials row** (margin-bottom 88px): text links in JetBrains Mono 12px
  uppercase `letter-spacing 0.06em`, color `#86867e`, hover `#e0b354`:
  LinkedIn, GitHub, Email (mailto).
- **Projects section**: mono 11px uppercase `letter-spacing 0.18em` `#86867e`
  heading with hairline `border-bottom: 1px solid #26272a` (padding-bottom 14px,
  margin-bottom 8px). Rows: each `display:flex column`, padding `26px 0`,
  `border-bottom: 1px solid #1c1d20`, hover `background: #111214`.
  - Name 21px `#f4f1eb` + year (mono 11px `#6f6f68`) on baseline row.
  - Blurb 17px/1.65 `#b4b1a9`.
  - Tags mono 11px `#7d7d75` + host `#e0b354` with ↗.
  - **5 projects** (placeholder copy, verbatim): Conjugatu (2026,
    conjugatu.com), Databricks Apps Cookbook (2025, apps-cookbook.dev),
    Serverless PDF Chat (2023, github.com/aws-samples), Mein Großlohe (2020),
    Meine Nachbarn (2019). Tags per doc.
  - **Collapsed by default: only the first 3 projects visible** (Conjugatu,
    Databricks Apps Cookbook, Serverless PDF Chat); Mein Großlohe and Meine
    Nachbarn are hidden behind an expand control.
  - **Expand button**: mono 11px uppercase `letter-spacing 0.06em`, color
    `#86867e`, hover `#e0b354` (matches socials styling), text toggles
    "Show all projects" ↔ "Show less". Implementation: inline `<script>`
    toggling a `hidden` class on rows 4–5; no-JS fallback renders all 5.
- **Publications section**: same mono hairline heading, margin-top 80px.
  Year groups: grid `64px 1fr` gap 20px, padding `24px 0`,
  `border-bottom: 1px solid #1c1d20`; year cell mono 12px `#6f6f68`;
  per item: title link 18px/1.5 `#ece9e3` (hover `#e0b354`), meta row mono 11px
  `#7d7d75`: venue `#a08a53` + `dateShort` ("Feb 2026"), translations 14px
  `#97948d` with left border `#2a2b2e` + 14px padding-left.
  - **Venue derived from URL host** via `VENUE_MAP` (from the doc's script):
    databricks.com → "Databricks Blog", community.databricks.com → "Databricks
    Community", apps-cookbook.dev → "Apps Cookbook", community.aws → "AWS
    Community", aws.amazon.com → "AWS Blog", serverlesstypescript.com,
    dev.to → "DEV", entwickler.de, dev-insider.de → "Dev-Insider",
    it-administrator.de → "IT-Administrator", aisel.aisnet.org → "AIS eLibrary",
    scholarspace/hdl.handle.net → "HICSS", ediss.sub.uni-hamburg.de /
    inf.uni-hamburg.de → "Uni Hamburg", library.gito.de → "GITO Verlag";
    fallback = hostname. `dateShort` = "Mon YYYY".

## Files to modify

- `src/layouts/Layout.astro` — bg `#0d0e10`, Google Fonts (Newsreader +
  JetBrains Mono) `<link>`, keep analytics + favicon + meta.
- `src/pages/index.astro` — 1a header/intro/socials/projects/publications markup.
- `src/components/socials.astro` — replace SVG icons with mono text links
  (LinkedIn, GitHub, Email).
- `src/components/publications.astro` — new 1a layout + venue map + dateShort.
- `src/data/publications.json` — unchanged (identical to design folder).
- `src/media/pv.png` — unchanged (identical checksum).
- `src/styles/global.css` — Tailwind import stays; add body font defaults.

## Reuse

- Existing `groupByYear` logic, `date-fns` `format`, `Socials`/`Publications`
  component structure.
- `VENUE_MAP` and month constants from the design doc script.

## Steps

- [x] Confirm open questions (copy interpretation)
- [x] Layout.astro: bg color + Google Fonts links
- [x] index.astro: editorial header/intro with exact copy and link styles
- [x] socials.astro: mono text links
- [x] projects: new component with 5 projects (verbatim placeholder copy)
- [x] publications.astro: 1a layout with venue map + short dates + translations
- [x] Responsive pass (design is desktop mockup; ensure mobile readability)
- [x] `npm run build`, preview, compare with 1a

## Decisions taken during execution

- **X/Twitter omitted**: direction 1a lists an X link, but the live repo deliberately
  removed it (commit c859f68, Aug 4 2026, after the design session). Omitted from
  the social row; easy to re-add if desired.
- **Copy**: direction 1a copy used verbatim, including the rewritten intro and
  the placeholder project blurbs.
- Venue labels derived from URL host via the design doc's `VENUE_MAP`;
  fallback = hostname. Dates rendered as "Mar 2026".

## Verification

- `npm run build` passes.
- `npm run dev` — page matches 1a at desktop width (700px column, Editorial
  styling), works on mobile, links/analytics intact.
- Projects section shows 3 rows by default; expand button reveals Mein
  Großlohe + Meine Nachbarn and toggles back.

## Follow-up (after approval)

- Projects section now shows only the 3 latest projects (Conjugatu, Databricks
  Apps Cookbook, Serverless PDF Chat); rows 4-5 start with the `hidden`
  attribute (Tailwind v4 preflight `[hidden]` rule guarantees it beats `flex`).
- Editorial mono "Show all 5" button below the rows toggles the rest via a small
  inline Astro script (`data-projects-toggle` / `data-projects-extra`), swapping
  to "Show less" when expanded. Button only renders when `projects.length > 3`,
  and the label derives from the data (`data-collapsed-label="Show all {total}"`).
