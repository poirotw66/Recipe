# 繁中 SEO 模板殘句修稿＋四語同步清單

- **建立**：2026-06-07
- **範圍**：繁中 `src/content/recipes/` 內含批次產線模板句的食譜
- **目標**：以**可執行的家常步驟**重寫繁中；再讓 en／ja／ko **步驟條數與烹調順序**與修後繁中一致（允許用字不同，禁止再出現模板套話）

## 偵測規則（grep）

```bash
rg -l '辛香料的香氣完全釋放|每粒米飯均勻裹上|使每粒米飯或食材充分吸附' src/content/recipes/*.md
```

## 統計

| 類型 | 說明 | 篇數 |
| --- | --- | --- |
| **A** | 「熱鍋倒入…辛香料的香氣完全釋放…」蒜／香料 SEO 句 | 22 |
| **B** | 「每粒米飯…裹上醬汁…鍋氣…濕潤度」炒飯 SEO 句（`tomato-egg-rice`） | 1 |
| **合計** | | **23** |

> 先前口頭「22 篇」指 **類型 A**；含試點旗艦 `tomato-egg-rice` 則為 **23 篇**。

## Slug 清單與同步狀態

狀態欄：**zh**＝繁中已去模板；**en／ja／ko**＝三語步驟已對齊修後繁中（非僅「他語已存在」）。

| # | slug | 類型 | zh | en | ja | ko | 備註 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `beef-tomato-noodles` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 2 | `broccoli-mushroom-chicken-rice-bowl` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 3 | `broccoli-mushroom-egg` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 4 | `broccoli-tofu-garlic-stirfry` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 5 | `cabbage-carrot-chicken-rice-bowl` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 6 | `chicken-broccoli-pasta` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 7 | `curry-beef-rice` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 批次 2 |
| 8 | `garlic-cabbage-tofu-braise` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 9 | `garlic-egg-cabbage-bento-side` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 10 | `garlic-mushroom-tofu-rice-bowl` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 11 | `garlic-tofu-chicken-pan-main` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 12 | `garlic-tomato-tofu-eggs` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 批次 3 |
| 13 | `mushroom-cabbage-rice-bowl` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 14 | `onion-beef-rice-bowl` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 批次 2 |
| 15 | `onion-cabbage-mushroom-saute` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 16 | `onion-tomato-egg-fried-rice` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 17 | `scallion-beef-fried-rice` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 批次 2 |
| 18 | `tofu-cabbage-mushroom-stirfry` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 批次 3 |
| 19 | `tomato-beef-rice-bowl` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 批次 2 |
| 20 | `tomato-cabbage-soft-eggs` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 21 | `tomato-garlic-cabbage-eggs` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 |
| 22 | `tomato-garlic-pasta` | A | ✅ | ✅ | ✅ | ✅ | 2026-06-07 批次 4 |
| 23 | `tomato-egg-rice` | B | ✅ | ✅ | ✅ | ✅ | 2026-06-07 批次 1 |

**腳本**：`node scripts/apply-zh-template-step-fixes.mjs`（22 篇 A 類）；他語步驟數與既有 en 對齊，`updatedAt` 四語同步。

## 建議修稿流程（每 slug）

1. **讀繁中** `src/content/recipes/{slug}.md`，標出含模板的那一步（或多步）。
2. **對照他語（可選）** `recipes-en/{slug}.md`：多數已改為正常烹飪句，可作繁中改寫參考，**勿**直接貼英文。
3. **改繁中**：
   - 保留：份量、時間、`ingredients`／`seasonings`、步驟**條數**（除非刻意拆步；若拆步須四語一起改）。
   - 刪除：「辛香料的香氣完全釋放」「每粒米飯均勻裹上…」「熱鍋熱鍋」重複、義大利麵／燉煮類不相干的炒飯套話。
   - 改寫為：爆香蒜末、炒軟番茄、飯粒上色收汁等**具體動作**（參考 `guideline`／`recipe-review` 技能）。
4. **同步他語**（二選一）：
   - **A**：以修後繁中為唯一 source，對 en／ja／ko 各跑一次 `node scripts/gemini-translate-recipe.mjs --slug {slug} --all`（需 API key）＋人工 spot-check；或
   - **B**：人工調整 ja／ko 對應步驟，使條數與順序與新繁中一致（en 若已正確可只微調用字）。
5. **驗證**：

   ```bash
   npm test
   npm run build
   ```

6. **勾選**上表該列 zh／en／ja／ko 為 ✅。

## 批次建議順序

| 批次 | slug（優先） | 理由 |
| --- | --- | --- |
| 1 | `tomato-egg-rice` | 試點／流量高；類型 B |
| 2 | `curry-beef-rice`, `tomato-beef-rice-bowl`, `onion-beef-rice-bowl`, `scallion-beef-fried-rice` | 蓋飯／炒飯核心 |
| 3 | `tofu-cabbage-mushroom-stirfry`, `broccoli-tofu-garlic-stirfry`, `garlic-tomato-tofu-eggs` | 冰箱常用蔬菜豆腐 |
| 4 | `tomato-garlic-pasta`, `chicken-broccoli-pasta`, `beef-tomato-noodles` | 麵類 |
| 5 | 其餘 A 類 | 便當配菜、組合碗 |

## 相關產線文件

- `docs/specs/018-i18n-content-batch/gemini-translation.md`
- `.cursor/skills/recipe-review/SKILL.md`（繁中語意審查）
- `docs/reviews/i18n-pilot-spotcheck-2026-06-07.md`（試點譯文抽檢）

## 完成定義（本清單結案）

- [x] 上表 23 slug 繁中 grep **0** 命中（偵測規則三條 pattern）— 2026-06-07
- [x] 23 slug × 4 語 `verify-pilot-recipes` 步驟數一致且通過
- [ ] 抽檢 ≥5 篇（含 `tomato-egg-rice` + 2 蓋飯 + 2 快炒）人工確認步驟與食材一致（建議上線前）
