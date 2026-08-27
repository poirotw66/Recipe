# 食譜內容審查摘要（全站 231 篇）

- **審查日期**：2026-06-10
- **範圍**：`src/content/recipes` 全數 231 篇
- **方法**：機械 precheck ＋ 內容規則（模板殘文、重複句、份量／食安啟發式）
- **觸發方式**：終端 `npm run recipe-review:full` 或 Cursor 輸入 `/recipe-review`（見 `.cursor/hooks`）

## 統計

| 狀態 | 英文標籤 | 篇數 |
| --- | --- | --- |
| 通過 | Pass | 231 |
| 注意 | Warning | 0 |
| 嚴重 | Critical | 0 |

## 嚴重（請優先人工處理）

| — | — | 本輪無 Critical |

## 注意（節錄前 40 篇）

| slug | 標題 | 主要問題 |
| --- | --- | --- |



## 通過

共 **231** 篇，詳見各 `reports/{slug}.json` 中 `status: Pass`。

## 後續

1. 先處理 **Critical**；Warning 多為食材／步驟字面比對啟發式，需人工判斷是否 false positive。
2. 需更深語意審查時，對單篇使用 `@recipe-review` 或 `node scripts/recipe-review-precheck.mjs --slug <slug>`。
3. 刻意保留者寫入 `overrides.json`。
