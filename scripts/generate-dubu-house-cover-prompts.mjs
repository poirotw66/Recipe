import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const menuPath = join(root, "src/data/dubu-house-menu.json");
const recipeDir = join(root, "src/content/recipes");
const outputPath = join(root, "docs/recipe-cover-images-for-gemini-dubu-house-58.md");

const STYLE_TAIL =
  "Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.";

const DISH_DATA = {
  "dh-cheese-stuffed-rice-cake-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes, tender vegetables, and chewy cheese-stuffed rice cakes leaking melted cheese in a rich, bubbling red-orange gochugaru broth",
    scene: "Served in a traditional black Korean earthenware pot (ttukbaegi) on a dark wooden table, bubbling with steam, garnished with chopped green onions and a raw egg yolk in the center.",
    summary: "黑陶土鍋、起司年糕、紅亮辣湯、青蔥生蛋黃"
  },
  "dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, tender fish fillet chunks, green seaweed fronds, and cheese-stuffed rice cakes in a simmering, savory red-orange broth",
    scene: "Served in a bubbling stone bowl on a woven bamboo trivet, with steam rising, soft evening dining light.",
    summary: "石頭鍋、鮮魚片、海菜起司年糕、竹編墊"
  },
  "dh-plant-based-fried-chicken-with-mushroom-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, plump shiitake mushrooms, and golden crispy plant-based fried chicken pieces absorbing the flavorful bubbling red-orange spicy broth",
    scene: "Served in a black earthenware pot on a light oak table, garnished with sliced red chili and scallions, bright side window light.",
    summary: "黑陶土鍋、植感炸雞、鮮香菇、橡木桌"
  },
  "dh-classic-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring traditional silky soft tofu cubes, tender vegetables, and a rich, bubbling red-orange spicy broth",
    scene: "Served in a piping hot black ceramic pot resting on a wooden underliner, classic Korean tavern setting, warm tungsten glow.",
    summary: "經典黑陶鍋、紅亮辣湯、木托盤、暖黃光"
  },
  "dh-vegetable-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, tender cabbage leaves, shiitake mushrooms, enoki mushrooms, and green vegetables in a clean, savory bubbling broth",
    scene: "Served in a traditional earthenware pot on a granite countertop, bright natural lunch light, minimalist setting.",
    summary: "陶土土鍋、高麗菜鮮菇、清澈高湯、花崗岩面"
  },
  "dh-kimchi-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes and tender pork belly slices simmered with rich, tangy fermented Napa cabbage kimchi in a bubbling fiery-red broth",
    scene: "Served in a hot stone pot on a red lacquer tray, with steam rising, cozy Korean restaurant dining background.",
    summary: "石頭石鍋、辣泡菜、豬肉片、紅漆木托盤"
  },
  "dh-kimchi-mushroom-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, rich kimchi, and a variety of mushrooms including shiitake and enoki in a bubbling red-orange broth",
    scene: "Served in a sizzling black earthenware pot on a dark rustic wooden table, cozy dinner atmosphere.",
    summary: "陶土土鍋、泡菜鮮菇、微沸辣湯、深色木桌"
  },
  "dh-cheese-kimchi-mushroom-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, tangy kimchi, and fresh mushrooms in a bubbling spicy broth, topped with a thick, melting layer of golden cheddar and mozzarella cheese",
    scene: "Served in a traditional black pot, showing the cheese stretch and steam rising, soft golden hour lighting.",
    summary: "熱陶罐、起司融化牽絲、泡菜鮮菇、黃昏光"
  },
  "dh-curry-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes and tender pork slices in a bubbling, rich yellow-golden curry-infused soondubu broth",
    scene: "Served in an earthenware pot on a linen placemat, surrounded by small banchan dishes, morning light.",
    summary: "陶土土鍋、金黃咖哩湯頭、豬肉片、亞麻布墊"
  },
  "dh-cheese-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes and tender beef slices in a red-orange spicy broth, covered with two melted slices of cheddar cheese and mozzarella string cheese",
    scene: "Served in a bubbling earthenware pot, cheese melting beautifully into the soup, cozy restaurant table.",
    summary: "經典陶罐、起司融化、牛肉片、溫馨餐廳桌"
  },
  "dh-cheese-vegetable-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, tender cabbage, fresh mushrooms, and melting cheese in a bubbling savory broth",
    scene: "Served in a steaming black earthenware pot on a rustic table, soft diffused dinner lighting.",
    summary: "黑陶土鍋、起司融化、野菜鮮菇、柔和晚餐光"
  },
  "dh-combo-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring luxurious soondubu stew filled with silky soft tofu, tender beef slices, whole white shrimp, and fresh clams in a bubbling red-orange broth",
    scene: "Served in a steaming earthenware pot on a wooden trivet, fresh ingredients peeking through the bubbling soup, close-up hero angle.",
    summary: "經典陶罐、鮮蝦蛤蜊牛肉、木質隔熱墊"
  },
  "dh-korean-dumpling-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu and plump, savory Korean mandu dumplings with visible pleats, simmering in a bubbling red-orange spicy broth",
    scene: "Served in a black ceramic pot on a simple wooden table, garnished with red chili slices and scallion greens.",
    summary: "黑陶瓷鍋、飽滿韓式餃子、紅辣湯"
  },
  "dh-seafood-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes with abundant seafood including white shrimp, fresh clams, and squid rings in a rich, bubbling red-orange seafood broth",
    scene: "Served in a traditional ttukbaegi pot on a dark wood table, steam rising, spotlight focusing on the fresh seafood.",
    summary: "傳統土鍋、白蝦蛤蜊透抽、聚光側光"
  },
  "dh-clams-shrimp-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, fresh plump clams in shells, and whole white shrimp simmering in a clean, briny, bubbling broth",
    scene: "Served in a hot clay pot on a wooden board, garnished with chopped scallions, bright lunch dining atmosphere.",
    summary: "陶土砂鍋、大量蛤蜊白蝦、木板墊"
  },
  "dh-kimchi-seafood-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, whole white shrimp, clams, and tangy kimchi in a fiery-red bubbling broth",
    scene: "Served in a traditional earthenware pot on a dark table, with steam rising, cozy dining lighting.",
    summary: "傳統土鍋、泡菜鮮蝦蛤蜊、暖燈光"
  },
  "dh-seaweed-oyster-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, green seaweed fronds, and plump, juicy fresh oysters in a clean, briny bubbling broth",
    scene: "Served in a stone pot on a woven bamboo trivet, highlighting the plump oysters on top, soft side lighting.",
    summary: "石頭石鍋、肥美生蠔海菜、竹編墊"
  },
  "dh-fish-soondubu": {
    food: "A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu and tender white fish fillet chunks simmering in a rich, savory red-orange broth",
    scene: "Served in a black earthenware pot on a light oak table, clean and elegant plating, window light.",
    summary: "黑陶土鍋、鮮嫩魚片、細緻辣湯"
  },
  "dh-bibimbap": {
    food: "A highly appetizing Korean dolsot bibimbap or stone pot rice, generous restaurant portion, featuring steaming white rice in a hot stone bowl, beautifully topped with sections of seasoned beef slices, shredded carrots, spinach, bean sprouts, shiitake mushrooms, and a raw egg yolk in the center",
    scene: "Served in a traditional hot stone pot (dolsot) on a wooden underliner, showing crispy sizzling rice edges, bronze spoon and chopsticks beside.",
    summary: "石鍋、牛肉五色蔬菜、生蛋黃、青銅餐具"
  },
  "dh-duck-jerky-stone-pot-rice": {
    food: "A highly appetizing Korean dolsot bibimbap or stone pot rice, generous restaurant portion, featuring steaming rice in a hot stone bowl topped with savory sliced Taiwanese duck jerky, shredded green cabbage, and chopped scallions",
    scene: "Served in a sizzling stone pot on a dark table, steam rising, close-up three-quarter angle.",
    summary: "石鍋、宜蘭鴨賞高麗菜、熱氣蒸騰"
  },
  "dh-golden-chicken-stone-pot-rice": {
    food: "A highly appetizing Korean dolsot bibimbap or stone pot rice, generous restaurant portion, featuring steaming hot stone pot rice topped with tender, golden pan-fried chicken thigh pieces, shiitake mushrooms, and chopped scallions",
    scene: "Served in a traditional dolsot on a red wooden tray, cozy dining atmosphere.",
    summary: "傳統石鍋、黃金雞肉塊、香菇"
  },
  "dh-classic-stone-pot-rice": {
    food: "A highly appetizing Korean dolsot bibimbap or stone pot rice, generous restaurant portion, featuring steaming white rice cooked in a hot stone bowl, topped with shredded carrots, spinach, bean sprouts, and sesame seeds",
    scene: "Served in a hot stone pot on a woven mat, highlighting the crispy golden crust forming at the edges.",
    summary: "熱石鍋、三色野菜、香脆鍋巴"
  },
  "dh-korean-vermicelli-tofu-roll": {
    food: "A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring golden-brown pan-fried tofu rolls filled with glass noodles and vegetables, drizzled with savory sesame oil",
    scene: "Arranged neatly on a shallow black stoneware plate on a linen napkin, garnished with sesame seeds and chopped scallions.",
    summary: "黑色陶盤、金黃豆腐捲、冬粉餡"
  },
  "dh-french-fries-with-korean-flavored-sauce": {
    food: "A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring crispy golden French fries drizzled with a glossy, sweet and spicy Korean red sauce and honey",
    scene: "Served in a wire basket lined with paper on a café table, small cup of sauce on the side.",
    summary: "鐵絲炸薯籃、甜辣醬汁、咖啡廳木桌"
  },
  "dh-deep-fried-tofu": {
    food: "A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring golden-brown, crispy deep-fried tofu cubes with a soft silky interior, drizzled with a savory soy dipping sauce",
    scene: "Served in a shallow ceramic dish, garnished with chopped scallions and red chili slivers, light neutral background.",
    summary: "陶瓷淺盤、酥脆豆腐磚、蔥花辣椒絲"
  },
  "dh-korean-style-bbq-fish-ball": {
    food: "A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring plump, grilled fish balls skewers coated in a glossy, red sweet-and-spicy Korean BBQ glaze",
    scene: "Served on a rectangular plate on a wooden pub table, garnished with white sesame seeds.",
    summary: "長方形陶盤、辣醬魚丸串、白芝麻"
  },
  "dh-steamed-eggs-with-cheese-roe": {
    food: "A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring puffy, soufflé-like Korean steamed egg (gyeran-jjim) overflowing from a hot clay pot, topped with melting cheddar cheese and bright orange flying fish roe",
    scene: "Served in a traditional black pot on a wooden coaster, bubbling hot, warm dining light.",
    summary: "黑陶土鍋、蓬鬆烘蛋、起司飛魚卵"
  },
  "dh-fried-glass-noodle": {
    food: "A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring glossy, translucent sweet potato glass noodles stir-fried with sesame oil, colorful bell peppers, spinach, carrots, and wood ear mushrooms",
    scene: "Served on an oval ceramic plate, sprinkled with toasted sesame seeds, bright natural light.",
    summary: "橢圓陶盤、多色炒雜菜冬粉、芝麻"
  },
  "dh-brown-sugar-pancake": {
    food: "A highly appetizing Korean dessert, generous restaurant portion, featuring two round, golden-brown griddled Korean sweet pancakes (hotteok), with a glossy dark brown caramelized cinnamon and brown sugar syrup oozing out of a cut pancake",
    scene: "Served on a rustic ceramic plate, dusted with crushed walnuts and pumpkin seeds, warm cozy dessert light.",
    summary: "手作陶盤、流心黑糖餅、肉桂堅果碎"
  },
  "dh-tofu-ice-cream-with-tapioca": {
    food: "A highly appetizing Korean dessert, generous restaurant portion, featuring a scoop of smooth, creamy pale-yellow tofu ice cream topped with warm, glossy dark brown tapioca pearls in brown sugar syrup",
    scene: "Served in a small ceramic dessert bowl, warm wooden table background, soft side light.",
    summary: "玻璃或小瓷碗、豆腐冰淇淋、黑糖珍珠"
  },
  "dh-royal-stir-fried-rice-cake": {
    food: "A highly appetizing Korean rice cake dish (tteok), generous restaurant portion, featuring chewy cylinder rice cakes (tteokbokki) stir-fried in a savory soy-sauce glaze with tender beef strips, shiitake mushrooms, carrots, onions, and scallions",
    scene: "Served on a modern dark ceramic plate, garnished with toasted sesame seeds, warm restaurant lighting.",
    summary: "深色陶瓷盤、醬燒宮廷年糕、牛肉鮮菇"
  },
  "dh-truffle-jjajang-cheese-rice-cake": {
    food: "A highly appetizing Korean rice cake dish (tteok), generous restaurant portion, featuring chewy rice cakes coated in a rich, glossy black bean sauce (jjajang), topped with melted cheddar cheese sauce and a spoonful of dark black truffle paste",
    scene: "Served in a shallow stone bowl, cheese blending with the black sauce, modern dining table.",
    summary: "石質淺碗、黑炸醬年糕、黃起司醬松露"
  },
  "dh-potato-pancake-with-cheese": {
    food: "A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a large, thin, golden-brown crispy potato pancake made of shredded potatoes, topped with melted mozzarella cheese stringing up",
    scene: "Served on a wooden cutting board with a small bowl of soy-vinegar dipping sauce, close-up angle showing crispy edges.",
    summary: "木切菜板、金黃馬鈴薯絲餅、起司牽絲"
  },
  "dh-plant-based-fried-chicken-with-rice-cake": {
    food: "A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy plant-based fried chicken nuggets and chewy pan-fried Korean rice cakes, coated in a glossy, sweet and spicy red glaze",
    scene: "Served on a rustic round plate, sprinkled with sesame seeds, warm pub table setting.",
    summary: "手作圓盤、植感炸雞、炸年糕、甜辣醬"
  },
  "dh-cheese-pink-sauce-fried-squid-with-rice-cake": {
    food: "A highly appetizing Korean rice cake dish (tteok), generous restaurant portion, featuring tender squid rings and chewy rice cakes coated in a creamy, pastel-orange rose sauce, topped with melted mozzarella cheese",
    scene: "Served in a wide shallow bowl, cheese bubbling, bright midday dining light.",
    summary: "寬口淺盤、粉橘玫瑰醬、魷魚年糕起司"
  },
  "dh-vegetable-pancake": {
    food: "A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a large, thin Korean savory vegetable pancake featuring bright green shredded luffa squash, carrots, and onions, with crispy golden edges",
    scene: "Served on a round bamboo tray, cut into wedges, side bowl of soy dipping sauce.",
    summary: "圓形竹編托盤、絲瓜胡蘿蔔煎餅、切塊"
  },
  "dh-stired-fried-fish-fillet-with-vegetables": {
    food: "A highly appetizing Korean specialty dish, generous restaurant portion, featuring tender pieces of fried mahi-mahi fish fillet stir-fried with carrots, onions, and wood ear mushrooms in a savory brown sauce",
    scene: "Served on a rectangular white plate, garnished with green scallions, cozy dining light.",
    summary: "長方形白盤、醬爆魚片、木耳胡蘿蔔"
  },
  "dh-spicy-pan-fried-seafood-rice-cake": {
    food: "A highly appetizing Korean rice cake dish (tteok), generous restaurant portion, featuring chewy cylinder rice cakes stir-fried with white shrimp, clams, and squid in a rich, glossy fiery-red gochujang sauce",
    scene: "Served in a traditional shallow pan on a wooden table, steam rising, vibrant red colors.",
    summary: "韓式淺鐵鍋、辣炒年糕、海鮮料"
  },
  "dh-spicy-pan-fried-squid": {
    food: "A highly appetizing Korean specialty dish, generous restaurant portion, featuring tender, cross-cut squid rings and tentacles stir-fried with onions and scallions in a glossy, rich red chili sauce",
    scene: "Served on a shallow black ceramic plate, sprinkled with sesame seeds, close-up hero view.",
    summary: "黑色陶盤、鮮紅辣炒中卷、洋蔥蔥段"
  },
  "dh-spicy-stired-fried-chicken": {
    food: "A highly appetizing Korean specialty dish, generous restaurant portion, featuring tender chicken thigh chunks stir-fried with cabbage, sweet potatoes, and rice cakes in a rich, glossy crimson gochujang sauce",
    scene: "Served in a large cast-iron skillet, steaming hot, highlighting the red sauce and tender chicken, warm kitchen setting.",
    summary: "鑄鐵平底鍋、春川辣炒雞、高麗菜年糕"
  },
  "dh-ginseng-chicken-clay-pot": {
    food: "A highly appetizing Korean specialty dish, generous restaurant portion, featuring a whole, tender small spring chicken stuffed with glutinous rice, simmering in a rich, milky white chicken broth with whole ginseng root, red dates, and garlic cloves",
    scene: "Served in a large traditional earthenware clay pot, bubbling hot with steam rising, garnishes of chopped green scallions on top.",
    summary: "大型砂鍋、人蔘燉全雞、乳白雞湯、紅棗"
  },
  "dh-ginseng-chicken-hot-pot": {
    food: "A highly appetizing Korean specialty dish, generous restaurant portion, featuring a rich ginseng chicken soup hot pot with sliced tender chicken, shiitake mushrooms, red dates, and chewy Korean rice cakes in a clean broth",
    scene: "Served in a wide hot pot on a tabletop stove, fresh vegetables arranged beautifully, family style dining.",
    summary: "寬口火鍋、人蔘雞湯底、年糕鮮菇"
  },
  "dh-korean-bbq-beef-short-ribs": {
    food: "A highly appetizing Korean restaurant chef's special, generous portion, featuring thinly sliced tender beef short ribs, grilled to perfection with glossy sweet-savory BBQ glaze, topped with toasted sesame seeds",
    scene: "Served on a sizzling cast-iron plate on a wooden base, surrounded by grilled onion slices, warm steakhouse lighting.",
    summary: "鐵板烤盤、醬烤翼板牛、洋蔥圈、白芝麻"
  },
  "dh-cajun-korean-fried-chicken": {
    food: "A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy, golden-brown double-fried chicken thigh chunks, generously drizzled with a glossy, yellow-orange honey cajun sauce",
    scene: "Served on a rustic wooden platter, with sliced pickled radish and green onions on the side, warm party lighting.",
    summary: "木質拼盤、金黃炸雞塊、黃橙肯瓊醬"
  },
  "dh-creamy-onion-korean-fried-chicken": {
    food: "A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy double-fried chicken chunks topped with a generous amount of creamy white onion sauce and thin, translucent sliced raw onions",
    scene: "Served on a modern white ceramic plate, side close-up showing the creamy sauce and crispy skin texture.",
    summary: "白陶瓷盤、脆皮炸雞、濃郁白醬、洋蔥絲"
  },
  "dh-honey-garlic-korean-fried-chicken": {
    food: "A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy double-fried chicken chunks coated in a glossy, sticky amber-colored honey garlic glaze, studded with minced garlic",
    scene: "Served in a wire basket lined with parchment paper, shiny glaze catching the warm dining light.",
    summary: "烘焙紙鐵絲籃、蜜汁蒜味炸雞、亮澤淋醬"
  },
  "dh-original-korean-fried-chicken": {
    food: "A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy, golden-brown double-fried chicken thigh pieces showing an extra-crunchy cracked batter texture, lightly dusted with salt and pepper",
    scene: "Served on a simple wooden board, accompanied by a small bowl of sweet-and-sour pickled white radish cubes.",
    summary: "原木板、黃金脆皮原味炸雞、醃蘿蔔"
  },
  "dh-spicy-korean-fried-chicken": {
    food: "A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy double-fried chicken chunks coated in a thick, glossy, bright red sweet-and-spicy gochujang glaze, sprinkled with white sesame seeds",
    scene: "Served on a dark stoneware platter, vibrant red chicken pieces contrasting with the dark plate, casual pub atmosphere.",
    summary: "黑色陶盤、鮮紅甜辣炸雞、白芝麻"
  },
  "dh-bbq-korean-fried-chicken": {
    food: "A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy double-fried chicken chunks glazed in a rich, dark brown glossy soy-based Korean BBQ sauce, sprinkled with sesame seeds",
    scene: "Served on a wooden platter on a dark rustic table, side window light highlighting the glaze texture.",
    summary: "木質長盤、醬油烤醬炸雞、深色亮澤"
  },
  "dh-korean-cheese-egg-roll": {
    food: "A highly appetizing Korean rolled omelette (gyeran-mari), generous restaurant portion, featuring a thick, golden-yellow layered Korean egg roll (gyeran-mari), sliced to reveal a generous filling of melting cheddar and mozzarella cheese stretching out",
    scene: "Arranged on a rectangular ceramic plate, cheese pull captured beautifully, bright breakfast table setting.",
    summary: "長條陶盤、厚切明黃蛋捲、起司熔岩"
  },
  "dh-korean-sweet-and-sour-pork": {
    food: "A highly appetizing Korean restaurant chef's special, generous portion, featuring crispy, golden-fried pork strips coated in a translucent, glossy sweet-and-sour glaze containing wood ear mushrooms and carrot slices",
    scene: "Served in a large white ceramic bowl, glaze catching the bright dining light, side view.",
    summary: "深圓大白碗、酥炸糖醋肉、木耳胡蘿蔔"
  },
  "dh-fried-oysters": {
    food: "A highly appetizing Korean restaurant chef's special, generous portion, featuring golden-brown, panko-crusted deep-fried oysters, displaying an extra-crispy textured exterior",
    scene: "Served on a plate with shredded cabbage salad and a side of tartar sauce, fresh lunch light.",
    summary: "陶瓷盤、金黃酥脆炸生蠔、高麗菜絲"
  },
  "dh-kimchi-tofu-pancake": {
    food: "A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a round, golden-brown Korean savory pancake featuring red kimchi bits and crumbled tofu, with crispy edges",
    scene: "Served on a flat round plate, cut into wedges, accompanied by a small ramekin of soy-sesame dipping sauce.",
    summary: "圓形淺盤、泡菜豆腐煎餅、醬油碟"
  },
  "dh-seafood-pancake": {
    food: "A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a large, round, golden-brown crispy Korean seafood pancake stuffed with whole white shrimp, squid rings, and green scallions",
    scene: "Served on a wooden board, showing crispy texture and colorful seafood, warm kitchen light.",
    summary: "原木砧板、海鮮蔥煎餅、白蝦透抽"
  },
  "dh-bbq-wrap": {
    food: "A highly appetizing Korean restaurant chef's special, generous portion, featuring thinly sliced beef short plate stir-fried in a sweet soy-sauce glaze, topped with a massive heap of thin shredded green scallions",
    scene: "Served in a round ceramic bowl on a dark dining table, close-up highlighting the contrast between glazed beef and fresh green onions.",
    summary: "圓陶碗、醬燒牛五花、高聳青蔥絲"
  },
  "dh-ox-bone-soup": {
    food: "A highly appetizing Korean restaurant chef's special, generous portion, featuring a comforting bowl of rich, milky white ox bone soup (seolleongtang) with tender slices of beef brisket and green onion rounds floating on top",
    scene: "Served in a traditional metal bowl (bangjja yugi) on a wooden table, steam rising, accompanied by a side of rice and radish kimchi (kkakdugi).",
    summary: "金色黃銅碗、乳白牛骨湯、牛肉片蔥花"
  },
  "dh-korean-fried-chicken-combo": {
    food: "A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring a double portion of crispy Korean fried chicken, half glazed in bright red sweet-and-spicy gochujang sauce and half glazed in a glossy dark brown BBQ sauce",
    scene: "Served side-by-side in a long rectangular platter on a pub table, garnished with sesame seeds, close-up showcasing both flavors.",
    summary: "雙格長盤、雙口味炸雞（紅辣與黑醬）"
  },
  "dh-truffle-cheese-egg-roll": {
    food: "A highly appetizing Korean rolled omelette (gyeran-mari), generous restaurant portion, featuring a thick, golden-yellow layered Korean egg roll filled with melting mozzarella cheese, topped with a drizzle of black truffle paste and cheese sauce",
    scene: "Served on a slate board, truffle streaks visible on top, elegant modern dining table setting.",
    summary: "石板托盤、厚切松露起司蛋捲"
  }
};

function readRecipeTitle(slug) {
  const content = readFileSync(join(recipeDir, `${slug}.md`), "utf8");
  const match = content.match(/^title:\s*(.+)$/m);
  if (!match) {
    throw new Error(`Missing title for ${slug}`);
  }
  return match[1].trim().replace(/^"|"$/g, "");
}

function flattenMenu(menu) {
  const dishes = [];
  const sectionRanges = [];
  let num = 0;
  let sectionStart = 1;

  for (const category of menu.categories) {
    for (const item of category.items) {
      num += 1;
      const data = DISH_DATA[item.slug];
      if (!data) {
        throw new Error(`Missing DISH_DATA for slug: ${item.slug}`);
      }
      dishes.push({
        num,
        slug: item.slug,
        title: readRecipeTitle(item.slug),
        filename: `${item.slug}.webp`,
        categoryName: category.name,
        categorySlug: category.slug,
        food: data.food,
        composition: data.scene,
        sceneSummary: data.summary,
        prompt: `${data.food}. Composition: ${data.scene} ${STYLE_TAIL}`
      });
    }
    sectionRanges.push({
      label: `${category.name}（${sectionStart}~${num}）`,
      start: sectionStart,
      end: num
    });
    sectionStart = num + 1;
  }

  return { dishes, sectionRanges, count: num };
}

function buildMarkdown(menu) {
  const { dishes, sectionRanges, count } = flattenMenu(menu);

  const lines = [];
  lines.push("# 食譜成品圖繪製清單（涓豆腐名店還原 58 篇，給 Gemini）");
  lines.push("");
  lines.push(
    `本站新增 **${count} 篇**涓豆腐 Dubu House 名店還原食譜（\`dh-*\` slug），目前 \`coverImage\` 皆為 \`.svg\` 佔位。請依下表各產出一張成品圖；圖檔放入 \`public/images/recipes/\` 後，將 frontmatter 的 \`coverImage\` 改為 \`.webp\` 即可上線。`
  );
  lines.push("");
  lines.push("## 輸出規格建議");
  lines.push("");
  lines.push("| 項目 | 建議 |");
  lines.push("| --- | --- |");
  lines.push("| 比例 | 4:3（例如 1200×900 或 800×600） |");
  lines.push("| 格式 | WebP（或 PNG 再轉 WebP） |");
  lines.push(
    "| 風格 | 彩鉛 + 水彩插畫（colored pencil and watercolor illustration），溫暖居家、非寫實攝影 |"
  );
  lines.push(
    "| 構圖 | 韓式餐廳份量成品為主角；**每道菜使用不同場景／角度／光線**（見下方各篇 prompt，避免重複道具組合） |"
  );
  lines.push(
    "| 還原取向 | 韓式嫩豆腐煲、石鍋飯、炸雞與韓式前菜風格，湯頭紅亮、石鍋滋滋、炸雞酥脆，維持插畫感而非商業攝影 |"
  );
  lines.push("| 文字 | 圖上不要加字、不要浮水印 |");
  lines.push("| 存放路徑 | `public/images/recipes/` |");
  lines.push("| 檔名 | 與下表「檔名」欄一致（slug + `.webp`） |");
  lines.push("");
  lines.push("上線後每篇食譜 frontmatter：`coverImage: \"/images/recipes/{slug}.webp\"`");
  lines.push("");
  lines.push("多語系食譜（`recipes-en` / `recipes-ja` / `recipes-ko`）封面路徑與繁中版相同。");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## 圖片進度狀態");
  lines.push("");
  lines.push(`- ⬜ **待完成（共 ${count} 篇）**：DH-01 ~ DH-${String(count).padStart(2, "0")}（涓豆腐名店還原全系列）`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Prompt 風格尾段（每道食譜都接上）");
  lines.push("");
  lines.push(
    "> **場景與構圖寫在各食譜段落內**；以下只統一畫風與輸出限制，不要每張都複製同一套木桌／窗光／水杯／布巾。"
  );
  lines.push("");
  lines.push("```text");
  lines.push(STYLE_TAIL);
  lines.push("```");
  lines.push("");
  lines.push("### 構圖變化對照（給批次產圖時參考）");
  lines.push("");
  lines.push("| # | 食譜 | 場景／角度／光線（摘要） |");
  lines.push("| --- | --- | --- |");
  for (const dish of dishes) {
    lines.push(`| ${dish.num} | ${dish.title} | ${dish.sceneSummary} |`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(`## 清單與檔名（${count}）`);
  lines.push("");
  lines.push("| # | 食譜名稱 | slug | 建議檔名 |");
  lines.push("| --- | --- | --- | --- |");
  for (const dish of dishes) {
    lines.push(`| ${dish.num} | ${dish.title} | \`${dish.slug}\` | \`${dish.filename}\` |`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## 各食譜完整 Prompt（複製到 Gemini）");
  lines.push("");
  lines.push(
    "> 每段 = **料理描述** + **獨立場景構圖** + **風格尾段**。編號順序與 [`docs/content/dubu-house-menu-replication.md`](content/dubu-house-menu-replication.md) 菜單分類一致。"
  );
  lines.push("");

  for (const section of sectionRanges) {
    lines.push(`### ${section.label}`);
    lines.push("");
    const sectionDishes = dishes.filter(
      (dish) => dish.num >= section.start && dish.num <= section.end
    );
    for (const dish of sectionDishes) {
      lines.push(`#### ${dish.num}. ${dish.title} — \`${dish.filename}\``);
      lines.push("");
      lines.push("```text");
      lines.push(dish.prompt);
      lines.push("```");
      lines.push("");
    }
  }

  lines.push("---");
  lines.push("");
  lines.push("## 上線檢查清單");
  lines.push("");
  lines.push("完成繪圖後，逐篇確認：");
  lines.push("");
  lines.push("1. 檔案已放入 `public/images/recipes/{slug}.webp`");
  lines.push("2. `src/content/recipes/{slug}.md` 的 `coverImage` 已改為 `.webp`");
  lines.push("3. 同步更新 `recipes-en` / `recipes-ja` / `recipes-ko` 同名食譜封面路徑");
  lines.push("4. 執行 `npm run build` 通過");
  lines.push("5. 瀏覽 `/recipes/{slug}/` 與 `/restaurant-replicas/` 確認封面顯示正常");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## 相關路徑");
  lines.push("");
  lines.push("| 用途 | 路徑 |");
  lines.push("| --- | --- |");
  lines.push("| 名店還原專區 | `/restaurant-replicas/` |");
  lines.push("| 涓豆腐菜單對照 | `docs/content/dubu-house-menu-replication.md` |");
  lines.push("| 食譜產生器 | `scripts/generate-dubu-house-recipes.mjs` |");
  lines.push("| 封面 prompt 產生器 | `scripts/generate-dubu-house-cover-prompts.mjs` |");
  lines.push("| 貳樓批次範例 | `docs/recipe-cover-images-for-gemini-second-floor-70.md` |");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

const menu = JSON.parse(readFileSync(menuPath, "utf8"));
writeFileSync(outputPath, buildMarkdown(menu), "utf8");
console.log(`Wrote ${outputPath} (${menu.recipeCount} dishes)`);
