# Spec-002 Progress

## Scope

- Spec: `docs/specs/002-content-recipes/spec.md`
- PRD: `docs/prds/prd-001.md`
- Status date: 2026-05-29

## Phase Checklist

- [x] Phase 1: Spec + UI design aligned
- [x] Phase 2: Develop
- [x] Phase 3: Verify
- [x] Phase 4: Review
- [ ] Phase 5: Close

## Design Docs

| 類型 | 名稱 | 路徑 | 狀態 | 備註 |
| --- | --- | --- | --- | --- |
| UISpec | 食譜列表 | `docs/ui-specs/recipes/recipe-list.md` | approved | `/recipes` 依據。 |
| UISpec | 食譜詳細頁 | `docs/ui-specs/recipes/recipe-detail.md` | approved | `/recipes/[slug]` 依據。 |
| ApiSpec | 無 | - | n/a | 本 spec 不建立 API。 |
| Schema | Recipe collection schema | `src/content.config.ts` | implemented | 已作為 Astro collection schema。 |

## Phase 1

- [x] 補齊 `docs/ui-specs/recipes/recipe-detail.md`
- [x] 對齊 `spec-002` 與首頁/列表頁/詳細頁的 UI 與資料需求
- [x] 明確界定 `spec-004`、`spec-006`、`spec-007` 所需依賴欄位

## Phase 2

- [x] Task 1: 建立 recipe content collection schema
  - GREEN: `src/content.config.ts`
- [x] Task 2: 建立 seed recipes
  - GREEN: `src/content/recipes/tofu-scrambled-eggs.md`, `src/content/recipes/tomato-egg-rice.md`, `src/content/recipes/steamed-chicken-bento.md`
- [x] Task 3: 建立 `RecipeCard` 與 recipe helper
  - GREEN: `src/components/RecipeCard.astro`, `src/lib/recipes.ts`
- [x] Task 4: 接上首頁熱門食譜與 `/recipes` 列表
  - GREEN: `src/pages/index.astro`, `src/pages/recipes/index.astro`
- [x] Task 5: 建立 `/recipes/[slug]` 與 `RecipeLayout`
  - GREEN: `src/layouts/RecipeLayout.astro`, `src/pages/recipes/[slug].astro`
- [x] Task 6: 補齊 recipe detail 樣式
  - GREEN: `src/styles/global.css`
- [x] Task 7: 驗證 build / type / smoke
  - GREEN: `scripts/verify-site.mjs`

## Phase 3

- [x] `npm test`
- [x] `npx astro check`
- [x] `npm run build`

## Phase 4

- [x] 檢查首頁熱門食譜已改由真實 collection 輸出
- [x] 檢查 `/recipes` 已由 collection 驅動，不再使用 placeholder 陣列
- [x] 檢查 `/recipes/[slug]` 可產出 3 個詳細頁並顯示食材、步驟、FAQ、相關食譜
- [x] 確認 review 結果為 `APPROVED`

## Decisions Made

- 使用 Astro content collection 作為 recipe schema 與 build-time 驗證入口。
- `slug` 採用 Astro entry `slug`，不把它當成 `data` schema 欄位處理。
- 詳細頁以靜態資訊架構為主，FAQ 不做進階互動，保持內容站導向。
- 以 3 篇 seed recipes 驗證系統通路，正式大量內容留給 `spec-007`。
- `Phase 5` 保留未完成，等待 `/vif-close`。
