# Spec-018 試點譯文抽檢（2026-06-07）

抽檢範圍：試點 15 篇 × en（另抽 ja/ko 各 2 篇）。

## 方法

- 步驟數：與繁中 frontmatter 比對（`verify-pilot-recipes.mjs` 已自動驗證）。
- 人工：標題／步驟語氣、SEO 套話、數字與 `recipeId`。

## 結果摘要

| 項目 | 結果 |
| --- | --- |
| 步驟數／recipeId／coverImage | 全試點 PASS（CI） |
| en `scallion-beef-stirfry` | PASS — 4 步與繁中一致，用語自然 |
| en `pesto-chicken-pasta` | 建議人工再看青醬／basil 用字（未發現阻擋上線問題） |
| en `tomato-egg-rice` | PASS |
| ja `tomato-egg-rice` | PASS — `かんたん`、步驟對齊 |
| ko `creamy-mushroom-pasta` | PASS |

## 建議後續

- 上線前可再抽 3 篇長步驟（如 `tomato-garlic-pasta` 折行繁中稿對應 en）。
- 第二批 20 篇建議以 **Gemini Flash + 本抽檢表** 流程產出，勿用通用機翻。
