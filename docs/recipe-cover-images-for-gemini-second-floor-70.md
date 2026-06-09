# 食譜成品圖繪製清單（貳樓名店還原 70 篇，給 Gemini）

本站新增 **70 篇**貳樓 Second Floor Cafe 名店還原食譜（`sf-*` slug），目前 `coverImage` 皆為 `.svg` 佔位。請依下表各產出一張成品圖；圖檔放入 `public/images/recipes/` 後，將 frontmatter 的 `coverImage` 改為 `.webp` 即可上線。

## 輸出規格建議

| 項目 | 建議 |
| --- | --- |
| 比例 | 4:3（例如 1200×900 或 800×600） |
| 格式 | WebP（或 PNG 再轉 WebP） |
| 風格 | 彩鉛 + 水彩插畫（colored pencil and watercolor illustration），溫暖居家、非寫實攝影 |
| 構圖 | 餐廳份量成品為主角；**每道菜使用不同場景／角度／光線**（見下方各篇 prompt，避免重複道具組合） |
| 還原取向 | 美式早午餐／義式飯麵風格，份量可略豐盛，但維持插畫感而非商業攝影 |
| 文字 | 圖上不要加字、不要浮水印 |
| 存放路徑 | `public/images/recipes/` |
| 檔名 | 與下表「檔名」欄一致（slug + `.webp`） |

上線後每篇食譜 frontmatter：`coverImage: "/images/recipes/{slug}.webp"`

多語系食譜（`recipes-en` / `recipes-ja` / `recipes-ko`）封面路徑與繁中版相同。

---

## 圖片進度狀態

- 🟡 **進行中（已完成 51 篇，共 70 篇）**：SF-01 ~ SF-51 已生成 WebP 圖片並更新 frontmatter 路徑；其餘 19 篇（SF-52 ~ SF-70）因到達繪圖模型上限，待配額重置後接續生成。

---

## Prompt 風格尾段（每道食譜都接上）

> **場景與構圖寫在各食譜段落內**；以下只統一畫風與輸出限制，不要每張都複製同一套木桌／窗光／水杯／布巾。

```text
Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 構圖變化對照（給批次產圖時參考）

| # | 食譜 | 場景／角度／光線（摘要） |
| --- | --- | --- |
| 1 | 舊金山蒜香薯條 | 紙筒薯條籃、蒜味醬、酒吧木桌、暖色吊燈 |
| 2 | 燕麥脆脆炸魚薯條 | 炸魚薯條籃、塔塔醬、檸檬、中島檯面 |
| 3 | 松露薯條 | 黑碗松露薯條、大理石吧台、俯視 |
| 4 | 普丁肉醬薯條 | 肉醬起司薯條、淺盤、宵夜暖光 |
| 5 | 金黃流沙薯條 | 金沙醬薯條、大理石桌、側光 |
| 6 | 莎莎黑咖哩炸雞 | 黑咖哩炸雞、莎莎醬、木盤斜角 |
| 7 | 墨西哥雞肉酥餅 | 雞肉酥餅、鑄鐵盤、酪梨醬配菜 |
| 8 | 墨西哥 Local 香腸酥餅 | 香腸酥餅、起司牽絲、陶土色桌面 |
| 9 | 酥炸鮮魷佐雞尾酒醬 | 酥炸魷魚桶、雞尾酒醬、金屬桶裝 |
| 10 | 水牛城辣雞翅 | 水牛城雞翅、藍紋起司醬、金屬桶 |
| 11 | 貳樓金牌鹽水雞沙拉 | 鹽水雞沙拉、木碗、窗邊早午餐光 |
| 12 | 焙煎胡麻雞沙拉 | 胡麻雞沙拉、淺碗、亞麻餐墊 |
| 13 | 經典凱薩沙拉 | 凱薩沙拉、白瓷碗、俯視 |
| 14 | 經典舒肥雞凱薩沙拉 | 舒肥雞凱薩、早午餐桌、切片鋪頂 |
| 15 | 經典燻鮭魚凱薩沙拉 | 燻鮭凱薩、橢圓盤、溏心蛋 |
| 16 | 綠超人藜麥佛陀碗 | 藜麥佛陀碗、正俯視、分層配色 |
| 17 | 舒肥雞藜麥花椰飯 | 舒肥雞花椰飯、分格盤、午餐俯視 |
| 18 | 生酮總匯海陸拼盤 | 海陸拼盤、大石盤、側光低角 |
| 19 | 熱帶水果優格碗 | 熱帶優格碗、椰殼碗、戶外晨光 |
| 20 | 巴西莓果優格碗 | 巴西莓碗、紫色基底、大理石檯 |
| 21 | 酪梨慢煎培根／歐包 Open | 酪梨培根 Open、木板、歐包切片 |
| 22 | 水波燻牛肉／丹麥 Open | 燻牛肉丹麥 Open、水波蛋流心 |
| 23 | 酪梨燻鮭魚／歐包 Open | 燻鮭酪梨 Open、白桌布、酸豆 |
| 24 | 酪梨 Local 香腸／丹麥 Open | 香腸丹麥 Open、香腸圓片、暖木桌 |
| 25 | 黑松露厚切藍帶豬／歐包 Open | 藍帶豬 Open、松露醬、石板墊 |
| 26 | 橙香法式丹麥 Sunny 舒肥雞 | 橙香丹麥舒肥雞、窗邊早午餐 |
| 27 | 橙香法式丹麥 水波海鮮洋芋 | 橙香海鮮洋芋、編織墊、寬盤 |
| 28 | 橙香法式丹麥 舒肥牛排 | 橙香舒肥牛排、牛排切片、暗木板 |
| 29 | 橙香法式丹麥 蕈菇水波洋芋 | 蕈菇水波洋芋、奶油菇、蒸氣 |
| 30 | 經典火腿奶油炒菇班尼蛋 | 火腿班尼蛋、荷蘭醬滴落、堆疊 |
| 31 | 台胃口水雞奶油炒菇班尼蛋 | 口水雞班尼蛋、辣油點綴、混凝土檯 |
| 32 | 經典牛肉奶油炒菇班尼蛋 | 牛肉班尼蛋、石板盤、暖色燈 |
| 33 | 燻鮭魚奶油炒菇班尼蛋 | 燻鮭班尼蛋、橢圓盤、酸豆 |
| 34 | 總匯奶起司歐姆蕾 | 總匯歐姆蛋、格子餐巾、早午餐 |
| 35 | 烏斯特肉醬歐姆蕾 | 肉醬歐姆蛋、醬汁溢出、木桌 |
| 36 | 蕈菇奶起司歐姆蕾 | 蕈菇起司歐姆蛋、淺色檯面 |
| 37 | 辣茄汁香煸培根長管麵 | 辣茄培根長管麵、深碗、紅格布 |
| 38 | 曙光汁鮮蝦雞肉麵 | 曙光蝦雞麵、曙光奶油醬、淺盤 |
| 39 | 香爆椒麻唐揚雞麵 | 椒麻唐揚雞麵、唐揚雞塊、斜角 |
| 40 | 家鄉肉醬長管麵佐老媽肉丸 | 肉丸肉醬麵、深陶碗、肉丸鋪頂 |
| 41 | 經典青醬鮮蝦麵 | 青醬鮮蝦麵、綠色青醬、白盤 |
| 42 | 酒香蒜味蛤蜊墨魚麵 | 墨魚麵蛤蜊、黑白對比、側光 |
| 43 | 台式熱炒鹹蛋苦瓜麵 | 鹹蛋苦瓜麵、金沙醬、竹墊 |
| 44 | 起司 Local 香腸奶白麵 | 香腸奶白麵、白醬光澤、暖燈 |
| 45 | 貳樓費氏鮮蝦長管麵 | 費氏鮮蝦麵、彩色配料、青綠桌面 |
| 46 | 巴薩米克蕈菇麵 | 巴薩米克蕈菇麵、生蛋黃、暗色墊 |
| 47 | 松露蕈菇奶油麵 | 松露奶油麵、蘑菇、大理石檯 |
| 48 | 血腥瑪麗辣味飯 | 血腥瑪麗飯、番茄色飯、深碗 |
| 49 | 老闆黑胡椒漢堡排飯 | 黑胡椒漢堡排飯、炸蛋、木托盤 |
| 50 | 西班牙辣炒海陸飯 | 西班牙海陸飯、淺鍋、番紅花色 |
| 51 | 焗厚切豬排奶油飯 | 焗豬排奶油飯、起司焗烤、焗盤 |
| 52 | 月見苦瓜奶油飯 | 月見苦瓜飯、生蛋黃居中、俯視 |
| 53 | 厚烤奶油 Ham 三明治 | 厚烤 Ham 三明治、牛皮紙、楓糖漿 |
| 54 | 老墨辣鞭炮漢堡 | 辣鞭炮漢堡、墨西哥辣椒、醬汁滴落 |
| 55 | 實打實招牌漢堡 | 招牌雙層漢堡、高塔、低角仰拍 |
| 56 | BBQ 溫烤半雞 | BBQ 半雞、烤玉米、黃昏光 |
| 57 | 主廚脆皮豬腳 | 脆皮豬腳、德式酸菜、啤酒屋木盤 |
| 58 | 牛蛋小堡堡套餐 | 兒童小漢堡、小盤、明亮色調 |
| 59 | 吃光光起司蛋雞肉飯 | 起司雞肉飯、花椰菜、兒童碗 |
| 60 | 北鼻奶油雞肉長管麵 | 兒童奶油麵、豌豆玉米、粉彩墊 |
| 61 | 強的 | 強的巧克力蛋糕、4 吋、蛋糕架 |
| 62 | 布朗尼冰淇淋 | 布朗尼冰淇淋、融化的香草冰、暗木桌 |
| 63 | 全美起司蛋糕 | Oreo 起司蛋糕、切片剖面、美式餐桌 |
| 64 | 鄉村肉桂蜜桃派 | 肉桂蜜桃派、鄉村盤、冰淇淋球 |
| 65 | Greek style 野炊系炭烤雞肉早午餐 | 炭烤雞肉早午餐、皮塔餅、野炊木桌 |
| 66 | 野炊系義式檸香櫛瓜魚菲力 | 檸香魚菲力、櫛瓜、搪瓷盤戶外 |
| 67 | 甘味飯 | 甘味飯、蜜餞配料、復古木桌 |
| 68 | 金黃流沙海鮮披薩 | 金沙海鮮披薩、木鏟、起司牽絲 |
| 69 | 朝日藍帶豬排堡 | 藍帶豬排堡、商業午餐、白盤 |
| 70 | 南洋辛香雞肉飯 | 南洋雞肉飯、芭蕉葉墊、香料色調 |

---

## 清單與檔名（70）

| # | 食譜名稱 | slug | 建議檔名 |
| --- | --- | --- | --- |
| 1 | 舊金山蒜香薯條 | `sf-san-francisco-garlic-fries` | `sf-san-francisco-garlic-fries.webp` |
| 2 | 燕麥脆脆炸魚薯條 | `sf-oat-crusted-fish-and-fries` | `sf-oat-crusted-fish-and-fries.webp` |
| 3 | 松露薯條 | `sf-truffle-fries` | `sf-truffle-fries.webp` |
| 4 | 普丁肉醬薯條 | `sf-poutine-meat-sauce-fries` | `sf-poutine-meat-sauce-fries.webp` |
| 5 | 金黃流沙薯條 | `sf-salted-egg-yolk-fries` | `sf-salted-egg-yolk-fries.webp` |
| 6 | 莎莎黑咖哩炸雞 | `sf-salsa-black-curry-fried-chicken` | `sf-salsa-black-curry-fried-chicken.webp` |
| 7 | 墨西哥雞肉酥餅 | `sf-chicken-quesadilla` | `sf-chicken-quesadilla.webp` |
| 8 | 墨西哥 Local 香腸酥餅 | `sf-local-sausage-quesadilla` | `sf-local-sausage-quesadilla.webp` |
| 9 | 酥炸鮮魷佐雞尾酒醬 | `sf-crispy-calamari-cocktail-sauce` | `sf-crispy-calamari-cocktail-sauce.webp` |
| 10 | 水牛城辣雞翅 | `sf-buffalo-chicken-wings` | `sf-buffalo-chicken-wings.webp` |
| 11 | 貳樓金牌鹽水雞沙拉 | `sf-second-floor-saltwater-chicken-salad` | `sf-second-floor-saltwater-chicken-salad.webp` |
| 12 | 焙煎胡麻雞沙拉 | `sf-roasted-sesame-chicken-salad` | `sf-roasted-sesame-chicken-salad.webp` |
| 13 | 經典凱薩沙拉 | `sf-classic-caesar-salad` | `sf-classic-caesar-salad.webp` |
| 14 | 經典舒肥雞凱薩沙拉 | `sf-sous-vide-chicken-caesar-salad` | `sf-sous-vide-chicken-caesar-salad.webp` |
| 15 | 經典燻鮭魚凱薩沙拉 | `sf-smoked-salmon-caesar-salad` | `sf-smoked-salmon-caesar-salad.webp` |
| 16 | 綠超人藜麥佛陀碗 | `sf-green-superhero-quinoa-buddha-bowl` | `sf-green-superhero-quinoa-buddha-bowl.webp` |
| 17 | 舒肥雞藜麥花椰飯 | `sf-sous-vide-chicken-quinoa-cauliflower-rice` | `sf-sous-vide-chicken-quinoa-cauliflower-rice.webp` |
| 18 | 生酮總匯海陸拼盤 | `sf-keto-surf-and-turf-platter` | `sf-keto-surf-and-turf-platter.webp` |
| 19 | 熱帶水果優格碗 | `sf-tropical-yogurt-bowl` | `sf-tropical-yogurt-bowl.webp` |
| 20 | 巴西莓果優格碗 | `sf-acai-berry-yogurt-bowl` | `sf-acai-berry-yogurt-bowl.webp` |
| 21 | 酪梨慢煎培根／歐包 Open | `sf-avocado-bacon-open-toast` | `sf-avocado-bacon-open-toast.webp` |
| 22 | 水波燻牛肉／丹麥 Open | `sf-poached-egg-smoked-beef-danish-open` | `sf-poached-egg-smoked-beef-danish-open.webp` |
| 23 | 酪梨燻鮭魚／歐包 Open | `sf-avocado-smoked-salmon-open-toast` | `sf-avocado-smoked-salmon-open-toast.webp` |
| 24 | 酪梨 Local 香腸／丹麥 Open | `sf-avocado-local-sausage-danish-open` | `sf-avocado-local-sausage-danish-open.webp` |
| 25 | 黑松露厚切藍帶豬／歐包 Open | `sf-black-truffle-cordon-bleu-pork-open` | `sf-black-truffle-cordon-bleu-pork-open.webp` |
| 26 | 橙香法式丹麥 Sunny 舒肥雞 | `sf-orange-danish-sunny-sous-vide-chicken` | `sf-orange-danish-sunny-sous-vide-chicken.webp` |
| 27 | 橙香法式丹麥 水波海鮮洋芋 | `sf-orange-danish-poached-seafood-potato` | `sf-orange-danish-poached-seafood-potato.webp` |
| 28 | 橙香法式丹麥 舒肥牛排 | `sf-orange-danish-sous-vide-steak` | `sf-orange-danish-sous-vide-steak.webp` |
| 29 | 橙香法式丹麥 蕈菇水波洋芋 | `sf-orange-danish-mushroom-poached-potato` | `sf-orange-danish-mushroom-poached-potato.webp` |
| 30 | 經典火腿奶油炒菇班尼蛋 | `sf-classic-ham-mushroom-eggs-benedict` | `sf-classic-ham-mushroom-eggs-benedict.webp` |
| 31 | 台胃口水雞奶油炒菇班尼蛋 | `sf-sichuan-chicken-mushroom-eggs-benedict` | `sf-sichuan-chicken-mushroom-eggs-benedict.webp` |
| 32 | 經典牛肉奶油炒菇班尼蛋 | `sf-classic-beef-mushroom-eggs-benedict` | `sf-classic-beef-mushroom-eggs-benedict.webp` |
| 33 | 燻鮭魚奶油炒菇班尼蛋 | `sf-smoked-salmon-mushroom-eggs-benedict` | `sf-smoked-salmon-mushroom-eggs-benedict.webp` |
| 34 | 總匯奶起司歐姆蕾 | `sf-supreme-cheese-omelette` | `sf-supreme-cheese-omelette.webp` |
| 35 | 烏斯特肉醬歐姆蕾 | `sf-worcester-meat-sauce-omelette` | `sf-worcester-meat-sauce-omelette.webp` |
| 36 | 蕈菇奶起司歐姆蕾 | `sf-mushroom-cheese-omelette` | `sf-mushroom-cheese-omelette.webp` |
| 37 | 辣茄汁香煸培根長管麵 | `sf-spicy-tomato-bacon-penne` | `sf-spicy-tomato-bacon-penne.webp` |
| 38 | 曙光汁鮮蝦雞肉麵 | `sf-dawn-shrimp-chicken-linguine` | `sf-dawn-shrimp-chicken-linguine.webp` |
| 39 | 香爆椒麻唐揚雞麵 | `sf-spicy-pepper-karaage-pasta` | `sf-spicy-pepper-karaage-pasta.webp` |
| 40 | 家鄉肉醬長管麵佐老媽肉丸 | `sf-homestyle-meat-sauce-penne-with-meatballs` | `sf-homestyle-meat-sauce-penne-with-meatballs.webp` |
| 41 | 經典青醬鮮蝦麵 | `sf-classic-pesto-shrimp-pasta` | `sf-classic-pesto-shrimp-pasta.webp` |
| 42 | 酒香蒜味蛤蜊墨魚麵 | `sf-white-wine-garlic-clam-squid-ink-pasta` | `sf-white-wine-garlic-clam-squid-ink-pasta.webp` |
| 43 | 台式熱炒鹹蛋苦瓜麵 | `sf-salted-egg-bitter-melon-pasta` | `sf-salted-egg-bitter-melon-pasta.webp` |
| 44 | 起司 Local 香腸奶白麵 | `sf-cheesy-local-sausage-cream-pasta` | `sf-cheesy-local-sausage-cream-pasta.webp` |
| 45 | 貳樓費氏鮮蝦長管麵 | `sf-second-floor-fiesta-shrimp-penne` | `sf-second-floor-fiesta-shrimp-penne.webp` |
| 46 | 巴薩米克蕈菇麵 | `sf-balsamic-mushroom-pasta` | `sf-balsamic-mushroom-pasta.webp` |
| 47 | 松露蕈菇奶油麵 | `sf-truffle-mushroom-cream-pasta` | `sf-truffle-mushroom-cream-pasta.webp` |
| 48 | 血腥瑪麗辣味飯 | `sf-bloody-mary-spicy-rice` | `sf-bloody-mary-spicy-rice.webp` |
| 49 | 老闆黑胡椒漢堡排飯 | `sf-black-pepper-hamburg-rice` | `sf-black-pepper-hamburg-rice.webp` |
| 50 | 西班牙辣炒海陸飯 | `sf-spicy-spanish-surf-and-turf-rice` | `sf-spicy-spanish-surf-and-turf-rice.webp` |
| 51 | 焗厚切豬排奶油飯 | `sf-baked-thick-cut-pork-cream-rice` | `sf-baked-thick-cut-pork-cream-rice.webp` |
| 52 | 月見苦瓜奶油飯 | `sf-moon-view-bitter-melon-cream-rice` | `sf-moon-view-bitter-melon-cream-rice.webp` |
| 53 | 厚烤奶油 Ham 三明治 | `sf-griddled-butter-ham-sandwich` | `sf-griddled-butter-ham-sandwich.webp` |
| 54 | 老墨辣鞭炮漢堡 | `sf-spicy-mexican-firecracker-burger` | `sf-spicy-mexican-firecracker-burger.webp` |
| 55 | 實打實招牌漢堡 | `sf-signature-double-stack-burger` | `sf-signature-double-stack-burger.webp` |
| 56 | BBQ 溫烤半雞 | `sf-bbq-roasted-half-chicken` | `sf-bbq-roasted-half-chicken.webp` |
| 57 | 主廚脆皮豬腳 | `sf-chef-crispy-pork-knuckle` | `sf-chef-crispy-pork-knuckle.webp` |
| 58 | 牛蛋小堡堡套餐 | `sf-mini-beef-egg-burger-set` | `sf-mini-beef-egg-burger-set.webp` |
| 59 | 吃光光起司蛋雞肉飯 | `sf-cheesy-chicken-egg-rice` | `sf-cheesy-chicken-egg-rice.webp` |
| 60 | 北鼻奶油雞肉長管麵 | `sf-kids-cream-chicken-penne` | `sf-kids-cream-chicken-penne.webp` |
| 61 | 強的 | `sf-strong-chocolate-cake` | `sf-strong-chocolate-cake.webp` |
| 62 | 布朗尼冰淇淋 | `sf-brownie-ice-cream` | `sf-brownie-ice-cream.webp` |
| 63 | 全美起司蛋糕 | `sf-american-cheesecake` | `sf-american-cheesecake.webp` |
| 64 | 鄉村肉桂蜜桃派 | `sf-country-cinnamon-peach-pie` | `sf-country-cinnamon-peach-pie.webp` |
| 65 | Greek style 野炊系炭烤雞肉早午餐 | `sf-greek-campfire-grilled-chicken-brunch` | `sf-greek-campfire-grilled-chicken-brunch.webp` |
| 66 | 野炊系義式檸香櫛瓜魚菲力 | `sf-campfire-lemon-zucchini-fish-fillet` | `sf-campfire-lemon-zucchini-fish-fillet.webp` |
| 67 | 甘味飯 | `sf-sweet-savory-rice` | `sf-sweet-savory-rice.webp` |
| 68 | 金黃流沙海鮮披薩 | `sf-salted-egg-seafood-pizza` | `sf-salted-egg-seafood-pizza.webp` |
| 69 | 朝日藍帶豬排堡 | `sf-asahi-cordon-bleu-pork-burger` | `sf-asahi-cordon-bleu-pork-burger.webp` |
| 70 | 南洋辛香雞肉飯 | `sf-south-sea-spiced-chicken-rice` | `sf-south-sea-spiced-chicken-rice.webp` |

---

## 各食譜完整 Prompt（複製到 Gemini）

> 每段 = **料理描述** + **獨立場景構圖** + **風格尾段**。編號順序與 [`docs/content/second-floor-cafe-menu-replication.md`](content/second-floor-cafe-menu-replication.md) 菜單分類一致。

### 分享盤 Sharing Plate（1~15）

#### 1. 舊金山蒜香薯條 — `sf-san-francisco-garlic-fries.webp`

```text
A highly appetizing basket of San Francisco-style garlic fries, generous restaurant sharing size, featuring golden crispy thick-cut fries tossed in glossy garlic butter sauce with visible minced garlic bits. Composition: Served in a kraft paper cone inside a wire fry basket on a dark pub wooden table, small ramekin of garlic aioli beside, warm amber pendant light, three-quarter close-up angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 2. 燕麥脆脆炸魚薯條 — `sf-oat-crusted-fish-and-fries.webp`

```text
A highly appetizing plate of oat-crusted fried fish and chips, generous restaurant sharing size, featuring a golden oat-coated fish fillet with crunchy batter, thick fries, and creamy tartar sauce. Composition: Newspaper-lined wicker basket on a light oak café counter, lemon wedge and tartar sauce cup nearby, bright midday window light, eye-level side view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 3. 松露薯條 — `sf-truffle-fries.webp`

```text
A highly appetizing plate of truffle fries, generous restaurant sharing size, featuring crispy fries drizzled with dark truffle sauce and dusted with grated cheese. Composition: Stacked in a matte black ceramic bowl on a marble bistro counter, subtle truffle oil sheen, soft evening side light, slight overhead hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 4. 普丁肉醬薯條 — `sf-poutine-meat-sauce-fries.webp`

```text
A highly appetizing plate of poutine-style fries, generous restaurant sharing size, featuring crispy fries smothered in rich brown meat gravy and melted cheese curds. Composition: Shallow white diner plate on a speckled laminate tabletop, gravy pooling at the edges, cozy late-night tungsten glow, close-up three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 5. 金黃流沙薯條 — `sf-salted-egg-yolk-fries.webp`

```text
A highly appetizing plate of salted egg yolk fries, generous restaurant sharing size, featuring golden fries coated in creamy salted egg sauce with hints of chili and basil. Composition: Modern café marble tabletop, sauce drizzled in bold golden streaks, clean minimalist framing, cool-neutral daylight from the right, medium close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 6. 莎莎黑咖哩炸雞 — `sf-salsa-black-curry-fried-chicken.webp`

```text
A highly appetizing plate of fried chicken with black curry and fresh salsa, generous restaurant sharing size, featuring crispy chicken pieces, dark curry drizzle, and colorful tomato salsa. Composition: Rustic wooden sharing platter on a warm brick-toned table, small salsa bowl and curry sauce streaks visible, dynamic diagonal angle under soft afternoon light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 7. 墨西哥雞肉酥餅 — `sf-chicken-quesadilla.webp`

```text
A highly appetizing Mexican chicken quesadilla, generous restaurant sharing size, cut into golden triangle wedges showing melted cheese, chicken, avocado crema, and salsa inside. Composition: Served on a seasoned cast-iron comal resting on a woven trivet, guacamole and sour cream on the side, bright southwestern noon light, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 8. 墨西哥 Local 香腸酥餅 — `sf-local-sausage-quesadilla.webp`

```text
A highly appetizing local sausage quesadilla, generous restaurant sharing size, with crispy grilled tortilla triangles, melted cheese pull, sausage coins, and colorful salsa toppings. Composition: Colorful ceramic plate on a terracotta tabletop, cheese stretch captured mid-pull, cheerful warm kitchen light, close-up hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 9. 酥炸鮮魷佐雞尾酒醬 — `sf-crispy-calamari-cocktail-sauce.webp`

```text
A highly appetizing serving of crispy fried calamari with cocktail sauce, generous restaurant sharing size, featuring golden squid rings, lemon wedge, and a small cup of pink cocktail sauce. Composition: Tall napkin-lined metal bucket on a navy-blue café table, fries peeking underneath, crisp cool window fill light, medium side angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 10. 水牛城辣雞翅 — `sf-buffalo-chicken-wings.webp`

```text
A highly appetizing plate of Buffalo chicken wings, generous restaurant sharing size, featuring glossy orange-red hot sauce coated wings with blue cheese dipping sauce. Composition: Metal bucket with parchment paper on a sports-bar style dark wood table, celery sticks implied off-frame, warm overhead bar light, close-up three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 11. 貳樓金牌鹽水雞沙拉 — `sf-second-floor-saltwater-chicken-salad.webp`

```text
A highly appetizing Taiwanese-style salted chicken salad, generous restaurant sharing size, featuring shredded salted chicken, bitter melon slices, fire-grilled corn, mixed greens, and chili-dusted vinaigrette. Composition: Large wooden salad bowl on a sunlit brunch table near a window, vibrant green and golden corn contrast, fresh morning side light, gentle overhead angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 12. 焙煎胡麻雞沙拉 — `sf-roasted-sesame-chicken-salad.webp`

```text
A highly appetizing roasted sesame chicken salad, generous restaurant sharing size, featuring crispy fried chicken strips, cherry tomatoes, pickles, mixed lettuce, and glossy sesame dressing. Composition: Wide shallow ceramic bowl on a linen placemat, dressing glistening on greens, soft diffused afternoon light, three-quarter close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 13. 經典凱薩沙拉 — `sf-classic-caesar-salad.webp`

```text
A highly appetizing classic Caesar salad, generous restaurant sharing size, featuring crisp romaine lettuce, bacon bits, golden croutons, and creamy Caesar dressing. Composition: Tall white porcelain bowl centered on a clean wooden dining table, croutons prominently scattered on top, natural bright daylight, slight top-angled view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 14. 經典舒肥雞凱薩沙拉 — `sf-sous-vide-chicken-caesar-salad.webp`

```text
A highly appetizing sous-vide chicken Caesar salad, generous restaurant sharing size, with tender sliced chicken breast over classic Caesar lettuce, bacon, and croutons. Composition: Brunch café table setting with a simple water glass blurred in background, chicken slices fanned on top, warm late-morning window light, eye-level view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 15. 經典燻鮭魚凱薩沙拉 — `sf-smoked-salmon-caesar-salad.webp`

```text
A highly appetizing smoked salmon Caesar salad, generous restaurant sharing size, featuring pink smoked salmon curls, soft-boiled egg halves, romaine, croutons, and Caesar dressing. Composition: Long oval white platter on a slate tabletop, salmon and egg arranged elegantly, cool-neutral brunch daylight, three-quarter hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 均衡盤 Light Plate（16~20）

#### 16. 綠超人藜麥佛陀碗 — `sf-green-superhero-quinoa-buddha-bowl.webp`

```text
A highly appetizing green superhero quinoa Buddha bowl, hearty health platter portion, featuring quinoa, roasted broccoli, asparagus, salsa, and a perfect poached egg on top. Composition: Deep round ceramic bowl on a light bamboo mat, straight top-down view showing colorful layered sections, fresh morning daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 17. 舒肥雞藜麥花椰飯 — `sf-sous-vide-chicken-quinoa-cauliflower-rice.webp`

```text
A highly appetizing sous-vide chicken with quinoa and cauliflower rice, hearty health platter portion, featuring sliced chicken, cauliflower rice, quinoa, grilled corn, and cheese sauce. Composition: Partitioned lunch plate on a minimalist desk, healthy meal prep mood, bright neutral noon light from above, 45-degree angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 18. 生酮總匯海陸拼盤 — `sf-keto-surf-and-turf-platter.webp`

```text
A highly appetizing keto surf-and-turf platter, hearty health platter portion, featuring sous-vide beef slices, basa fish fillet, sautéed mushrooms, cheese, and mixed greens. Composition: Large white oval platter on a dark stone countertop, protein-forward arrangement, dramatic side spotlight, low-angle close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 19. 熱帶水果優格碗 — `sf-tropical-yogurt-bowl.webp`

```text
A highly appetizing tropical fruit yogurt bowl, hearty health platter portion, featuring creamy yogurt topped with banana, mango, seasonal fruits, granola, and nuts. Composition: Coconut-shell bowl on a sunny patio table, tropical vacation brunch mood, warm golden morning backlight, close-up three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 20. 巴西莓果優格碗 — `sf-acai-berry-yogurt-bowl.webp`

```text
A highly appetizing acai berry yogurt bowl, hearty health platter portion, featuring deep purple acai base, mixed berries, banana slices, granola, and nuts. Composition: Smoothie-bowl style presentation on a white marble kitchen island, vibrant purple and red color pop, bright clean daylight, slight overhead angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 開放三明治 Open（21~25）

#### 21. 酪梨慢煎培根／歐包 Open — `sf-avocado-bacon-open-toast.webp`

```text
A highly appetizing avocado bacon open toast, generous café open-face serving, featuring toasted sourdough bread topped with sliced avocado, crispy bacon, poached egg, and balsamic drizzle. Composition: Rustic wooden cutting board on a brunch counter, open-face toast as hero, soft window side light, three-quarter close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 22. 水波燻牛肉／丹麥 Open — `sf-poached-egg-smoked-beef-danish-open.webp`

```text
A highly appetizing poached egg and smoked beef Danish open sandwich, generous café open-face serving, featuring flaky Danish pastry, pink smoked beef, runny poached egg, and mustard sauce. Composition: Danish pastry base on a pale ceramic plate, egg yolk about to flow, cozy café morning light, close-up hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 23. 酪梨燻鮭魚／歐包 Open — `sf-avocado-smoked-salmon-open-toast.webp`

```text
A highly appetizing avocado smoked salmon open toast, generous café open-face serving, featuring sourdough, cream cheese, smoked salmon, avocado, poached egg, capers, and lemon. Composition: Elegant brunch plate on a white tablecloth, salmon curls and capers detailed, soft diffused daylight, eye-level three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 24. 酪梨 Local 香腸／丹麥 Open — `sf-avocado-local-sausage-danish-open.webp`

```text
A highly appetizing avocado local sausage Danish open sandwich, generous café open-face serving, featuring Danish bread, sliced sausage, avocado, poached egg, and chili powder dusting. Composition: Round plate on a warm honey-toned wooden table, sausage rounds and green avocado contrast, afternoon window light, medium close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 25. 黑松露厚切藍帶豬／歐包 Open — `sf-black-truffle-cordon-bleu-pork-open.webp`

```text
A highly appetizing black truffle cordon bleu pork open toast, generous café open-face serving, featuring thick cordon bleu pork cutlet with melted cheese center, black truffle sauce, and poached egg on rustic bread. Composition: Upscale bistro slate board, truffle shavings visible, moody warm spotlight from above, dramatic close-up angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 貳樓早午餐 SF Brunch（26~36）

#### 26. 橙香法式丹麥 Sunny 舒肥雞 — `sf-orange-danish-sunny-sous-vide-chicken.webp`

```text
A highly appetizing orange-glazed French Danish brunch with sous-vide chicken, generous brunch platter size, featuring orange Danish pastry ring, sliced chicken, sunny-side egg, hash browns, and honey mustard. Composition: Round brunch plate on a sunny window-side table, orange glaze shine on pastry, golden morning light, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 27. 橙香法式丹麥 水波海鮮洋芋 — `sf-orange-danish-poached-seafood-potato.webp`

```text
A highly appetizing orange Danish brunch with poached egg, seafood, and potatoes, generous brunch platter size, featuring orange pastry, mixed seafood, sautéed mushrooms, and crispy potato hash. Composition: Wide brunch platter on a woven placemat, seafood and potato hash textured, soft late-morning light, slight overhead angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 28. 橙香法式丹麥 舒肥牛排 — `sf-orange-danish-sous-vide-steak.webp`

```text
A highly appetizing orange Danish brunch with sous-vide steak, generous brunch platter size, featuring orange pastry, sliced medium-rare steak, fried egg, hash browns, and honey mustard drizzle. Composition: Steakhouse-brunch mood on a dark wooden board, steak slices fanned elegantly, warm amber side light, close-up three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 29. 橙香法式丹麥 蕈菇水波洋芋 — `sf-orange-danish-mushroom-poached-potato.webp`

```text
A highly appetizing orange Danish vegetarian brunch, generous brunch platter size, featuring orange pastry, poached egg, creamy sautéed mushrooms, potato hash, and cheese sauce. Composition: Creamy mushroom texture highlighted on a cream-colored plate, gentle steam wisps, cozy kitchen morning light, eye-level view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 30. 經典火腿奶油炒菇班尼蛋 — `sf-classic-ham-mushroom-eggs-benedict.webp`

```text
A highly appetizing classic ham eggs Benedict, generous brunch platter size, featuring toasted English muffin, ham, creamy sautéed mushrooms, poached egg, and rich hollandaise sauce. Composition: Stacked Benedict on a white brunch plate, hollandaise dripping down the side, warm café window light, close-up hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 31. 台胃口水雞奶油炒菇班尼蛋 — `sf-sichuan-chicken-mushroom-eggs-benedict.webp`

```text
A highly appetizing Sichuan-style saliva chicken eggs Benedict, generous brunch platter size, featuring English muffin, spicy chicken, creamed mushrooms, poached egg, and chili oil accents. Composition: Modern fusion brunch plate on a concrete-texture tabletop, subtle red chili oil gleam, cool-neutral daylight, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 32. 經典牛肉奶油炒菇班尼蛋 — `sf-classic-beef-mushroom-eggs-benedict.webp`

```text
A highly appetizing classic beef eggs Benedict, generous brunch platter size, featuring English muffin, tender beef slices, sautéed mushrooms, poached egg, and hollandaise. Composition: Hearty brunch setting on a dark slate plate, beef and mushrooms layered generously, warm tungsten brunch lamp, medium close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 33. 燻鮭魚奶油炒菇班尼蛋 — `sf-smoked-salmon-mushroom-eggs-benedict.webp`

```text
A highly appetizing smoked salmon eggs Benedict, generous brunch platter size, featuring English muffin, smoked salmon, capers, creamed mushrooms, poached egg, and hollandaise. Composition: Elegant brunch presentation on an oval plate, pink salmon and golden hollandaise contrast, soft morning side light, three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 34. 總匯奶起司歐姆蕾 — `sf-supreme-cheese-omelette.webp`

```text
A highly appetizing supreme cheese omelette, generous brunch platter size, featuring a golden folded omelette filled with ham, corn, mixed melted cheeses, and hash browns on the side. Composition: Classic diner plate on a checkered napkin, omelette fold showing filling peek, bright breakfast window light, eye-level view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 35. 烏斯特肉醬歐姆蕾 — `sf-worcester-meat-sauce-omelette.webp`

```text
A highly appetizing Worcestershire meat sauce omelette, generous brunch platter size, featuring a fluffy omelette stuffed with savory meat sauce and melted cheese, with hash browns alongside. Composition: Rustic ceramic plate on a wooden breakfast table, meat sauce oozing from the omelette seam, warm morning glow, close-up three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 36. 蕈菇奶起司歐姆蕾 — `sf-mushroom-cheese-omelette.webp`

```text
A highly appetizing mushroom cheese omelette, generous brunch platter size, featuring a tender omelette filled with buttery sautéed mushrooms and melted mixed cheeses. Composition: Simple white plate on a light kitchen counter, mushroom filling spilling gently from the fold, soft diffused daylight, medium close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 主餐｜飯麵 Main（37~52）

#### 37. 辣茄汁香煸培根長管麵 — `sf-spicy-tomato-bacon-penne.webp`

```text
A highly appetizing spicy tomato bacon penne pasta, generous restaurant portion size, featuring penne in rich red tomato sauce with crispy bacon bits, chili flakes, and melted cheese. Composition: Deep white pasta bowl on a red-checkered café tablecloth, steam rising gently, warm indoor lunch light, three-quarter hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 38. 曙光汁鮮蝦雞肉麵 — `sf-dawn-shrimp-chicken-linguine.webp`

```text
A highly appetizing dawn sauce shrimp and chicken linguine, generous restaurant portion size, featuring linguine in creamy orange-tinted dawn sauce with shrimp, chicken, roasted red pepper, and cheese strands. Composition: Wide shallow pasta plate on a sunlit brunch table, sauce glossy and warm-toned, golden afternoon side light, close-up twirled noodle view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 39. 香爆椒麻唐揚雞麵 — `sf-spicy-pepper-karaage-pasta.webp`

```text
A highly appetizing spicy pepper karaage pasta, generous restaurant portion size, featuring linguine in tomato sauce with crispy Japanese karaage chicken, Thai basil, bird's eye chili, and melted cheese. Composition: Bold colorful plate on a dark tabletop, karaage pieces prominent on top, dynamic diagonal composition, warm kitchen evening light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 40. 家鄉肉醬長管麵佐老媽肉丸 — `sf-homestyle-meat-sauce-penne-with-meatballs.webp`

```text
A highly appetizing homestyle meat sauce penne with meatballs, generous restaurant portion size, featuring penne in rich Bolognese sauce topped with beef meatballs, sun-dried tomatoes, and cheese. Composition: Family-style deep ceramic bowl on a rustic wooden table, meatballs resting on pasta mound, cozy dinner tungsten glow, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 41. 經典青醬鮮蝦麵 — `sf-classic-pesto-shrimp-pasta.webp`

```text
A highly appetizing classic pesto shrimp pasta, generous restaurant portion size, featuring linguine coated in vivid green basil pesto with plump pink shrimp, pine nuts, and grated cheese. Composition: Fresh green pesto color pop on a white plate, shrimp arranged on top, bright clean daylight, slight overhead three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 42. 酒香蒜味蛤蜊墨魚麵 — `sf-white-wine-garlic-clam-squid-ink-pasta.webp`

```text
A highly appetizing white wine garlic clam squid ink pasta, generous restaurant portion size, featuring black squid ink linguine with open clams, garlic, and Thai basil in a light wine broth. Composition: Dramatic dark pasta on a white rimmed plate, clamshells open showing meat, cool-neutral seafood restaurant light, close-up side angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 43. 台式熱炒鹹蛋苦瓜麵 — `sf-salted-egg-bitter-melon-pasta.webp`

```text
A highly appetizing Taiwanese salted egg bitter melon pasta, generous restaurant portion size, featuring linguine in golden salted egg sauce with bitter melon, king oyster mushroom, yam, and chili flakes. Composition: Fusion pasta bowl on a bamboo placemat, golden sauce and green bitter melon contrast, warm afternoon window light, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 44. 起司 Local 香腸奶白麵 — `sf-cheesy-local-sausage-cream-pasta.webp`

```text
A highly appetizing cheesy local sausage cream pasta, generous restaurant portion size, featuring linguine in white Alfredo-style sauce with sliced local sausage, three-cheese blend, and Thai basil. Composition: Creamy white sauce glistening in a wide pasta bowl, sausage coins visible, soft cozy brunch lamp light, medium close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 45. 貳樓費氏鮮蝦長管麵 — `sf-second-floor-fiesta-shrimp-penne.webp`

```text
A highly appetizing fiesta shrimp penne, generous restaurant portion size, featuring penne in taco-seasoned creamy sauce with juicy shrimp and festive colorful garnish. Composition: Fun vibrant plate on a turquoise café tabletop, festive casual mood, bright saturated daylight, dynamic three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 46. 巴薩米克蕈菇麵 — `sf-balsamic-mushroom-pasta.webp`

```text
A highly appetizing balsamic mushroom pasta, generous restaurant portion size, featuring linguine with sautéed mixed mushrooms, balsamic glaze, pine nuts, and a raw egg yolk center. Composition: Elegant gourmet plate on a dark linen napkin, dark balsamic drizzle contrasting with pasta, moody side spotlight, top-angled view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 47. 松露蕈菇奶油麵 — `sf-truffle-mushroom-cream-pasta.webp`

```text
A highly appetizing truffle mushroom cream pasta, generous restaurant portion size, featuring linguine in luxurious truffle cream sauce with assorted sautéed mushrooms and melted cheese. Composition: Upscale pasta bowl on a marble counter, truffle cream pale golden, soft evening bistro light, close-up creamy texture focus. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 48. 血腥瑪麗辣味飯 — `sf-bloody-mary-spicy-rice.webp`

```text
A highly appetizing Bloody Mary spicy rice, generous restaurant portion size, featuring tomato-juice tinted fragrant rice with cream sauce, sautéed vegetables, ginger, and a spicy kick. Composition: Deep rice bowl on a speckled countertop, reddish tomato hue in the rice, warm lunch window light, 45-degree hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 49. 老闆黑胡椒漢堡排飯 — `sf-black-pepper-hamburg-rice.webp`

```text
A highly appetizing black pepper hamburger steak rice, generous restaurant portion size, featuring a thick hamburger patty on steamed rice with black pepper sauce, melted cheese, and a fried egg on top. Composition: Japanese-western fusion donburi-style bowl on a wooden tray, pepper sauce glossy, bright noon daylight, three-quarter close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 50. 西班牙辣炒海陸飯 — `sf-spicy-spanish-surf-and-turf-rice.webp`

```text
A highly appetizing spicy Spanish surf-and-turf rice, generous restaurant portion size, featuring saffron-tinted rice with shrimp, clams, chorizo sausage, and melted cheese. Composition: Paella-inspired shallow pan on a terracotta table, seafood and sausage arranged on golden rice, warm Mediterranean afternoon light, slight overhead view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 51. 焗厚切豬排奶油飯 — `sf-baked-thick-cut-pork-cream-rice.webp`

```text
A highly appetizing baked thick-cut pork chop cream rice, generous restaurant portion size, featuring a thick pork chop on creamy rice with dawn sauce, broccoli, bacon, and baked cheese crust. Composition: Oven-baked cheese crust golden on a gratin-style plate, pork chop cross-section visible, warm kitchen evening glow, close-up hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 52. 月見苦瓜奶油飯 — `sf-moon-view-bitter-melon-cream-rice.webp`

```text
A highly appetizing moon-view bitter melon cream rice, generous restaurant portion size, featuring creamy rice with salted egg, bitter melon, mushrooms, and a raw egg yolk center like a full moon. Composition: Japanese-inspired rice bowl on a dark ceramic plate, bright egg yolk centered prominently, soft diffused lunch light, top-angled view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 主餐｜手抓 Big Bite（53~55）

#### 53. 厚烤奶油 Ham 三明治 — `sf-griddled-butter-ham-sandwich.webp`

```text
A highly appetizing griddled butter ham sandwich, hearty café sandwich portion, featuring pressed crusty bread with ham, cheese, fried egg, hash browns, and maple syrup on the side. Composition: Sandwich cut in half showing layers on butcher paper, hash browns and syrup cup nearby, warm diner morning light, eye-level view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 54. 老墨辣鞭炮漢堡 — `sf-spicy-mexican-firecracker-burger.webp`

```text
A highly appetizing spicy Mexican firecracker burger, hearty restaurant burger size, featuring a beef patty with cheese, fried jalapeño poppers, BBQ sauce, and hash browns on the side. Composition: Bold burger on a wooden board with parchment, sauce dripping, energetic diagonal angle, warm pub overhead light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 55. 實打實招牌漢堡 — `sf-signature-double-stack-burger.webp`

```text
A highly appetizing signature double-stack burger, hearty restaurant burger size, featuring towering beef patty, fried fish fillet, bacon, balsamic sauce, and hash browns. Composition: Impressive tall burger held together with a skewer on a dark slate board, dramatic low-angle hero shot, moody spotlight from the side. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 主餐｜盤餐 Big Plate（56~57）

#### 56. BBQ 溫烤半雞 — `sf-bbq-roasted-half-chicken.webp`

```text
A highly appetizing BBQ roasted half chicken, large restaurant sharing platter size, featuring glossy BBQ-glazed half chicken with grilled corn on the cob and crispy fries. Composition: Large white dinner plate on a backyard BBQ table mood, corn and fries flanking the chicken, warm golden hour sunlight, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 57. 主廚脆皮豬腳 — `sf-chef-crispy-pork-knuckle.webp`

```text
A highly appetizing chef's crispy pork knuckle, large restaurant sharing platter size, featuring crackling-crisp German-style pork knuckle with sauerkraut, mustard, grilled corn, and fries. Composition: Bavarian beer-hall inspired wooden platter, crackling texture highlighted, warm amber tavern light, close-up crunchy skin focus. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 小大人餐 Kids（58~60）

#### 58. 牛蛋小堡堡套餐 — `sf-mini-beef-egg-burger-set.webp`

```text
A highly appetizing kids beef and egg mini burger set, cute junior portion size, featuring a small burger with beef patty, fried egg, and a side of fries. Composition: Cute small plate on a colorful kid-friendly table setting, mini burger scale emphasized, bright cheerful daylight, gentle overhead angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 59. 吃光光起司蛋雞肉飯 — `sf-cheesy-chicken-egg-rice.webp`

```text
A highly appetizing cheesy chicken egg rice for kids, cute junior portion size, featuring creamy dawn-sauce rice with chicken, broccoli, and melted cheese. Composition: Shallow colorful bowl on a light playroom-style table, broccoli trees and cheese strands visible, soft warm afternoon light, close-up view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 60. 北鼻奶油雞肉長管麵 — `sf-kids-cream-chicken-penne.webp`

```text
A highly appetizing kids cream chicken penne, cute junior portion size, featuring mild white sauce penne with tender chicken, sweet corn, peas, and melted cheese. Composition: Small pasta bowl with rounded edges on a pastel placemat, gentle kid-portion framing, bright clean kitchen light, three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 甜點 Dessert（61~64）

#### 61. 強的 — `sf-strong-chocolate-cake.webp`

```text
A highly appetizing dense chocolate cake called 'Strong', indulgent dessert serving size, featuring a small 4-inch rich dark chocolate cake with cream cheese frosting. Composition: Petite whole cake on a cake stand with a dessert fork nearby, indulgent chocolate texture focus, soft café dessert spotlight, close-up three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 62. 布朗尼冰淇淋 — `sf-brownie-ice-cream.webp`

```text
A highly appetizing brownie with ice cream, indulgent dessert serving size, featuring a warm fudgy chocolate brownie square topped with melting vanilla ice cream and chocolate sauce drizzle. Composition: Dessert plate on a dark wooden table, ice cream slightly melting over warm brownie, cozy evening dessert lamp glow, close-up hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 63. 全美起司蛋糕 — `sf-american-cheesecake.webp`

```text
A highly appetizing American cheesecake, indulgent dessert serving size, featuring a thick creamy cheesecake slice on an Oreo cookie crust base. Composition: Classic diner dessert plate on a red vinyl booth table mood, clean slice cross-section showing layers, bright neutral daylight, eye-level view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 64. 鄉村肉桂蜜桃派 — `sf-country-cinnamon-peach-pie.webp`

```text
A highly appetizing country cinnamon peach pie, indulgent dessert serving size, featuring a rustic pie slice with cinnamon-spiced peaches and a scoop of vanilla ice cream. Composition: Homestyle pie on a floral ceramic plate, flaky crust and peach filling visible, warm farmhouse afternoon light, three-quarter dessert angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 林口店限定（65~66）

#### 65. Greek style 野炊系炭烤雞肉早午餐 — `sf-greek-campfire-grilled-chicken-brunch.webp`

```text
A highly appetizing Greek-style campfire grilled chicken brunch, generous outdoor campfire platter size, featuring char-grilled chicken, warm pita bread, and fresh Greek salad. Composition: Outdoor campfire brunch mood on a rustic wooden camp table, grill marks on chicken visible, warm firelight mixed with dusk sky tones, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 66. 野炊系義式檸香櫛瓜魚菲力 — `sf-campfire-lemon-zucchini-fish-fillet.webp`

```text
A highly appetizing campfire lemon zucchini fish fillet, generous outdoor campfire platter size, featuring grilled fish fillet with sautéed zucchini ribbons and bright lemon herb sauce. Composition: Camp-style enamel plate on a stone outdoor table, lemon zest and green zucchini contrast, fresh open-air daylight, close-up side angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 分店／季節限定（67~70）

#### 67. 甘味飯 — `sf-sweet-savory-rice.webp`

```text
A highly appetizing Taiwanese sweet and savory rice, generous restaurant portion size, featuring steamed rice topped with traditional candied preserves and dried fruits in Tainan style. Composition: Traditional Taiwanese ceramic bowl on a vintage wooden table, colorful candied toppings arranged neatly, soft nostalgic afternoon light, gentle overhead view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 68. 金黃流沙海鮮披薩 — `sf-salted-egg-seafood-pizza.webp`

```text
A highly appetizing salted egg yolk seafood pizza, generous restaurant portion size, featuring a golden salted egg sauce spread over pizza crust with assorted seafood and Thai basil. Composition: Freshly baked pizza slice pull on a wooden pizza paddle, golden egg sauce and seafood toppings visible, warm pizzeria oven glow, dynamic angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 69. 朝日藍帶豬排堡 — `sf-asahi-cordon-bleu-pork-burger.webp`

```text
A highly appetizing cordon bleu pork burger, generous restaurant portion size, featuring a breaded pork cutlet with cheese filling in a burger bun with lettuce and sauce. Composition: Business lunch burger on a simple white plate with soup cup blurred in background, clean office café mood, bright midday light, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 70. 南洋辛香雞肉飯 — `sf-south-sea-spiced-chicken-rice.webp`

```text
A highly appetizing Southeast Asian spiced chicken rice, generous restaurant portion size, featuring fragrant spiced chicken over seasoned rice with Southeast Asian aromatics. Composition: Deep rice bowl on a banana-leaf-lined plate, aromatic spices suggested with warm color tones, tropical lunch light, 45-degree hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 上線檢查清單

完成繪圖後，逐篇確認：

1. 檔案已放入 `public/images/recipes/{slug}.webp`
2. `src/content/recipes/{slug}.md` 的 `coverImage` 已改為 `.webp`
3. 同步更新 `recipes-en` / `recipes-ja` / `recipes-ko` 同名食譜封面路徑
4. 執行 `npm run build` 通過
5. 瀏覽 `/recipes/{slug}/` 與 `/restaurant-replicas/` 確認封面顯示正常

---

## 相關路徑

| 用途 | 路徑 |
| --- | --- |
| 名店還原專區 | `/restaurant-replicas/` |
| 貳樓菜單對照 | `docs/content/second-floor-cafe-menu-replication.md` |
| 食譜產生器 | `scripts/generate-second-floor-recipes.mjs` |
| 封面 prompt 產生器 | `scripts/generate-second-floor-cover-prompts.mjs` |
| 前一批次範例 | `docs/recipe-cover-images-for-gemini-151-161.md` |

