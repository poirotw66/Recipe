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

const BRANCH = {
  "sharing-plate": {
    en: (d, l, s) => [
      `Prep ${l} for sharing; pat fry items dry, keep cold sauces separate (${s}).`,
      `Preheat fryer oil to 350–360°F or oven to 400°F; fry in batches until golden and crisp.`,
      `Cook fries or bread separately for contrast; drain on paper towels and season while hot.`,
      `Adjust dipping sauces to coat-not-drip consistency; plate hot center, cool garnish on the side for ${d}.`
    ],
    ja: (d, l, s) => [
      `分享用に${l}を用意し、揚げ物は水気を拭き、冷たいソース（${s}）は別に準備する。`,
      `油を170〜180℃、またはオーブン200℃に予熱し、こんがりするまで分けて揚げる。`,
      `ポテトやパンは別に揚げ／焼き、油切りして温かいうちに味付けする。`,
      `ソースの濃度を調え、温かい主菜を中央に、冷菜を脇に盛って${d}を仕上げる。`
    ],
    ko: (d, l, s) => [
      `나눠 먹기 분량으로 ${l}를 준비하고, 튀김 재료는 물기를 제거하며 차가운 소스(${s})는 따로 둔다.`,
      `기름 170~180℃ 또는 오븐 200℃로 예열한 뒤 노릇해질 때까지 나눠 튀긴다.`,
      `감자튀김이나 빵은 따로 조리해 기름을 제거하고 뜨거울 때 간한다.`,
      `소스 농도를 맞춰 뜨거운 메인은 가운데, 차가운 곁들임은 옆에 담아 ${d}를 완성한다.`
    ]
  },
  "light-plate": {
    en: (d, l, s) => [
      `Prep ${l}; wash and dry greens, dice proteins (${s} mixed separately).`,
      `Cook warm components (protein, grains, cauliflower rice) until done with light browning.`,
      `Toss greens in a large bowl; add warm items; drizzle ${s} in 2–3 passes to avoid soggy salad.`,
      `Finish with nuts, cheese, or fruit layers for ${d}.`
    ],
    ja: (d, l, s) => [
      `${l}を用意し、葉菜は水切り、加熱する具は別に調理する（${s}）。`,
      `タンパク質や穀物を火を通し、表面に軽い焼き色をつける。`,
      `大きなボウルで葉菜に温かい具と${s}を少しずつ和える。`,
      `ナッツやフルーツを足して${d}を仕上げる。`
    ],
    ko: (d, l, s) => [
      `${l}를 준비하고 채소는 말리며, 따뜻하게 먹을 재료는 따로 익힌다(${s}).`,
      `단백질·곡물을 익혀 표면에 살짝 색을 낸다.`,
      `큰 그릇에 채소와 따뜻한 재료, ${s}를 나눠 넣어 버무린다.`,
      `견과나 과일을 올려 ${d}를 마무리한다.`
    ]
  },
  "open-sandwich": {
    en: (d, l, s) => [
      `Prep ${l}; toast bread 350°F 3–5 min until crisp outside, soft inside.`,
      `Cook main protein over medium heat; poach or fry eggs separately.`,
      `Stack ${s}, protein, egg, and greens on bread; keep height for open sandwich.`,
      `Finish with pepper, lemon, or balsamic; serve while bread is crisp.`
    ],
    ja: (d, l, s) => [
      `${l}を用意し、パンは180℃で3〜5分焼いて外はさくっと中は柔らかく。`,
      `主タンパクを中火で焼き、卵は別で水ポーチまたは焼く。`,
      `パンに${s}、具材、卵、野菜を順に載せる。`,
      `胡椒やレモンを添えて${d}を仕上げる。`
    ],
    ko: (d, l, s) => [
      `${l}를 준비하고 빵은 180℃에서 3~5분 구워 겉은 바삭하게 한다.`,
      `주 재료는 중불에 익히고 달걀은 따로 조리한다.`,
      `빵 위에 ${s}, 재료, 달걀, 채소를 쌓는다.`,
      `후추나 레몬을 뿌려 ${d}를 낸다.`
    ]
  },
  "sf-brunch": {
    en: (d, l, s) => [
      `Prep ${l}; plan toast, potatoes, and salad components separately (${s}).`,
      `Sear proteins to medium; roast potatoes; make eggs last for best texture.`,
      `Simmer sauce until spoon-coating; poach eggs in acidulated water.`,
      `Plate in zones: main, eggs, toast, and greens for ${d}.`
    ],
    ja: (d, l, s) => [
      `${l}を分けて準備し、トースト・ポテト・サラダを別工程にする（${s}）。`,
      `主菜を七〜八分火まで焼き、卵料理は最後に作る。`,
      `ソースをとろみまで煮詰め、酢を加えた湯でポーチドエッグを作る。`,
      `主菜・卵・パン・野菜を分けて${d}を盛る。`
    ],
    ko: (d, l, s) => [
      `${l}를 나눠 준비하고 토스트·감자·샐러드를 별도로 조리한다(${s}).`,
      `주 재료는 중간 익기까지 굽고 달걀 요리는 마지막에 한다.`,
      `소스를 걸쭉하게 졸이고 식초 물에 수란을 만든다.`,
      `주요리·달걀·빵·채소를 구역 나눠 ${d}를 담는다.`
    ]
  },
  "main-rice-noodle": {
    en: (d, l, s) => [
      `Prep ${l}; cook noodles or rice to just shy of done; reserve pasta water.`,
      `Stir-fry proteins and vegetables; reduce ${s} in a separate pan until glossy.`,
      `Toss starch with sauce; add pasta water to emulsify; fold proteins back in.`,
      `Serve immediately as a single-plate main for ${d}.`
    ],
    ja: (d, l, s) => [
      `${l}を切り、麺やご飯は八分茹でにする。`,
      `具材を炒め、${s}を別鍋でとろみまで煮詰める。`,
      `主食とソースを合わせ、必要なら茹で汁でなめらかにする。`,
      `すぐに皿盛りして${d}を仕上げる。`
    ],
    ko: (d, l, s) => [
      `${l}를 손질하고 면·밥은 80% 익힌다.`,
      `재료를 볶고 ${s}는 다른 팬에서 걸쭉하게 졸인다.`,
      `면/밥과 소스를 합치고 삶은 물로 농도를 맞춘다.`,
      `바로 담아 ${d}를 완성한다.`
    ]
  },
  default: {
    en: (d, l, s) => [
      `Prep ${l}; seasonings ready: ${s}.`,
      `Cook main components over medium-high until properly browned and cooked through.`,
      `Add sides in order of cook time; keep sauces warm.`,
      `Plate ${d} with sauce spooned over the hero ingredient.`
    ],
    ja: (d, l, s) => [
      `${l}を用意し、${s}を合わせる。`,
      `主食材を中火〜強火で焼き色がつくまで火を通す。`,
      `付け合わせを順に加え、ソースは温かいうちに絡める。`,
      `${d}を皿に盛り、ソースをかけて仕上げる。`
    ],
    ko: (d, l, s) => [
      `${l}를 준비하고 ${s}를 섞어 둔다.`,
      `주 재료를 중강불에 겉이 색 날 때까지 익힌다.`,
      `곁들임을 순서대로 넣고 소스는 따뜻하게 버무린다.`,
      `${d}를 담고 소스를 끼얹어 마무리한다.`
    ]
  }
};

export function buildDetailedSfStepsLocalized(locale, title, categorySlug, ingredients, seasonings) {
  const l = lead(ingredients, locale);
  const s = sauces(seasonings, locale);
  const branch = BRANCH[categorySlug] ?? BRANCH.default;
  const fn = branch[locale] ?? branch.en;
  return fn(title, l, s);
}

export function sfStepsForRecipe(locale, ctx) {
  const categorySlug = inferSfCategorySlug(ctx.title, ctx.category, ctx.tags);
  return buildDetailedSfStepsLocalized(locale, ctx.title, categorySlug, ctx.ingredients, ctx.seasonings);
}
