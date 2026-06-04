# PRD-005 HTML Prototypes

Visual direction for spec-015 / spec-016. **Throwaway artifacts** — formal implementation follows ui-spec after `/vif-spec`.

## Files

| File | Page |
| --- | --- |
| `prd-005-home.html` | 首頁（hero、搜尋、主題專區三卡、精選食譜） |
| `prd-005-brunch-hub.html` | 早午餐專區 `/brunch/` |

## How to preview

From repo root:

```bash
npx --yes serve docs/prototypes -p 4321
```

Open:

- http://localhost:4321/prd-005-home.html
- http://localhost:4321/prd-005-brunch-hub.html

Recipe cover images load from production CDN (`recipe.bloss0m.com`) when online.

## Visual direction (Human feedback 2026-06-03)

**溫馨 · 精緻 · 高級** — 暖象牙底、香檳金點綴、柔和景深、留白加大；避免廉價促銷感或冷硬 SaaS 風。

| Token | Role |
| --- | --- |
| `--champagne` | 眉題、CTA 輔助、專區強調 |
| `--scallion-deep` | 主按鈕（沉穩深綠，非亮綠） |
| Soft shadows | 卡片浮起、hover 慢速過渡 |

## Typography (prototype decision)

| Role | Font | Why |
| --- | --- | --- |
| Display / headings | Noto Serif TC (500–700) | 精緻襯線標題，溫馨不浮誇 |
| UI / body | Noto Sans TC (300–600) | 內文輕量、高級掃讀感 |

## Feedback

Record decisions in PRD-005 §10 or spec-016 Meta「UI 來源」after Human review.
