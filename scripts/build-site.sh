#!/usr/bin/env bash
# Copy viewer sources -> site/<client> for Vercel deploy.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

for client in google dell partner; do
  rm -rf "$ROOT/site/$client"
  mkdir -p "$ROOT/site/$client"
  cp -R "$ROOT/$client/viewer/." "$ROOT/site/$client/"
  rm -rf "$ROOT/site/$client/.vercel" "$ROOT/site/$client/.env.local"
  echo "Built site/$client"
done
