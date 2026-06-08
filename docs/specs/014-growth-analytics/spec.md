# Spec-014: 流量觀測與 SEO 衛生基礎

## Meta

- 類型：Growth / Analytics / SEO
- 狀態：done
- PRD：`docs/prds/prd-004.md`
- 依賴：`spec-001`、`spec-004`
- 建立：2026-06-03

## 1. 背景與目的

PRD-004 核准後，第四階段第一步是建立可量測基礎：Search Console 流程、GA4、預設 OG 圖、404 頁與月度複盤模板。

## 2. Goals

- GA4 透過 `PUBLIC_GA_MEASUREMENT_ID` 條件載入
- 可選 `PUBLIC_GSC_VERIFICATION` 輸出 Search Console meta
- 預設 OG 圖 `public/images/og-default.svg`
- `src/pages/404.astro` 供無效 slug 導向
- 營運文件：`docs/ops/search-console-setup.md`、`docs/ops/monthly-traffic-review.md`
- privacy policy 揭露 GA4
- `scripts/verify-site.mjs` 驗證 spec-014 markers

## 3. Non-goals

- 內容批次擴充（spec-017）
- AdSense 真實上線（spec-019）
- 站內事件追蹤（冰箱工具 CTR）— 可於後續 spec 加強

## 4. Scope

| Path | Purpose |
| --- | --- |
| `src/lib/site.ts` | `gaMeasurementId`、`gaReady`、`gscVerification` |
| `src/layouts/BaseLayout.astro` | GA4 gtag 條件載入 |
| `src/components/SeoHead.astro` | GSC meta、og-default 路徑 |
| `src/pages/404.astro` | 404 頁 |
| `src/pages/privacy-policy.astro` | GA4 揭露 |
| `public/images/og-default.svg` | 預設分享圖 |
| `scripts/create-og-default.mjs` | 再生 og-default |
| `docs/ops/*` | GSC 設定與月度複盤模板 |
| `scripts/verify-site.mjs` | 驗證 |

## 5. 任務清單

1. [x] GA4 環境變數與 BaseLayout 載入
2. [x] Search Console 可選驗證 meta
3. [x] og-default.svg 與產生腳本
4. [x] 404 頁
5. [x] 營運文件
6. [x] privacy policy 更新
7. [x] verify-site 驗證

## 6. 部署後手動步驟

- [ ] Cloudflare Pages 設定 `PUBLIC_GA_MEASUREMENT_ID`
- [ ] Search Console 驗證（DNS 或 `PUBLIC_GSC_VERIFICATION`）
- [ ] 提交 `sitemap-index.xml`
- [ ] 首週依 `docs/ops/search-console-setup.md` 檢查索引
