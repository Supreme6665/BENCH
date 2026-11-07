#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

REPO="${1:-bench-organic-synthesis}"
GH_BIN="${GH_BIN:-gh}"

if ! command -v "$GH_BIN" >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is not installed. Install it, then run:"
  echo "  gh auth login --hostname github.com --git-protocol ssh --web"
  echo "  ./publish.sh $REPO"
  exit 1
fi

if ! "$GH_BIN" auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Run:"
  echo "  $GH_BIN auth login --hostname github.com --git-protocol ssh --web"
  echo "Then run:"
  echo "  ./publish.sh $REPO"
  exit 1
fi

OWNER="$("$GH_BIN" api user -q .login)"
if ! git remote get-url origin >/dev/null 2>&1; then
  "$GH_BIN" repo create "$REPO" --public --source=. --remote=origin --push
else
  echo "Using existing origin remote."
  git push -u origin main
fi

# Enable GitHub Pages with GitHub Actions as the source, then trigger the workflow.
"$GH_BIN" api -X POST "repos/${OWNER}/${REPO}/pages" -f build_type=workflow >/dev/null 2>&1 || true
"$GH_BIN" workflow run pages.yml --repo "${OWNER}/${REPO}" >/dev/null 2>&1 || true

echo
echo "Repository: https://github.com/${OWNER}/${REPO}"
echo "Game:       https://${OWNER}.github.io/${REPO}/"
echo "Pages build: https://github.com/${OWNER}/${REPO}/actions"
