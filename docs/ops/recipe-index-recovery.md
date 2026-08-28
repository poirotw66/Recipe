# 食譜索引修復操作規則

本輪修復採分段提交，不在缺少 Search Console 資料時猜測核心頁或一次 `noindex` 大量頁面。

2026-08-21 的「已檢索－目前尚未建立索引」匯出分析與後續資料需求，見
[`gsc-crawled-not-indexed-2026-08-21.md`](./gsc-crawled-not-indexed-2026-08-21.md)。

## 單一 eligibility 來源

所有食譜的索引資格由 `src/lib/recipe-index-eligibility.ts` 決定，欄位為：

- `indexable`：是否允許索引。
- `tier`：`core`、`other` 或 `pilot`。
- `reason`：決策證據或暫行狀態。

目前基準：

- zh-TW、en：預設 `indexable + other`。
- ja、ko 的既有 spec-018 15 篇：`indexable + pilot`。
- 其他 ja、ko：暫時仍 `indexable + other`、維持 self-canonical 與 hreflang，但不主動放入新 sitemap。這是過渡狀態，不等於 `noindex`。
- ja、ko 的食材與情境 taxonomy 頁同樣維持 indexable、self-canonical 與 hreflang，但在 GSC 顯示大量已檢索未索引後，暫不主動放入 sitemap；zh-TW、en taxonomy 繼續提交。
- `core` 暫時為空；不得依主觀印象挑選。
- 2026-08-27 已人工逐篇審查 128 篇餐廳還原食譜；其中 25 篇 Critical（19.5%）的四語頁暫時 `noindex, follow`，直到配方、時間或食安問題完成校正。

## 變更門檻

新增 `core` 或新的 ja/ko `pilot` 前，必須在 PR／營運紀錄附上 GSC URL 或查詢匯出資料。將頁面改成 `noindex` 時，也必須有 GSC 或逐篇內容稽核證據，並在 override 的 `reason` 寫明來源。

每批變更控制在候選問題頁的 20～30%，部署後至少觀察 2～4 週。不要同批混入內容重寫、合併、刪除與大規模索引切換。

逐頁決策集中在 `RECIPE_INDEX_OVERRIDES` 與具名的稽核 cohort。頁面 robots meta、hreflang 與 sitemap 都會讀取同一規則：一旦某 locale 設為 `indexable: false`，該頁輸出 `noindex, follow`，其他語系不再指向它，且所有食譜 sitemap 都會排除它。

## Sitemap 分組

- `sitemap-core-recipes.xml`：有證據升級為 core 的食譜；目前為空 URL set。
- `sitemap-other-zh-recipes.xml`：一般繁中食譜。
- `sitemap-en-recipes.xml`：一般英文食譜。
- `sitemap-ja-ko-pilot.xml`：明確核准的日／韓 pilot。
- `sitemap-recipes.xml`：舊提交網址相容用 URL set，內容為上述四組聯集；不放進 sitemap index，也不是巢狀 sitemap index。

冰箱工具帶 `ingredients` 或 `preferences` query 時，由頁面規則與 Cloudflare Worker 回傳 `noindex, follow`；canonical 固定指向相同語系的乾淨工具 URL。robots.txt 不阻擋這些 query，讓 crawler 能讀到 noindex。

驗證：

```powershell
npm run build
npm test
```
