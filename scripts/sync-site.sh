#!/usr/bin/env bash
# Copy viewer sources -> site/<client> (Vercel deploy path).
# Mirrors the buildCommand in vercel.json so local site/ matches production.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

sync_one() {
  local client="$1"
  rsync -a --delete \
    --exclude='.vercel' \
    --exclude='.env.local' \
    "$ROOT/$client/viewer/" \
    "$ROOT/site/$client/"
  echo "Synced $client/viewer -> site/$client"
}

sync_one google
sync_one dell
sync_one partner
