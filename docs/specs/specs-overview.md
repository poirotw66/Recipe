# Specs Overview

此文件是專案 spec 狀態的 single source of truth。

## Status Legend

| Symbol | Status |
| --- | --- |
| ⏳ | not-started |
| 📝 | draft |
| ✅ | approved / implemented (in progress) |
| ✔️ | done (closed) |
| ⏸️ | paused（暫時中止，規格保留） |

## Spec List

| # | Name | Area | Status | PRD | Dependencies | Summary |
| --- | --- | --- | --- | --- | --- | --- |
| 001 | 專案骨架與部署 | site/platform | ✔️ | prd-001 | - | 建立 Astro 專案、基礎 layout、Header/Footer、SEO head 與部署指令。 |
| 002 | 內容模型與食譜頁 | content/recipes | ✔️ | prd-001 | 001 | 建立 Markdown recipe content collection、食譜列表、食譜詳情與基礎示範資料。 |
| 003 | 食材與情境頁 | content/taxonomy | ✔️ | prd-001 | 001, 002 | 建立食材 JSON、情境 JSON、列表頁與詳情頁。 |
| 004 | SEO 與 structured data | seo | ✔️ | prd-001 | 002, 003 | 補 canonical、Open Graph、Twitter Card、sitemap、robots、Recipe/FAQ/Breadcrumb JSON-LD。 |
| 005 | AdSense 與政策頁 | monetization/ads | ✔️ | prd-001 | 001, 002 | 建立 about、contact、privacy policy、terms、ads.txt 與 AdSlot。 |
| 006 | 冰箱剩料工具 | tools/fridge-recipe | ✔️ | prd-001 | 002, 003 | 建立本地食材比對、偏好排序、結果顯示與工具測試。 |
| 007 | 第一批內容資料 | content/production | ✔️ | prd-001 | 002, 003 | 補齊 MVP 食譜、食材、情境資料，並更新首頁與驗證門檻。 |
| 008 | 內容擴充批次（新增食譜至 50+） | content/production | ✔️ | prd-002 | 002, 003, 007 | 擴充食譜數量至 50+，並加入 coverImage 存在性驗證。 |
| 009 | 網頁 SEO 強化（集合與 taxonomy structured data） | seo | ✔️ | prd-002 | 002, 003, 008 | 為清單/索引頁補上 ItemList/集合型 structured data，強化索引與內鏈訊號。 |
| 010 | Bloom Kitchen 品牌識別與站內文案 | site/brand | ✔️ | prd-003 | 001 | Bloom Kitchen 品牌、Header/Footer、SEO title、about/legal、Bloss0m 生態連結；URL 維持 recipe.bloss0m.com。 |
| 011 | 導覽與行動版 UX | site/navigation | ✔️ | prd-003 | 010 | 收合主選單、導覽分層、麵包屑一致性；改善窄螢幕導覽體驗。 |
| 012 | 首頁與冰箱工具動線 | ux/home-tools | ✔️ | prd-003 | 006, 010 | 首頁區塊重排、首頁搜尋至冰箱工具動線、空結果引導。 |
| 013 | 食譜瀏覽體驗強化 | ux/recipes | ✔️ | prd-003 | 002, 010 | 列表篩選 URL state、RecipeCard 資訊層級、食譜詳情可掃讀性。 |
| 014 | 內容擴充第四批（100 篇、早午餐、WEBP） | content/production | ✔️ | prd-004 | 002, 008, 011 | 100 篇食譜、早午餐專區、20 篇新菜單、全站 WEBP 封面。 |
| 015 | 視覺系統與共用元件收斂 | ui/design-system | ✔️ | prd-005 | 010, 013 | global.css token、字型、按鈕／chip／卡片、guideline v1.2。 |
| 016 | 首頁與主題專區視覺升級 | ui/pages | ✔️ | prd-005 | 012, 014, 015 | 首頁 hero／專區三卡；brunch／beef／pasta 專區頁視覺。 |
| 017 | 多語系平台（路由、UI、taxonomy、SEO） | site/i18n | ✔️ | prd-006 | 001, 003, 004, 010, 011 | Astro i18n、UI 字典、語言切換、hreflang、sitemap、政策頁四語。 |
| 018 | 多語食譜內容與試點批次 | content/i18n | ✔️ | prd-006 | 002, 008, 014, 017 | 試點 15×3 結案；**Batch 02（20）進行中**。 |
| 019 | 冰箱剩料工具多語 | tools/i18n | ✔️ | prd-006 | 006, 017 | slug 比對、他語工具頁與結果卡。 |

## Suggested Order

1. `spec-001` 專案骨架與部署
2. `spec-002` 內容模型與食譜頁
3. `spec-003` 食材與情境頁
4. `spec-004` SEO 與 structured data
5. `spec-005` AdSense 與政策頁
6. `spec-006` 冰箱剩料工具
7. `spec-007` 第一批內容資料
8. `spec-008` 內容擴充批次（新增食譜至 50+）
9. `spec-009` 網頁 SEO 強化（集合與 taxonomy structured data）
10. `spec-010` Bloom Kitchen 品牌識別與站內文案
11. `spec-011` 導覽與行動版 UX
12. `spec-012` 首頁與冰箱工具動線
13. `spec-013` 食譜瀏覽體驗強化
14. `spec-014` 內容擴充第四批（100 篇、早午餐、WEBP）
15. `spec-015` 視覺系統與共用元件收斂（PRD-005）
16. `spec-016` 首頁與主題專區視覺升級（PRD-005，依賴 015）
17. `spec-017` 多語系平台 — **✔️ done**
18. `spec-018` 試點結案；**Batch 02 多語內容進行中**
19. `spec-019` 冰箱工具多語 — **✔️ done**

## PRD-006 Resume Note

PRD-006 於 **2026-06-05 恢復**。前置：食譜內容人工校正完成、`npm test` 通過。實作順序不變：**017 → 018（15 篇試點）→ 019 → 018 後續批次**。翻譯產線見 `docs/specs/018-i18n-content-batch/gemini-translation.md`。

## PRD-005 Close Note

PRD-005（spec-015～016）已於 2026-06-03 完成 Verify / Review / Close。視覺方向：溫馨 · 精緻 · 高級；原型 `docs/prototypes/prd-005-*.html`。

## PRD-003 Close Note

PRD-003（spec-010～013）已於 2026-06-03 完成 God Mode Verify / Review / Close。

## PRD-004 Import Note

PRD-004（spec-014）於 2026-06-03 **回溯登錄**：100 篇食譜、早午餐專區、WEBP 封面已先合併至 `master`。詳見 `docs/prds/prd-004-import-note.md`。
