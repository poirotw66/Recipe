# Spec-015: 視覺系統與共用元件收斂

## Meta

- 類型：UI / Design System
- 狀態：done
- PRD：`docs/prds/prd-005.md`
- UI 來源：`docs/prototypes/prd-005-home.html`、`docs/prototypes/prd-005-brunch-hub.html`（Human 已確認通過，2026-06-03）
- 視覺方向：溫馨 · 精緻 · 高級
- 依賴：`spec-010`, `spec-013`
- 建立：2026-06-03
- 更新：2026-06-03

## 1. 背景與目的

PRD-005 要求在不推翻冰箱便條 design system 的前提下，提升全站質感。原型 v2 已驗證色溫、字型、陰影與元件風格；本 spec 將原型決策落地為 **CSS tokens + 共用元件 + ui-guideline v1.2**，供 spec-016 與全站頁面引用。

## 2. 設計原則

- **延續語意色票**：保留 `--scallion`、`--rice`、`--note` 等命名；新增 **`--champagne`**（香檳金點綴），不引入紫漸層或冷灰 SaaS 風。
- **溫馨精緻高級**：暖象牙底、細邊框（半透明）、柔和大 blur 陰影、加大 section 留白；主 CTA 用 **深綠**（`--scallion-deep`），避免亮綠促銷感。
- **字型**：標題 **Noto Serif TC**（500–700）；UI／內文 **Noto Sans TC**（300–600）；`font-display: swap`；子集化或僅載入必要 weight。
- **不破壞 UX**：不改 DOM 語意與 spec-013 資訊層級；僅調整樣式與可選 wrapper class。
- **效能**：LCP 不因字型明顯惡化；維持靜態站、無 UI library。

## 3. 不在範圍內

- 首頁／專區版面結構（屬 spec-016）
- 食譜列表 URL 篩選、冰箱工具邏輯
- 新內容、SEO schema 變更
- 食譜詳情、工具頁、政策頁完整版面重設（僅連帶受益於共用元件樣式）

## 4. 涉及範圍

### 頁面清單

| 動作 | 頁面 | 說明 | 設計來源 | UISpec |
| --- | --- | --- | --- | --- |
| 參考 | 全站 layout | 透過 global.css / 元件連帶 | Prototype | — |
| 修改 | Header / Footer | 間距、品牌字距、導覽 active 樣式 | Prototype | 無獨立 ui-spec（隨 foundation） |

### API 清單

無。

### DB 清單

無。

### 設計文件

| 動作 | 文件 | 說明 |
| --- | --- | --- |
| 修改 | `guideline/ui/ui-guideline.md` | v1.2：字型、champagne token、陰影、按鈕／chip 規範 |
| 參考 | `docs/ui-specs/**` | spec-016 更新頁面 ui-spec；本 spec 不逐頁重寫 |

## 5. Token 與元件變更（對齊原型）

### 5.1 新增／調整 CSS variables（`src/styles/global.css`）

| Token | 值（原型） | 用途 |
| --- | --- | --- |
| `--champagne` | `#c4a574` | eyebrow、導覽底線、專區 CTA、meta 強調 |
| `--scallion-deep` | `#2f5540` | `.button.primary` 背景 |
| `--rice`（調整） | `#fffbf6` | 暖象牙底 |
| `--shadow-sm/md/lg` | 見原型 | 柔和景深 |
| `--space-10`, `--space-16` | 40px, 72px | 大區塊留白 |
| `--font-display`, `--font-ui` | Noto Serif / Sans TC | 字型 stack |

既有 token（`--scallion`, `--note`, `--bran-line` 等）可微調色值以對齊原型，但**不得改名**以免破壞既有引用。

### 5.2 元件樣式

| 元件 | 變更 |
| --- | --- |
| `.button` / `.button.primary` | 字距、深綠主按鈕、focus 用 champagne ring |
| `.chip` | 透明底 + 細邊框；hover 香檳邊 |
| `.note-card`、`.card-body` | 陰影、hover、圓角統一 |
| `.eyebrow` | 香檳色、加 letter-spacing |
| `.page-title` | `font-family: var(--font-display)` |
| `RecipeCard` | 外框、陰影、hover（**不改** highlights DOM） |
| `Header` / `Footer` | 對齊原型 sticky blur、品牌字距 |

### 5.3 字型載入

- 於 `BaseLayout` 或 `SeoHead` 加入 Google Fonts preconnect + link（或後續改 self-host，需在 guideline 註記）。
- Weights：Serif 500–700；Sans 300–600。

## 6. 實作任務

### 依賴圖

```
task-1 (tokens + fonts) → task-2 (buttons/chips/cards) → task-3 (header/footer + recipe card)
```

### 任務清單

1. [ ] 更新 `global.css`：token、字型變數、陰影、section 間距 — `src/styles/global.css`
2. [ ] 字型載入與 `font-family` 套用 — `src/layouts/BaseLayout.astro` 或 `SeoHead.astro`
3. [ ] 按鈕、chip、表單 focus — `global.css`
4. [ ] RecipeCard、note-card 視覺 — `global.css`, `RecipeCard.astro`（class only）
5. [ ] Header／Footer 微調 — `Header.astro`, `Footer.astro`, `global.css`
6. [ ] ui-guideline v1.2 — `guideline/ui/ui-guideline.md`

## 7. 驗收條件

- [x] `:root` 含 `--champagne`、`--scallion-deep` 及調整後陰影／間距
- [x] 全站標題使用 `--font-display`，內文使用 `--font-ui`，字型檔可載入
- [x] `.button.primary` 為深綠；`.chip` 為細邊框精緻樣式；focus 可見且非預設藍框
- [x] RecipeCard hover／邊框與 spec-013 資訊層級並存，無 layout shift 惡化
- [x] `npm test` / `npm run build` / typecheck 通過
- [x] 375px 走查：按鈕、chip、卡片質感與原型方向一致

## 8. 風險

| 風險 | 緩解 |
| --- | --- |
| 外部字型影響 LCP | preconnect、`display=swap`、僅必要 weight |
| 全站樣式連帶改變列表／工具頁 | 走查主要路由；限制 scope 為 token + 共用 class |
