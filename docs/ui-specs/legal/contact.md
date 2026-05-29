---
name: 聯絡我們
description: 提供使用者與廣告審核可辨識的聯絡資訊頁。
domain: legal
module: foundation
spec: spec-001
status: approved
route: /contact
apis: []
---

# 聯絡我們

## Meta

- 頁面類型：static-content-page
- 頁面檔名：`src/pages/contact.astro`
- 建立：2026-05-28
- 更新：2026-05-28

## 說明

建立聯絡頁 placeholder。第一階段不做表單後端，避免引入 server runtime；以 email 或靜態聯絡方式呈現。

## 頁面結構

```text
Header
Main
  Page Title
  Contact Methods
  Content Feedback Note
  Privacy Link
Footer
```

## 欄位 / 內容

| 項目 | 說明 |
| --- | --- |
| 聯絡信箱 | 使用 placeholder，部署前替換為正式 email。 |
| 內容回饋 | 說明可回報錯誤食譜或合作事項。 |
| 隱私提示 | 提醒不要寄送敏感個資。 |

## 互動行為

- 點擊 email link 開啟 mail client。
- 不提供留言表單。

## API 清單

無。
