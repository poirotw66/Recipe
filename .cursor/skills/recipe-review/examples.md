# Recipe Review Examples

## Example: Warning (ingredient mismatch)

**Input snippet:** `ingredients` lists 青蔥; steps never mention 蔥/青蔥.

```json
{
  "slug": "garlic-mushroom-chicken",
  "reviewed_at": "2026-06-03",
  "status": "Warning",
  "confidence_score": 78,
  "issues": [
    {
      "type": "Ingredient_Mismatch",
      "severity": "Warning",
      "description": "Ingredient 青蔥 is listed but not referenced in any step.",
      "suggested_fix": "Add 青蔥 to a step (e.g. garnish before serving) or remove from ingredients.",
      "source": "agent"
    }
  ]
}
```

## Example: Pass

```json
{
  "slug": "tomato-egg-rice",
  "reviewed_at": "2026-06-03",
  "status": "Pass",
  "confidence_score": 85,
  "issues": []
}
```

## Example: Critical (safety)

```json
{
  "slug": "example-raw-chicken",
  "reviewed_at": "2026-06-03",
  "status": "Critical",
  "confidence_score": 72,
  "issues": [
    {
      "type": "Safety_Risk",
      "severity": "Critical",
      "description": "Steps serve chicken after 3 minutes pan fry with no mention of internal doneness; totalTime 8 for bone-in pieces is insufficient.",
      "suggested_fix": "Extend cook step until juices run clear; align totalTime/cookTime with safe minimum for cut size.",
      "source": "agent"
    }
  ]
}
```

## Rollup markdown fragment（繁體中文）

完整範例見 `docs/reviews/recipe-audit/audit-summary-2026-06-05-sample-10.md`。

```markdown
# 食譜內容審查摘要（範例批次 · 10 篇）

| 狀態 | 英文標籤 | 篇數 |
| --- | --- | --- |
| 通過 | Pass | 3 |
| 注意 | Warning | 6 |
| 嚴重 | Critical | 1 |

## 嚴重（請優先人工處理）

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| creamy-mushroom-pasta | 奶香菇類義大利麵 | 步驟含錯誤模板殘文 |
```
