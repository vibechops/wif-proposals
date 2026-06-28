#!/usr/bin/env bash
# Copy viewer sources -> site/<client> (Vercel deploy path).
set -euo pipefail
"$(cd "$(dirname "$0")" && pwd)/build-site.sh"
