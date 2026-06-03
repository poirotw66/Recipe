# Spec-011: 導覽與行動版 UX

## Meta

- 類型：Site / Navigation / UX
- 狀態：done
- PRD：`docs/prds/prd-003.md`
- 依賴：`spec-010`
- 建立：2026-06-03

## 1. Goals

- 窄螢幕使用收合選單（drawer），避免 6 連結垂直堆疊佔滿首屏。
- 導覽分層：瀏覽（食譜/食材/情境）vs 主題專區（義大利麵/牛肉）vs 冰箱剩料 CTA。
- 列表頁、工具頁、政策頁補上麵包屑。

## 2. Scope

| Path | Purpose |
| --- | --- |
| `src/lib/navigation.ts` | 導覽連結定義 |
| `src/components/Header.astro` | 收合選單 + 分層 nav |
| `public/scripts/site-nav.js` | 開關、Esc 關閉、連結點擊關閉 |
| `src/components/Breadcrumb.astro` | 共用麵包屑 |
| `src/styles/global.css` | 行動 drawer / 桌面 inline nav |

## 3. 驗收條件

- [x] ≤720px：Header 只顯示品牌 + 選單按鈕；nav 在 drawer 內分組
- [x] ≥721px：inline 水平導覽，無選單按鈕
- [x] recipes/ingredients/scenarios 列表、冰箱工具、政策頁有麵包屑
- [x] `npm test` / `npm run build` 通過
