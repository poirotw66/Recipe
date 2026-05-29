---
name: AdSlot
description: AdSense 版位元件的 UI 與狀態規格。
domain: ads
module: monetization
spec: spec-005
status: approved
route: component
apis: []
---

# AdSlot

## Meta

- 元件類型：shared-component
- 檔案：`src/components/AdSlot.astro`
- 建立：2026-05-29
- 更新：2026-05-29

## 說明

提供食譜列表頁與食譜詳細頁可重用的廣告版位元件。尚未設定正式 publisher id 時，必須顯示安全的 placeholder，不可偽造正式 AdSense 內容。

## 元件結構

```text
AdSlot
  Label Row
  If configured:
    ins.adsbygoogle
  Else:
    Placeholder Panel
```

## 狀態

- `configured`: 已設定 `PUBLIC_ADSENSE_CLIENT`，輸出 `ins.adsbygoogle`。
- `placeholder`: 尚未設定正式 client，顯示預留說明與部署提醒。

## 視覺規範

- 使用白瓷底加便條色漸層，避免破壞閱讀節奏。
- 必須保留「廣告 / AdSense」語意標示。
- Placeholder 使用虛線框與說明文字，不假裝成真實廣告。

## API 清單

無。
