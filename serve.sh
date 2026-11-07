#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8000}"
echo "BENCH serving at http://localhost:${PORT}"
echo "Press Ctrl-C to stop."
exec python3 -m http.server "$PORT"
