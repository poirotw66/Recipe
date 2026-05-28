---
name: 使用條款
description: 說明本站內容使用限制與免責聲明的靜態頁。
domain: legal
module: foundation
spec: spec-001
status: approved
route: /terms
apis: []
---

# 使用條款

## Meta

- 頁面類型：static-content-page
- 頁面檔名：`src/pages/terms.astro`
- 建立：2026-05-28
- 更新：2026-05-28

## 說明

建立使用條款頁 UI 規格。正式文字需由站方確認；頁面需清楚說明食譜、營養估算與使用者責任。

## 頁面結構

```text
Header
Main
  Page Title
  Last Updated
  Terms Sections
  Contact Link
Footer
```

## 內容段落

- 內容用途。
- 食譜與營養資訊免責。
- 智慧財產權。
- 廣告與外部連結。
- 條款更新。
- 聯絡方式。

## 視覺規範

- 與 privacy policy 共用 `StaticArticleLayout`。
- 文章最大寬 760px。
- 分節標題清楚，避免整頁密集文字。

## API 清單

無。
