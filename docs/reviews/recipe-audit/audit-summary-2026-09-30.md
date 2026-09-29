# 未索引候選食譜深度修正 — 2026-09-30

## 範圍與依據

本批以目前可取得的 Search Console 匯出挑選 2 個食譜 slug，更新繁中、英文、日文、韓文共 8 個頁面。網址級的「已檢索－目前尚未建立索引」樣本匯出於 2026-08-28，僅有 1,000 筆列項且不是目前索引狀態；其中包含：

| 食譜 | 匯出中的網址與上次檢索日 |
| --- | --- |
| `air-fryer-garlic-pork-chop` | `/ja/recipes/air-fryer-garlic-pork-chop/` — 2026-07-23 |
| `garlic-mushroom-tofu-rice-bowl` | `/recipes/garlic-mushroom-tofu-rice-bowl/` — 2026-08-02；`/en/recipes/garlic-mushroom-tofu-rice-bowl/` — 2026-07-30；`/ja/recipes/garlic-mushroom-tofu-rice-bowl/` — 2026-07-24 |

2026-09-21 的最新索引原因報表仍列 1,093 個「已檢索－目前尚未建立索引」網址；整體未索引卡片顯示 1,420，原因列合計 1,425。2026-09-29 已重新提交 sitemap，但 Search Console 當時尚未重新讀取，因此不能確認這批網址目前是否仍未索引，也不能推論本次內容修改會帶來收錄。

2026-06-27 至 2026-09-26 的成效匯出有 30 次曝光、0 次點擊；最近 28 天有 3 次曝光、0 次點擊。三個月網址列包含韓文氣炸蒜香豬排 7 次曝光及韓文蒜香菇豆腐飯碗 4 次曝光；查詢列另有韓文氣炸豬肉、菇類拌飯與豆腐拌飯等低量訊號。Search Console 的查詢與網址匯出是分開彙總，不能把特定查詢直接配對到特定頁面。這些資料只作需求與優先順序的弱佐證，不是頁面目前索引狀態。

## 修正結果

| slug | 狀態 | 修正與讀者收益 |
| --- | --- | --- |
| `air-fryer-garlic-pork-chop` | Pass | 四語頁改以食物溫度計確認最厚處中心達 63°C（145°F），並至少靜置 3 分鐘；移除以肉汁顏色判斷熟度的說法。補上 FoodSafety.gov 食安參考，並將時間標示調整為包含靜置的估算值。 |
| `garlic-mushroom-tofu-rice-bowl` | Pass | 四語頁統一使用適合煎炒的板豆腐／firm tofu／木綿豆腐／단단한 두부；補足原列 1.5 大匙橄欖油的使用方式（菇類 1 大匙、豆腐 1.5 小匙），寫清先炒菇、盛出煎豆腐、再回鍋拌醬的順序。韓文名稱改為「덮밥」，避免將這道蒜香醬油飯碗標成不相符的拌飯類型。 |

逐篇紀錄：

- [air-fryer-garlic-pork-chop 審查紀錄](./reports/air-fryer-garlic-pork-chop.json)
- [garlic-mushroom-tofu-rice-bowl 審查紀錄](./reports/garlic-mushroom-tofu-rice-bowl.json)

## 驗證與限制

- 繁中食譜機械 precheck：兩篇皆 Pass，0 Warning、0 Critical。
- 整合後 `npm run build`、`npm test` 與 `git diff --check` 通過；8 個語系路由另以 smoke check 確認 canonical、食安引用／溫度字串與豆腐飯用油步驟。
- Build 保留既有多語 recipe collection 重複 ID 警告；本批沒有更動 collection 架構，警告不阻止建置。
- 四語文字與結構已審查；沒有實際下廚試作，不能宣稱風味、質地、份量或實際氣炸時間已實測。豬排時間依厚度和機型而變，應以溫度計讀值為準。
- 本批保留 25 個 Critical 餐廳還原 slug 的 `noindex` 決策；本次技術稽核未發現全站 canonical、hreflang、robots 或 sitemap 設定錯誤。
