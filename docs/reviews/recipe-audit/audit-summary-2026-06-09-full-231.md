# 食譜內容審查摘要（全站 231 篇）

- **審查日期**：2026-06-09
- **範圍**：`src/content/recipes` 全數 231 篇
- **方法**：機械 precheck ＋ 內容規則（模板殘文、重複句、份量／食安啟發式）
- **觸發方式**：終端 `npm run recipe-review:full` 或 Cursor 輸入 `/recipe-review`（見 `.cursor/hooks`）

## 統計

| 狀態 | 英文標籤 | 篇數 |
| --- | --- | --- |
| 通過 | Pass | 203 |
| 注意 | Warning | 28 |
| 嚴重 | Critical | 0 |

## 嚴重（請優先人工處理）

| — | — | 本輪無 Critical |

## 注意（節錄前 40 篇）

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| [egg-scallion-oil-noodles](reports/egg-scallion-oil-noodles.json) | 蛋蔥油麵 | 食材／調味清單有「油麵」，但步驟文字未出現（啟發式比對）。 |
| [fridge-bottom-soup-noodles](reports/fridge-bottom-soup-noodles.json) | 什錦蔬菜湯麵 | 湯品步驟需要加水，但食材清單未標示水量。 |
| [instant-miso-egg-soup](reports/instant-miso-egg-soup.json) | 味噌蛋花湯 | 湯品步驟需要加水，但食材清單未標示水量。 |
| [pesto-chicken-mushroom-pasta](reports/pesto-chicken-mushroom-pasta.json) | 青蔥蒜香雞肉菇類義大利麵 | al dente 說明重複或句子在換行處截斷。 |
| [sesame-cold-noodles-solo](reports/sesame-cold-noodles-solo.json) | 一人麻醬涼麵 | 食材／調味清單有「烏醋」，但步驟文字未出現（啟發式比對）。 |
| [sf-avocado-smoked-salmon-open-toast](reports/sf-avocado-smoked-salmon-open-toast.json) | 酪梨燻鮭魚／歐包 Open | 食材／調味清單有「酸豆」，但步驟文字未出現（啟發式比對）。 |
| [sf-bbq-roasted-half-chicken](reports/sf-bbq-roasted-half-chicken.json) | BBQ 溫烤半雞 | 食材／調味清單有「橄欖油」，但步驟文字未出現（啟發式比對）。 |
| [sf-bloody-mary-spicy-rice](reports/sf-bloody-mary-spicy-rice.json) | 血腥瑪麗辣味飯 | 食材／調味清單有「伏特加」，但步驟文字未出現（啟發式比對）。 |
| [sf-chef-crispy-pork-knuckle](reports/sf-chef-crispy-pork-knuckle.json) | 主廚脆皮豬腳 | 食材／調味清單有「薯條」，但步驟文字未出現（啟發式比對）。 |
| [sf-classic-caesar-salad](reports/sf-classic-caesar-salad.json) | 經典凱薩沙拉 | 步驟內有重複長句（例如「炸油 600毫升、海鹽 1/2小匙、凱薩醬 2大…」），疑似批次產文殘留。 |
| [sf-green-superhero-quinoa-buddha-bowl](reports/sf-green-superhero-quinoa-buddha-bowl.json) | 綠超人藜麥佛陀碗 | 食材／調味清單有「水波蛋」，但步驟文字未出現（啟發式比對）。 |
| [sf-griddled-butter-ham-sandwich](reports/sf-griddled-butter-ham-sandwich.json) | 厚烤奶油 Ham 三明治 | 食材／調味清單有「薯塊」，但步驟文字未出現（啟發式比對）。 |
| [sf-keto-surf-and-turf-platter](reports/sf-keto-surf-and-turf-platter.json) | 生酮總匯海陸拼盤 | 食材／調味清單有「綜合生菜」，但步驟文字未出現（啟發式比對）。 |
| [sf-kids-cream-chicken-penne](reports/sf-kids-cream-chicken-penne.json) | 北鼻奶油雞肉長管麵 | 食材／調味清單有「長管麵」，但步驟文字未出現（啟發式比對）。 |
| [sf-orange-danish-poached-seafood-potato](reports/sf-orange-danish-poached-seafood-potato.json) | 橙香法式丹麥 水波海鮮洋芋 | 食材／調味清單有「炒薯」，但步驟文字未出現（啟發式比對）。 |
| [sf-roasted-sesame-chicken-salad](reports/sf-roasted-sesame-chicken-salad.json) | 焙煎胡麻雞沙拉 | 步驟內有重複長句（例如「炸油 600毫升、海鹽 1/2小匙、焙煎胡麻醬 …」），疑似批次產文殘留。 |
| [sf-second-floor-saltwater-chicken-salad](reports/sf-second-floor-saltwater-chicken-salad.json) | 貳樓金牌鹽水雞沙拉 | 步驟內有重複長句（例如「炸油 600毫升、海鹽 1/2小匙、鹽水雞油醋 …」），疑似批次產文殘留。 |
| [sf-signature-double-stack-burger](reports/sf-signature-double-stack-burger.json) | 實打實招牌漢堡 | 食材／調味清單有「漢堡麵包」，但步驟文字未出現（啟發式比對）。 |
| [sf-sous-vide-chicken-quinoa-cauliflower-rice](reports/sf-sous-vide-chicken-quinoa-cauliflower-rice.json) | 舒肥雞藜麥花椰飯 | 步驟內有重複長句（例如「橄欖油 1.5大匙、海鹽 1/3小匙、起司醬 2…」），疑似批次產文殘留。 |
| [sf-spicy-mexican-firecracker-burger](reports/sf-spicy-mexican-firecracker-burger.json) | 老墨辣鞭炮漢堡 | 食材／調味清單有「漢堡麵包」，但步驟文字未出現（啟發式比對）。 |
| [sf-supreme-cheese-omelette](reports/sf-supreme-cheese-omelette.json) | 總匯奶起司歐姆蕾 | 食材／調味清單有「炒薯」，但步驟文字未出現（啟發式比對）。 |
| [sf-truffle-mushroom-cream-pasta](reports/sf-truffle-mushroom-cream-pasta.json) | 松露蕈菇奶油麵 | 食材／調味清單有「鮮奶油」，但步驟文字未出現（啟發式比對）。 |
| [spicy-seafood-tomato-pasta](reports/spicy-seafood-tomato-pasta.json) | 海鮮番茄辣麵 | al dente 說明重複或句子在換行處截斷。 |
| [tofu-tomato-pasta](reports/tofu-tomato-pasta.json) | 豆腐番茄義大利麵 | al dente 說明重複或句子在換行處截斷。 |
| [weight-loss-clear-mushroom-soup](reports/weight-loss-clear-mushroom-soup.json) | 減脂菇類清湯 | 湯品步驟需要加水，但食材清單未標示水量。 |
| [weight-loss-shrimp-veg-salad](reports/weight-loss-shrimp-veg-salad.json) | 減脂鮮蝦沙拉 | 步驟提到「白芝麻」，但未列在食材／customAdditions／substitutions。 |
| [weight-loss-zucchini-chicken](reports/weight-loss-zucchini-chicken.json) | 減脂櫛瓜雞肉 | 步驟內有重複長句（例如「。\"，炒至表面全熟即可。"
"備料：\"…」），疑似批次產文殘留。 |
| [white-sauce-chicken-pasta](reports/white-sauce-chicken-pasta.json) | 白醬雞肉義大利麵 | al dente 說明重複或句子在換行處截斷。 |


## 通過

共 **203** 篇，詳見各 `reports/{slug}.json` 中 `status: Pass`。

## 後續

1. 先處理 **Critical**；Warning 多為食材／步驟字面比對啟發式，需人工判斷是否 false positive。
2. 需更深語意審查時，對單篇使用 `@recipe-review` 或 `node scripts/recipe-review-precheck.mjs --slug <slug>`。
3. 刻意保留者寫入 `overrides.json`。
