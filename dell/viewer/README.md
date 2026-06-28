# WIF India x Dell - Proposal Viewer

Static HTML page viewer for the consolidated Dell proposal (Screenwriters Lab, Exhibition, Internship). Same engine as the Google viewer, Dell-blue palette.

Content source: `dell/02-deck/a4-pdf-outline.md`. Page data lives in `js/pages.js`.

## Local preview

From repo root (matches production paths):

```bash
cd site
python3 -m http.server 8080
```

Open http://localhost:8080/dell/

## Deploy to Vercel

This folder is the **working source**. Vercel serves from `site/dell/` at `/dell`.

From repo root:

```bash
./scripts/sync-site.sh
vercel --prod
```

Live: `https://wif-proposals.vercel.app/dell` (hub at `/`).

## Cover variants

Default: angular SVG cover (Bold+ styling).

Mesh gradient cover: `?cover=mesh` uses `cover-image-mesh-gradient-01.png` as the full cover sign (image as-is, no crop). Revert with `?cover=bold`.

## Controls

- **← / →** keys or Prev/Next buttons
- URL hash: `#page-3` deep-links to page 3

## Edit content

Update `js/pages.js`. Page templates (cover, statement, bullets, sections, advisory, budget, ask, closing) are defined in `js/app.js`.
