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

- 靜態頁（首頁、列表、工具、政策頁、主題 Hub）
- 100 篇食譜
- 20 個食材頁
- 8 個情境頁

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
