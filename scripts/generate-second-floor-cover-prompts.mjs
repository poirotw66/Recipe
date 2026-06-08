import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const recipeDir = join(root, "src/content/recipes");
const outputPath = join(root, "docs/recipe-cover-images-for-gemini-second-floor-70.md");

const STYLE_TAIL =
  "Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.";

/** Menu order from docs/content/second-floor-cafe-menu-replication.md */
const orderedSlugs = [
  "sf-san-francisco-garlic-fries",
  "sf-oat-crusted-fish-and-fries",
  "sf-truffle-fries",
  "sf-poutine-meat-sauce-fries",
  "sf-salted-egg-yolk-fries",
  "sf-salsa-black-curry-fried-chicken",
  "sf-chicken-quesadilla",
  "sf-local-sausage-quesadilla",
  "sf-crispy-calamari-cocktail-sauce",
  "sf-buffalo-chicken-wings",
  "sf-second-floor-saltwater-chicken-salad",
  "sf-roasted-sesame-chicken-salad",
  "sf-classic-caesar-salad",
  "sf-sous-vide-chicken-caesar-salad",
  "sf-smoked-salmon-caesar-salad",
  "sf-green-superhero-quinoa-buddha-bowl",
  "sf-sous-vide-chicken-quinoa-cauliflower-rice",
  "sf-keto-surf-and-turf-platter",
  "sf-tropical-yogurt-bowl",
  "sf-acai-berry-yogurt-bowl",
  "sf-avocado-bacon-open-toast",
  "sf-poached-egg-smoked-beef-danish-open",
  "sf-avocado-smoked-salmon-open-toast",
  "sf-avocado-local-sausage-danish-open",
  "sf-black-truffle-cordon-bleu-pork-open",
  "sf-orange-danish-sunny-sous-vide-chicken",
  "sf-orange-danish-poached-seafood-potato",
  "sf-orange-danish-sous-vide-steak",
  "sf-orange-danish-mushroom-poached-potato",
  "sf-classic-ham-mushroom-eggs-benedict",
  "sf-sichuan-chicken-mushroom-eggs-benedict",
  "sf-classic-beef-mushroom-eggs-benedict",
  "sf-smoked-salmon-mushroom-eggs-benedict",
  "sf-supreme-cheese-omelette",
  "sf-worcester-meat-sauce-omelette",
  "sf-mushroom-cheese-omelette",
  "sf-spicy-tomato-bacon-penne",
  "sf-dawn-shrimp-chicken-linguine",
  "sf-spicy-pepper-karaage-pasta",
  "sf-homestyle-meat-sauce-penne-with-meatballs",
  "sf-classic-pesto-shrimp-pasta",
  "sf-white-wine-garlic-clam-squid-ink-pasta",
  "sf-salted-egg-bitter-melon-pasta",
  "sf-cheesy-local-sausage-cream-pasta",
  "sf-second-floor-fiesta-shrimp-penne",
  "sf-balsamic-mushroom-pasta",
  "sf-truffle-mushroom-cream-pasta",
  "sf-bloody-mary-spicy-rice",
  "sf-black-pepper-hamburg-rice",
  "sf-spicy-spanish-surf-and-turf-rice",
  "sf-baked-thick-cut-pork-cream-rice",
  "sf-moon-view-bitter-melon-cream-rice",
  "sf-griddled-butter-ham-sandwich",
  "sf-spicy-mexican-firecracker-burger",
  "sf-signature-double-stack-burger",
  "sf-bbq-roasted-half-chicken",
  "sf-chef-crispy-pork-knuckle",
  "sf-mini-beef-egg-burger-set",
  "sf-cheesy-chicken-egg-rice",
  "sf-kids-cream-chicken-penne",
  "sf-strong-chocolate-cake",
  "sf-brownie-ice-cream",
  "sf-american-cheesecake",
  "sf-country-cinnamon-peach-pie",
  "sf-greek-campfire-grilled-chicken-brunch",
  "sf-campfire-lemon-zucchini-fish-fillet",
  "sf-sweet-savory-rice",
  "sf-salted-egg-seafood-pizza",
  "sf-asahi-cordon-bleu-pork-burger",
  "sf-south-sea-spiced-chicken-rice"
];

const sectionRanges = [
  { label: "分享盤 Sharing Plate（1~15）", start: 1, end: 15 },
  { label: "均衡盤 Light Plate（16~20）", start: 16, end: 20 },
  { label: "開放三明治 Open（21~25）", start: 21, end: 25 },
  { label: "貳樓早午餐 SF Brunch（26~36）", start: 26, end: 36 },
  { label: "主餐｜飯麵 Main（37~52）", start: 37, end: 52 },
  { label: "主餐｜手抓 Big Bite（53~55）", start: 53, end: 55 },
  { label: "主餐｜盤餐 Big Plate（56~57）", start: 56, end: 57 },
  { label: "小大人餐 Kids（58~60）", start: 58, end: 60 },
  { label: "甜點 Dessert（61~64）", start: 61, end: 64 },
  { label: "林口店限定（65~66）", start: 65, end: 66 },
  { label: "分店／季節限定（67~70）", start: 67, end: 70 }
];

const promptData = {
  "sf-san-francisco-garlic-fries": {
    food:
      "A highly appetizing basket of San Francisco-style garlic fries, generous restaurant sharing size, featuring golden crispy thick-cut fries tossed in glossy garlic butter sauce with visible minced garlic bits.",
    composition:
      "Served in a kraft paper cone inside a wire fry basket on a dark pub wooden table, small ramekin of garlic aioli beside, warm amber pendant light, three-quarter close-up angle.",
    sceneSummary: "紙筒薯條籃、蒜味醬、酒吧木桌、暖色吊燈"
  },
  "sf-oat-crusted-fish-and-fries": {
    food:
      "A highly appetizing plate of oat-crusted fried fish and chips, generous restaurant sharing size, featuring a golden oat-coated fish fillet with crunchy batter, thick fries, and creamy tartar sauce.",
    composition:
      "Newspaper-lined wicker basket on a light oak café counter, lemon wedge and tartar sauce cup nearby, bright midday window light, eye-level side view.",
    sceneSummary: "炸魚薯條籃、塔塔醬、檸檬、中島檯面"
  },
  "sf-truffle-fries": {
    food:
      "A highly appetizing plate of truffle fries, generous restaurant sharing size, featuring crispy fries drizzled with dark truffle sauce and dusted with grated cheese.",
    composition:
      "Stacked in a matte black ceramic bowl on a marble bistro counter, subtle truffle oil sheen, soft evening side light, slight overhead hero angle.",
    sceneSummary: "黑碗松露薯條、大理石吧台、俯視"
  },
  "sf-poutine-meat-sauce-fries": {
    food:
      "A highly appetizing plate of poutine-style fries, generous restaurant sharing size, featuring crispy fries smothered in rich brown meat gravy and melted cheese curds.",
    composition:
      "Shallow white diner plate on a speckled laminate tabletop, gravy pooling at the edges, cozy late-night tungsten glow, close-up three-quarter view.",
    sceneSummary: "肉醬起司薯條、淺盤、宵夜暖光"
  },
  "sf-salted-egg-yolk-fries": {
    food:
      "A highly appetizing plate of salted egg yolk fries, generous restaurant sharing size, featuring golden fries coated in creamy salted egg sauce with hints of chili and basil.",
    composition:
      "Modern café marble tabletop, sauce drizzled in bold golden streaks, clean minimalist framing, cool-neutral daylight from the right, medium close-up.",
    sceneSummary: "金沙醬薯條、大理石桌、側光"
  },
  "sf-salsa-black-curry-fried-chicken": {
    food:
      "A highly appetizing plate of fried chicken with black curry and fresh salsa, generous restaurant sharing size, featuring crispy chicken pieces, dark curry drizzle, and colorful tomato salsa.",
    composition:
      "Rustic wooden sharing platter on a warm brick-toned table, small salsa bowl and curry sauce streaks visible, dynamic diagonal angle under soft afternoon light.",
    sceneSummary: "黑咖哩炸雞、莎莎醬、木盤斜角"
  },
  "sf-chicken-quesadilla": {
    food:
      "A highly appetizing Mexican chicken quesadilla, generous restaurant sharing size, cut into golden triangle wedges showing melted cheese, chicken, avocado crema, and salsa inside.",
    composition:
      "Served on a seasoned cast-iron comal resting on a woven trivet, guacamole and sour cream on the side, bright southwestern noon light, three-quarter view.",
    sceneSummary: "雞肉酥餅、鑄鐵盤、酪梨醬配菜"
  },
  "sf-local-sausage-quesadilla": {
    food:
      "A highly appetizing local sausage quesadilla, generous restaurant sharing size, with crispy grilled tortilla triangles, melted cheese pull, sausage coins, and colorful salsa toppings.",
    composition:
      "Colorful ceramic plate on a terracotta tabletop, cheese stretch captured mid-pull, cheerful warm kitchen light, close-up hero angle.",
    sceneSummary: "香腸酥餅、起司牽絲、陶土色桌面"
  },
  "sf-crispy-calamari-cocktail-sauce": {
    food:
      "A highly appetizing serving of crispy fried calamari with cocktail sauce, generous restaurant sharing size, featuring golden squid rings, lemon wedge, and a small cup of pink cocktail sauce.",
    composition:
      "Tall napkin-lined metal bucket on a navy-blue café table, fries peeking underneath, crisp cool window fill light, medium side angle.",
    sceneSummary: "酥炸魷魚桶、雞尾酒醬、金屬桶裝"
  },
  "sf-buffalo-chicken-wings": {
    food:
      "A highly appetizing plate of Buffalo chicken wings, generous restaurant sharing size, featuring glossy orange-red hot sauce coated wings with blue cheese dipping sauce.",
    composition:
      "Metal bucket with parchment paper on a sports-bar style dark wood table, celery sticks implied off-frame, warm overhead bar light, close-up three-quarter view.",
    sceneSummary: "水牛城雞翅、藍紋起司醬、金屬桶"
  },
  "sf-second-floor-saltwater-chicken-salad": {
    food:
      "A highly appetizing Taiwanese-style salted chicken salad, generous restaurant sharing size, featuring shredded salted chicken, bitter melon slices, fire-grilled corn, mixed greens, and chili-dusted vinaigrette.",
    composition:
      "Large wooden salad bowl on a sunlit brunch table near a window, vibrant green and golden corn contrast, fresh morning side light, gentle overhead angle.",
    sceneSummary: "鹽水雞沙拉、木碗、窗邊早午餐光"
  },
  "sf-roasted-sesame-chicken-salad": {
    food:
      "A highly appetizing roasted sesame chicken salad, generous restaurant sharing size, featuring crispy fried chicken strips, cherry tomatoes, pickles, mixed lettuce, and glossy sesame dressing.",
    composition:
      "Wide shallow ceramic bowl on a linen placemat, dressing glistening on greens, soft diffused afternoon light, three-quarter close-up.",
    sceneSummary: "胡麻雞沙拉、淺碗、亞麻餐墊"
  },
  "sf-classic-caesar-salad": {
    food:
      "A highly appetizing classic Caesar salad, generous restaurant sharing size, featuring crisp romaine lettuce, bacon bits, golden croutons, and creamy Caesar dressing.",
    composition:
      "Tall white porcelain bowl centered on a clean wooden dining table, croutons prominently scattered on top, natural bright daylight, slight top-angled view.",
    sceneSummary: "凱薩沙拉、白瓷碗、俯視"
  },
  "sf-sous-vide-chicken-caesar-salad": {
    food:
      "A highly appetizing sous-vide chicken Caesar salad, generous restaurant sharing size, with tender sliced chicken breast over classic Caesar lettuce, bacon, and croutons.",
    composition:
      "Brunch café table setting with a simple water glass blurred in background, chicken slices fanned on top, warm late-morning window light, eye-level view.",
    sceneSummary: "舒肥雞凱薩、早午餐桌、切片鋪頂"
  },
  "sf-smoked-salmon-caesar-salad": {
    food:
      "A highly appetizing smoked salmon Caesar salad, generous restaurant sharing size, featuring pink smoked salmon curls, soft-boiled egg halves, romaine, croutons, and Caesar dressing.",
    composition:
      "Long oval white platter on a slate tabletop, salmon and egg arranged elegantly, cool-neutral brunch daylight, three-quarter hero angle.",
    sceneSummary: "燻鮭凱薩、橢圓盤、溏心蛋"
  },
  "sf-green-superhero-quinoa-buddha-bowl": {
    food:
      "A highly appetizing green superhero quinoa Buddha bowl, hearty health platter portion, featuring quinoa, roasted broccoli, asparagus, salsa, and a perfect poached egg on top.",
    composition:
      "Deep round ceramic bowl on a light bamboo mat, straight top-down view showing colorful layered sections, fresh morning daylight.",
    sceneSummary: "藜麥佛陀碗、正俯視、分層配色"
  },
  "sf-sous-vide-chicken-quinoa-cauliflower-rice": {
    food:
      "A highly appetizing sous-vide chicken with quinoa and cauliflower rice, hearty health platter portion, featuring sliced chicken, cauliflower rice, quinoa, grilled corn, and cheese sauce.",
    composition:
      "Partitioned lunch plate on a minimalist desk, healthy meal prep mood, bright neutral noon light from above, 45-degree angle.",
    sceneSummary: "舒肥雞花椰飯、分格盤、午餐俯視"
  },
  "sf-keto-surf-and-turf-platter": {
    food:
      "A highly appetizing keto surf-and-turf platter, hearty health platter portion, featuring sous-vide beef slices, basa fish fillet, sautéed mushrooms, cheese, and mixed greens.",
    composition:
      "Large white oval platter on a dark stone countertop, protein-forward arrangement, dramatic side spotlight, low-angle close-up.",
    sceneSummary: "海陸拼盤、大石盤、側光低角"
  },
  "sf-tropical-yogurt-bowl": {
    food:
      "A highly appetizing tropical fruit yogurt bowl, hearty health platter portion, featuring creamy yogurt topped with banana, mango, seasonal fruits, granola, and nuts.",
    composition:
      "Coconut-shell bowl on a sunny patio table, tropical vacation brunch mood, warm golden morning backlight, close-up three-quarter view.",
    sceneSummary: "熱帶優格碗、椰殼碗、戶外晨光"
  },
  "sf-acai-berry-yogurt-bowl": {
    food:
      "A highly appetizing acai berry yogurt bowl, hearty health platter portion, featuring deep purple acai base, mixed berries, banana slices, granola, and nuts.",
    composition:
      "Smoothie-bowl style presentation on a white marble kitchen island, vibrant purple and red color pop, bright clean daylight, slight overhead angle.",
    sceneSummary: "巴西莓碗、紫色基底、大理石檯"
  },
  "sf-avocado-bacon-open-toast": {
    food:
      "A highly appetizing avocado bacon open toast, generous café open-face serving, featuring toasted sourdough bread topped with sliced avocado, crispy bacon, poached egg, and balsamic drizzle.",
    composition:
      "Rustic wooden cutting board on a brunch counter, open-face toast as hero, soft window side light, three-quarter close-up.",
    sceneSummary: "酪梨培根 Open、木板、歐包切片"
  },
  "sf-poached-egg-smoked-beef-danish-open": {
    food:
      "A highly appetizing poached egg and smoked beef Danish open sandwich, generous café open-face serving, featuring flaky Danish pastry, pink smoked beef, runny poached egg, and mustard sauce.",
    composition:
      "Danish pastry base on a pale ceramic plate, egg yolk about to flow, cozy café morning light, close-up hero angle.",
    sceneSummary: "燻牛肉丹麥 Open、水波蛋流心"
  },
  "sf-avocado-smoked-salmon-open-toast": {
    food:
      "A highly appetizing avocado smoked salmon open toast, generous café open-face serving, featuring sourdough, cream cheese, smoked salmon, avocado, poached egg, capers, and lemon.",
    composition:
      "Elegant brunch plate on a white tablecloth, salmon curls and capers detailed, soft diffused daylight, eye-level three-quarter view.",
    sceneSummary: "燻鮭酪梨 Open、白桌布、酸豆"
  },
  "sf-avocado-local-sausage-danish-open": {
    food:
      "A highly appetizing avocado local sausage Danish open sandwich, generous café open-face serving, featuring Danish bread, sliced sausage, avocado, poached egg, and chili powder dusting.",
    composition:
      "Round plate on a warm honey-toned wooden table, sausage rounds and green avocado contrast, afternoon window light, medium close-up.",
    sceneSummary: "香腸丹麥 Open、香腸圓片、暖木桌"
  },
  "sf-black-truffle-cordon-bleu-pork-open": {
    food:
      "A highly appetizing black truffle cordon bleu pork open toast, generous café open-face serving, featuring thick cordon bleu pork cutlet with melted cheese center, black truffle sauce, and poached egg on rustic bread.",
    composition:
      "Upscale bistro slate board, truffle shavings visible, moody warm spotlight from above, dramatic close-up angle.",
    sceneSummary: "藍帶豬 Open、松露醬、石板墊"
  },
  "sf-orange-danish-sunny-sous-vide-chicken": {
    food:
      "A highly appetizing orange-glazed French Danish brunch with sous-vide chicken, generous brunch platter size, featuring orange Danish pastry ring, sliced chicken, sunny-side egg, hash browns, and honey mustard.",
    composition:
      "Round brunch plate on a sunny window-side table, orange glaze shine on pastry, golden morning light, three-quarter view.",
    sceneSummary: "橙香丹麥舒肥雞、窗邊早午餐"
  },
  "sf-orange-danish-poached-seafood-potato": {
    food:
      "A highly appetizing orange Danish brunch with poached egg, seafood, and potatoes, generous brunch platter size, featuring orange pastry, mixed seafood, sautéed mushrooms, and crispy potato hash.",
    composition:
      "Wide brunch platter on a woven placemat, seafood and potato hash textured, soft late-morning light, slight overhead angle.",
    sceneSummary: "橙香海鮮洋芋、編織墊、寬盤"
  },
  "sf-orange-danish-sous-vide-steak": {
    food:
      "A highly appetizing orange Danish brunch with sous-vide steak, generous brunch platter size, featuring orange pastry, sliced medium-rare steak, fried egg, hash browns, and honey mustard drizzle.",
    composition:
      "Steakhouse-brunch mood on a dark wooden board, steak slices fanned elegantly, warm amber side light, close-up three-quarter view.",
    sceneSummary: "橙香舒肥牛排、牛排切片、暗木板"
  },
  "sf-orange-danish-mushroom-poached-potato": {
    food:
      "A highly appetizing orange Danish vegetarian brunch, generous brunch platter size, featuring orange pastry, poached egg, creamy sautéed mushrooms, potato hash, and cheese sauce.",
    composition:
      "Creamy mushroom texture highlighted on a cream-colored plate, gentle steam wisps, cozy kitchen morning light, eye-level view.",
    sceneSummary: "蕈菇水波洋芋、奶油菇、蒸氣"
  },
  "sf-classic-ham-mushroom-eggs-benedict": {
    food:
      "A highly appetizing classic ham eggs Benedict, generous brunch platter size, featuring toasted English muffin, ham, creamy sautéed mushrooms, poached egg, and rich hollandaise sauce.",
    composition:
      "Stacked Benedict on a white brunch plate, hollandaise dripping down the side, warm café window light, close-up hero angle.",
    sceneSummary: "火腿班尼蛋、荷蘭醬滴落、堆疊"
  },
  "sf-sichuan-chicken-mushroom-eggs-benedict": {
    food:
      "A highly appetizing Sichuan-style saliva chicken eggs Benedict, generous brunch platter size, featuring English muffin, spicy chicken, creamed mushrooms, poached egg, and chili oil accents.",
    composition:
      "Modern fusion brunch plate on a concrete-texture tabletop, subtle red chili oil gleam, cool-neutral daylight, three-quarter view.",
    sceneSummary: "口水雞班尼蛋、辣油點綴、混凝土檯"
  },
  "sf-classic-beef-mushroom-eggs-benedict": {
    food:
      "A highly appetizing classic beef eggs Benedict, generous brunch platter size, featuring English muffin, tender beef slices, sautéed mushrooms, poached egg, and hollandaise.",
    composition:
      "Hearty brunch setting on a dark slate plate, beef and mushrooms layered generously, warm tungsten brunch lamp, medium close-up.",
    sceneSummary: "牛肉班尼蛋、石板盤、暖色燈"
  },
  "sf-smoked-salmon-mushroom-eggs-benedict": {
    food:
      "A highly appetizing smoked salmon eggs Benedict, generous brunch platter size, featuring English muffin, smoked salmon, capers, creamed mushrooms, poached egg, and hollandaise.",
    composition:
      "Elegant brunch presentation on an oval plate, pink salmon and golden hollandaise contrast, soft morning side light, three-quarter angle.",
    sceneSummary: "燻鮭班尼蛋、橢圓盤、酸豆"
  },
  "sf-supreme-cheese-omelette": {
    food:
      "A highly appetizing supreme cheese omelette, generous brunch platter size, featuring a golden folded omelette filled with ham, corn, mixed melted cheeses, and hash browns on the side.",
    composition:
      "Classic diner plate on a checkered napkin, omelette fold showing filling peek, bright breakfast window light, eye-level view.",
    sceneSummary: "總匯歐姆蛋、格子餐巾、早午餐"
  },
  "sf-worcester-meat-sauce-omelette": {
    food:
      "A highly appetizing Worcestershire meat sauce omelette, generous brunch platter size, featuring a fluffy omelette stuffed with savory meat sauce and melted cheese, with hash browns alongside.",
    composition:
      "Rustic ceramic plate on a wooden breakfast table, meat sauce oozing from the omelette seam, warm morning glow, close-up three-quarter angle.",
    sceneSummary: "肉醬歐姆蛋、醬汁溢出、木桌"
  },
  "sf-mushroom-cheese-omelette": {
    food:
      "A highly appetizing mushroom cheese omelette, generous brunch platter size, featuring a tender omelette filled with buttery sautéed mushrooms and melted mixed cheeses.",
    composition:
      "Simple white plate on a light kitchen counter, mushroom filling spilling gently from the fold, soft diffused daylight, medium close-up.",
    sceneSummary: "蕈菇起司歐姆蛋、淺色檯面"
  },
  "sf-spicy-tomato-bacon-penne": {
    food:
      "A highly appetizing spicy tomato bacon penne pasta, generous restaurant portion size, featuring penne in rich red tomato sauce with crispy bacon bits, chili flakes, and melted cheese.",
    composition:
      "Deep white pasta bowl on a red-checkered café tablecloth, steam rising gently, warm indoor lunch light, three-quarter hero angle.",
    sceneSummary: "辣茄培根長管麵、深碗、紅格布"
  },
  "sf-dawn-shrimp-chicken-linguine": {
    food:
      "A highly appetizing dawn sauce shrimp and chicken linguine, generous restaurant portion size, featuring linguine in creamy orange-tinted dawn sauce with shrimp, chicken, roasted red pepper, and cheese strands.",
    composition:
      "Wide shallow pasta plate on a sunlit brunch table, sauce glossy and warm-toned, golden afternoon side light, close-up twirled noodle view.",
    sceneSummary: "曙光蝦雞麵、曙光奶油醬、淺盤"
  },
  "sf-spicy-pepper-karaage-pasta": {
    food:
      "A highly appetizing spicy pepper karaage pasta, generous restaurant portion size, featuring linguine in tomato sauce with crispy Japanese karaage chicken, Thai basil, bird's eye chili, and melted cheese.",
    composition:
      "Bold colorful plate on a dark tabletop, karaage pieces prominent on top, dynamic diagonal composition, warm kitchen evening light.",
    sceneSummary: "椒麻唐揚雞麵、唐揚雞塊、斜角"
  },
  "sf-homestyle-meat-sauce-penne-with-meatballs": {
    food:
      "A highly appetizing homestyle meat sauce penne with meatballs, generous restaurant portion size, featuring penne in rich Bolognese sauce topped with beef meatballs, sun-dried tomatoes, and cheese.",
    composition:
      "Family-style deep ceramic bowl on a rustic wooden table, meatballs resting on pasta mound, cozy dinner tungsten glow, three-quarter view.",
    sceneSummary: "肉丸肉醬麵、深陶碗、肉丸鋪頂"
  },
  "sf-classic-pesto-shrimp-pasta": {
    food:
      "A highly appetizing classic pesto shrimp pasta, generous restaurant portion size, featuring linguine coated in vivid green basil pesto with plump pink shrimp, pine nuts, and grated cheese.",
    composition:
      "Fresh green pesto color pop on a white plate, shrimp arranged on top, bright clean daylight, slight overhead three-quarter angle.",
    sceneSummary: "青醬鮮蝦麵、綠色青醬、白盤"
  },
  "sf-white-wine-garlic-clam-squid-ink-pasta": {
    food:
      "A highly appetizing white wine garlic clam squid ink pasta, generous restaurant portion size, featuring black squid ink linguine with open clams, garlic, and Thai basil in a light wine broth.",
    composition:
      "Dramatic dark pasta on a white rimmed plate, clamshells open showing meat, cool-neutral seafood restaurant light, close-up side angle.",
    sceneSummary: "墨魚麵蛤蜊、黑白對比、側光"
  },
  "sf-salted-egg-bitter-melon-pasta": {
    food:
      "A highly appetizing Taiwanese salted egg bitter melon pasta, generous restaurant portion size, featuring linguine in golden salted egg sauce with bitter melon, king oyster mushroom, yam, and chili flakes.",
    composition:
      "Fusion pasta bowl on a bamboo placemat, golden sauce and green bitter melon contrast, warm afternoon window light, three-quarter view.",
    sceneSummary: "鹹蛋苦瓜麵、金沙醬、竹墊"
  },
  "sf-cheesy-local-sausage-cream-pasta": {
    food:
      "A highly appetizing cheesy local sausage cream pasta, generous restaurant portion size, featuring linguine in white Alfredo-style sauce with sliced local sausage, three-cheese blend, and Thai basil.",
    composition:
      "Creamy white sauce glistening in a wide pasta bowl, sausage coins visible, soft cozy brunch lamp light, medium close-up.",
    sceneSummary: "香腸奶白麵、白醬光澤、暖燈"
  },
  "sf-second-floor-fiesta-shrimp-penne": {
    food:
      "A highly appetizing fiesta shrimp penne, generous restaurant portion size, featuring penne in taco-seasoned creamy sauce with juicy shrimp and festive colorful garnish.",
    composition:
      "Fun vibrant plate on a turquoise café tabletop, festive casual mood, bright saturated daylight, dynamic three-quarter angle.",
    sceneSummary: "費氏鮮蝦麵、彩色配料、青綠桌面"
  },
  "sf-balsamic-mushroom-pasta": {
    food:
      "A highly appetizing balsamic mushroom pasta, generous restaurant portion size, featuring linguine with sautéed mixed mushrooms, balsamic glaze, pine nuts, and a raw egg yolk center.",
    composition:
      "Elegant gourmet plate on a dark linen napkin, dark balsamic drizzle contrasting with pasta, moody side spotlight, top-angled view.",
    sceneSummary: "巴薩米克蕈菇麵、生蛋黃、暗色墊"
  },
  "sf-truffle-mushroom-cream-pasta": {
    food:
      "A highly appetizing truffle mushroom cream pasta, generous restaurant portion size, featuring linguine in luxurious truffle cream sauce with assorted sautéed mushrooms and melted cheese.",
    composition:
      "Upscale pasta bowl on a marble counter, truffle cream pale golden, soft evening bistro light, close-up creamy texture focus.",
    sceneSummary: "松露奶油麵、蘑菇、大理石檯"
  },
  "sf-bloody-mary-spicy-rice": {
    food:
      "A highly appetizing Bloody Mary spicy rice, generous restaurant portion size, featuring tomato-juice tinted fragrant rice with cream sauce, sautéed vegetables, ginger, and a spicy kick.",
    composition:
      "Deep rice bowl on a speckled countertop, reddish tomato hue in the rice, warm lunch window light, 45-degree hero angle.",
    sceneSummary: "血腥瑪麗飯、番茄色飯、深碗"
  },
  "sf-black-pepper-hamburg-rice": {
    food:
      "A highly appetizing black pepper hamburger steak rice, generous restaurant portion size, featuring a thick hamburger patty on steamed rice with black pepper sauce, melted cheese, and a fried egg on top.",
    composition:
      "Japanese-western fusion donburi-style bowl on a wooden tray, pepper sauce glossy, bright noon daylight, three-quarter close-up.",
    sceneSummary: "黑胡椒漢堡排飯、炸蛋、木托盤"
  },
  "sf-spicy-spanish-surf-and-turf-rice": {
    food:
      "A highly appetizing spicy Spanish surf-and-turf rice, generous restaurant portion size, featuring saffron-tinted rice with shrimp, clams, chorizo sausage, and melted cheese.",
    composition:
      "Paella-inspired shallow pan on a terracotta table, seafood and sausage arranged on golden rice, warm Mediterranean afternoon light, slight overhead view.",
    sceneSummary: "西班牙海陸飯、淺鍋、番紅花色"
  },
  "sf-baked-thick-cut-pork-cream-rice": {
    food:
      "A highly appetizing baked thick-cut pork chop cream rice, generous restaurant portion size, featuring a thick pork chop on creamy rice with dawn sauce, broccoli, bacon, and baked cheese crust.",
    composition:
      "Oven-baked cheese crust golden on a gratin-style plate, pork chop cross-section visible, warm kitchen evening glow, close-up hero angle.",
    sceneSummary: "焗豬排奶油飯、起司焗烤、焗盤"
  },
  "sf-moon-view-bitter-melon-cream-rice": {
    food:
      "A highly appetizing moon-view bitter melon cream rice, generous restaurant portion size, featuring creamy rice with salted egg, bitter melon, mushrooms, and a raw egg yolk center like a full moon.",
    composition:
      "Japanese-inspired rice bowl on a dark ceramic plate, bright egg yolk centered prominently, soft diffused lunch light, top-angled view.",
    sceneSummary: "月見苦瓜飯、生蛋黃居中、俯視"
  },
  "sf-griddled-butter-ham-sandwich": {
    food:
      "A highly appetizing griddled butter ham sandwich, hearty café sandwich portion, featuring pressed crusty bread with ham, cheese, fried egg, hash browns, and maple syrup on the side.",
    composition:
      "Sandwich cut in half showing layers on butcher paper, hash browns and syrup cup nearby, warm diner morning light, eye-level view.",
    sceneSummary: "厚烤 Ham 三明治、牛皮紙、楓糖漿"
  },
  "sf-spicy-mexican-firecracker-burger": {
    food:
      "A highly appetizing spicy Mexican firecracker burger, hearty restaurant burger size, featuring a beef patty with cheese, fried jalapeño poppers, BBQ sauce, and hash browns on the side.",
    composition:
      "Bold burger on a wooden board with parchment, sauce dripping, energetic diagonal angle, warm pub overhead light.",
    sceneSummary: "辣鞭炮漢堡、墨西哥辣椒、醬汁滴落"
  },
  "sf-signature-double-stack-burger": {
    food:
      "A highly appetizing signature double-stack burger, hearty restaurant burger size, featuring towering beef patty, fried fish fillet, bacon, balsamic sauce, and hash browns.",
    composition:
      "Impressive tall burger held together with a skewer on a dark slate board, dramatic low-angle hero shot, moody spotlight from the side.",
    sceneSummary: "招牌雙層漢堡、高塔、低角仰拍"
  },
  "sf-bbq-roasted-half-chicken": {
    food:
      "A highly appetizing BBQ roasted half chicken, large restaurant sharing platter size, featuring glossy BBQ-glazed half chicken with grilled corn on the cob and crispy fries.",
    composition:
      "Large white dinner plate on a backyard BBQ table mood, corn and fries flanking the chicken, warm golden hour sunlight, three-quarter view.",
    sceneSummary: "BBQ 半雞、烤玉米、黃昏光"
  },
  "sf-chef-crispy-pork-knuckle": {
    food:
      "A highly appetizing chef's crispy pork knuckle, large restaurant sharing platter size, featuring crackling-crisp German-style pork knuckle with sauerkraut, mustard, grilled corn, and fries.",
    composition:
      "Bavarian beer-hall inspired wooden platter, crackling texture highlighted, warm amber tavern light, close-up crunchy skin focus.",
    sceneSummary: "脆皮豬腳、德式酸菜、啤酒屋木盤"
  },
  "sf-mini-beef-egg-burger-set": {
    food:
      "A highly appetizing kids beef and egg mini burger set, cute junior portion size, featuring a small burger with beef patty, fried egg, and a side of fries.",
    composition:
      "Cute small plate on a colorful kid-friendly table setting, mini burger scale emphasized, bright cheerful daylight, gentle overhead angle.",
    sceneSummary: "兒童小漢堡、小盤、明亮色調"
  },
  "sf-cheesy-chicken-egg-rice": {
    food:
      "A highly appetizing cheesy chicken egg rice for kids, cute junior portion size, featuring creamy dawn-sauce rice with chicken, broccoli, and melted cheese.",
    composition:
      "Shallow colorful bowl on a light playroom-style table, broccoli trees and cheese strands visible, soft warm afternoon light, close-up view.",
    sceneSummary: "起司雞肉飯、花椰菜、兒童碗"
  },
  "sf-kids-cream-chicken-penne": {
    food:
      "A highly appetizing kids cream chicken penne, cute junior portion size, featuring mild white sauce penne with tender chicken, sweet corn, peas, and melted cheese.",
    composition:
      "Small pasta bowl with rounded edges on a pastel placemat, gentle kid-portion framing, bright clean kitchen light, three-quarter angle.",
    sceneSummary: "兒童奶油麵、豌豆玉米、粉彩墊"
  },
  "sf-strong-chocolate-cake": {
    food:
      "A highly appetizing dense chocolate cake called 'Strong', indulgent dessert serving size, featuring a small 4-inch rich dark chocolate cake with cream cheese frosting.",
    composition:
      "Petite whole cake on a cake stand with a dessert fork nearby, indulgent chocolate texture focus, soft café dessert spotlight, close-up three-quarter view.",
    sceneSummary: "強的巧克力蛋糕、4 吋、蛋糕架"
  },
  "sf-brownie-ice-cream": {
    food:
      "A highly appetizing brownie with ice cream, indulgent dessert serving size, featuring a warm fudgy chocolate brownie square topped with melting vanilla ice cream and chocolate sauce drizzle.",
    composition:
      "Dessert plate on a dark wooden table, ice cream slightly melting over warm brownie, cozy evening dessert lamp glow, close-up hero angle.",
    sceneSummary: "布朗尼冰淇淋、融化的香草冰、暗木桌"
  },
  "sf-american-cheesecake": {
    food:
      "A highly appetizing American cheesecake, indulgent dessert serving size, featuring a thick creamy cheesecake slice on an Oreo cookie crust base.",
    composition:
      "Classic diner dessert plate on a red vinyl booth table mood, clean slice cross-section showing layers, bright neutral daylight, eye-level view.",
    sceneSummary: "Oreo 起司蛋糕、切片剖面、美式餐桌"
  },
  "sf-country-cinnamon-peach-pie": {
    food:
      "A highly appetizing country cinnamon peach pie, indulgent dessert serving size, featuring a rustic pie slice with cinnamon-spiced peaches and a scoop of vanilla ice cream.",
    composition:
      "Homestyle pie on a floral ceramic plate, flaky crust and peach filling visible, warm farmhouse afternoon light, three-quarter dessert angle.",
    sceneSummary: "肉桂蜜桃派、鄉村盤、冰淇淋球"
  },
  "sf-greek-campfire-grilled-chicken-brunch": {
    food:
      "A highly appetizing Greek-style campfire grilled chicken brunch, generous outdoor campfire platter size, featuring char-grilled chicken, warm pita bread, and fresh Greek salad.",
    composition:
      "Outdoor campfire brunch mood on a rustic wooden camp table, grill marks on chicken visible, warm firelight mixed with dusk sky tones, three-quarter view.",
    sceneSummary: "炭烤雞肉早午餐、皮塔餅、野炊木桌"
  },
  "sf-campfire-lemon-zucchini-fish-fillet": {
    food:
      "A highly appetizing campfire lemon zucchini fish fillet, generous outdoor campfire platter size, featuring grilled fish fillet with sautéed zucchini ribbons and bright lemon herb sauce.",
    composition:
      "Camp-style enamel plate on a stone outdoor table, lemon zest and green zucchini contrast, fresh open-air daylight, close-up side angle.",
    sceneSummary: "檸香魚菲力、櫛瓜、搪瓷盤戶外"
  },
  "sf-sweet-savory-rice": {
    food:
      "A highly appetizing Taiwanese sweet and savory rice, generous restaurant portion size, featuring steamed rice topped with traditional candied preserves and dried fruits in Tainan style.",
    composition:
      "Traditional Taiwanese ceramic bowl on a vintage wooden table, colorful candied toppings arranged neatly, soft nostalgic afternoon light, gentle overhead view.",
    sceneSummary: "甘味飯、蜜餞配料、復古木桌"
  },
  "sf-salted-egg-seafood-pizza": {
    food:
      "A highly appetizing salted egg yolk seafood pizza, generous restaurant portion size, featuring a golden salted egg sauce spread over pizza crust with assorted seafood and Thai basil.",
    composition:
      "Freshly baked pizza slice pull on a wooden pizza paddle, golden egg sauce and seafood toppings visible, warm pizzeria oven glow, dynamic angle.",
    sceneSummary: "金沙海鮮披薩、木鏟、起司牽絲"
  },
  "sf-asahi-cordon-bleu-pork-burger": {
    food:
      "A highly appetizing cordon bleu pork burger, generous restaurant portion size, featuring a breaded pork cutlet with cheese filling in a burger bun with lettuce and sauce.",
    composition:
      "Business lunch burger on a simple white plate with soup cup blurred in background, clean office café mood, bright midday light, three-quarter view.",
    sceneSummary: "藍帶豬排堡、商業午餐、白盤"
  },
  "sf-south-sea-spiced-chicken-rice": {
    food:
      "A highly appetizing Southeast Asian spiced chicken rice, generous restaurant portion size, featuring fragrant spiced chicken over seasoned rice with Southeast Asian aromatics.",
    composition:
      "Deep rice bowl on a banana-leaf-lined plate, aromatic spices suggested with warm color tones, tropical lunch light, 45-degree hero angle.",
    sceneSummary: "南洋雞肉飯、芭蕉葉墊、香料色調"
  }
};

function readRecipeTitle(slug) {
  const content = readFileSync(join(recipeDir, `${slug}.md`), "utf8");
  const match = content.match(/^title:\s*(.+)$/m);
  if (!match) {
    throw new Error(`Missing title for ${slug}`);
  }
  return match[1].trim();
}

function buildPrompt(entry) {
  return `${entry.food} Composition: ${entry.composition} ${STYLE_TAIL}`;
}

function buildMarkdown() {
  const dishes = orderedSlugs.map((slug, index) => {
    const data = promptData[slug];
    if (!data) {
      throw new Error(`Missing prompt data for ${slug}`);
    }
    return {
      num: index + 1,
      slug,
      title: readRecipeTitle(slug),
      filename: `${slug}.webp`,
      ...data,
      prompt: buildPrompt(data)
    };
  });

  const lines = [];
  lines.push("# 食譜成品圖繪製清單（貳樓名店還原 70 篇，給 Gemini）");
  lines.push("");
  lines.push(
    "本站新增 **70 篇**貳樓 Second Floor Cafe 名店還原食譜（`sf-*` slug），目前 `coverImage` 皆為 `.svg` 佔位。請依下表各產出一張成品圖；圖檔放入 `public/images/recipes/` 後，將 frontmatter 的 `coverImage` 改為 `.webp` 即可上線。"
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
    "| 構圖 | 餐廳份量成品為主角；**每道菜使用不同場景／角度／光線**（見下方各篇 prompt，避免重複道具組合） |"
  );
  lines.push(
    "| 還原取向 | 美式早午餐／義式飯麵風格，份量可略豐盛，但維持插畫感而非商業攝影 |"
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
  lines.push("- ⬜ **待完成（共 70 篇）**：SF-01 ~ SF-70（貳樓名店還原全系列）");
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
  lines.push("## 清單與檔名（70）");
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
    "> 每段 = **料理描述** + **獨立場景構圖** + **風格尾段**。編號順序與 [`docs/content/second-floor-cafe-menu-replication.md`](content/second-floor-cafe-menu-replication.md) 菜單分類一致。"
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
  lines.push("| 貳樓菜單對照 | `docs/content/second-floor-cafe-menu-replication.md` |");
  lines.push("| 食譜產生器 | `scripts/generate-second-floor-recipes.mjs` |");
  lines.push("| 封面 prompt 產生器 | `scripts/generate-second-floor-cover-prompts.mjs` |");
  lines.push("| 前一批次範例 | `docs/recipe-cover-images-for-gemini-151-161.md` |");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

writeFileSync(outputPath, buildMarkdown(), "utf8");
console.log(`Wrote ${outputPath}`);
