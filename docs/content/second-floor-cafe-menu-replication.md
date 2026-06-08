# 貳樓 Second Floor Cafe — 完整菜單與 1:1 還原規格

> 更新日期：2026-06-09  
> 專區：`/restaurant-replicas/`  
> 食譜前綴：`sf-*`（共 **70 篇**已上線）  
> 官方菜單：[secondfloorcafe.com/menu](https://www.secondfloorcafe.com/menu/)

---

## 品牌與用餐規則

| 項目 | 內容 |
| --- | --- |
| 品牌 | 貳樓 Second Floor Cafe（2007 創立，全台約 20 家） |
| 類型 | 美式早午餐、義式飯麵、燉飯、漢堡、大盤分享餐 |
| 低消 | 每人至少 1 份菜單品項（加價購除外） |
| 服務費 | 10% |

### 附餐規則

| 系列 | 附贈 |
| --- | --- |
| **主餐｜飯麵** | 主廚濃湯 or 蕃茄蔬菜湯（蛋奶素）二擇一 |
| **主餐｜盤餐** | 3 樣配菜 |
| **開放三明治 Open** | 無限續杯美式咖啡 |
| **貳樓早午餐** | 2 杯飲料（第 2 杯可續杯） |
| **小大人餐** | 果汁 or 牛奶 |

### 加購升級

| 加價 | 內容 |
| --- | --- |
| +90 | 濃湯、小點或甜點擇一 |
| +220 | 歐式麵包盤（可續）等五選三組合 |

### 商業午餐

週一至週五 10:00～14:00（國定假日不提供），含濃湯與飲品。

---

## 資料檔

| 檔案 | 用途 |
| --- | --- |
| [`src/data/second-floor-menu.json`](../../src/data/second-floor-menu.json) | 結構化菜單（無價格、含成分） |
| [`scripts/generate-second-floor-recipes.mjs`](../../scripts/generate-second-floor-recipes.mjs) | 食譜產生器 |
| `docs/content/second-floor-menu-images/pic_*.jpg` | 官網菜單圖備份 |

---

## TOP 10 人氣

| 品項 | 食譜 slug |
| --- | --- |
| 曙光汁鮮蝦雞肉麵 | `sf-dawn-shrimp-chicken-linguine` |
| 水波燻牛肉／丹麥 Open | `sf-poached-egg-smoked-beef-danish-open` |
| 香爆椒麻唐揚雞麵 | `sf-spicy-pepper-karaage-pasta` |
| 橙香法式丹麥 Sunny 舒肥雞 | `sf-orange-danish-sunny-sous-vide-chicken` |
| 主廚脆皮豬腳 | `sf-chef-crispy-pork-knuckle` |
| 血腥瑪麗辣味飯 | `sf-bloody-mary-spicy-rice` |
| 台式熱炒鹹蛋苦瓜麵 | `sf-salted-egg-bitter-melon-pasta` |
| 貳樓金牌鹽水雞沙拉 | `sf-second-floor-saltwater-chicken-salad` |
| 起司 Local 香腸奶白麵 | `sf-cheesy-local-sausage-cream-pasta` |
| 燻鮭魚奶油炒菇班尼蛋 | `sf-smoked-salmon-mushroom-eggs-benedict` |

---

## 1. 分享盤 Sharing Plate

| 品項 | 成分 | slug |
| --- | --- | --- |
| 舊金山蒜香薯條 | 薯條、蒜味奶油醬 | `sf-san-francisco-garlic-fries` |
| 燕麥脆脆炸魚薯條 | 燕麥炸魚、薯條、塔塔醬 | `sf-oat-crusted-fish-and-fries` |
| 松露薯條 | 薯條、松露醬、起司粉 | `sf-truffle-fries` |
| 普丁肉醬薯條 | 薯條、肉醬、起司醬 | `sf-poutine-meat-sauce-fries` |
| 金黃流沙薯條 | 薯條、金沙醬（微風南山限定） | `sf-salted-egg-yolk-fries` |
| 莎莎黑咖哩炸雞 | 炸雞、黑咖哩、莎莎（微風南山限定） | `sf-salsa-black-curry-fried-chicken` |
| 墨西哥雞肉酥餅 | 薄餅、雞肉、酪梨醬、莎莎 | `sf-chicken-quesadilla` |
| 墨西哥 Local 香腸酥餅 | 薄餅、香腸、酪梨醬、莎莎 | `sf-local-sausage-quesadilla` |
| 酥炸鮮魷佐雞尾酒醬 | 魷魚、薯條、雞尾酒醬 | `sf-crispy-calamari-cocktail-sauce` |
| 水牛城辣雞翅 | 炸雞翅、水牛城醬 | `sf-buffalo-chicken-wings` |
| 貳樓金牌鹽水雞沙拉 | 鹽水雞、山苦瓜、火烤玉米、油醋 | `sf-second-floor-saltwater-chicken-salad` |
| 焙煎胡麻雞沙拉 | 炸雞、焙煎胡麻醬 | `sf-roasted-sesame-chicken-salad` |
| 經典凱薩沙拉 | 培根、麵包丁、凱薩醬 | `sf-classic-caesar-salad` |
| 經典舒肥雞凱薩沙拉 | 凱薩 + 舒肥雞 | `sf-sous-vide-chicken-caesar-salad` |
| 經典燻鮭魚凱薩沙拉 | 凱薩 + 燻鮭 + 溏心蛋 | `sf-smoked-salmon-caesar-salad` |

---

## 2. 均衡盤 Light Plate

| 品項 | slug |
| --- | --- |
| 綠超人藜麥佛陀碗 | `sf-green-superhero-quinoa-buddha-bowl` |
| 舒肥雞藜麥花椰飯 | `sf-sous-vide-chicken-quinoa-cauliflower-rice` |
| 生酮總匯海陸拼盤 | `sf-keto-surf-and-turf-platter` |
| 熱帶水果優格碗 | `sf-tropical-yogurt-bowl` |
| 巴西莓果優格碗 | `sf-acai-berry-yogurt-bowl` |

---

## 3. 開放三明治 Open

| 品項 | slug |
| --- | --- |
| 酪梨慢煎培根／歐包 Open | `sf-avocado-bacon-open-toast` |
| 水波燻牛肉／丹麥 Open | `sf-poached-egg-smoked-beef-danish-open` |
| 酪梨燻鮭魚／歐包 Open | `sf-avocado-smoked-salmon-open-toast` |
| 酪梨 Local 香腸／丹麥 Open | `sf-avocado-local-sausage-danish-open` |
| 黑松露厚切藍帶豬／歐包 Open | `sf-black-truffle-cordon-bleu-pork-open` |

---

## 4. 貳樓早午餐 SF Brunch

### 橙香法式丹麥

| 品項 | slug |
| --- | --- |
| Sunny 舒肥雞 | `sf-orange-danish-sunny-sous-vide-chicken` |
| 水波海鮮洋芋 | `sf-orange-danish-poached-seafood-potato` |
| 舒肥牛排 | `sf-orange-danish-sous-vide-steak` |
| 蕈菇水波洋芋 | `sf-orange-danish-mushroom-poached-potato` |

### 班尼蛋奶油炒菇

| 品項 | slug |
| --- | --- |
| 經典火腿 | `sf-classic-ham-mushroom-eggs-benedict` |
| 台胃口水雞 | `sf-sichuan-chicken-mushroom-eggs-benedict` |
| 經典牛肉 | `sf-classic-beef-mushroom-eggs-benedict` |
| 燻鮭魚 | `sf-smoked-salmon-mushroom-eggs-benedict` |

### 歐姆蕾

| 品項 | slug |
| --- | --- |
| 總匯奶起司 | `sf-supreme-cheese-omelette` |
| 烏斯特肉醬 | `sf-worcester-meat-sauce-omelette` |
| 蕈菇奶起司 | `sf-mushroom-cheese-omelette` |

---

## 5. 主餐｜飯麵 Main

| 品項 | slug |
| --- | --- |
| 辣茄汁香煸培根長管麵 | `sf-spicy-tomato-bacon-penne` |
| 曙光汁鮮蝦雞肉麵 | `sf-dawn-shrimp-chicken-linguine` |
| 香爆椒麻唐揚雞麵 | `sf-spicy-pepper-karaage-pasta` |
| 家鄉肉醬長管麵佐老媽肉丸 | `sf-homestyle-meat-sauce-penne-with-meatballs` |
| 經典青醬鮮蝦麵 | `sf-classic-pesto-shrimp-pasta` |
| 酒香蒜味蛤蜊墨魚麵 | `sf-white-wine-garlic-clam-squid-ink-pasta` |
| 台式熱炒鹹蛋苦瓜麵 | `sf-salted-egg-bitter-melon-pasta` |
| 起司 Local 香腸奶白麵 | `sf-cheesy-local-sausage-cream-pasta` |
| 貳樓費氏鮮蝦長管麵 | `sf-second-floor-fiesta-shrimp-penne` |
| 巴薩米克蕈菇麵 | `sf-balsamic-mushroom-pasta` |
| 松露蕈菇奶油麵 | `sf-truffle-mushroom-cream-pasta` |
| 血腥瑪麗辣味飯 | `sf-bloody-mary-spicy-rice` |
| 老闆黑胡椒漢堡排飯 | `sf-black-pepper-hamburg-rice` |
| 西班牙辣炒海陸飯 | `sf-spicy-spanish-surf-and-turf-rice` |
| 焗厚切豬排奶油飯 | `sf-baked-thick-cut-pork-cream-rice` |
| 月見苦瓜奶油飯 | `sf-moon-view-bitter-melon-cream-rice` |

---

## 6. 主餐｜手抓 Big Bite

| 品項 | slug |
| --- | --- |
| 厚烤奶油 Ham 三明治 | `sf-griddled-butter-ham-sandwich` |
| 老墨辣鞭炮漢堡 | `sf-spicy-mexican-firecracker-burger` |
| 實打實招牌漢堡 | `sf-signature-double-stack-burger` |

---

## 7. 主餐｜盤餐 Big Plate

| 品項 | slug |
| --- | --- |
| BBQ 溫烤半雞 | `sf-bbq-roasted-half-chicken` |
| 主廚脆皮豬腳 | `sf-chef-crispy-pork-knuckle` |

---

## 8. 小大人餐 Kids

| 品項 | slug |
| --- | --- |
| 牛蛋小堡堡套餐 | `sf-mini-beef-egg-burger-set` |
| 吃光光起司蛋雞肉飯 | `sf-cheesy-chicken-egg-rice` |
| 北鼻奶油雞肉長管麵 | `sf-kids-cream-chicken-penne` |

---

## 9. 甜點 Dessert

| 品項 | slug |
| --- | --- |
| 強的 | `sf-strong-chocolate-cake` |
| 布朗尼冰淇淋 | `sf-brownie-ice-cream` |
| 全美起司蛋糕 | `sf-american-cheesecake` |
| 鄉村肉桂蜜桃派 | `sf-country-cinnamon-peach-pie` |

---

## 10. 林口店限定

| 品項 | slug |
| --- | --- |
| Greek style 野炊系炭烤雞肉早午餐 | `sf-greek-campfire-grilled-chicken-brunch` |
| 野炊系義式檸香櫛瓜魚菲力 | `sf-campfire-lemon-zucchini-fish-fillet` |

---

## 11. 分店／季節限定

| 品項 | slug |
| --- | --- |
| 甘味飯（台南） | `sf-sweet-savory-rice` |
| 金黃流沙海鮮披薩 | `sf-salted-egg-seafood-pizza` |
| 朝日藍帶豬排堡（商業午餐） | `sf-asahi-cordon-bleu-pork-burger` |
| 南洋辛香雞肉飯（商業午餐） | `sf-south-sea-spiced-chicken-rice` |

---

## 未收錄為食譜的品項

以下為**飲料／雞尾酒／啤酒**，本站以料理食譜為主，不另建還原頁：

- 咖啡、奶昔、冰沙、茶品、康普茶
- 雞尾酒、啤酒

---

## 還原食譜規範

- `tags` 含 `名店還原`
- `restaurantSource.restaurant`: `貳樓 Second Floor Cafe`
- 附餐規則寫入 intro／steps（濃湯、續杯飲料等）
- 不記錄門市價格

---

## 還原進度

| 狀態 | 數量 |
| --- | ---: |
| 已上線（`sf-*`） | 70 |
| 待寫 | 0 |

飲料類不計入上表。

---

## 備註

- 菜單圖版本 `v=2606081616`，品項會隨季節調整。
- 還原食譜為公開做法整理，**非**官方授權食譜。
