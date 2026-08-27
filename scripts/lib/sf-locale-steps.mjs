import { formatAmount } from "./parse-recipe-fm.mjs";
import { inferSfCategorySlug } from "./sf-zh-steps.mjs";

function lead(ingredients, locale, limit = 4) {
  const sep = locale === "en" ? ", " : "、";
  return ingredients
    .slice(0, limit)
    .map((item) => formatAmount(item))
    .join(sep);
}

function sauces(seasonings, locale, limit = 5) {
  const sep = locale === "en" ? ", " : "、";
  return seasonings
    .slice(0, limit)
    .map((item) => formatAmount(item))
    .join(sep);
}

export function buildDetailedSfStepsLocalized(locale, title, categorySlug, ingredients, seasonings, slug = "") {
  const l = lead(ingredients, locale);
  const s = sauces(seasonings, locale);
  const text = (slug || title).toLowerCase();

  // 1. Benedict
  if (text.includes("benedict") || text.includes("班尼蛋")) {
    if (locale === "en") {
      return [
        `Prep English muffins (split and toasted 350°F until golden); prep ${l}; sauté mushrooms with butter and salt.`,
        `Sear main proteins (ham, chicken, beef, or smoked salmon) in a hot skillet; keep warm. Prep ${s}.`,
        `Bring water to a simmer with vinegar; swirl water and poach fresh eggs for 3 minutes for a runny yolk.`,
        `Layer mushrooms, proteins, and poached eggs on muffins; drizzle warm hollandaise or specialty sauce (${s}); serve immediately.`
      ];
    }
    if (locale === "ja") {
      return [
        `マフィンを半分に切り、バターを塗り180℃で焼き色がつくまで焼く。${l}を用意し、マッシュルームをバターで炒める。`,
        `フライパンで具材（ハム、チキン、牛肉、スモークサーモン等）を焼き、温めておく。ソース（${s}）を用意する。`,
        `鍋に湯を沸かして酢を加え、渦を作って卵を落とし、弱火で3分茹でて半熟のポーチドエッグを作る。`,
        `マフィンに炒めたキノコ、具材、卵を順にのせ、温かいオランデーズソース（${s}）をかけて完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `잉글리시 머핀을 반으로 잘라 버터를 바르고 180℃에서 노릇하게 굽는다. ${l}를 준비하고 버섯을 버터에 볶아둔다.`,
        `팬에 주재료(햄, 치킨, 소고기, 연어 등)를 구워 따뜻하게 보관한다. 소스(${s})를 준비한다.`,
        `냄비에 물을 끓여 식초를 넣고 회오리를 만든 뒤 달걀을 넣어 3분간 익혀 반숙 수란을 만든다.`,
        `머핀 위에 버섯볶음, 주재료, 수란을 순서대로 올리고 따뜻한 홀란다이즈 소스(${s})를 끼얹어 완성한다.`
      ];
    }
  }

  // 2. Omelette
  if (text.includes("omelette") || text.includes("歐姆蕾")) {
    if (locale === "en") {
      return [
        `Prep: beat 3 eggs with a splash of cream and salt; prep ${l} and cheeses ready.`,
        `Sauté filling ingredients (onion, mushrooms, or ham) in butter until fragrant; set aside.`,
        `Melt butter in skillet, add eggs and stir quickly until half-set, then lay fillings and cheese in the center.`,
        `Fold the omelette into a half-moon shape, cover to melt cheese for 30 seconds, and slide onto a plate with sides.`
      ];
    }
    if (locale === "ja") {
      return [
        `卵3個を割りほぐし、生クリーム少々と塩を混ぜる。${l}とチーズを用意する。`,
        `フライパンにバターを熱し、具（玉ねぎ、きのこ、ハム等）を炒め、別皿に取り出しておく。`,
        `再びバターを溶かし、卵液を注いで半熟になるまで素早く混ぜ、中央に具とチーズをのせる。`,
        `卵を半分に折りたたんで半月型にし、フタをして30秒蒸らし、お皿に盛り付けて完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `달걀 3개를 풀고 생크림 약간과 소금을 섞는다. ${l}와 치즈를 준비한다.`,
        `팬에 버터를 두르고 속재료(양파, 버섯, 햄 등)를 볶아 따로 덜어둔다.`,
        `다시 버터를 녹이고 달걀물을 부어 반숙이 될 때까지 재빨리 젓고, 중앙에 속재료와 치즈를 올린다.`,
        `달걀을 반으로 접어 반달 모양을 만들고, 뚜껑을 덮어 30초간 뜸을 들인 뒤 그릇에 담아 완성한다.`
      ];
    }
  }

  // 3. Danish Brunch
  if (text.includes("danish") || text.includes("丹麥")) {
    if (locale === "en") {
      return [
        `Prep: place orange French Danish pastry on baking sheet, bake at 350°F for 3–5 min until fragrant.`,
        `Heat oil in skillet; sear main protein (chicken, steak, seafood, or mushrooms from ${l}) with salt and pepper.`,
        `Prepare sunny-side or poached eggs; fry potato hash or wedges in skillet until golden brown.`,
        `Plate toast, proteins, eggs, and salad separately; drizzle ${s} over the main components; serve immediately.`
      ];
    }
    if (locale === "ja") {
      return [
        `デニッシュを天板に並べ、180℃で3〜5分サクッとするまで焼く。サラダ菜は洗って水気を切る。`,
        `フライパンに油を熱し、メイン（${l}のチキン、ステーキ、シーフード等）を焼き、塩コショウで味を調える。`,
        `目玉焼きまたは水波卵を作り、ポテトはフライパンで黄金色になるまで炒める。`,
        `大皿にデニッシュ、メイン、ポテト、サラダを分けて盛り、ソース（${s}）をかけて完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `데니시를 오븐 팬에 얹고 180℃에서 3~5분간 바삭하게 굽는다. 샐러드 채소는 씻어 물기를 뺀다.`,
        `팬에 기름을 두르고 메인 재료(${l}의 치킨, 스테이크, 해산물 등)를 구워 소금·후추로 간한다.`,
        `달걀후라이나 수란을 만들고, 감자는 노릇해질 때까지 팬에 볶는다.`,
        `큰 접시에 데니시, 메인, 감자, 샐러드를 나누어 담고 소스(${s})를 뿌려 완성한다.`
      ];
    }
  }

  // 4. Pasta
  if (text.includes("pasta") || text.includes("penne") || text.includes("linguine") || text.includes("麵") || text.includes("粉")) {
    if (locale === "en") {
      return [
        `Boil pasta in salted water until al dente; drain and reserve 1/2 cup of pasta cooking water.`,
        `Heat oil in skillet over medium; sauté garlic and onions, then add ${l} (shrimp, chicken, bacon) and sear until cooked through.`,
        `Pour in ${s} and 3 Tbsp pasta water; simmer, then add cooked pasta and toss vigorously to emulsify.`,
        `Garnish with grated parmesan, basil, or black pepper, plate nicely and serve hot.`
      ];
    }
    if (locale === "ja") {
      return [
        `塩を加えた湯でパスタを茹で、アルデンテで引き上げ、茹で汁を1/2カップ残しておく。`,
        `フライパンに油を熱し、にんにくと玉ねぎを炒め、${l}（海老、チキン、ベーコン等）を加えて炒める。`,
        `ソース（${s}）と茹で汁大さじ3を加えて煮立たせ、茹でたパスタを加えてソースをしっかり絡める。`,
        `起火直前に起司粉や香草を混ぜ合わせ、お皿に盛り付けて熱いうちに提供する。`
      ];
    }
    if (locale === "ko") {
      return [
        `소금물에 파스타를 알덴테로 삶고, 삶은 물을 1/2컵 남겨둔다.`,
        `팬에 기름을 두르고 다진 마늘과 양파를 볶은 뒤, ${l}(새우, 치킨, 베이컨 등)을 넣어 완전히 익힌다.`,
        `소스(${s})와 삶은 물 3큰술을 넣어 끓인 뒤, 삶은 파스타를 넣어 소스가 면에 겉돌지 않게 잘 버무린다.`,
        `치즈가루나 허브를 뿌려 접시에 담고 뜨거울 때 제공한다.`
      ];
    }
  }

  // 5. Rice Dish
  if (text.includes("rice") || text.includes("congee") || text.includes("飯")) {
    if (locale === "en") {
      return [
        `Prep ${l}; cook rice or prepare warm buttered rice. Fry hamburger patty or pork chop if needed.`,
        `Heat oil in skillet; sauté aromatics and vegetables, then stir-fry rice quickly over medium-high heat.`,
        `Pour in ${s} and stir-fry until rice grains absorb the sauce. (If baking, cover with cheese and bake at 400°F for 8 min).`,
        `Plate rice, top with main proteins (steak, patty, or egg yolk), and garnish with green onions.`
      ];
    }
    if (locale === "ja") {
      return [
        `${l}を切り、ご飯を用意する。ハンバーグや豚カツはあらかじめ焼いて温めておく。`,
        `フライパンに油を熱し、野菜を炒め、ご飯を加えて中強火で手早く炒め合わせる。`,
        `ソース（${s}）を回し入れ、ご飯にしっかり吸わせる。（ドリアの場合はチーズをのせて200℃で8分焼く）。`,
        `ご飯を盛り付け、メイン（ハンバーグや卵黄等）をのせ、お好みでトッピングして完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `${l}를 썰어두고 밥을 준비한다. 함박스테이크나 돈가스는 미리 구워 따뜻하게 둔다.`,
        `팬에 기름을 두르고 채소를 볶다가 밥을 넣어 중강불에 재빨리 볶는다.`,
        `소스(${s})를 부어 밥알에 소스가 배도록 볶는다. (리소토/그라탱은 치즈를 올려 200℃ 오븐에 8분 굽는다).`,
        `그릇에 담고 메인 재료(함박스테이크, 노른자 등)를 얹어 완성한다.`
      ];
    }
  }

  // 6. Fries
  if (text.includes("fries") || text.includes("薯條")) {
    if (locale === "en") {
      return [
        `Prep: cut potatoes into sticks (or use frozen fries); dry the surface completely with paper towels; prep ${s}.`,
        `Heat oil to 350°F; fry potatoes in batches for about 5 minutes until crispy and golden brown; drain well.`,
        `Toss hot fries in a large bowl with sea salt, then drizzle with ${s} (truffle, salted egg yolk, or cheese sauce).`,
        `Pile high in a serving basket lined with greaseproof paper, garnish with parsley, and serve hot.`
      ];
    }
    if (locale === "ja") {
      return [
        `ポテトを細切りにし（または冷凍ポテトを用意し）、ペーパーで水気を拭く。ソース（${s}）を用意する。`,
        `揚げ油を175℃に熱し、ポテトを数回に分けてきつね色になるまで約5分揚げ、油をよく切る。`,
        `温かいうちにボウルに入れ、塩を振り、ソース（${s}：トリュフ、金沙等）を回しかけて軽く和える。`,
        `ペーパーを敷いたカゴに盛り付け、パセリを振って、温かいうちに提供する。`
      ];
    }
    if (locale === "ko") {
      return [
        `감자를 길게 썰고(또는 냉동 감자 사용) 키친타월로 물기를 완전히 제거한다. 소스(${s})를 준비한다.`,
        `기름을 175℃로 달구어 감자를 노릇하고 바삭해질 때까지 5분간 튀긴 뒤 기름을 뺀다.`,
        `뜨거울 때 그릇에 담아 소금을 뿌리고, 소스(${s}：트러플, 황금 노른자 소스 등)를 넣어 가볍게 버무린다.`,
        `페이퍼를 깐 바구니에 담고 파슬리를 뿌려 뜨거울 때 바로 낸다.`
      ];
    }
  }

  // 7. Quesadilla
  if (text.includes("quesadilla") || text.includes("酥餅")) {
    if (locale === "en") {
      return [
        `Prep: dice ${l} (chicken, sausage) and onions; warm tortillas and grate cheese.`,
        `Sauté proteins and onions in a skillet until fully cooked, season with salt and pepper; set aside.`,
        `Lay tortilla flat, cover half with cheese and fillings, fold in half, and pan-grill over medium-low heat until golden-crisp on both sides.`,
        `Cut quesadilla into wedges, plate nicely, and serve with ${s} (guacamole, salsa, or sour cream).`
      ];
    }
    if (locale === "ja") {
      return [
        `${l}（チキン、ソーセージ）と玉ねぎを細かく切る。チーズとトルティーヤを用意する。`,
        `具材を炒めて塩コショウで味を調え、トルティーヤの半分にチーズと具をのせる。`,
        `半分に折りたたんで半月型にし、油をひかないフライパンで両面がサクッとするまで弱火で各2-3分焼く。`,
        `くさび型に切り、お皿に盛ってソース（${s}：アボカド、サルサ等）を添えて完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `${l}(치킨, 소시지)와 양파를 잘게 썬다. 치즈와 또띠아를 준비한다.`,
        `팬에 기름을 두르고 단백질과 양파를 볶아 소금·후추로 간하고, 또띠아 반쪽에 치즈와 재료를 올린다.`,
        `또띠아를 반으로 접고 기름 없는 팬에 중약불로 앞뒤가 바삭하고 노릇해질 때까지 2~3분간 굽는다.`,
        `삼각형 모양으로 썰어 그릇에 담고 소스(${s}：과카몰리, 살사 등)를 곁들여 낸다.`
      ];
    }
  }

  // 8. Fried Appetizers
  if (text.includes("wings") || text.includes("calamari") || text.includes("chips") || text.includes("炸") || text.includes("雞")) {
    if (locale === "en") {
      return [
        `Prep ${l} (wings, calamari, or fish); pat dry, season with salt/pepper, and coat lightly in flour.`,
        `Heat oil to 350°F; deep-fry in batches until golden and cooked through (5-6 min for chicken, 1.5 min for calamari); drain oil.`,
        `Warm ${s} in a small pan. If making wings, toss fried chicken in a large bowl with the hot sauce until coated.`,
        `Line plate with paper, arrange fried items, and serve with lemon wedges and dipping sauces on the side.`
      ];
    }
    if (locale === "ja") {
      return [
        `${l}（手羽先、イカ、魚等）の水気を拭き、塩コショウと衣用の粉を薄くまぶす。`,
        `揚げ油を180℃に熱し、衣をつけた食材をきつね色になるまで揚げる（手羽先は5分、イカは1.5分）。`,
        `ソース（${s}）を軽く温める。手羽先の場合はボウルで温めたソースと手早く絡める。`,
        `お皿にペーパーを敷いて盛り付け、レモンとディップソースを添えて完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `${l}(닭날개, 오징어, 생선 등)의 물기를 제거하고 소금·후추와 튀김가루를 가볍게 묻힌다.`,
        `기름을 180℃로 달구어 재료를 노릇하고 바삭하게 튀겨낸 뒤(닭날개는 5분, 오징어는 1.5분) 기름을 뺀다.`,
        `소스(${s})를 가볍게 데운다. 닭날개의 경우 큰 그릇에 소스를 부어 가볍게 버무려 옷을 입힌다.`,
        `그릇에 페이퍼를 깔고 튀김을 담은 뒤 레몬과 소스를 곁들여 완성한다.`
      ];
    }
  }

  // 9. Salad & Buddha Bowl
  if (text.includes("salad") || text.includes("bowl") || text.includes("沙拉") || text.includes("碗")) {
    if (locale === "en") {
      return [
        `Wash greens thoroughly, spin dry, and tear into bite-sized pieces; prep ${l}.`,
        `Sear proteins (chicken, bacon, shrimp, or salmon) in a skillet with salt and pepper until golden; toast croutons.`,
        `In a large bowl, toss greens with 2/3 of ${s} (caesar, vinaigrette, or sesame dressing) to lightly coat each leaf.`,
        `Transfer greens to a serving dish, arrange proteins, tomatoes, and croutons on top, then finish with grated parmesan and nuts.`
      ];
    }
    if (locale === "ja") {
      return [
        `葉菜をよく洗い、スピナーで水気を完全に切って一口大にちぎる。${l}を用意する。`,
        `フライパンでタンパク質（チキン、ベーコン、エビ等）を香ばしく焼き、クルトンをトーストする。`,
        `大きなボウルで葉菜とドレッシング（${s}）の2/3量を優しく和え、全体に行き渡らせる。`,
        `器に盛り付け、上にトッピング（チキン、トマト、クルトン等）をのせ、粉チーズとナッツを振って完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `샐러드 채소를 깨끗이 씻어 탈수기로 물기를 완전히 빼고 먹기 좋게 찢는다. ${l}를 준비한다.`,
        `팬에 단백질(치킨, 베이컨, 새우 등)을 노릇하게 굽고 크루통을 바삭하게 굽는다.`,
        `큰 그릇에 채소를 담고 드레싱(${s}) 2/3 분량을 넣어 가볍게 버무려 옷을 입힌다.`,
        `그릇에 담아 위에 준비한 단백질, 토마토, 크루통을 얹고 치즈가루와 견과류를 뿌려 완성한다.`
      ];
    }
  }

  // 10. Burger & Sandwich
  if (text.includes("burger") || text.includes("sandwich") || text.includes("open") || text.includes("漢堡") || text.includes("三明治") || text.includes("堡")) {
    if (locale === "en") {
      return [
        `Prep: slice burger buns or Danish bread, butter the cut side, and toast in oven/skillet until golden-crisp; prep ${l}.`,
        `Sear patty or cutlet in skillet over medium heat until fully cooked. Melt cheese on top during the last 30 seconds.`,
        `Spread ${s} on the bottom bun/toast, layer lettuce, tomatoes, pickles, protein, and a fried egg.`,
        `Close the burger (or leave open for sandwich); serve hot with a side of crispy fries.`
      ];
    }
    if (locale === "ja") {
      return [
        `バンズまたはデニッシュの内側にバターを塗り、フライパンで焼き色がつくまで焼く。${l}を用意する。`,
        `中火でパティやカツを焼き、起火直前にチーズをのせてフタをして30秒蒸らして溶かす。`,
        `下のパンにソース（${s}）を塗り、レタス、トマト、ピクルス、パティ、目玉焼きを順にのせる。`,
        `上のパンを重ね（オープンの場合はそのまま）、フライドポテトを添えて完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `번이나 데니시 안쪽에 버터를 바르고 그릴에 노릇하게 굽는다. ${l}를 준비한다.`,
        `중불에 패티나 가츠를 굽고 뒤집은 뒤 치즈를 올려 뚜껑을 덮고 30초간 뜸을 들여 녹인다.`,
        `아래 빵에 소스(${s})를 바르고 양상추, 토마토, 피클, 패티, 달걀후라이를 올린다.`,
        `윗빵을 덮고(오픈 샌드위치는 그대로) 감자튀김을 곁들여 뜨거울 때 낸다.`
      ];
    }
  }

  // 11. Big Plate (Half Chicken, Knuckle)
  if (text.includes("chicken") || text.includes("knuckle") || text.includes("豬腳") || text.includes("半雞")) {
    if (locale === "en") {
      return [
        `Prep: clean and dry main meats (half chicken or pork knuckle), rub with sea salt, pepper, and spices; preheat oven to 400°F.`,
        `Sear meats in a hot skillet to lock in juices, transfer to oven, and roast at 375°F for 30 minutes until fully cooked.`,
        `Brush generously with remaining ${s} during the last 5 minutes of roasting; bake sides (corn, wedges) together.`,
        `Let meats rest for 5 minutes, carve, and arrange on a large platter with sauerkraut and corn.`
      ];
    }
    if (locale === "ja") {
      return [
        `メインのお肉（手羽、豚カツ、ハーフチキン等）の水気を拭き、塩コショウとハーブをすり込む。オーブンを200℃に予熱する。`,
        `フライパンで肉の表面を焼き、オーブンに移して190℃で約30分、中まで火が通るまで焼く。`,
        `焼き上がりの最後の5分にソース（${s}）をハケで塗り、付け合わせも一緒に温める。`,
        `肉を取り出して5分休ませてから切り分け、付け合わせとお皿に盛り付けて完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `고기(반닭, 슈바인학센 등) 물기를 닦고 소금·후추·허브를 바른다. 오븐을 200℃로 예열한다.`,
        `팬에 고기 겉면을 구워 육즙을 가두고 오븐에 넣어 190℃에서 30분간 속까지 완전히 익힌다.`,
        `마지막 5분 전에 소스(${s})를 덧바르고 가니시(감자, 옥수수 등)를 함께 굽는다.`,
        `고기를 꺼내 5분간 휴지한 뒤 썰어 가니시와 함께 접시에 푸짐하게 담아낸다.`
      ];
    }
  }

  // 12. Dessert
  if (categorySlug === "dessert" || text.includes("cake") || text.includes("pie") || text.includes("brownie") || text.includes("甜點")) {
    if (locale === "en") {
      return [
        `Bring cream cheese or chocolate to room temp; preheat oven to 350°F; prepare molds.`,
        `In a bowl, whisk melted butter, sugar, eggs, and flour (or assemble pie crust and fillings); pour into molds.`,
        `Bake for 25–30 minutes until the cake/brownie is set but still slightly moist in the center; cool slightly.`,
        `Arrange on plates, add vanilla ice cream scoops or whipped cream, and drizzle with hot ${s}.`
      ];
    }
    if (locale === "ja") {
      return [
        `クリームチーズやチョコレートを常温に戻す。オーブンを180℃に予熱し、型を用意する。`,
        `ボウルでバター、砂糖、卵、小麦粉を混ぜ合わせ（パイの場合はパイシートとフィリングを敷く）、型に流す。`,
        `オーブンで25-30分、竹串を刺して中心が少し湿る程度まで焼き、取り出して冷ます。`,
        `器に盛り、バニラアイスやホイップを添え、温かいソース（${s}）をかけて完成。`
      ];
    }
    if (locale === "ko") {
      return [
        `크림치즈나 초콜릿을 실온에 둔다. 오븐을 180℃로 예열하고 틀을 준비한다.`,
        `볼에 녹인 버터, 설탕, 달걀, 밀가루를 섞어 반죽을 만들고(파이는 파이틀에 시트와 충전물을 얹음) 틀에 붓는다.`,
        `오븐에 넣어 25~30분간 굽고(가운데가 살짝 촉촉한 상태) 꺼내 식힌다.`,
        `그릇에 담아 바닐라 아이스크림이나 휘핑크림을 얹고 소스(${s})를 뿌려 완성한다.`
      ];
    }
  }

  // 13. Default
  if (locale === "en") {
    return [
      `Prep: organize ${l} for restaurant portioning; keep sauces and cool sides separate (${s}).`,
      `Cook main proteins and starches over medium-high until properly browned and cooked through.`,
      `Toast bread or heat side dishes in a skillet to build layers and crispy textures.`,
      `Drizzle signature sauces (${s}) and arrange ingredients beautifully on a large plate for ${title}.`
    ];
  }
  if (locale === "ja") {
    return [
      `${l}を分けて準備し、ソース（${s}）や冷たい具材は別々にしておく。`,
      `主菜と主食を中強火で焼き色がつくまで火を通し、中心まで熱を入れる。`,
      `パンを焼き、付け合わせを温めて外側のサクッとした食感を出す。`,
      `お皿に綺麗に盛り付け、特製ソース（${s}）をかけて仕上げる。`
    ];
  }
  // ko
  return [
    `${l}를 나누어 준비하고 소스(${s})와 찬 재료는 별도로 둔다.`,
    `주재료와 주식을 중강불에 겉이 색 나고 속까지 익을 때까지 조리한다.`,
    `빵을 굽고 가니시를 데워 겉바속촉한 식감을 살린다.`,
    `그릇에 푸짐하게 담고 특제 소스(${s})를 끼얹어 마무리한다.`
  ];
}

export function sfStepsForRecipe(locale, ctx) {
  const categorySlug = inferSfCategorySlug(ctx.title, ctx.category, ctx.tags);
  return buildDetailedSfStepsLocalized(locale, ctx.title, categorySlug, ctx.ingredients, ctx.seasonings, ctx.slug);
}
