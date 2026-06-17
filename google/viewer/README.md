# WIF India x Google Flow - Proposal Viewer

Static HTML page viewer for the 9-page Google Flow proposal. Design tokens extracted from `WIF x Adobe_Proposal.pdf` (Canva export).

## Design tokens

See `design-tokens.json` and `css/tokens.css`.

| Token | Value | Source |
|---|---|---|
| Coral (body text) | `#d86363` | Aileron / HKSentiments text |
| Purple (headings) | `#78619f` | HKSentiments Medium |
| Deep purple (cover) | `#3f1f7d` | Cover background |
| Orange (cover accent) | `#f79f5b` | HKSentiments italic |
| Cream (page bg) | `#f7f5ed` | Content pages |
| Display font | Syne (fallback for HKSentiments) | Google Fonts |
| Body font | DM Sans (fallback for Aileron) | Google Fonts |

Original Canva fonts: **HKSentiments**, **Aileron** (not available on Google Fonts).

## Local preview

```bash
cd viewer
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy to Vercel

This folder is the **working source**. Vercel serves from `site/google/` at `/google`.

From repo root:

```bash
./scripts/sync-site-google.sh
vercel --prod
```

Live: `https://wif-porposals.vercel.app/google` (hub at `/`).

## Controls

- **Index** button or `I` key: toggle page list
- **← / →** keys or Prev/Next buttons
- URL hash: `#page-3` deep-links to page 3

## Edit content

Update `js/pages.js` (sourced from `a4-pdf-outline.md`).
