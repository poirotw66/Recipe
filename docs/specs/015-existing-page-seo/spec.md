# Spec-015: 既有頁面 SEO 優化批次

## Meta

- 類型：Growth / SEO / Content
- 狀態：done
- PRD：`docs/prds/prd-004.md`
- 依賴：`spec-014`
- 建立：2026-06-03

## 1. 背景與目的

PRD-004 Phase 1：在 GA4／GSC 基線建立後，優化**已上線高曝光潛力頁**，對齊成長主軸「一人份 × 10 分鐘 × 冰箱剩料」，提升 CTR 與搜尋意圖匹配，不新增路由或大改 UI。

## 2. Goals

- 優化 **20 篇**食譜的 `seoTitle`、`seoDescription`、正文首段（≤120 字）
- 調整 `featured: true` 清單，使首頁精選呼應主軸（維持 **11 篇**）
- 3 篇 SVG 封面改 webp（需實際圖檔或暫留佔位流程文件化）
- `npm test` + `npm run build` 通過；JSON-LD 結構不變

## 3. Non-goals

- 新增食譜（spec-017）
- taxonomy 擴充（spec-016）
- 列表頁／Hub 路由變更（spec-018）
- Brunch 專區內容重寫

## 4. 優化範圍

### 4.1 精選 11 篇（必優化）

| slug | 現有主軸對齊 | 優化方向 |
| --- | --- | --- |
| `tomato-egg-rice` | 一人份、10 分鐘 | 租屋族、剩飯、快手 |
| `tofu-scrambled-eggs` | 一人份、省錢 | 豆腐、10 分鐘、清冰箱 |
| `garlic-oil-pasta` | 義式但可連 10 分鐘 | 蒜香、一人份、簡單 |
| `scallion-beef-fried-rice` | 飯麵、清冰箱 | 剩飯、牛肉、快手 |
| `garlic-mushroom-chicken` | 主菜、一人份 | 雞肉、菇類、租屋 |
| `air-fryer-salmon-broccoli` | 氣炸鍋、高蛋白 | 少顧鍋、一人份 |
| `steamed-chicken-bento` | 便當菜 | 電鍋、雞胸、分裝 |
| `beef-broccoli-stirfry` | 家常菜 | 牛肉、青花菜、快炒 |
| `pesto-chicken-pasta` | 義式 | 降調西式詞，強調快手一人份 |
| `pesto-salmon-pasta` | 義式 | 同上 |
| `white-sauce-chicken-pasta` | 義式 | 同上 |

### 4.2 情境核心加選 9 篇（必優化）

從下列情境各取高連結食譜 1～2 篇（共 9 篇）：

| 情境 slug | 候選食譜（擇優寫入 spec 實作清單） |
| --- | --- |
| `one-person-meal` | `onion-egg-rice-bowl`、`tomato-onion-scrambled-eggs` |
| `ten-minute-meals` | `scallion-egg-rice`、`tomato-garlic-cabbage-eggs` |
| `fridge-cleanout-meals` | `cabbage-egg-stir-fry`、`onion-tomato-egg-fried-rice` |
| `air-fryer-meals` | `airfryer-garlic-chicken-broccoli`（若未在 4.1） |

實作時以 `scenarios` frontmatter 標籤核對，確保 20 篇不重複 slug。

### 4.3 featured 調整規則

- 保留 11 篇 `featured: true`
- 至少 **7 篇**須含情境標籤：一人料理、10 分鐘料理、冰箱清庫存 之一
- 移除 featured 的候選（若與主軸弱相關）：`pesto-salmon-pasta`、`white-sauce-chicken-pasta` 可改為 false，改升 `tomato-egg-rice` 同系或 `cabbage-egg-stir-fry` 等
- 首頁 `getFeaturedRecipes` 行為不變，只改 frontmatter

### 4.4 封面 webp（3 篇）

| slug | 現況 | 動作 |
| --- | --- | --- |
| `chefs-daily-soup` | `.svg` | 有 webp 則改 frontmatter；無則維持 svg 並記錄於 progress |
| `honey-cajun-chicken-wings` | `.svg` | 同上 |
| `seasonal-greens-salad-bowl` | `.svg` | 同上 |

## 5. SEO 文案規範

- `seoTitle`：28～35 字，含料理名 + 情境詞（一人份／10 分鐘／租屋／清冰箱）
- `seoDescription`：55～90 字，第一句呼應搜尋意圖，第二句點食材或時間
- 正文首段：自然帶入長尾詞，不堆砌；步驟與食材表不改邏輯
- 禁止簡體中文

## 6. Scope（檔案）

| Path | 變更 |
| --- | --- |
| `src/content/recipes/*.md` | 20 篇 seo 欄位 + featured 調整 |
| `public/images/recipes/*.webp` | 0～3 新檔 |
| `scripts/verify-site.mjs` | 可選：featured 主軸門檻檢查 |
| `docs/specs/015-existing-page-seo/progress.md` | 任務追蹤 |

## 7. 驗收標準

- [ ] 20 篇 seoTitle / seoDescription 已更新且符合 §5
- [ ] featured 11 篇且 ≥7 篇對齊主軸情境
- [ ] 3 篇封面：有 webp 則指向 webp，否則文件記錄待補
- [ ] `npm test` 通過
- [ ] `npm run build` 通過

## 8. 任務清單

1. [ ] 產出 20 篇優化清單（slug 定稿）
2. [ ] 批次更新 seo 欄位與首段
3. [ ] 調整 featured
4. [ ] 封面 webp 對齊
5. [ ] verify + build
