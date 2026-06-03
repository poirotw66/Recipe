# UI/UX 設計基礎

## Meta

- 專案：Bloom Kitchen（今天煮什麼）
- 建立：2026-05-28
- 更新：2026-05-28

## 版本歷程

| 版本 | 日期 | 變更 |
| --- | --- | --- |
| v1.1 | 2026-06-03 | spec-010：Bloom Kitchen 品牌名與 Bloss0m 生態對齊 |

## Intent First

### 誰在用

主要使用者是台灣租屋族、一人生活者、學生、上班族，常在下班後或晚餐前打開手機，手邊有幾樣常見食材，但不想花太多時間搜尋、比較或理解複雜食譜。

### 他要完成什麼

快速找到「我現在能煮什麼」，並判斷這道料理是否符合時間、設備、份量、健康目標與現有食材。

### 應該感覺像什麼

像一張貼在小廚房牆上的清楚料理便條：溫暖、務實、容易掃讀，不像食譜雜誌那樣華麗，也不像工具後台那樣冷硬。

## 產品領域探索

### 領域

- 冰箱剩料
- 一人份
- 租屋小廚房
- 電鍋
- 氣炸鍋
- 全聯食材
- 10 分鐘晚餐
- 高蛋白減脂
- 便當菜
- 台灣家常味

### 色彩世界

- 米飯白：乾淨、日常、食物背景。
- 青蔥綠：新鮮、可行動、料理完成感。
- 醬油墨：文字主色，帶有台灣家常料理的味覺聯想。
- 番茄紅：提醒、熱度、重點標籤。
- 蛋黃金：熱門、推薦、溫暖感。
- 電鍋銀：器具、設備、輔助資訊。
- 砧板木：分隔、卡片、食材分類的自然感。

### 標誌性元素

「冰箱便條」式資訊塊：每張食譜卡像一張貼在冰箱上的料理便條，直接標示時間、設備、份量、主要食材與缺少食材數。這是本站區別於一般食譜列表的核心視覺語言。

### 刻意不用的預設

- 不用通用紫色/藍紫漸層 → 改用食材與廚房器具推導的自然色，讓站點更像台灣日常料理。
- 不用雜誌式大圖滿版首頁 → 改用搜尋與食材入口優先，因為使用者的任務是快速找到能煮的東西。
- 不用厚重圓角卡片堆疊 → 改用 6-8px 小圓角、細邊框與便條式資訊密度，避免內容站變成樣板 landing page。

### 設計方向

今天煮什麼的 UI 應該像「會整理冰箱食材的料理便條本」：暖而不膩、資訊密度適中、手機上很好掃讀。對外品牌為 **Bloom Kitchen | 今天煮什麼**（單行 Header 標示）；首頁和列表頁以搜尋、篩選、分類入口為主，圖片輔助判斷但不喧賓奪主。食譜卡的價值不是漂亮，而是讓使用者在 3 秒內知道「我能不能煮、多久能煮、缺什麼」。

## 技術棧

| 項目 | 選擇 | 說明 |
| --- | --- | --- |
| 前端框架 | Astro | 靜態內容站，適合 SEO 與 Cloudflare Pages Free。 |
| UI 元件庫 | 無，使用 Astro components + CSS | 第一階段避免引入重型 UI library，保持輸出簡單。 |
| CSS 方案 | 全域 CSS + CSS custom properties | 以 design tokens 控制色彩、間距、字型。 |
| 圖示庫 | Lucide | 後續需要搜尋、時間、設備、篩選等圖示時使用。 |
| 字型載入 | 系統字型優先 | 第一階段降低外部請求；必要時後續再評估自託管字型。 |

## 色彩系統

### Token 命名原則

Token 使用產品語意命名，不使用隨機 hex 或單純 `gray-700`。CSS 實作可同時提供語意 alias，方便元件使用。

### 主色彩

| 名稱 | Token | 色碼 | 用途 | Why |
| --- | --- | --- | --- | --- |
| 青蔥綠 | `--scallion` | `#2F7D4F` | 主要 CTA、可操作狀態、成功行動 | 來自台灣家常料理常見蔥花，代表新鮮與「可以開始煮」。 |
| 蛋黃金 | `--egg-yolk` | `#F2B84B` | 推薦、熱門、重點標籤 | 代表簡單、便宜、高頻的一人料理核心食材。 |
| 番茄紅 | `--tomato` | `#D94A38` | 警示、缺少食材、重點提醒 | 有食物熱度，比一般 danger red 更貼近料理語境。 |

### 背景與表面

| 名稱 | Token | 色碼 | 用途 |
| --- | --- | --- | --- |
| 米飯白 | `--rice` | `#FFFDF7` | App 基礎背景。 |
| 便條紙 | `--note` | `#FFF6DA` | 重點提示、食譜摘要。 |
| 砧板木 | `--board` | `#E8D8BA` | 分隔區、分類入口底色。 |
| 電鍋銀 | `--cooker` | `#E7E4DC` | 次要表面、設備資訊。 |
| 白瓷面 | `--porcelain` | `#FFFFFF` | 卡片、表單、主要內容面。 |

### 文字與邊框

| 名稱 | Token | 色碼 | 用途 |
| --- | --- | --- | --- |
| 醬油墨 | `--soy-ink` | `#2D2620` | 主要文字。 |
| 香菇褐 | `--mushroom` | `#6F6258` | 次要文字。 |
| 芝麻灰 | `--sesame` | `#9A9087` | 輔助文字、placeholder。 |
| 米糠線 | `--bran-line` | `#DDD2C2` | 預設邊框。 |
| 焦糖線 | `--caramel-line` | `#B99C71` | 強調邊框、focus ring 輔助。 |

### 功能性色彩

| 名稱 | Token | 色碼 | 用途 |
| --- | --- | --- | --- |
| Success | `--success` | `#2F7D4F` | 成功、可煮、已完成。 |
| Warning | `--warning` | `#C9822B` | 注意、缺少部分食材。 |
| Danger | `--danger` | `#D94A38` | 錯誤、不可用、缺少關鍵食材。 |
| Info | `--info` | `#3B6F8F` | 資訊提示、營養或設備補充。 |

### 狀態顏色對應

| 狀態 | 顏色 | Badge 樣式 | 說明 |
| --- | --- | --- | --- |
| 可直接煮 | `--success` | 淡底 + 深色文字 | 食材完全命中。 |
| 少 1-2 樣 | `--warning` | 淡底 + 邊框 | 可替代或可採買。 |
| 缺關鍵食材 | `--danger` | 淡底 + 深色文字 | 不建議立即煮。 |
| 推薦 / 熱門 | `--egg-yolk` | 填色小標 | 用於首頁與列表強調。 |
| 設備資訊 | `--cooker` + `--soy-ink` | 淡底膠囊 | 電鍋、氣炸鍋、微波爐等。 |

## 字型系統

### 字體

| 用途 | 字體 | Fallback | Why |
| --- | --- | --- | --- |
| 標題 | system-ui | `-apple-system`, `BlinkMacSystemFont`, `"Noto Sans TC"`, sans-serif | 保持快速載入，中文標題清楚，不追求雜誌感。 |
| 內文 | system-ui | `-apple-system`, `BlinkMacSystemFont`, `"Noto Sans TC"`, sans-serif | 食譜內容需要長時間閱讀與手機掃讀。 |
| 數字/時間 | `ui-monospace` | `SFMono-Regular`, Consolas, monospace | 料理時間、熱量、蛋白質等數字需整齊。 |

### 字型大小

| 名稱 | 大小 | 行高 | 用途 |
| --- | --- | --- | --- |
| display | 40px | 1.15 | 首頁品牌主標，僅桌面使用。 |
| h1 | 32px | 1.2 | 頁面標題。 |
| h2 | 24px | 1.28 | 區塊標題。 |
| h3 | 19px | 1.35 | 卡片標題、小節標題。 |
| body | 16px | 1.7 | 內文與食譜步驟。 |
| small | 14px | 1.55 | 說明文字、輔助資訊。 |
| caption | 12px | 1.4 | 標籤、單位、meta。 |

### 字重

| 名稱 | 數值 | 用途 |
| --- | --- | --- |
| Regular | 400 | 內文。 |
| Medium | 500 | 食材名稱、導覽。 |
| Semibold | 600 | 卡片標題、區塊標題。 |
| Bold | 700 | 頁面標題與重要數字。 |

## 間距系統

- 基準單位：4px。
- 食譜頁使用較舒適的段落間距；列表與工具頁使用較密集但可掃讀的間距。

| Token | 值 | 用途 |
| --- | --- | --- |
| `--space-1` | 4px | 細微間隔、icon gap。 |
| `--space-2` | 8px | 相關元素間距。 |
| `--space-3` | 12px | 卡片內小區塊。 |
| `--space-4` | 16px | 表單、卡片 padding。 |
| `--space-6` | 24px | 區塊內主要間距。 |
| `--space-8` | 32px | 頁面 section 間距。 |
| `--space-12` | 48px | 大區塊間距。 |

## 佈局

### 頁面結構

```text
Header: brand + primary nav + search shortcut
Main:
  - Page intro / search intent
  - Fast filters / scenario entries
  - Recipe or taxonomy content grid
  - Related internal links
Footer: site links + legal links + ads/privacy notes
```

首頁第一屏必須讓使用者看到 **Bloom Kitchen | 今天煮什麼** 單行品牌、食材搜尋/輸入入口、熱門分類入口，且露出下一段內容提示。

### 響應式斷點

| 名稱 | 寬度 | 佈局變化 |
| --- | --- | --- |
| mobile | < 720px | 單欄，搜尋入口優先，卡片滿寬。 |
| tablet | 720px - 1040px | 兩欄 grid，分類入口可橫向排列。 |
| desktop | >= 1040px | 最大寬內容區，3 欄食譜卡或 2 欄內容 + 側欄。 |

### 容器

| 項目 | 值 |
| --- | --- |
| 內容最大寬度 | 1120px |
| 食譜文章最大寬度 | 760px |
| mobile 邊距 | 16px |
| desktop 邊距 | 32px |

## 深度策略

採用「細邊框 + 極淡陰影」。

Why：食譜站需要溫暖與可讀性，但不能像高級電商一樣厚重。細邊框能維持資訊密度，極淡陰影只用來讓食譜卡與表單從米飯白背景中浮起。

| Level | 用途 | 規範 |
| --- | --- | --- |
| Level 0 | App 背景 | `--rice` |
| Level 1 | 卡片、表單、文章區塊 | `--porcelain`, `1px solid --bran-line`, shadow small |
| Level 2 | Popover、搜尋建議、下拉篩選 | `--porcelain`, stronger border, shadow medium |
| Level 3 | Dialog | `--porcelain`, overlay + shadow large |

## 元件規範

### 食譜卡

食譜卡是核心元件，必須比一般 article card 更任務導向。

必備資訊：

- 圖片或色塊 placeholder。
- 食譜名稱。
- 一句話描述。
- 時間、份量、設備。
- 主要食材 3-5 個。
- 情境 tags。
- 若在冰箱工具情境中，顯示命中食材與缺少食材。

樣式：

- 8px 以下圓角。
- 圖片比例固定為 4:3 或 3:2，避免 layout shift。
- tags 使用淡底，不使用高彩度滿版色。
- CTA 文案以「看作法」「看看缺什麼」「加入今晚清單」這類任務語言為主。

### 按鈕

| 變體 | 用途 | 樣式 |
| --- | --- | --- |
| Primary | 搜尋、查看食譜、開始比對 | `--scallion` 填色，白字。 |
| Secondary | 篩選、次要入口 | 白瓷面 + 米糠線邊框。 |
| Note | 推薦、熱門入口 | `--note` 背景 + 醬油墨文字。 |
| Danger | 清除或錯誤修正 | 番茄紅文字或淡底，避免大面積紅色。 |
| Text | 文章內鏈、輔助操作 | 醬油墨文字 + underline on hover。 |

尺寸：

- Small: 32px high。
- Medium: 40px high。
- Large: 48px high。

狀態：

- default：符合變體樣式。
- hover：背景降低/提高 4-6% 明度，不改變 layout。
- active：向內壓，使用 inset shadow 或較深背景。
- focus：2px `--caramel-line` outline，offset 2px。
- disabled：低對比、不可點游標、保留文字可讀性。
- loading：保留寬度，顯示 spinner 或「處理中」。

### 表單與搜尋

| 項目 | 規範 |
| --- | --- |
| 標籤位置 | top，mobile 易讀。 |
| 搜尋框 | 高 48px，左側搜尋圖示，placeholder 以食材例子呈現。 |
| 錯誤訊息位置 | 欄位下方。 |
| 驗證時機 | submit 後顯示，工具頁可即時輔助。 |
| 食材輸入 | 支援 comma、頓號、空白分隔的視覺提示。 |

### 導覽

- Header 不做龐大 mega menu。
- 主要導覽：食譜、食材、情境、冰箱剩料工具。
- mobile 使用可展開 menu；搜尋入口保持可見。
- Footer 必須包含 about/contact/privacy-policy/terms。

### Badge / Tag

| 類型 | 樣式 |
| --- | --- |
| 情境 tag | 便條紙淡底 + 醬油墨。 |
| 設備 tag | 電鍋銀淡底 + icon。 |
| 時間 tag | 白瓷面 + 米糠線邊框 + mono 數字。 |
| 營養 tag | 青蔥綠淡底或 info 淡底。 |
| 缺少食材 | 番茄紅淡底，文字保持克制。 |

### Modal / Dialog

第一階段少用 modal。必要時：

| 項目 | 規範 |
| --- | --- |
| 尺寸 | Small 400px / Medium 600px |
| 遮罩 | `rgba(45, 38, 32, 0.36)` |
| 關閉方式 | X + ESC；確認彈窗不可點遮罩關閉。 |
| 按鈕位置 | 右下，主要操作在右。 |

### Toast / 通知

| 項目 | 規範 |
| --- | --- |
| 位置 | mobile 底部，desktop 右下。 |
| 顯示時間 | success 3 秒，error 5 秒。 |
| 類型 | success / error / warning / info。 |
| 語氣 | 口語但精準，例如「已找到 8 道可煮食譜」。 |

## 圖示

| 項目 | 規範 |
| --- | --- |
| 圖示庫 | Lucide |
| inline | 16px |
| button | 18-20px |
| nav | 20px |
| 顏色 | 繼承文字顏色 |

常用圖示語意：

- Search：食材搜尋。
- Clock：料理時間。
- Utensils：份量/料理。
- Flame：熱量或熱門。
- Dumbbell：高蛋白。
- Refrigerator：冰箱剩料工具。
- CookingPot：電鍋/鍋具。
- Filter：篩選。

## 暗色模式

第一階段不支援暗色模式。

Why：食譜與 SEO 內容站第一階段優先處理可讀性、內容量與收錄；暗色模式會增加圖片、廣告、structured content 的視覺測試成本。後續若自然流量穩定，再評估跟隨系統主題。

## 品質測試

### Swap test

若換成 Inter、紫色漸層、白底大卡片，網站會失去台灣日常料理與冰箱便條感。通過。

### Squint test

模糊後仍可分辨：米飯白背景、白瓷卡片、便條紙重點區、青蔥綠 CTA。通過。

### Signature test

五個標誌性元素：

1. 冰箱便條式食譜卡。
2. 食材命中/缺少食材 badge。
3. 青蔥綠主要 CTA。
4. 米飯白 + 便條紙 + 醬油墨的內容色彩。
5. 時間/份量/設備的固定 meta row。

通過。

### Token test

Token 名稱如 `--rice`、`--scallion`、`--soy-ink`、`--egg-yolk`、`--cooker` 能讀出產品世界，而非模板色階。通過。

## CSS Token Draft

```css
:root {
  --rice: #fffdf7;
  --porcelain: #ffffff;
  --note: #fff6da;
  --board: #e8d8ba;
  --cooker: #e7e4dc;

  --soy-ink: #2d2620;
  --mushroom: #6f6258;
  --sesame: #9a9087;
  --bran-line: #ddd2c2;
  --caramel-line: #b99c71;

  --scallion: #2f7d4f;
  --egg-yolk: #f2b84b;
  --tomato: #d94a38;
  --success: #2f7d4f;
  --warning: #c9822b;
  --danger: #d94a38;
  --info: #3b6f8f;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgba(45, 38, 32, 0.06);
  --shadow-md: 0 8px 20px rgba(45, 38, 32, 0.10);
}
```

## 備註

- 這份 guideline 是後續 `vif-ui-spec` 與 Astro UI 實作的設計依據。
- 若實作時發現 token 不足，新增 token 前需先說明它對應哪個料理/廚房語意。
- 不要把首頁做成產品 landing page；第一屏必須服務搜尋與導流。
