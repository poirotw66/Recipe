# Google Search Console 設定指南

適用網域：`https://recipe.bloss0m.com`

## 1. 新增資源

1. 前往 [Google Search Console](https://search.google.com/search-console)
2. 新增資源 → 選擇 **網域** 或 **網址前置字元**
   - 網址前置字元：`https://recipe.bloss0m.com/`
3. 完成擁有權驗證（擇一）：
   - **HTML 標記**：在 Cloudflare Pages 設定環境變數 `PUBLIC_GSC_VERIFICATION`（僅填 `content` 值，不含 `meta` 標籤）
   - **DNS TXT**：在 Cloudflare DNS 新增 Google 提供的 TXT 紀錄（不需改程式碼）

## 2. 提交 Sitemap

驗證完成後，於 Search Console → Sitemap 提交：

```text
https://recipe.bloss0m.com/sitemap-index.xml
```

子 sitemap 會自動涵蓋：

- 靜態頁（首頁、列表、工具、政策頁、主題 Hub；**不含 404**）
- 食譜（含 zh / en / ja / ko，並帶 hreflang）
- 食材頁（含已翻譯語系）
- 情境頁（含已翻譯語系）

## 2.1 索引下滑時怎麼修

Search Console「未建立索引」常見原因與對應處理：

| 原因 | 代表什麼 | 站內修復 |
|------|----------|----------|
| 找不到網頁 (404) | Google 還記著已下架或錯誤 URL | 確認 sitemap 不含 `/404/`；舊網址若有改名再補 301 |
| 頁面會重新導向 | `/recipes` 與 `/recipes/` 互相轉址 | 全站統一尾斜線（`trailingSlash: always`） |
| 轉址式 404 | 缺頁被 302 到 `/404` 而非 HTTP 404 | 未知 slug 直接回 HTTP 404；`/404/` 本身也是 404 + noindex |
| 已檢索 - 尚未建立索引 | 已抓但未選進索引（品質／重複／預算） | 拿掉錯誤頁、補 hreflang、避免重複 URL |
| 替代頁面（標準標記） | 語系頁正確指向 canonical | 正常，不必強制索引每一語 |
| 已找到 - 尚未建立索引 | 發現了但還沒抓 | 重新提交 sitemap-index，等排程 |

修復部署後（約 1 小時內新 sitemap 可讀）：

1. Search Console → Sitemap → 重新提交 `https://recipe.bloss0m.com/sitemap-index.xml`
2. URL 檢查對首頁與 3～5 篇精選食譜「要求建立索引」
3. 「網頁索引編制」→ 對 404／轉址原因按「驗證修正」
4. 不要一次大量要求索引；給 Google 1～2 個抓取週期觀察「已建立索引」是否回升

## 3. 上線後首週檢查

- [ ] 首頁已索引
- [ ] `/recipes/` 列表已索引
- [ ] 至少 5 篇精選食譜已索引
- [ ] `robots.txt` 可讀且指向 sitemap-index
- [ ] 無大量「已發現 - 尚未索引」且原因為重複或軟 404

## 4. 與 GA4 搭配

Search Console 看**搜尋曝光與點擊**；GA4 看**站內行為**（含冰箱工具使用率）。兩者互補，建議同時設定。

GA4 環境變數：

```text
PUBLIC_GA_MEASUREMENT_ID=G-TWXMDN1TJD
```

## 5. 手動要求索引（可選）

新上線或重大改版後，可對以下 URL 使用「要求建立索引」：

- `https://recipe.bloss0m.com/`
- `https://recipe.bloss0m.com/recipes/`
- `https://recipe.bloss0m.com/tools/fridge-recipe/`
- 本週新發布的食譜詳情頁（≤10 篇）
