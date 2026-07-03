#!/bin/sh
# Point this repo at .githooks/ (runs on npm install via prepare; skip in CI).
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOKS="$ROOT/.githooks"

if [ -n "$CI" ] || [ ! -d "$ROOT/.git" ]; then
  echo "Skipping git hooks install (CI or no .git)"
  exit 0
fi

if [ ! -f "$HOOKS/post-commit" ]; then
  echo "Skipping git hooks install (missing $HOOKS/post-commit)"
  exit 0
fi

chmod +x "$HOOKS/post-commit"
git -C "$ROOT" config core.hooksPath "$HOOKS"

echo "Git hooks installed: core.hooksPath -> .githooks"
echo "  post-commit — refreshes docs/assets/build-info.json after docs/ commits"
