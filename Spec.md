以下是重新整理後的 **第一階段純靜態版 Spec**。
目標是：**0 元月費、能上線、能被 Google 收錄、能申請 AdSense、能測 SEO 流量。**

---

# 食譜 SEO 站 Spec v1.0

## 技術選型

```text
Hosting: Cloudflare Pages Free
Framework: Astro
Content: Markdown / JSON
Ads: Google AdSense
Domain: Cloudflare 自訂網域
Backend: 無
Database: 無
Login: 無
AI API: 無
Monthly hosting cost: US$0
```

Cloudflare Pages Free 適合這種純靜態內容站。官方文件顯示 Free plan 單站最多 20,000 files；靜態食譜 MVP 完全夠用。([Cloudflare Docs][1])
只要不使用 Pages Functions，就不會進入 Workers 計費；Pages Functions 才會依 Workers 請求計費。([Cloudflare Docs][2])

---

# 1. 專案定位

## 網站定位

**給台灣人的一人份、租屋族、懶人料理食譜站。**

不是做大而全的食譜社群，而是做：

```text
台灣日常食材
一人份料理
電鍋料理
氣炸鍋料理
10 分鐘料理
冰箱剩料料理
減脂高蛋白料理
```

## 暫定品牌名

```text
今天煮什麼
```

## 網站主標語

```text
用冰箱現有食材，快速找到今天能煮的簡單料理。
```

---

# 2. 第一階段目標

第一階段不做後端、不做會員、不做 AI API。

核心目標是：

```text
建立可被 Google 收錄的靜態食譜資料庫。
```

## MVP 目標

| 項目    |                    目標 |
| ----- | --------------------: |
| 食譜頁   |                 300 篇 |
| 食材頁   |                 100 頁 |
| 情境分類頁 |                  30 頁 |
| 工具頁   |                   1 頁 |
| 月費    |                  US$0 |
| 上線平台  | Cloudflare Pages Free |
| 廣告    |               AdSense |
| 自訂網域  |  使用 Cloudflare Domain |

---

# 3. 第一階段網站功能

## 3.1 首頁

首頁目標不是漂亮而已，而是導流到 SEO 頁面。

首頁包含：

```text
搜尋框
熱門食譜
熱門食材
料理情境入口
一人料理入口
電鍋料理入口
氣炸鍋料理入口
減脂料理入口
冰箱剩料工具入口
```

首頁主要 CTA：

```text
輸入你有的食材，找今天能煮的料理
```

---

## 3.2 食譜列表頁

路徑：

```text
/recipes
```

功能：

```text
顯示所有食譜
依分類篩選
依食材篩選
依料理時間篩選
依設備篩選
```

第一階段可以全部前端靜態完成，不需要 API。

---

## 3.3 單篇食譜頁

路徑：

```text
/recipes/{slug}
```

每篇食譜包含：

```text
標題
簡介
成品圖
份量
備料時間
烹調時間
總時間
難度
熱量估算
蛋白質估算
食材清單
調味料
步驟
料理小技巧
保存方式
可替代食材
常見問題
相關食譜
相關食材
AdSense 廣告位
Recipe JSON-LD
FAQ JSON-LD
Breadcrumb JSON-LD
```

Google 官方文件建議食譜頁使用 Recipe structured data，並可提供時間、營養、圖片等資訊，讓 Google 更理解食譜內容，也有機會出現在搜尋與圖片結果中。([Google for Developers][3])

---

## 3.4 食材頁

路徑：

```text
/ingredients/{slug}
```

例如：

```text
/ingredients/egg
/ingredients/tofu
/ingredients/chicken-breast
/ingredients/cabbage
```

每個食材頁包含：

```text
食材介紹
保存方式
常見料理方式
熱量與營養
適合搭配的食材
可替代食材
使用此食材的食譜列表
常見問題
```

這會是長尾 SEO 的主力。

---

## 3.5 情境頁

路徑：

```text
/scenarios/{slug}
```

第一批情境頁：

```text
一人料理
租屋料理
10 分鐘料理
電鍋料理
氣炸鍋料理
微波爐料理
高蛋白料理
減脂料理
便當菜
宵夜料理
下酒菜
冰箱剩料料理
全聯食材料理
不用開火料理
```

每個情境頁包含：

```text
情境說明
推薦食譜列表
常見食材
相關情境
FAQ
```

---

## 3.6 冰箱剩料工具頁

路徑：

```text
/tools/fridge-recipe
```

第一階段不呼叫 AI API。
做成 **前端靜態比對工具**。

使用者輸入：

```text
雞蛋、豆腐、高麗菜
```

系統從本地 JSON 食譜資料比對：

```text
命中食材最多的食譜
缺少食材最少的食譜
10 分鐘內可完成的食譜
高蛋白食譜
```

這個工具可以完全在瀏覽器端執行，不需要後端。

---

# 4. 網站路由規格

```text
/
首頁

/recipes
食譜列表

/recipes/{slug}
單篇食譜

/ingredients
食材列表

/ingredients/{slug}
單一食材頁

/scenarios
情境列表

/scenarios/{slug}
單一情境頁

/tools/fridge-recipe
冰箱剩料工具

/about
關於本站

/contact
聯絡我們

/privacy-policy
隱私權政策

/terms
使用條款

/ads.txt
AdSense ads.txt

/sitemap-index.xml
Sitemap index

/robots.txt
Robots
```

---

# 5. 內容資料結構

## 5.1 食譜 Markdown 格式

建議每篇食譜一個 Markdown 檔。

路徑：

```text
/src/content/recipes/tofu-scrambled-eggs.md
```

範例：

```md
---
title: "豆腐炒蛋"
slug: "tofu-scrambled-eggs"
description: "豆腐炒蛋是適合一人晚餐的 10 分鐘料理，只需要豆腐、雞蛋和蔥花。"
coverImage: "/images/recipes/tofu-scrambled-eggs.webp"
servings: 1
prepTime: 5
cookTime: 8
totalTime: 13
difficulty: "簡單"
calories: 320
protein: 24
fat: 18
carbs: 10
category: "家常菜"
scenarios:
  - "一人料理"
  - "10分鐘料理"
  - "租屋料理"
equipment:
  - "平底鍋"
ingredients:
  - name: "雞蛋"
    amount: "2"
    unit: "顆"
  - name: "板豆腐"
    amount: "半盒"
    unit: ""
  - name: "蔥"
    amount: "1"
    unit: "支"
seasonings:
  - name: "醬油"
    amount: "1"
    unit: "小匙"
  - name: "鹽"
    amount: "少許"
    unit: ""
tags:
  - "高蛋白"
  - "省錢"
  - "便當菜"
publishedAt: "2026-06-01"
updatedAt: "2026-06-01"
---

## 料理簡介

豆腐炒蛋是一道很適合租屋族的一人份料理，食材便宜、步驟簡單，也有不錯的蛋白質。

## 食材準備

- 雞蛋 2 顆
- 板豆腐半盒
- 蔥 1 支

## 作法

1. 豆腐用紙巾稍微壓乾。
2. 雞蛋打散，加入少許鹽。
3. 平底鍋加油，先放豆腐煎香。
4. 倒入蛋液，輕輕拌炒。
5. 加入醬油與蔥花即可。

## 小技巧

豆腐不要切太小，否則炒的時候容易碎。

## 保存方式

冷藏可保存 1 天，建議當餐吃完。

## 常見問題

### 可以用嫩豆腐嗎？

可以，但口感會比較軟，翻炒時要更輕。

### 可以當便當菜嗎？

可以，但建議豆腐煎乾一點，避免出水。
```

---

## 5.2 食材 JSON 格式

路徑：

```text
/src/data/ingredients.json
```

範例：

```json
[
  {
    "name": "雞蛋",
    "slug": "egg",
    "aliases": ["蛋", "雞蛋料理"],
    "category": "蛋類",
    "caloriesPer100g": 155,
    "proteinPer100g": 13,
    "fatPer100g": 11,
    "carbsPer100g": 1.1,
    "storage": "冷藏保存，避免放在冰箱門邊溫度變化大的位置。",
    "commonPairings": ["豆腐", "番茄", "蔥", "高麗菜"],
    "substitutes": ["豆腐", "雞胸肉"]
  }
]
```

---

## 5.3 情境 JSON 格式

路徑：

```text
/src/data/scenarios.json
```

範例：

```json
[
  {
    "name": "一人料理",
    "slug": "one-person-meal",
    "description": "適合一個人吃的簡單料理，份量剛好、不浪費食材。",
    "seoTitle": "一人料理食譜｜簡單、省錢、適合租屋族",
    "seoDescription": "整理適合一個人吃的一人料理食譜，包含電鍋、氣炸鍋、10分鐘料理與冰箱剩料料理。"
  }
]
```

---

# 6. Astro 專案結構

建議 repo 結構：

```text
recipe-site/
  public/
    ads.txt
    robots.txt
    images/
      recipes/
      ingredients/

  src/
    content/
      recipes/
        tofu-scrambled-eggs.md
        tomato-egg.md

    data/
      ingredients.json
      scenarios.json

    layouts/
      BaseLayout.astro
      RecipeLayout.astro

    pages/
      index.astro
      recipes/
        index.astro
        [slug].astro
      ingredients/
        index.astro
        [slug].astro
      scenarios/
        index.astro
        [slug].astro
      tools/
        fridge-recipe.astro
      about.astro
      contact.astro
      privacy-policy.astro
      terms.astro

    components/
      Header.astro
      Footer.astro
      RecipeCard.astro
      IngredientCard.astro
      AdSlot.astro
      SeoHead.astro
      RecipeJsonLd.astro
      BreadcrumbJsonLd.astro
      FridgeRecipeTool.astro

  astro.config.mjs
  package.json
```

---

# 7. SEO 規格

## 每頁必備

```text
title
meta description
canonical
Open Graph
Twitter Card
breadcrumb
structured data
image alt
內鏈
```

## Sitemap

需要產生：

```text
/sitemap-index.xml
/sitemap-recipes.xml
/sitemap-ingredients.xml
/sitemap-scenarios.xml
```

## Robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://你的網域/sitemap-index.xml
```

## 食譜頁 Title 範例

```text
豆腐炒蛋食譜｜10 分鐘完成的一人份高蛋白料理
```

## 食材頁 Title 範例

```text
雞蛋料理大全｜簡單雞蛋食譜、保存方式與營養熱量
```

## 情境頁 Title 範例

```text
一人料理食譜｜適合租屋族的簡單晚餐與便當菜
```

---

# 8. AdSense 規格

## 必備頁面

AdSense 申請前，網站至少要有：

```text
/about
/contact
/privacy-policy
/terms
```

## 必備檔案

```text
/public/ads.txt
```

內容範例：

```txt
google.com, pub-你的發布商ID, DIRECT, f08c47fec0942fa0
```

Google AdSense 官方說明建議網站使用 ads.txt，並將檔案放在網站根目錄，例如 `example.com/ads.txt`。([Google 支援][4])

## 廣告位置

第一階段建議少量放，不要一開始塞滿。

食譜頁：

```text
標題下方 1 個
食材清單後 1 個
文章底部 1 個
```

列表頁：

```text
每 8 張食譜卡插入 1 個
```

---

# 9. Cloudflare Pages 部署規格

## Build settings

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: /
Node.js version: 20 或 22
```

## 環境變數

第一階段可以只放：

```text
PUBLIC_SITE_URL=https://你的網域
PUBLIC_SITE_NAME=今天煮什麼
PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

## 自訂網域

建議使用：

```text
www.yourdomain.com
```

或直接：

```text
yourdomain.com
```

Cloudflare Domain 已經在 Cloudflare，DNS 設定會最簡單。

---

# 10. 第一批內容策略

第一階段不要做所有菜色。
先集中在「一人份 + 台灣常見食材」。

## 第一批 300 篇食譜分配

| 主題      | 數量 |
| ------- | -: |
| 雞蛋料理    | 40 |
| 豆腐料理    | 35 |
| 雞胸肉料理   | 35 |
| 高麗菜料理   | 25 |
| 菇類料理    | 25 |
| 電鍋料理    | 40 |
| 氣炸鍋料理   | 40 |
| 10 分鐘料理 | 30 |
| 冰箱剩料料理  | 30 |

## 第一批 100 個食材頁

優先做這些：

```text
雞蛋
豆腐
雞胸肉
高麗菜
洋蔥
青蔥
番茄
菇類
鮪魚罐頭
玉米罐頭
白飯
麵條
馬鈴薯
地瓜
花椰菜
菠菜
小黃瓜
豬肉片
鮭魚
蝦仁
```

## 第一批 30 個情境頁

```text
一人料理
租屋料理
10分鐘料理
15分鐘料理
電鍋料理
氣炸鍋料理
微波爐料理
不用開火料理
便當菜
減脂料理
高蛋白料理
低卡料理
宵夜料理
下酒菜
早餐料理
晚餐料理
冰箱剩料料理
全聯食材料理
省錢料理
學生料理
上班族料理
小家庭料理
懶人料理
一鍋到底
少油料理
低醣料理
素食料理
雞蛋料理
豆腐料理
雞胸肉料理
```

---

# 11. 第一階段不做的東西

為了保持 0 元月費，第一階段先不做：

```text
會員登入
收藏食譜
留言
評分
後台 CMS
資料庫
AI API
圖片生成
動態搜尋 API
Cloudflare Workers
Cloudflare D1
Cloudflare R2
```

圖片先放在：

```text
/public/images
```

內容先用：

```text
Markdown + JSON
```

---

# 12. 成功指標

## 上線第 1 個月

| 指標                |   目標 |
| ----------------- | ---: |
| 上線頁面              | 400+ |
| Google 收錄頁        | 100+ |
| Search Console 曝光 | 開始出現 |
| AdSense 申請        |   送審 |
| 月成本               | US$0 |

## 上線第 3 個月

| 指標         |                    目標 |
| ---------- | --------------------: |
| 上線頁面       |                  500+ |
| Google 收錄頁 |                  300+ |
| 月自然流量      | 3,000 - 10,000 visits |
| AdSense    |            通過或重新優化後再送 |
| 第一批有效關鍵字   |                   50+ |

## 上線第 6 個月

| 指標    |                      目標 |
| ----- | ----------------------: |
| 食譜頁   |                 1,000 篇 |
| 食材頁   |                    150+ |
| 情境頁   |                     50+ |
| 月自然流量 |          30,000+ visits |
| 月廣告收入 | NT$1,000 - NT$10,000 起測 |

---

# 13. 開發里程碑

## Milestone 1：專案骨架

完成：

```text
Astro 專案
Cloudflare Pages 部署
自訂網域
首頁
Header / Footer
BaseLayout
SEO Head component
```

## Milestone 2：內容系統

完成：

```text
Markdown 食譜 content collection
食譜列表頁
食譜詳細頁
食材 JSON
食材列表頁
食材詳細頁
```

## Milestone 3：SEO

完成：

```text
Recipe JSON-LD
FAQ JSON-LD
Breadcrumb JSON-LD
sitemap
robots.txt
canonical
OG image
```

## Milestone 4：AdSense 準備

完成：

```text
privacy-policy
terms
about
contact
ads.txt
AdSlot component
```

## Milestone 5：冰箱剩料工具

完成：

```text
前端食材輸入
本地 JSON 比對
推薦食譜排序
缺少食材提示
```

---

# 14. 第一階段驗收標準

第一版完成時，應該要達到：

```text
網站可透過自訂網域開啟
Cloudflare Pages 自動部署成功
首頁可正常顯示
食譜頁可正常產生
食材頁可正常產生
情境頁可正常產生
sitemap 可開啟
robots.txt 可開啟
ads.txt 可開啟
Recipe schema 可通過 Google Rich Results Test
Search Console 可驗證
AdSense 程式碼可插入
冰箱剩料工具可在前端運作
```

---

# 15. 建議 MVP 最小版本

最小可上線版本可以先縮到：

```text
100 篇食譜
30 個食材頁
10 個情境頁
1 個冰箱剩料工具
about/contact/privacy-policy/terms
ads.txt
sitemap
Recipe schema
```

但正式拿來測 SEO，我建議至少做到：

```text
300 篇食譜
100 個食材頁
30 個情境頁
```

這樣 Search Console 才比較快看出哪些主題有機會。

---

# 16. 第一階段總結

這一版的核心策略是：

```text
Cloudflare Pages Free
+
Astro 靜態頁
+
Markdown 食譜
+
JSON 食材資料
+
Recipe structured data
+
AdSense
+
自訂網域
```

也就是：

> 先用 0 元月費建立一個可收錄、可投廣告、可測流量的食譜 SEO 站。

第一階段不要追求功能完整。
先讓 Google 開始收錄，然後用 Search Console 的資料決定第二批內容要往哪裡擴張。

[1]: https://developers.cloudflare.com/pages/platform/limits/?utm_source=chatgpt.com "Limits · Cloudflare Pages docs"
[2]: https://developers.cloudflare.com/pages/functions/pricing/?utm_source=chatgpt.com "Pricing · Cloudflare Pages docs"
[3]: https://developers.google.com/search/docs/appearance/structured-data/recipe?utm_source=chatgpt.com "Recipe Schema Markup | Google Search Central | Documentation | Google for Developers"
[4]: https://support.google.com/adsense/answer/12171612?hl=zh-Hant&utm_source=chatgpt.com "Ads.txt 指南 - Google AdSense說明"
