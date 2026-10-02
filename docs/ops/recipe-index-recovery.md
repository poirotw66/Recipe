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
- 2026-08-27 已人工逐篇審查 128 篇餐廳還原食譜；其中 25 篇 Critical（19.5%）於 2026-10-02 依站主決定解除四語 `noindex`。這不代表真人試作完成，內容 Warning 仍有效。

### 2026-10-02 站主索引決定

- `RESTAURANT_AUDIT_REVIEWED_SLUGS` 中的 25 篇食譜，zh-TW、en、ja、ko 四語頁均恢復 `indexable`；noindex 已不再作為真人試作前的阻擋條件。
- zh-TW 與 en 頁依一般 `other` sitemap 分組提交；ja／ko 頁除原 15 篇 spec-018 pilot 外仍不主動列入 sitemap，沿用既有多語過渡政策。它們沒有 noindex，仍可經由內部連結與 hreflang 被發現。
- 食譜尚未真人試作的事實、未驗證份量／時間／口感及相關 Warning 必須保留；解除索引限制不等於 Google 會收錄。
- 2026-10-02 已部署 Cloudflare Worker version `43616767-e197-4358-addc-f67b5c0f5451`；正式站 100 個語系 URL 均回 200、無 robots `noindex`、canonical 指向自身；繁中與英文 sitemap 均包含 25 個 slug。
- Search Console 已對繁中 BBQ 半雞執行即時測試並要求建立索引，頁面可索引且已進入優先檢索佇列。其餘網址的舊索引資料仍待 Google 更新；不要把單頁即時測試當成全批已索引。

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
