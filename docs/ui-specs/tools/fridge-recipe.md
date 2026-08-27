---
name: 冰箱剩料工具
description: 前端靜態食材比對工具頁的 UI 規格 placeholder。
domain: tools
module: foundation
spec: spec-001
status: approved
route: /tools/fridge-recipe
apis: []
---

# 冰箱剩料工具

## Meta

- 頁面類型：tool-page
- 頁面檔名：`src/pages/tools/fridge-recipe.astro`
- 建立：2026-05-28
- 更新：2026-05-28

## 說明

建立冰箱剩料工具頁的 UI 外殼。spec-001 階段只建立輸入區、結果區與 empty placeholder；實際本地 JSON 比對與排序由 spec-006 實作。

## 頁面結構

```text
Header
Main
  Tool Intro
  Ingredient Input Panel
  Quick Ingredient Chips
  Result Placeholder
  Tips / Related Links
Footer
```

## 表單欄位

| 欄位名稱 | 欄位類型 | 必填 | 驗證規則 | 預設值 | 說明 |
| --- | --- | --- | --- | --- | --- |
| 食材輸入 | textarea / token input | Y | 至少 1 個食材 | 空 | 支援「雞蛋、豆腐、高麗菜」。 |
| 偏好條件 | chip-group | N | 固定選項 | 無 | 10 分鐘、高蛋白、電鍋、氣炸鍋。 |

## 操作按鈕

| 按鈕 | 類型 | 位置 | 顯示條件 | 說明 |
| --- | --- | --- | --- | --- |
| 找能煮的料理 | Primary | 輸入區下方 | 永遠 | spec-001 顯示 placeholder 結果。 |
| 清空 | Text | 輸入區右側 | 有輸入時 | 清空輸入。 |

## 互動行為

### 提交食材

- 觸發條件：點擊 CTA 或 Enter。
- API：無。
- 成功：spec-001 顯示「工具邏輯即將完成」與 placeholder recipe cards。
- 失敗：空白提交時顯示「先輸入至少 1 樣食材」。

## 狀態管理

| 狀態 | 初始值 | 變更時機 | 影響 |
| --- | --- | --- | --- |
| `ingredientsInput` | `""` | 使用者輸入 | CTA 是否可執行。 |
| `selectedPreferences` | `[]` | 點擊 chip | 後續 spec-006 用於排序。 |
| `hasSubmitted` | `false` | 提交後 | 顯示 placeholder 結果。 |
| `error` | `null` | 驗證失敗 | 顯示錯誤。 |

## 響應式設計

| 斷點 | 佈局變化 |
| --- | --- |
| mobile | 輸入區單欄，結果卡單欄。 |
| tablet | 輸入區與 tips 可上下排列。 |
| desktop | 可採 2 欄：左輸入、右結果/說明。 |

## 視覺規範

- 工具輸入面使用 `--note`，像冰箱便條。
- 結果卡使用食譜卡規範，顯示命中/缺少食材 badge。
- 不做複雜儀表板感，保持料理任務導向。

## API 清單

無。
