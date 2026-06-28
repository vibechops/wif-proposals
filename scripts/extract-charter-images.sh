#!/usr/bin/env bash
# Extract embedded images from the WIF charter PDF into partner/viewer/assets/charter/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PDF="$ROOT/partner/WIF_Charter 2026_Updated.pdf"
OUT="$ROOT/partner/viewer/assets/charter"

if [[ ! -f "$PDF" ]]; then
  echo "Missing: $PDF" >&2
  exit 1
fi

mkdir -p "$OUT"
pdfimages -all "$PDF" "$OUT/img"
echo "Extracted $(ls "$OUT" | wc -l | tr -d ' ') files to $OUT"
echo "See $OUT/manifest.md for PDF page → file mapping and pages.js assignments."
