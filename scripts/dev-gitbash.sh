#!/usr/bin/env bash
set -euo pipefail

export PATH="$PATH:/c/Users/00896102/Desktop/node"

cd "$(dirname "$0")/.."

exec ./node_modules/.bin/astro dev --host 127.0.0.1
