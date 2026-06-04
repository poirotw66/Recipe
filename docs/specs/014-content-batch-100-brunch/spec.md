# Spec-014: 內容擴充第四批（100 篇、早午餐、WEBP 封面）

## Meta

- 類型：Content / Topic Hub / Production
- 狀態：done
- PRD：`docs/prds/prd-004.md`
- 依賴：`spec-002`, `spec-003`, `spec-008`, `spec-011`
- 建立：2026-06-03
- 結案：2026-06-03（回溯登錄，實作先於文件）

## 1. Goals

- 食譜總數達 **100 篇**（PRD-002 第三個月目標）
- 新增 **早午餐專區** `/brunch/`（7 篇 + 分類區塊）
- 新增 **20 篇**新菜單食譜（含義麵延伸、小食、沙拉、湯品等）
- 全站 `coverImage` 統一為 **WEBP** 且檔案存在

## 2. Scope

| Path | Purpose |
| --- | --- |
| `src/content/recipes/*.md` | +20 篇新食譜；全站 cover 改 `.webp` |
| `public/images/recipes/*.webp` | 對應封面圖 |
| `src/data/topic-hubs.json` | `brunch` 主題專區定義 |
| `src/pages/brunch/index.astro` | 早午餐集合頁（分組：海陸/牛排/海鮮/雞肉/蛋奶素） |
| `src/pages/index.astro` | 主題專區加入早午餐卡 |
| `src/lib/navigation.ts` | 主題專區導覽「早午餐」 |
| `src/pages/sitemap-pages.xml.ts` | 收錄 `/brunch/` |
| `docs/recipe-cover-images-for-gemini.md` | 100 篇產圖對照表 |

## 3. 新增食譜清單（20）

### 早午餐（7）

| slug | 標題 |
| --- | --- |
| `surf-turf-brunch` | 澎湃海陸早午餐 |
| `pan-seared-flap-steak-brunch` | 香煎翼板牛排早午餐 |
| `crispy-cod-brunch` | 金黃酥炸鱴魚早午餐 |
| `roasted-lemon-salmon-brunch` | 爐烤檸香鮭魚早午餐 |
| `smoked-salmon-brunch` | 煙燻鮭魚早午餐 |
| `mushroom-soft-egg-brunch` | 野菇嫩蛋早午餐 |
| `herb-pan-chicken-brunch` | 香草煎雞胸早午餐 |

### 新菜單提案（13）

| slug | 標題 |
| --- | --- |
| `cajun-fries` | 肯瓊香辣薯條 |
| `classic-caesar-chicken-salad` | 經典凱薩嫩雞沙拉 |
| `smoked-salmon-caesar-salad` | 煙燻鮭魚凱薩沙拉 |
| `fish-and-chips` | 英式炸魚薯條 |
| `fried-trio-platter` | 炸物三重奏 |
| `garden-vegetable-pasta` | 田園時蔬義大利麵 |
| `garlic-cream-shrimp-pasta` | 蒜香奶油鮮蝦麵 |
| `spicy-garlic-bacon-pasta` | 蒜辣培根橄欖油麵 |
| `spicy-seafood-tomato-pasta` | 海鮮番茄辣麵 |
| `truffle-mushroom-farfalle` | 黑松露野菇蝴蝶麵 |
| `chefs-daily-soup` | 主廚每日例湯 |
| `honey-cajun-chicken-wings` | 蜜汁紐澳良雞翅 |
| `seasonal-greens-salad-bowl` | 季節鮮蔬沙拉碗 |

## 4. 驗收條件

- [x] `src/content/recipes` ≥ 100 篇
- [x] 每篇 `coverImage` 為 `/images/recipes/{slug}.webp` 且檔案存在
- [x] `/brunch/` 可建置、含 ItemList / Collection JSON-LD
- [x] 首頁主題專區含早午餐、牛肉、義大利麵
- [x] 導覽含 `/brunch/`（主題專區）
- [x] `npm test` / `npm run build` 通過

## 5. 相關 Commits（回溯）

- `b2a1bdd` — 新菜單提案與產圖規格文件
- `4c324ce` — 早午餐與新菜單 WEBP 資產
- `e4f863c` — 全站 WEBP 封面 + brunch 專區頁
- `d1fa73c` — 主廚例湯、蜜汁雞翅、時蔬碗封面
