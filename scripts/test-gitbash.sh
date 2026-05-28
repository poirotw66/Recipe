#!/usr/bin/env bash
set -euo pipefail

export PATH="$PATH:/c/Users/00896102/Desktop/node"

cd "$(dirname "$0")/.."

node scripts/verify-site.mjs
