#!/usr/bin/env bash
# Runs full recipe content review when the user submits /recipe-review
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
input="$(cat)"

prompt="$(
  printf '%s' "$input" | node --input-type=module -e "
    let d = '';
    process.stdin.on('data', (c) => { d += c; });
    process.stdin.on('end', () => {
      try {
        const j = JSON.parse(d);
        const p = j.prompt ?? j.text ?? j.user_message ?? j.message ?? '';
        process.stdout.write(String(p));
      } catch {
        process.stdout.write('');
      }
    });
  "
)"

if printf '%s' "$prompt" | grep -qE '(^|[[:space:]])/recipe-review([[:space:]]|$)|(^|[[:space:]])recipe-review([[:space:]]|$)'; then
  cd "$ROOT"
  log="$(npm run recipe-review:full 2>&1 | tail -8)"
  summary_rel="docs/reviews/recipe-audit/$(ls -t docs/reviews/recipe-audit/audit-summary-*-full-100.md 2>/dev/null | head -1 | xargs basename 2>/dev/null || echo '')"
  node --input-type=module -e "
    const summary = process.env.SUMMARY || '';
    const log = process.env.LOG || '';
    console.log(JSON.stringify({
      permission: 'allow',
      agent_message: [
        '使用者觸發 /recipe-review。已執行 npm run recipe-review:full。',
        log,
        '請閱讀 .cursor/skills/recipe-review/SKILL.md，並以繁體中文摘要回報：' + summary,
        '逐篇 JSON：docs/reviews/recipe-audit/reports/{slug}.json'
      ].join('\n')
    }));
  " SUMMARY="$summary_rel" LOG="$log"
else
  echo '{"permission":"allow"}'
fi
