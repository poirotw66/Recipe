# 全站內容盤點與第一批修復

- 日期：2026-07-30
- 範圍：繁體中文 289 篇食譜及其英文、日文、韓文版本
- 模式：repair
- 路由：全部保留，未刪除、合併或重新導向

## 判讀限制

本輪沒有 Search Console 或 GA4 匯出資料，因此不推測搜尋需求、排名、流量或轉換。優先順序只依 repository 可證明的內容完整性、文字編碼、食材與步驟一致性、食安與多語同步狀態決定。

## 全站基線

| 指標 | 結果 | 判讀 |
| --- | ---: | --- |
| 繁中食譜 | 289 | 全數具有 en／ja／ko 對應頁 |
| 食譜規則審查 | 273 Pass／16 Warning／0 Critical | 修復前基線 |
| 正文少於 80 字 | 161 | 屬內容深度訊號，不代表頁面必須刪除 |
| 沒有 FAQ | 38 | 適合在有真實讀者問題時補強 |
| 少於 2 個 tips | 147 | 後續可補火候、失敗排除與備料提示 |
| 重複 description | 0 | 未發現完全相同的 meta description |
| 含 Unicode 亂碼的內容檔 | 6 | 全部位於英文食譜，列為最高優先修復 |

## 第一批 15 篇

| slug | 證據 | 已採取動作 | 預期讀者結果 | 驗證 |
| --- | --- | --- | --- | --- |
| `air-fryer-soy-chicken-wings` | 英文出現替代字元與錯誤時間範圍 | 修復 description、tip、FAQ、正文與相關食材 | 能讀懂雞肉替代方式與熟度要求 | 亂碼掃描、schema、i18n |
| `air-fryer-lemon-fish-fillet` | 英文多處亂碼，保存說明不完整 | 修復文字、相關食材、熟度與保存說明 | 更容易判斷魚排熟度並避免過熟 | 亂碼掃描、schema、i18n |
| `air-fryer-honey-sweet-potato` | 英文時間範圍及相關食材損壞 | 還原 6–8／2–3 分鐘範圍並修復 FAQ | 可依明確時間完成氣炸 | 亂碼掃描、schema、i18n |
| `airfryer-tofu-mushroom-main` | 英文 description、tip、正文與三個食材名稱損壞 | 全數修復並更新內容日期 | 能正常理解壓乾豆腐的關鍵 | 亂碼掃描、schema、i18n |
| `bento-black-pepper-beef` | 英文亂碼且「半熟後裝便當」說法不夠安全 | 改為快速炒熟、冷卻後裝盒，修復 FAQ 與食材名稱 | 降低便當食安疑慮 | 亂碼掃描、recipe review |
| `bento-braised-tofu-egg` | 英文 description 與相關食材損壞 | 修復文字與食材入口 | 恢復正常閱讀及食材導覽 | 亂碼掃描、schema |
| `sf-griddled-butter-ham-sandwich` | 食材列出吐司，步驟實際使用歐包 | 四語同步移除未使用的吐司 | 採買清單與步驟一致 | recipe review、i18n |
| `sf-chicken-quesadilla` | 平底鍋料理誤列 600 ml 炸油 | 改為 1 小匙食用油並同步四語步驟 | 避免不必要的大量用油 | recipe review、i18n |
| `sf-kids-cream-chicken-penne` | 列出黑胡椒但步驟未使用，且為兒童餐 | 四語同步移除該調味料 | 清單更符合實際做法 | recipe review、i18n |
| `sf-roasted-sesame-chicken-salad` | 步驟使用白芝麻但清單未列；炸油名稱未對齊 | 補列白芝麻並明確寫出炸油 | 採買與炸製步驟一致 | recipe review、i18n |
| `sf-dawn-shrimp-chicken-linguine` | 黑胡椒列在清單但步驟未使用 | 四語同步把黑胡椒加入雞肉調味 | 不再留下未使用材料 | recipe review、i18n |
| `sf-baked-thick-cut-pork-cream-rice` | 同一份鹽與胡椒在兩步被重複完整計量 | 改成各取一半、剩餘留給奶油飯 | 避免實際用量變成清單兩倍 | recipe review、i18n |
| `sf-black-pepper-hamburg-rice` | 同一份鹽與胡椒在漢堡排及炒飯重複計量 | 明確分配一半與剩餘份量 | 調味總量可照清單執行 | recipe review、i18n |
| `sf-south-sea-spiced-chicken-rice` | 醃雞與收尾調味重複使用完整份量 | 四語同步改成分半使用 | 避免過鹹並維持步驟一致 | recipe review、i18n |
| `sf-bloody-mary-spicy-rice` | 長串調味在備料及烹煮重複，收尾又使用未分配份量 | 備料改為量好分裝，預留少量胡椒與辣椒碎裝盤 | 調味順序清楚、減少批次產文感 | recipe review、i18n |

## 修復結果

- Unicode 亂碼內容檔：6 → 0
- 食譜規則審查：273 Pass／16 Warning／0 Critical → 282 Pass／7 Warning／0 Critical
- 第一批 15 個 slug 均保留原網址。
- 涉及料理步驟或材料清單的修改已同步 zh-TW／en／ja／ko。
- 驗證腳本新增 Unicode replacement character 防回歸檢查。

## 後續決策

剩餘 7 個 Warning 需分成真問題與啟發式誤報人工覆核；例如部分湯品已把水列在 `seasonings`，但舊規則只檢查 `ingredients`。下一批內容擴寫應等 Search Console 累積曝光與查詢資料後，再從「有曝光但點擊率低」、「排名 8–30」或「進站後缺少下一步」的頁面選擇，不以字數或發布日期單獨決定。
