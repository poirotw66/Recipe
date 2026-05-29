# Specs Overview

本文件是全專案 spec 清單的 single source of truth。PRD Section 6 只保留 spec pointer 與拆解理由；狀態、領域、依賴、PRD 追溯與備註在此維護。

## 狀態說明

| 符號 | 狀態 |
| --- | --- |
| — | not-started |
| 📋 | draft |
| ✅ | approved |
| 🚧 | in-progress |
| ✔️ | done |

## Spec 清單

| # | 名稱 | 領域 | 狀態 | PRD | 依賴 | 備註 |
| --- | --- | --- | --- | --- | --- | --- |
| 001 | 專案骨架與部署 | site/platform | ✅ | prd-001 | - | 建立 Astro 專案、Cloudflare Pages 部署、自訂網域、基礎 layout、Header/Footer 與 SEO head。 |
| 002 | 內容模型與食譜頁 | content/recipes | ✅ | prd-001 | 001 | 建立 Markdown 食譜 content collection、食譜列表、食譜詳細頁與食譜資料欄位。 |
| 003 | 食材與情境頁 | content/taxonomy | ✅ | prd-001 | 001, 002 | 建立食材 JSON、情境 JSON、列表頁、詳細頁與關聯食譜導流。 |
| 004 | SEO 與 structured data | seo | — | prd-001 | 002, 003 | 建立 canonical、Open Graph、Twitter Card、sitemap、robots、Recipe JSON-LD、FAQ JSON-LD、Breadcrumb JSON-LD。 |
| 005 | AdSense 與政策頁 | monetization/ads | — | prd-001 | 001, 002 | 建立 about、contact、privacy policy、terms、ads.txt 與 AdSlot 元件。 |
| 006 | 冰箱剩料工具 | tools/fridge-recipe | — | prd-001 | 002, 003 | 建立純前端食材輸入、本地 JSON 比對、推薦排序與缺少食材提示。 |
| 007 | 第一批內容資料 | content/production | — | prd-001 | 002, 003 | 建立 MVP 所需的食譜、食材、情境內容批次與命名/SEO 規則。 |

## 依賴圖

```text
spec-001
├── spec-002
│   ├── spec-003
│   │   ├── spec-004
│   │   ├── spec-006
│   │   └── spec-007
│   ├── spec-004
│   ├── spec-005
│   ├── spec-006
│   └── spec-007
└── spec-005
```
