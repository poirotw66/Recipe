# Spec-010: Bloom Kitchen 品牌識別與站內文案

## Meta

- 類型：Site / Brand / Content
- 狀態：done
- PRD：`docs/prds/prd-003.md`
- 依賴：`spec-001`
- 建立：2026-06-03

## 1. 背景與目的

PRD-003 方案 A（URL 不變）：將食譜站對外品牌統一為 **Bloom Kitchen**，中文副標 **今天煮什麼**，並在 Footer 串接 Bloss0m 生態（bloss0m、Bloom Picker、Bloom Render）。正式網址維持 `https://recipe.bloss0m.com/`。

## 2. Goals

- 集中定義品牌常數（`brandName`、`brandTagline`、生態 URL）。
- Header：`Bloom Kitchen` 大標 + `今天煮什麼` 小字副標。
- SeoHead title 格式：`{頁面}｜Bloom Kitchen · 今天煮什麼`。
- Footer 生態連結 + 政策連結。
- about / contact / legal 文案對齊 Bloom Kitchen 定位。
- JSON-LD author 使用 Bloom Kitchen。
- 驗證腳本加入品牌 markers。

## 3. Non-goals

- 網域或託管變更
- 行動版收合選單（spec-011）
- 首頁 / 列表 UX（spec-012、013）

## 4. Scope

| Path | Purpose |
| --- | --- |
| `src/lib/site.ts` | 品牌與 Bloss0m 生態 URL 常數 |
| `src/components/Header.astro` | 品牌 lockup |
| `src/components/Footer.astro` | 生態連結 |
| `src/components/SeoHead.astro` | title 格式 |
| `src/lib/seo.ts` | Recipe JSON-LD author |
| `src/pages/about.astro` 等 legal | 文案 |
| `src/styles/global.css` | `.brand__title` / `.brand__tagline` |
| `scripts/verify-site.mjs` | 品牌驗證 |
| `guideline/ui/ui-guideline.md` | 品牌章節 |

## 5. 任務清單

1. [x] 擴充 `site.ts` 品牌與生態 URL
2. [x] 更新 Header / Footer / SeoHead
3. [x] 更新 about、contact、privacy、terms 文案
4. [x] 更新 seo.ts author、index 首頁 title
5. [x] 擴充 verify-site 品牌 markers
6. [x] 更新 ui-guideline 品牌段落

## 6. 驗收條件

- [x] Header 顯示 Bloom Kitchen 大標與今天煮什麼小字
- [x] 內頁 title 含 `Bloom Kitchen · 今天煮什麼`
- [x] Footer 含 bloss0m、bloom-picker、bloom-render 連結
- [x] about 說明 Bloom Kitchen 與 recipe.bloss0m.com 關係
- [x] `npm test` 與 `npm run build` 通過
