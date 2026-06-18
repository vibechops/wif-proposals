# Exporting the Dell proposal PDF

Lightweight, print-faithful PDFs come from **headless Chrome** rendering `print.html`, not from printing the interactive viewer.

## Why this method

| Approach | Typical size | Notes |
|---|---:|---|
| Headless Chrome + `print.html` (grain off) | ~1 MB | Same layout as viewer; recommended |
| Headless Chrome + grain on | ~7 MB | `feTurbulence` grain rasterizes to multi-MB bitmaps per cover/closing page |
| Browser Print from viewer | Varies | Extra UI chrome risk; harder to automate |

## Prerequisites

1. Local static server running from repo root:
   ```bash
   node scripts/serve.mjs 8080
   ```
2. Sync viewer to `site/` after content or CSS changes:
   ```bash
   bash scripts/sync-site.sh
   ```
3. Google Chrome installed (macOS path below).

**Export URL:**

```
http://localhost:8080/dell/print.html
```

Bold+ cover and Instrument Sans are baked in (no toggles).

## Generate PDF (one command)

```bash
bash scripts/sync-site.sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=15000 \
  --print-to-pdf="dell/06-deliverables/Dell x WIF India - Proposal.pdf" \
  "http://localhost:8080/dell/print.html"
```

Expect ~1 MB for 16 pages. If the file is ~7 MB, grain suppression in `print.html` is missing or bypassed.

## What keeps the PDF light

In `dell/viewer/print.html` (print-only CSS):

```css
.cb-grain { display: none !important; }
```

The grain layer uses an inline SVG `feTurbulence` filter. Chrome's PDF engine rasterizes it at full page resolution. It is kept in the **screen viewer** for texture; dropped for **export**.

Other assets (advisor photos, logos, SVG cover art) stay. They compress reasonably.

## Checklist before sending

1. Edit content in `dell/viewer/js/pages.js` (source of truth for viewer + PDF).
2. Run `bash scripts/sync-site.sh`.
3. Hard-refresh viewer or bump `?v=` cache params if CSS/JS changed.
4. Open print URL in browser once to spot-check all 16 pages.
5. Run Chrome command above.
6. Confirm file size (~1 MB) and page count (16).

## Output location

```
dell/06-deliverables/Dell x WIF India - Proposal.pdf
```

Large binaries can stay gitignored; this markdown and `pages.js` are the reproducible source.
