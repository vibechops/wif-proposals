# Partner with Us — WIF India prospectus viewer

Static A4 HTML page viewer for the org-level funding & partnership prospectus (condensed from `WIF_Charter 2026_Updated.pdf`).

Content source: `partner/02-deck/a4-pdf-outline.md`. Page data lives in `js/pages.js`.

## Local preview

From repo root:

```bash
cd site
python3 -m http.server 8080
```

Open http://localhost:8080/partner/ (after `./scripts/sync-site.sh`).

Or serve `partner/viewer/` directly and set `<base href="/">` in `index.html` for a quick check.

## Assets

Copy from an existing viewer if missing:

```bash
cp google/viewer/assets/wif-logo.png partner/viewer/assets/
cp -R google/viewer/assets/advisors partner/viewer/assets/
```

## Deploy

Working source: `partner/viewer/`. Vercel serves from `site/partner/` at `/partner`.

```bash
./scripts/sync-site.sh
vercel --prod
```

## Controls

- **← / →** keys or Prev/Next buttons
- URL hash: `#page-3` deep-links to page 3
- Print/PDF: open `print.html`

## Edit content

Update `js/pages.js`. Templates are defined in `js/app.js` (cover, bullets, sections, budget, closing).
