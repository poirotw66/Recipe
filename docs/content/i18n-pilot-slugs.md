# Spec-018 試點食譜多語狀態

更新：2026-06-05

| slug | zh-TW | en | ja | ko | 備註 |
| --- | --- | --- | --- | --- | --- |
| tomato-egg-rice | ✅ | ✅ | ✅ | ✅ | |
| scallion-egg-rice | ✅ | ✅ | ✅ | ✅ | |
| garlic-oil-pasta | ✅ | ✅ | ✅ | ✅ | |
| tomato-garlic-pasta | ✅ | ✅ | ✅ | ✅ | |
| pesto-chicken-pasta | ✅ | ✅ | ✅ | ✅ | |
| beef-broccoli-stirfry | ✅ | ✅ | ✅ | ✅ | |
| scallion-beef-stirfry | ✅ | ✅ | ✅ | ✅ | |
| airfryer-garlic-chicken-broccoli | ✅ | ✅ | ✅ | ✅ | |
| tofu-scrambled-eggs | ✅ | ✅ | ✅ | ✅ | |
| tomato-tofu-soup | ✅ | ✅ | ✅ | ✅ | |
| steamed-chicken-bento | ✅ | ✅ | ✅ | ✅ | |
| mushroom-beef-rice-bowl | ✅ | ✅ | ✅ | ✅ | |
| onion-egg-rice-bowl | ✅ | ✅ | ✅ | ✅ | |
| broccoli-mushroom-chicken-rice-bowl | ✅ | ✅ | ✅ | ✅ | |
| creamy-mushroom-pasta | ✅ | ✅ | ✅ | ✅ | |

## 產線

- 正式批次請用 `scripts/gemini-translate-recipe.mjs`（Gemini Flash latest）+ **Human review**（見 `gemini-translation.md`）。
- 本試點檔案於 God Mode 以本地化規則產出並通過 `verify-pilot-recipes.mjs`；上線前建議逐篇人工抽檢或改以 Gemini 產線重跑並覆蓋。
