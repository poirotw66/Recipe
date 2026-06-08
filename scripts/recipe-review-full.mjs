import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { reviewRecipeFile } from "./recipe-review-lib.mjs";

const root = process.cwd();
const outDir = join(root, "docs/reviews/recipe-audit");
const reportsDir = join(outDir, "reports");
const date = new Date().toISOString().slice(0, 10);

const files = readdirSync(join(root, "src/content/recipes"))
  .filter((f) => f.endsWith(".md"))
  .sort();

mkdirSync(reportsDir, { recursive: true });

const results = files.map((file) => {
  const report = reviewRecipeFile(root, file);
  writeFileSync(join(reportsDir, `${report.slug}.json`), `${JSON.stringify(report, null, 2)}\n`);
  return report;
});

const pass = results.filter((r) => r.status === "Pass").length;
const warning = results.filter((r) => r.status === "Warning").length;
const critical = results.filter((r) => r.status === "Critical").length;

const criticalRows = results
  .filter((r) => r.status === "Critical")
  .map((r) => {
    const top = r.issues[0];
    return `| [${r.slug}](reports/${r.slug}.json) | ${r.title} | ${top?.description ?? "—"} |`;
  });

const warningRows = results
  .filter((r) => r.status === "Warning")
  .slice(0, 40)
  .map((r) => {
    const top = r.issues[0];
    return `| [${r.slug}](reports/${r.slug}.json) | ${r.title} | ${top?.description ?? "—"} |`;
  });

const warningMore =
  warning > 40
    ? `\n> 其餘 ${warning - 40} 篇 Warning 請見 \`reports/*.json\` 或 \`latest-full-review.json\`。\n`
    : "";

const summaryPath = join(outDir, `audit-summary-${date}-full-${results.length}.md`);
const summary = `# 食譜內容審查摘要（全站 ${results.length} 篇）

- **審查日期**：${date}
- **範圍**：\`src/content/recipes\` 全數 ${results.length} 篇
- **方法**：機械 precheck ＋ 內容規則（模板殘文、重複句、份量／食安啟發式）
- **觸發方式**：終端 \`npm run recipe-review:full\` 或 Cursor 輸入 \`/recipe-review\`（見 \`.cursor/hooks\`）

## 統計

| 狀態 | 英文標籤 | 篇數 |
| --- | --- | --- |
| 通過 | Pass | ${pass} |
| 注意 | Warning | ${warning} |
| 嚴重 | Critical | ${critical} |

## 嚴重（請優先人工處理）

${criticalRows.length ? criticalRows.join("\n") : "| — | — | 本輪無 Critical |"}

## 注意（節錄前 40 篇）

| slug | 標題 | 主要問題 |
| --- | --- | --- |
${warningRows.join("\n")}
${warningMore}

## 通過

共 **${pass}** 篇，詳見各 \`reports/{slug}.json\` 中 \`status: Pass\`。

## 後續

1. 先處理 **Critical**；Warning 多為食材／步驟字面比對啟發式，需人工判斷是否 false positive。
2. 需更深語意審查時，對單篇使用 \`@recipe-review\` 或 \`node scripts/recipe-review-precheck.mjs --slug <slug>\`。
3. 刻意保留者寫入 \`overrides.json\`。
`;

writeFileSync(summaryPath, summary);

const index = {
  generated_at: date,
  recipe_count: results.length,
  pass,
  warning,
  critical,
  summary_markdown: summaryPath.replace(`${root}/`, ""),
  slugs: results.map((r) => ({ slug: r.slug, title: r.title, status: r.status }))
};

writeFileSync(join(outDir, "latest-full-review.json"), `${JSON.stringify(index, null, 2)}\n`);

// Keep precheck snapshot in sync for tooling
writeFileSync(
  join(outDir, "latest-precheck.json"),
  `${JSON.stringify(
    {
      generated_at: date,
      recipe_count: results.length,
      pass,
      warning,
      critical,
      recipes: results.map((r) => ({
        slug: r.slug,
        title: r.title,
        status: r.status,
        mechanical_issues: r.issues.filter((i) => i.source === "precheck")
      }))
    },
    null,
    2
  )}\n`
);

console.log(`Wrote ${results.length} reports to ${reportsDir}`);
console.log(`Summary: ${summaryPath}`);
console.log(`Pass ${pass} / Warning ${warning} / Critical ${critical}`);
