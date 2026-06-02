# Specs Overview

此文件是專案 spec 狀態的 single source of truth。

## Status Legend

| Symbol | Status |
| --- | --- |
| ⏳ | not-started |
| 📝 | draft |
| ✅ | done |

## Spec List

| # | Name | Area | Status | PRD | Dependencies | Summary |
| --- | --- | --- | --- | --- | --- | --- |
| 001 | 專案骨架與部署 | site/platform | ✅ | prd-001 | - | 建立 Astro 專案、基礎 layout、Header/Footer、SEO head 與部署指令。 |
| 002 | 內容模型與食譜頁 | content/recipes | ✅ | prd-001 | 001 | 建立 Markdown recipe content collection、食譜列表、食譜詳情與基礎示範資料。 |
| 003 | 食材與情境頁 | content/taxonomy | ✅ | prd-001 | 001, 002 | 建立食材 JSON、情境 JSON、列表頁與詳情頁。 |
| 004 | SEO 與 structured data | seo | ✅ | prd-001 | 002, 003 | 補 canonical、Open Graph、Twitter Card、sitemap、robots、Recipe/FAQ/Breadcrumb JSON-LD。 |
| 005 | AdSense 與政策頁 | monetization/ads | ✅ | prd-001 | 001, 002 | 建立 about、contact、privacy policy、terms、ads.txt 與 AdSlot。 |
| 006 | 冰箱剩料工具 | tools/fridge-recipe | ✅ | prd-001 | 002, 003 | 建立本地食材比對、偏好排序、結果顯示與工具測試。 |
| 007 | 第一批內容資料 | content/production | ✅ | prd-001 | 002, 003 | 補齊 MVP 食譜、食材、情境資料，並更新首頁與驗證門檻。 |
| 008 | 內容擴充批次（新增食譜至 50+） | content/production | ⏳ | prd-002 | 002, 003, 007 | 擴充食譜數量至 50+，並加入 coverImage 存在性驗證。 |
| 009 | 網頁 SEO 強化（集合與 taxonomy structured data） | seo | ⏳ | prd-002 | 002, 003, 008 | 為清單/索引頁補上 ItemList/集合型 structured data，強化索引與內鏈訊號。 |

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
