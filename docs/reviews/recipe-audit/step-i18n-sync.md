# 多語步驟與繁中詳盡度對齊

- **更新**：2026-06-09
- **範圍**：`step-detail-flagged.json` 所列 179 篇（high + medium）

## 做法

1. **繁中**：`npm run recipe-review:expand-steps`（`scripts/apply-step-detail-fixes.mjs`）
2. **en / ja / ko（離線，與繁中同路由）**：`npm run recipe-i18n:sync-detail-steps`
   - 依設備與料理類型產生在地化步驟（蓋飯、湯、氣炸、快炒、sf-* 品類等）
   - 步驟**數量**與繁中一致；不再使用「對齊篇數」通用填充句
3. **可選（需 API）**：逐篇從繁中直譯步驟，細節最接近人工修稿
   - 設定 `GEMINI_API_KEY` 或 `GOOGLE_API_KEY`
   - `node scripts/gemini-translate-recipe-steps.mjs --slug <slug> --all`
   - 批次：`npm run recipe-i18n:translate-steps`（進度檔 `step-translation-progress.json`）

## 注意

- 離線同步是**模板化在地化**，品質優於通用句，但名店還原或特殊菜仍建議用 Gemini 或人工覆核。
- 勿再執行 `scripts/sync-i18n-step-counts.mjs`（僅補篇數用，已取代）。
