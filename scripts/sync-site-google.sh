#!/usr/bin/env bash
# Copy google/viewer (source) -> site/google (Vercel deploy path)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
rsync -a --delete \
  --exclude='.vercel' \
  --exclude='.env.local' \
  --exclude='.gitignore' \
  "$ROOT/google/viewer/" \
  "$ROOT/site/google/"
echo "Synced google/viewer -> site/google"
