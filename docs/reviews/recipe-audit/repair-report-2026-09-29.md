# 餐廳風格食譜搜尋品質修復紀錄（2026-09-29）

## 範圍與結果

依 2026-08-27 的餐廳風格食譜審查，完成全部 128 個 slug、zh-TW／en／ja／ko 四語共 512 個食譜檔案的文字與結構修復。原審查分為 Critical 25 篇、Warning 103 篇；每個 slug 均有一份位於 [`reports/`](./reports/) 的逐篇 JSON 紀錄。所有報告日期為 2026-09-29、狀態為 `Warning`，因為內容尚未經實際下廚驗證。

Critical 頁的暫停索引規則保持原狀，未移除 `noindex`；Warning 頁的索引政策也未變更。這次只修內容與四語一致性，不代表 Google 已重新收錄或保證未來會收錄。

## 修復內容

- 逐篇對照食材、調味、份量、步驟、器具與烹調時間，修正漏列食材、步驟未使用清單食材、份量及時間矛盾、熟度判斷不清等問題。
- 對齊 zh-TW、英文、日文、韓文的數字份量、步驟結構、場景標籤與必要 metadata；清除空場景、錯誤 FAQ 陣列、語言混漏及重複配料。
- 移除沒有來源佐證的餐廳來源／仿店文案與未驗證的營養數字，避免把家用改寫包裝成經餐廳認證或營養分析過的內容。
- 更新 About 頁面，說明食譜與翻譯可能使用 AI 輔助、內容不代表全部經過廚房試作，並交代插圖與營養估算的限制。
- 25 篇原 Critical 食譜仍保留 noindex；需先完成逐篇烹調驗證與人工複查，再另行評估是否解除。

食安用語參考 [USDA FSIS 安全熟度表](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart)、[USDA 填餡食物指引](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/stuffing-and-food-safety) 與 [FoodSafety.gov 安全熟度表](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)。食譜以食品溫度計描述相應的禽肉、絞肉、蛋料理、魚與剩食熟度；此來源校對不等同實際試作。

## 驗證

- `npm run build`：通過。
- `npm run typecheck`：通過，200 個檔案、0 errors、0 warnings、42 hints。
- `npm test`：通過，含 SEO index policy、四語配對、場景標籤、404 與 canonical/sitemap 驗證。
- `node scripts/verify-recipe-scenarios.mjs`：通過。
- 512 個四語食譜檔的 YAML、FAQ 物件、非空場景、必要欄位、份量／時間與數字用量一致性檢查：通過。
- 全部修改檔案的 `git diff --check`：通過。

Astro build 仍會輸出跨語系同 slug 的既有 duplicate `recipeId` 警告，但 build 成功。沒有進行 Search Console URL inspection／索引提交，也沒有宣稱 Google 已完成重新收錄。

## 尚待完成

尚未進行 128 篇食譜的廚房試作或成品圖片核對，因此實際時間、產量、口感與保存表現仍待驗證。逐篇報告保留這項 Warning；特別是原 Critical 頁，應完成試作與人工複核後，再依 Search Console 資料逐頁評估索引狀態。文字修復、build 與本機測試都不能保證 Google 會收錄。
