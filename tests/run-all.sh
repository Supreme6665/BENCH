#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-8000}"
LOG="/tmp/opencode/bench-test-server.log"

if curl -sf "http://localhost:${PORT}/" >/dev/null 2>&1; then
  echo "A server is already running on port ${PORT}; using it."
else
  python3 -m http.server "$PORT" >"$LOG" 2>&1 &
  SERVER_PID=$!
  trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
  for _ in $(seq 1 30); do
    if curl -sf "http://localhost:${PORT}/" >/dev/null 2>&1; then break; fi
    sleep 0.2
  done
  echo "Started test server on http://localhost:${PORT}"
fi

node tests/validate.mjs
node tests/economy.mjs
node tests/browser.mjs
node tests/playthrough.mjs
