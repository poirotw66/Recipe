# 流量分析驗證清單

正式站：`https://recipe.bloss0m.com`

## GA4

正式站透過 `PUBLIC_GA_MEASUREMENT_ID` 載入 Google tag。部署後：

1. 開啟 GA4 的「報表 → 即時」。
2. 使用關閉廣告阻擋器的無痕視窗瀏覽正式站。
3. 依序測試首頁、食譜列表、食譜詳情與冰箱工具。
4. 確認 `page_view`，以及下列自訂事件：

| 事件 | 觸發時機 | 主要參數 |
| --- | --- | --- |
| `recipe_card_click` | 點擊任一食譜卡 | `recipe_slug`, `link_url` |
| `fridge_search` | 主動送出冰箱食材 | 食材、命中、偏好與結果數量 |
| `language_change` | 切換網站語言 | `target_locale`, `target_path` |
| `outbound_link_click` | 點擊站外連結 | `link_domain`, `link_url` |

冰箱工具只記錄數量，不把使用者輸入的食材文字送進 GA4，以避免高基數維度與不必要的原始輸入收集。

## Cloudflare Web Analytics

此站以 Worker + Static Assets 部署，`recipe.bloss0m.com` 已由 Cloudflare 邊緣自動注入 Web Analytics beacon。專案原始碼不應再放手動 JS Snippet，否則同一個頁面會送出兩份 RUM 資料。

1. 在 Cloudflare 的 `Analytics & Logs → Web Analytics` 管理 `recipe.bloss0m.com`。
2. 建置產物的原始 HTML 不應包含 `static.cloudflareinsights.com` 或 `data-cf-beacon`。
3. 部署後，正式站 HTML 應只出現一個由 Cloudflare 自動注入、帶有 `integrity` 屬性的 beacon。
4. 在瀏覽器 Network 面板確認只有一組 `/cdn-cgi/rum` POST 請求成功。

Cloudflare Web Analytics 用於核對訪客、熱門頁面與實際效能；GA4 用於分析來源、內容路徑與站內互動。兩者應並行，不以 Worker observability 取代。

## Search Console

1. 確認已有 `https://recipe.bloss0m.com/` URL-prefix property 或 `bloss0m.com` Domain property。
2. 提交 `https://recipe.bloss0m.com/sitemap-index.xml`。
3. 每月記錄曝光、點擊、CTR、索引頁數與 Core Web Vitals。
