import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reportsDir = join(root, "docs/reviews/recipe-audit/reports");
mkdirSync(reportsDir, { recursive: true });

const REVIEWED_AT = "2026-06-03";

const TYPO_ISSUE = {
  type: "Logic_Error",
  severity: "Critical",
  description:
    "步驟寫「下火蓮」，應為「下水蓮」（加入水蓮）。錯字導致核心食材名稱未出現在步驟中，讀者可能誤解為「關小火」或無法對照食材清單。",
  suggested_fix: "將所有步驟中的「下火蓮」改為「下水蓮」。",
  source: "agent",
};

const reports = [
  {
    slug: "water-lily-stem-garlic-stirfry",
    title: "蒜蓉炒水蓮",
    status: "Critical",
    confidence_score: 92,
    issues: [TYPO_ISSUE],
  },
  {
    slug: "water-lily-stem-oyster-sauce",
    title: "蠔油炒水蓮",
    status: "Critical",
    confidence_score: 92,
    issues: [TYPO_ISSUE],
  },
  {
    slug: "water-lily-stem-mushroom-stirfry",
    title: "水蓮炒菇類",
    status: "Critical",
    confidence_score: 90,
    issues: [
      TYPO_ISSUE,
      {
        type: "Ingredient_Mismatch",
        code: "step_mentions_unknown",
        severity: "Warning",
        description:
          "Precheck 將步驟「白胡椒」截斷為「胡椒」而誤報；食材表已列白胡椒，可忽略。",
        suggested_fix: "修正錯字後無需另改白胡椒欄位。",
        source: "precheck",
      },
    ],
  },
  {
    slug: "water-lily-stem-pork-soup",
    title: "水蓮肉片湯",
    status: "Critical",
    confidence_score: 88,
    issues: [
      TYPO_ISSUE,
      {
        type: "Metadata_Mismatch",
        severity: "Warning",
        description: "情境標籤含「10 分鐘料理」，但 totalTime 為 18 分鐘，與實際流程不符。",
        suggested_fix: "改標「一人料理」或將 totalTime／步驟壓到 10 分鐘內，二擇一。",
        source: "agent",
      },
    ],
  },
  {
    slug: "water-lily-stem-fish-ball-noodles",
    title: "水蓮貢丸湯麵",
    status: "Critical",
    confidence_score: 87,
    issues: [
      TYPO_ISSUE,
      {
        type: "Ingredient_Mismatch",
        code: "unused_ingredient",
        severity: "Critical",
        description: "機械檢查顯示核心食材「水蓮」未出現在步驟文字（因「下火蓮」錯字）。",
        suggested_fix: "將「下火蓮」改為「下水蓮」。",
        source: "precheck",
      },
      {
        type: "Ingredient_Mismatch",
        severity: "Warning",
        description: "tips 建議加薑或醬油，但未列入 seasonings 或 customAdditions。",
        suggested_fix: "將薑、醬油移入 customAdditions，或改寫 tips 為「可選」。",
        source: "agent",
      },
    ],
  },
  {
    slug: "water-lily-stem-tofu-braise",
    title: "水蓮燒豆腐",
    status: "Critical",
    confidence_score: 92,
    issues: [TYPO_ISSUE],
  },
  {
    slug: "water-lily-stem-shrimp-stirfry",
    title: "水蓮炒蝦仁",
    status: "Critical",
    confidence_score: 89,
    issues: [
      TYPO_ISSUE,
      {
        type: "Ingredient_Mismatch",
        severity: "Warning",
        description: "tips 提到蝦仁可先用米酒去腥，但 seasonings 未列米酒。",
        suggested_fix: "在 seasonings 加米酒 1 小匙，或改 tips 不提及米酒。",
        source: "agent",
      },
    ],
  },
  {
    slug: "water-lily-stem-chicken-rice-bowl",
    title: "水蓮雞肉蓋飯",
    status: "Critical",
    confidence_score: 91,
    issues: [TYPO_ISSUE],
  },
  {
    slug: "water-lily-stem-clear-soup",
    title: "水蓮清湯",
    status: "Critical",
    confidence_score: 90,
    issues: [
      TYPO_ISSUE,
      {
        type: "Ingredient_Mismatch",
        severity: "Warning",
        description: "tips 建議淋麻油，但未列入 seasonings 或 customAdditions。",
        suggested_fix: "將麻油列入 customAdditions，或改寫為可選提味。",
        source: "agent",
      },
    ],
  },
  {
    slug: "water-lily-stem-sesame-toss",
    title: "麻油拌水蓮",
    status: "Critical",
    confidence_score: 88,
    issues: [
      TYPO_ISSUE,
      {
        type: "Logic_Error",
        severity: "Warning",
        description: "最後一步寫「起鍋前撒白芝麻」，但此菜為汆燙拌涼，用語不精確。",
        suggested_fix: "改為「裝盤前撒白芝麻」。",
        source: "agent",
      },
    ],
  },
];

for (const report of reports) {
  const { title, ...payload } = report;
  const json = {
    slug: payload.slug,
    title,
    reviewed_at: REVIEWED_AT,
    status: payload.status,
    confidence_score: payload.confidence_score,
    issues: payload.issues,
  };
  writeFileSync(join(reportsDir, `${payload.slug}.json`), `${JSON.stringify(json, null, 2)}\n`, "utf8");
}

const summary = `# 水蓮食譜審查摘要（${REVIEWED_AT}）

範圍：新增 10 篇 \`water-lily-stem-*\` 食譜  
Precheck：\`npm run recipe-review:precheck\`（全站 160 篇一併更新）

## 統計

| 狀態 | 數量 | 說明 |
| --- | ---: | --- |
| Pass | 0 | — |
| Warning | 0 | 皆有 Critical 問題，不單獨計 Warning 終態 |
| Critical | 10 | 全數需修正「下火蓮」錯字 |

## 嚴重（需優先修正）

**共通問題（10/10）**  
步驟一律寫成「下火蓮」，正確應為「**下水蓮**」。此錯字使核心食材「水蓮」未出現在步驟文字，機械檢查亦會判為未使用食材。

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| water-lily-stem-garlic-stirfry | 蒜蓉炒水蓮 | 步驟錯字「下火蓮」 |
| water-lily-stem-oyster-sauce | 蠔油炒水蓮 | 步驟錯字「下火蓮」 |
| water-lily-stem-mushroom-stirfry | 水蓮炒菇類 | 步驟錯字「下火蓮」 |
| water-lily-stem-pork-soup | 水蓮肉片湯 | 錯字；情境「10 分鐘」但 totalTime 18 分 |
| water-lily-stem-fish-ball-noodles | 水蓮貢丸湯麵 | 錯字；tips 薑/醬油未入清單 |
| water-lily-stem-tofu-braise | 水蓮燒豆腐 | 步驟錯字「下火蓮」 |
| water-lily-stem-shrimp-stirfry | 水蓮炒蝦仁 | 錯字；tips 米酒未入 seasonings |
| water-lily-stem-chicken-rice-bowl | 水蓮雞肉蓋飯 | 步驟錯字「下火蓮」 |
| water-lily-stem-clear-soup | 水蓮清湯 | 錯字；tips 麻油未入清單 |
| water-lily-stem-sesame-toss | 麻油拌水蓮 | 錯字；「起鍋前」用語不精確 |

## 次要（修正錯字後可再處理）

- **水蓮肉片湯**：\`scenarios\` 含「10 分鐘料理」與 \`totalTime: 18\` 不一致。
- **水蓮貢丸湯麵**、**水蓮清湯**、**水蓮炒蝦仁**：tips 提及的調味未列入 \`seasonings\` / \`customAdditions\`。
- **麻油拌水蓮**：最後一步建議改「裝盤前」而非「起鍋前」。

## Precheck 誤報（可忽略）

- 步驟「白胡椒」被截成「胡椒」而報 \`step_mentions_unknown\`（水蓮炒菇類、貢丸湯麵、炒蝦仁、清湯）。
- 步驟「白芝麻」被截成「芝麻」（麻油拌水蓮）；食材表已列白芝麻。

## 建議修復順序

1. 批次將 10 篇步驟「下火蓮」→「下水蓮」（可從 \`scripts/generate-water-lily-recipes.mjs\` 模板一併修正後重產）。
2. 調整 **水蓮肉片湯** 情境或時間標示。
3. 補齊 tips 與食材清單的一致性（米酒、麻油、薑、醬油）。

## 個別報告

${reports
  .map((r) => `- [\`${r.slug}\`](reports/${r.slug}.json) — ${r.status}`)
  .join("\n")}
`;

writeFileSync(
  join(root, "docs/reviews/recipe-audit/audit-summary-water-lily-2026-06-03.md"),
  summary,
  "utf8",
);

console.log(`Wrote ${reports.length} reports and audit summary.`);
