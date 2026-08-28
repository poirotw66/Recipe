# GSC 查詢優先級與內容修復清單（2026-08-25）

## 資料範圍

- 來源：Search Console 搜尋成效畫面，區間 2026-06-01～2026-08-25。
- 本批只使用使用者提供的前十名查詢；不是完整的頁面或查詢匯出。
- 流量樣本很小，適合用來決定「先修哪些 URL」，不適合推論整站已恢復或已受人工處分。
- 品牌詞 `bloom kitchen` 對應首頁；其餘查詢依名稱映射到現有食譜 slug。

## 查詢與 URL 決策

| 查詢 | 點擊 | 曝光 | 對應 slug | 目前決策 |
| --- | ---: | ---: | --- | --- |
| 月見苦瓜奶油飯 | 3 | 7 | `sf-moon-view-bitter-melon-cream-rice` | 有需求但內容有食安與比例問題；保留 URL、維持 noindex，重寫並實作校正後才恢復中文索引。 |
| bloom kitchen | 2 | 2 | 首頁 | 保留首頁索引；持續統一品牌、Organization 與內部連結。 |
| 貳樓 巴西莓果優格碗 | 1 | 9 | `sf-acai-berry-yogurt-bowl` | 有需求但現稿與品名不符；保留 URL、維持 noindex，重寫並實作校正後才恢復中文索引。 |
| 台式熱炒鹹蛋苦瓜麵 | 1 | 6 | `sf-salted-egg-bitter-melon-pasta` | 保留 URL；列入餐廳頁第二批重寫，不因低曝光 410。 |
| 曙光汁鮮蝦雞肉麵 | 1 | 6 | `sf-dawn-shrimp-chicken-linguine` | 保留 URL；先定義醬汁與份量，再決定是否恢復／維持索引。 |
| 蕃茄豆腐炒蛋 | 1 | 4 | `garlic-tomato-tofu-eggs` | 非餐廳核心候選；先修正份量、油量、時間與模板殘留，維持索引。 |
| 炒蛋白料理 | 1 | 4 | `high-protein-egg-white-stirfry` | 非餐廳核心候選；先修正蛋白質宣稱與用量，維持索引；現有圖片食材與新稿不一致，升級 core 前須換真實成品照。 |
| 貳樓 月見苦瓜奶油飯 | 1 | 3 | `sf-moon-view-bitter-melon-cream-rice` | 與泛用詞合併評估，同一 URL 累計至少 4 點擊／10 曝光。 |
| 橙香法式丹麥蕈菇水波洋芋 | 1 | 2 | `sf-orange-danish-mushroom-poached-potato` | 保留 URL；需改成使用者可從原料完成的食譜。 |
| 貳樓 鹽水雞沙拉 | 1 | 1 | `sf-second-floor-saltwater-chicken-salad` | 保留 URL；需補齊雞肉與醬汁配方後再評估索引。 |

## 執行順序

1. 先修 `garlic-tomato-tofu-eggs` 與 `high-protein-egg-white-stirfry` 四語內容；兩頁已有查詢訊號且沒有餐廳還原頁的來源與食安風險。
2. `sf-moon-view-bitter-melon-cream-rice` 與 `sf-acai-berry-yogurt-bowl` 雖有最高的非品牌需求，仍維持四語 `noindex, follow`，直到中文稿完成實際試作、校正者／日期與真實成品照。
3. 其他四篇餐廳頁進入下一個小批次重寫；不把不同菜色 301 到餐廳 Hub，也不因目前曝光低直接 410。
4. 核心候選不立刻升級到 `sitemap-core-recipes.xml`。目前兩張圖都是插畫而非實作證據，且蛋白料理圖片含新稿未列出的青豆與蔥；至少完成試作、換上內容一致的真實成品照後，再只把中文 URL 設為 `core`，翻譯頁另做語言 QA。

## 上線後觀察

- 提交 sitemap index；只對本批完成校正且可索引的中文頁要求重新建立索引。
- 以 7 天記錄抓取狀態，以 28 天比較點擊、曝光及查詢變化；期間不再整站重生或批次刪除。
- 下一次決策需匯出 Search Console「搜尋成效 → 網頁」完整 CSV，避免只用前十名查詢判斷其餘 289 個 slug。
