# Spec-019: 冰箱剩料工具多語

## Meta

- 類型：Tools / i18n
- 狀態：**paused**（2026-06-03 Human 暫停多語系專案）
- PRD：`docs/prds/prd-006.md`
- 依賴：`spec-006`, **`spec-017`**（建議在 spec-018 試點後或並行）
- 建立：2026-06-03
- 更新：2026-06-03

## 1. 背景與目的

冰箱工具目前以**中文食材名**比對食譜。spec-017 taxonomy 改為 `slug` + `labels` 後，工具頁須依**當前 locale** 顯示標籤、以 **slug** 比對 core ingredients，並在結果卡顯示該語食譜標題（若無譯文則 fallback 或排除，與 spec-018 列表策略一致）。

## 2. Goals

- `fridge-recipe.astro`：注入 locale、`ingredients`（slug + label + aliases per locale）、食譜摘要（slug、title、coverImage per locale）。
- `public/scripts/fridge-tool.js`：選取／輸入比對 slug；搜尋 alias 支援當前語言。
- 單元測試：`scripts/test-fridge-logic.mjs` 增加 slug-based 案例（可選固定 fixture）。
- UI 字串走 spec-017 字典（按鈕、空結果、提示）。

## 3. Non-goals

- 改變排序演算法本質（仍為 core 命中數 + 偏好）
- 多語語音輸入

## 4. Scope

| Path | Purpose |
| --- | --- |
| `src/pages/tools/fridge-recipe.astro` | locale + data payload |
| `public/scripts/fridge-tool.js` | slug matching |
| `src/lib/fridge-match.ts`（若已抽離） | slug API |
| `scripts/test-fridge-logic.mjs` | 回歸 |

## 5. 驗收條件

- [ ] `/en/tools/fridge-recipe/` 食材 chip 為英文（或當前語）
- [ ] 選 "Egg"（en）與選「雞蛋」（zh）對同一 slug 命中相同食譜集合（在該語有譯文時）
- [ ] `npm test` 通過
