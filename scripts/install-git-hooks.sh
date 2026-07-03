#!/bin/sh
# Point this repo at .githooks/ (one-time per clone).
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOKS="$ROOT/.githooks"

chmod +x "$HOOKS/post-commit"
git -C "$ROOT" config core.hooksPath "$HOOKS"

echo "Git hooks installed: core.hooksPath -> .githooks"
echo "  post-commit — refreshes docs/assets/build-info.json after docs/ commits"
