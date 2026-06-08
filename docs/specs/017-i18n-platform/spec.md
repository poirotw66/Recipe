# Spec-017: 多語系平台（路由、UI、taxonomy、SEO）

## Meta

- 類型：Site / i18n / SEO
- 狀態：**done**（2026-06-07 close）
- PRD：`docs/prds/prd-006.md`
- 依賴：`spec-001`, `spec-003`, `spec-004`, `spec-010`, `spec-011`
- 建立：2026-06-03
- 更新：2026-06-03

## 1. 背景與目的

在**不變更繁中根路徑 URL**的前提下，為站點加入 `en`、`ja`、`ko` 前綴路由、UI 翻譯、taxonomy 多語標籤，以及 hreflang／sitemap 基礎設施。本 spec **不包含**大量食譜譯文（見 spec-018）。

## 2. Goals

- Astro 5 `i18n` 設定：`defaultLocale: "zh-TW"`，`locales: ["zh-TW", "en", "ja", "ko"]`，`routing.prefixDefaultLocale: false`。
- 定義 locale 常數與 path helper（例如 `localePath(locale, "/recipes")` → `/en/recipes` 或 `/recipes`）。
- UI 字串抽至 `src/i18n/ui/{zh-TW,en,ja,ko}.json`（或等價 TS），提供 `t(locale, key)` 與 Astro 內可用的 `useTranslations` 模式。
- Header／Footer／導覽／麵包屑／篩選 label 改為字典驅動；新增**語言切換**（保留當前 path suffix，切換 locale 前綴）。
- Taxonomy：`ingredients.json`、`scenarios.json` 擴充為每項含 `slug`（id）+ `labels: Record<Locale, string>`；既有中文欄位遷移策略見 §4。
- `SeoHead`：`lang`、`og:locale`、**hreflang alternate** 連結（試點頁可僅列出「已有譯文」的語言；全站殼頁列出四語 + `x-default`）。
- Sitemap：`sitemap-*.xml.ts` 輸出各 locale 的絕對 URL（繁中無前綴）。
- 靜態頁：`about`、`contact`、`privacy-policy`、`terms` 四語正文（可從繁中擴寫，需人工審閱）。

## 3. Non-goals

- 100 篇食譜翻譯（spec-018）
- 冰箱工具 client 多語比對（spec-019）
- 簡體中文、RTL、子網域
- 字型大改（CJK 以外可沿用 Noto Sans；日韓 webfont 策略留待 ui-guideline 小版本）

## 4. Taxonomy 資料模型

**目標形狀（示意）：**

```json
{
  "slug": "egg",
  "labels": {
    "zh-TW": "雞蛋",
    "en": "Egg",
    "ja": "卵",
    "ko": "달걀"
  },
  "aliases": { "zh-TW": ["蛋"], "en": [], "ja": [], "ko": [] },
  "category": { "zh-TW": "蛋類", "en": "Eggs", "ja": "...", "ko": "..." }
}
```

**遷移：**

- `slug` 不變；現有 `name` 併入 `labels["zh-TW"]`。
- 食譜 `relatedIngredients` 改為 **slug 陣列**（若仍為中文名，本 spec 需提供一次性對照表或遷移腳本）。
- `src/lib/taxonomy.ts` 對外 API：`getIngredientLabel(slug, locale)`、`listIngredients(locale)` 等。

## 5. 路由與頁面

| 區域 | 繁中 URL | 他語 URL |
| --- | --- | --- |
| 首頁 | `/` | `/en/`, `/ja/`, `/ko/` |
| 食譜列表 | `/recipes/` | `/en/recipes/` |
| 食譜詳情 | `/recipes/{slug}/` | `/en/recipes/{slug}/` |
| 食材／情境 | `/ingredients/`… | 同結構加前綴 |
| 工具 | `/tools/fridge-recipe/` | 加前綴（UI 翻譯；邏輯 spec-019） |
| 專區 | `/brunch/` 等 | 加前綴 |

**實作策略（擇一，develop 時以較少破壞為準）：**

- **首選**：Astro 內建 `i18n` + 將 `src/pages` 重構為 locale 感知（官方 `getRelativeLocaleUrl` 等）。
- 食譜 collection：繁中維持 `src/content/recipes/`；他語 `src/content/recipes-en/` 等（詳 spec-018）。

**無譯文食譜：**

- 詳情頁若缺 he 語檔：回傳 404 **或** 顯示「此語言尚未提供」+ 連結繁中版（PRD 建議：**404 對 SEO 較乾淨**；列表不顯示未翻譯項）。spec-018 試點前，他語列表可為空或僅顯示試點 slug。

## 6. Scope（檔案）

| Path | Purpose |
| --- | --- |
| `astro.config.mjs` | `i18n` block |
| `src/lib/i18n.ts` | locales、path helpers、`t()` |
| `src/i18n/ui/*.json` | UI 字典 |
| `src/lib/taxonomy.ts` | 多語 labels |
| `src/data/ingredients.json`, `scenarios.json` | schema 升級 |
| `src/components/Header.astro`, `Footer.astro`, `Breadcrumb.astro` | 字典 + 語言切換 |
| `src/components/SeoHead.astro` | hreflang、locale meta |
| `src/layouts/BaseLayout.astro` | `html lang` 依 locale |
| `src/pages/**` | locale 路由重構（含 index、列表、政策頁） |
| `src/pages/sitemap-*.xml.ts` | 多語 URL |
| `scripts/verify-site.mjs` | locale 常數、政策頁四語存在、hreflang marker（靜態抽樣） |
| `scripts/migrate-recipe-ingredient-refs.mjs`（可選） | 中文名 → slug |

## 7. hreflang 規則

- 每個**已翻譯**食譜詳情頁輸出：  
  `zh-TW` → `https://recipe.bloss0m.com/recipes/{slug}/`  
  `en` → `.../en/recipes/{slug}/`（同理 ja、ko）  
  `x-default` → 繁中 URL
- 僅存在繁中的 slug：**不輸出**他語 alternate（避免 soft 404 誤導）。

## 8. 驗收條件

- [ ] `npm run build` 產出 `/`、`/en/`、`/en/recipes/` 等靜態路徑
- [ ] 既有繁中 URL 與 build 前相比路徑不變（回歸清單：首頁、任一舊食譜 slug、sitemap-index）
- [ ] Header 語言切換：從 `/recipes/tomato-egg-rice` 切到 en 為 `/en/recipes/tomato-egg-rice`（試點前 en 詳情可 404）
- [ ] 食材列表在 `/en/ingredients/` 顯示英文 labels（資料已填）
- [ ] about + privacy 四語可訪問
- [ ] `npm test` 通過（含新增 i18n 檢查）

## 9. Task 拆解（Develop）

1. `i18n` config + `src/lib/i18n.ts`
2. UI JSON + 替換 Header/Footer/導覽/共用 label
3. Taxonomy JSON 遷移 + lib API
4. 頁面路由重構（分批：政策頁 → 列表 → 詳情殼）
5. SeoHead hreflang + sitemap
6. verify-site 更新
7. 文件：`guideline` 或 ui-guideline 增「多語與語言切換」小節（一句話連結即可）
