# Spec-003 Progress

## Scope

- Spec: `docs/specs/003-content-taxonomy/spec.md`
- PRD: `docs/prds/prd-001.md`
- Status date: 2026-05-29

## Phase Checklist

- [x] Phase 1: Spec + UI design aligned
- [x] Phase 2: Develop
- [x] Phase 3: Verify
- [x] Phase 4: Review
- [ ] Phase 5: Close

## Design Docs

| 類型 | 名稱 | 路徑 | 狀態 |
| --- | --- | --- | --- |
| UISpec | 食材列表 | `docs/ui-specs/ingredients/ingredient-list.md` | approved |
| UISpec | 食材詳細頁 | `docs/ui-specs/ingredients/ingredient-detail.md` | approved |
| UISpec | 情境列表 | `docs/ui-specs/scenarios/scenario-list.md` | approved |
| UISpec | 情境詳細頁 | `docs/ui-specs/scenarios/scenario-detail.md` | approved |

## Phase 1

- [x] 補齊 ingredient detail 與 scenario detail UI spec
- [x] 定義 ingredient/scenario JSON 的最小必要欄位
- [x] 對齊 recipe 與 taxonomy 的關聯方式

## Phase 2

- [x] 建立 `src/data/ingredients.json`
- [x] 建立 `src/data/scenarios.json`
- [x] 建立 `src/lib/taxonomy.ts`
- [x] 改寫 `/ingredients`
- [x] 建立 `/ingredients/[slug]`
- [x] 改寫 `/scenarios`
- [x] 建立 `/scenarios/[slug]`
- [x] 將 `/recipes/[slug]` 相關食材與情境連到真實 slug
- [x] 擴充 `scripts/verify-site.mjs` 的 spec-003 檢查

## Phase 3

- [x] `npm test`
- [x] `npx astro check`
- [x] `npm run build`

## Phase 4

- [x] 檢查 ingredient list/detail 已由 JSON 驅動
- [x] 檢查 scenario list/detail 已由 JSON 驅動
- [x] 檢查 recipe detail 已能反向導流到 taxonomy 頁
- [x] 確認 review 結果為 `APPROVED`

## Decisions Made

- ingredient 資料以 `name + aliases` 和 recipe ingredient name 做靜態對應。
- scenario 資料以 scenario `name` 和 recipe scenario name 做靜態對應。
- taxonomy detail 頁優先建立 SEO 導流與資訊架構，不預先加入動態互動。
- 先用 seed taxonomy 驗證 routes 與關聯，正式大批內容仍留給 `spec-007`。
- `Phase 5` 保留給 `/vif-close`。
