# Spec-016: 首頁與主題專區視覺升級

## Meta

- 類型：UI / Pages
- 狀態：done
- PRD：`docs/prds/prd-005.md`
- UI 來源：`docs/prototypes/prd-005-home.html`、`docs/prototypes/prd-005-brunch-hub.html`（Human 已確認通過，2026-06-03）
- 視覺方向：溫馨 · 精緻 · 高級
- 依賴：`spec-012`, `spec-014`, `spec-015`
- 建立：2026-06-03
- 更新：2026-06-03

## 1. 背景與目的

首頁與三個主題專區（早午餐、牛肉、義大利麵）是使用者進站與探索的主路徑。結構已由 spec-012／014 完成，本 spec 依**已通過原型**升級視覺：hero 層次、主題專區卡（封面預覽 + 標籤）、專區頁全幅 hero 與分類區塊節奏。

**前置：** spec-015 的 token 與共用元件必須先落地（或與本 spec 同一 PR 但 task 順序 015 → 016）。

## 2. 設計原則

- 遵循 spec-015 tokens；頁面專用 class 加在 `global.css`（如 `.topic-card`, `.hub-hero`），避免 inline style。
- 主題三卡使用**真實封面 URL**（與 production `coverImage` 一致或 representative slug）。
- 專區頁共用模板模式，允許 **CSS modifier**（`--brunch`, `--beef`, `--pasta`）做細微差異，不複製三份完全不同的 CSS。
- 不改 `home-search.js`、taxonomy 資料結構、JSON-LD 欄位。

## 3. 不在範圍內

- 牛肉／義大利麵導覽或內容擴充
- 首頁區塊順序重排（維持 spec-012 順序）
- 列表頁、詳情頁、冰箱工具頁專屬 redesign

## 4. 涉及範圍

### 頁面清單

| 動作 | 頁面 | 說明 | 設計來源 | UISpec |
| --- | --- | --- | --- | --- |
| 修改 | 首頁 `/` | hero intro 分隔、搜尋面板、主題三卡、section 標題 | Prototype home | `docs/ui-specs/site/home.md`（待更新） |
| 修改 | 早午餐 `/brunch/` | hub hero、featured、分類標題、網格 | Prototype brunch | `docs/ui-specs/site/topic-hub.md`（待撰寫） |
| 修改 | 牛肉 `/beef/` | 同上結構 | Prototype brunch（套 modifier） | `docs/ui-specs/site/topic-hub.md` |
| 修改 | 義大利麵 `/pasta/` | 同上結構 | Prototype brunch（套 modifier） | `docs/ui-specs/site/topic-hub.md` |
| 參考 | RecipeCard | 樣式由 spec-015 | — | `docs/ui-specs/recipes/recipe-list.md` |

### API / DB

無。

## 5. 頁面規格摘要（對齊原型）

### 5.1 首頁

| 區塊 | 變更 |
| --- | --- |
| Hero | `.hero-intro` 底部分隔線；標題 Serif；副文案语气偏編輯感（可沿用或微調 copy） |
| 搜尋面板 | 加大 padding、champagne focus ring |
| 主題專區 | `.topic-card` 取代 plain `note-card`：封面區、玻璃標籤（Brunch/Beef/Pasta）、CTA 香檳色 |
| 精選食譜 | section 標題區 `.section-head`；背景淡漸層（board 色） |

**檔案：** `src/pages/index.astro`, `global.css`

### 5.2 主題專區頁（brunch / beef / pasta）

| 區塊 | 變更 |
| --- | --- |
| Hub hero | `.hub-hero` 全幅圖 + 漸層遮罩 + stats pills |
| Featured | `.featured-card` 雙欄（圖 + 文案）、outline badge「本週推薦」 |
| 分類區 | `.hub-section__head` + 香檳底線裝飾 |
| 食材 pills | `.ingredient-pills` 暖漸層底 |

**檔案：** `src/pages/brunch/index.astro`, `beef/index.astro`, `pasta/index.astro`, `global.css`

**資料：** 繼續使用 `getTopicHubBySlug`；featured 圖片取 hub 代表食譜 `coverImage`（brunch 維持 surf-turf 邏輯）。

### 5.3 驗證腳本（可選）

- `scripts/verify-site.mjs` 增加 marker：首頁存在 `topic-card` 或 data 屬性；專區存在 `hub-hero`（避免回歸成純 note-card）。

## 6. 實作任務

### 依賴圖

```
spec-015 task-1..3 → task-1 (home markup + css) → task-2 (hub pages) → task-3 (ui-spec + verify)
```

### 任務清單

1. [ ] 首頁 markup：topic-card 結構、section-head、hero-intro — `index.astro`
2. [ ] 首頁樣式：`.topic-card*`, `.hero-intro`, `.section-head` — `global.css`
3. [ ] 專區頁：hub-hero、featured-card、hub-section — 三個 `index.astro` + `global.css`
4. [ ] 更新 ui-spec：`home.md`, 新增 `topic-hub.md` — `docs/ui-specs/site/`
5. [ ] verify-site markers（可選）— `scripts/verify-site.mjs`
6. [ ] 依賴 spec-015：確認按鈕／卡片在首頁與專區一致

## 7. 驗收條件

- [x] 首頁主題三卡具封面預覽與標籤，視覺明顯區別於一般 note-card
- [x] `/brunch/`、`/beef/`、`/pasta/` 具 hub-hero 與分類區視覺節奏（與原型一致）
- [x] 首頁 home-search、chip 連結、專區連結行為不變
- [x] structured data / canonical 不變
- [x] `npm test` / `npm run build` 通過；375px + 1280px 走查通過
- [x] ui-spec home + topic-hub 已更新並標記 implemented

## 8. 風險

| 風險 | 緩解 |
| --- | --- |
| 專區代表圖缺失 | fallback 漸層底 + 第一張 hub 食譜 cover |
| 三頁重複 markup | 考慮抽出 `TopicHubLayout.astro`（僅在重複 >3 時做，保持最小 diff） |
