#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SLUGS = [
  "broccoli-mushroom-chicken-rice-bowl",
  "cabbage-carrot-chicken-rice-bowl",
  "curry-beef-rice",
  "garlic-tomato-chicken-rice-bowl",
  "mushroom-beef-rice-bowl",
  "onion-beef-rice-bowl",
  "tofu-egg-savory-rice-bowl",
  "tomato-beef-rice-bowl"
];

const FIX = {
  en: {
    "broccoli-mushroom-chicken-rice-bowl": {
      ingredients: null,
      seasonings: `seasonings:
- name: Mushrooms
  amount: '120'
  unit: g
- name: Garlic
  amount: '2'
  unit: cloves
- name: Soy sauce
  amount: '2'
  unit: tsp
- name: Olive oil
  amount: '1'
  unit: Tbsp`
    },
    "cabbage-carrot-chicken-rice-bowl": {
      seasonings: `seasonings:
- name: Carrot
  amount: '80'
  unit: g
- name: Soy sauce
  amount: '2'
  unit: tsp
- name: Garlic
  amount: '1'
  unit: clove
- name: Olive oil
  amount: '1'
  unit: Tbsp`
    },
    "curry-beef-rice": {
      ingredients: `ingredients:
- name: Water
  amount: '200'
  unit: ml
  isCore: false
- name: Cooked rice
  amount: '1'
  unit: bowl
  isCore: true
- name: Beef
  amount: '100'
  unit: g
  isCore: true
- name: Onion
  amount: 1/2
  unit: ''
  isCore: false
- name: Carrot
  amount: '50'
  unit: g
  isCore: false`,
      seasonings: `seasonings:
- name: Olive oil
  amount: '1'
  unit: tbsp
- name: Curry powder
  amount: '1.5'
  unit: tbsp
- name: Water
  amount: '200'
  unit: ml
- name: Salt
  amount: pinch
  unit: ''`
    },
    "garlic-tomato-chicken-rice-bowl": {
      seasonings: `seasonings:
- name: Garlic
  amount: '2'
  unit: cloves
- name: Soy sauce
  amount: '1.5'
  unit: tsp
- name: Salt
  amount: pinch
  unit: ''
- name: Olive oil
  amount: '1'
  unit: Tbsp`
    },
    "mushroom-beef-rice-bowl": {
      ingredients: `ingredients:
- name: Water
  amount: '60'
  unit: ml
  isCore: false
- name: Cooked white rice
  amount: '1'
  unit: bowl
  isCore: true
- name: Beef
  amount: '100'
  unit: g
  isCore: true
- name: Mushrooms
  amount: '80'
  unit: g
  isCore: true`,
      seasonings: `seasonings:
- name: Soy sauce
  amount: '1.5'
  unit: Tbsp
- name: Garlic
  amount: '2'
  unit: cloves
- name: Water
  amount: '60'
  unit: ml
- name: Olive oil
  amount: '1'
  unit: Tbsp`
    },
    "onion-beef-rice-bowl": {
      ingredients: `ingredients:
- name: Water
  amount: '80'
  unit: ml
  isCore: false
- name: Cooked white rice
  amount: '1'
  unit: bowl
  isCore: true
- name: Beef
  amount: '100'
  unit: g
  isCore: true
- name: Onion
  amount: 1/2
  unit: ''
  isCore: true`,
      seasonings: `seasonings:
- name: Soy sauce
  amount: '1.5'
  unit: Tbsp
- name: Sugar
  amount: '1'
  unit: tsp
- name: Water
  amount: '80'
  unit: ml
- name: Olive oil
  amount: '1'
  unit: Tbsp`
    },
    "tofu-egg-savory-rice-bowl": {
      seasonings: `seasonings:
- name: Scallion
  amount: '1'
  unit: stalk
- name: Soy sauce
  amount: '1'
  unit: tsp
- name: Salt
  amount: pinch
  unit: ''
- name: Olive oil
  amount: '1'
  unit: Tbsp`
    },
    "tomato-beef-rice-bowl": {
      seasonings: `seasonings:
- name: Tomato paste or ketchup
  amount: '1'
  unit: tbsp
- name: Soy sauce
  amount: '1'
  unit: tsp
- name: Sugar
  amount: 1/2
  unit: tsp
- name: Olive oil
  amount: '1'
  unit: Tbsp`
    }
  },
  ja: {
    "broccoli-mushroom-chicken-rice-bowl": {
      seasonings: `seasonings:
- name: きのこ
  amount: '120'
  unit: g
- name: にんにく
  amount: '2'
  unit: 片
- name: 醤油
  amount: '2'
  unit: 小さじ
- name: オリーブオイル
  amount: '1'
  unit: 大さじ`
    },
    "cabbage-carrot-chicken-rice-bowl": {
      seasonings: `seasonings:
- name: にんじん
  amount: '80'
  unit: g
- name: 醤油
  amount: '2'
  unit: 小さじ
- name: にんにく
  amount: '1'
  unit: 片
- name: オリーブオイル
  amount: '1'
  unit: 大さじ`
    },
    "curry-beef-rice": {
      ingredients: `ingredients:
- name: 水
  amount: '200'
  unit: ml
  isCore: false
- name: ご飯（白米）
  amount: '1'
  unit: 碗分
  isCore: true
- name: 牛肉
  amount: '100'
  unit: g
  isCore: true
- name: 玉ねぎ
  amount: 1/2
  unit: 個
  isCore: false
- name: にんじん
  amount: '50'
  unit: g
  isCore: false`,
      seasonings: `seasonings:
- name: オリーブオイル
  amount: '1'
  unit: 大さじ
- name: カレー粉
  amount: '1.5'
  unit: 大さじ
- name: 水
  amount: '200'
  unit: ml
- name: 塩
  amount: 少々
  unit: ''`
    },
    "garlic-tomato-chicken-rice-bowl": {
      seasonings: `seasonings:
- name: にんにく
  amount: '2'
  unit: 片
- name: 醤油
  amount: '1.5'
  unit: 小さじ
- name: 塩
  amount: 少々
  unit: ''
- name: オリーブオイル
  amount: '1'
  unit: 大さじ`
    },
    "mushroom-beef-rice-bowl": {
      ingredients: `ingredients:
- name: 水
  amount: '60'
  unit: ml
  isCore: false
- name: ご飯（白米）
  amount: '1'
  unit: 碗分
  isCore: true
- name: 牛肉
  amount: '100'
  unit: g
  isCore: true
- name: きのこ
  amount: '80'
  unit: g
  isCore: true`,
      seasonings: `seasonings:
- name: 醤油
  amount: '1.5'
  unit: 大さじ
- name: にんにく
  amount: '2'
  unit: 片
- name: 水
  amount: '60'
  unit: ml
- name: オリーブオイル
  amount: '1'
  unit: 大さじ`
    },
    "onion-beef-rice-bowl": {
      ingredients: `ingredients:
- name: 水
  amount: '80'
  unit: ml
  isCore: false
- name: ご飯（白米）
  amount: '1'
  unit: 碗分
  isCore: true
- name: 牛肉
  amount: '100'
  unit: g
  isCore: true
- name: 玉ねぎ
  amount: 1/2
  unit: 個
  isCore: true`,
      seasonings: `seasonings:
- name: 醤油
  amount: '1.5'
  unit: 大さじ
- name: 砂糖
  amount: '1'
  unit: 小さじ
- name: 水
  amount: '80'
  unit: ml
- name: オリーブオイル
  amount: '1'
  unit: 大さじ`
    },
    "tofu-egg-savory-rice-bowl": {
      seasonings: `seasonings:
- name: 青ねぎ
  amount: '1'
  unit: 本
- name: 醤油
  amount: '1'
  unit: 小さじ
- name: 塩
  amount: 少々
  unit: ''
- name: オリーブオイル
  amount: '1'
  unit: 大さじ`
    },
    "tomato-beef-rice-bowl": {
      seasonings: `seasonings:
- name: トマトケチャップ
  amount: '1'
  unit: 大さじ
- name: 醤油
  amount: '1'
  unit: 小さじ
- name: 砂糖
  amount: 1/2
  unit: 小さじ
- name: オリーブオイル
  amount: '1'
  unit: 大さじ`
    }
  },
  ko: {
    "broccoli-mushroom-chicken-rice-bowl": {
      seasonings: `seasonings:
- name: 버섯
  amount: '120'
  unit: g
- name: 마늘
  amount: '2'
  unit: 쪽
- name: 간장
  amount: '2'
  unit: 작은술
- name: 올리브 오일
  amount: '1'
  unit: 큰술`
    },
    "cabbage-carrot-chicken-rice-bowl": {
      seasonings: `seasonings:
- name: 당근
  amount: '80'
  unit: g
- name: 간장
  amount: '2'
  unit: 작은술
- name: 마늘
  amount: '1'
  unit: 쪽
- name: 올리브 오일
  amount: '1'
  unit: 큰술`
    },
    "curry-beef-rice": {
      ingredients: `ingredients:
- name: 물
  amount: '200'
  unit: ml
  isCore: false
- name: 밥
  amount: '1'
  unit: 공기
  isCore: true
- name: 소고기
  amount: '100'
  unit: g
  isCore: true
- name: 양파
  amount: 1/2
  unit: 개
  isCore: false
- name: 당근
  amount: '50'
  unit: g
  isCore: false`,
      seasonings: `seasonings:
- name: 올리브 오일
  amount: '1'
  unit: 큰술
- name: 카레가루
  amount: '1.5'
  unit: 큰술
- name: 물
  amount: '200'
  unit: ml
- name: 소금
  amount: 약간
  unit: ''`
    },
    "garlic-tomato-chicken-rice-bowl": {
      seasonings: `seasonings:
- name: 마늘
  amount: '2'
  unit: 쪽
- name: 간장
  amount: '1.5'
  unit: 작은술
- name: 소금
  amount: 약간
  unit: ''
- name: 올리브 오일
  amount: '1'
  unit: 큰술`
    },
    "mushroom-beef-rice-bowl": {
      ingredients: `ingredients:
- name: 물
  amount: '60'
  unit: ml
  isCore: false
- name: 밥
  amount: '1'
  unit: 공기
  isCore: true
- name: 소고기
  amount: '100'
  unit: g
  isCore: true
- name: 버섯
  amount: '80'
  unit: g
  isCore: true`,
      seasonings: `seasonings:
- name: 간장
  amount: '1.5'
  unit: 큰술
- name: 마늘
  amount: '2'
  unit: 쪽
- name: 물
  amount: '60'
  unit: ml
- name: 올리브 오일
  amount: '1'
  unit: 큰술`
    },
    "onion-beef-rice-bowl": {
      ingredients: `ingredients:
- name: 물
  amount: '80'
  unit: ml
  isCore: false
- name: 밥
  amount: '1'
  unit: 공기
  isCore: true
- name: 소고기
  amount: '100'
  unit: g
  isCore: true
- name: 양파
  amount: 1/2
  unit: 개
  isCore: true`,
      seasonings: `seasonings:
- name: 간장
  amount: '1.5'
  unit: 큰술
- name: 설탕
  amount: '1'
  unit: 작은술
- name: 물
  amount: '80'
  unit: ml
- name: 올리브 오일
  amount: '1'
  unit: 큰술`
    },
    "tofu-egg-savory-rice-bowl": {
      seasonings: `seasonings:
- name: 쪽파
  amount: '1'
  unit: 대
- name: 간장
  amount: '1'
  unit: 작은술
- name: 소금
  amount: 약간
  unit: ''
- name: 올리브 오일
  amount: '1'
  unit: 큰술`
    },
    "tomato-beef-rice-bowl": {
      seasonings: `seasonings:
- name: 토마토케첩
  amount: '1'
  unit: 큰술
- name: 간장
  amount: '1'
  unit: 작은술
- name: 설탕
  amount: 1/2
  unit: 작은술
- name: 올리브 오일
  amount: '1'
  unit: 큰술`
    }
  }
};

function replaceBlock(fm, key, replacement) {
  const re = new RegExp(`${key}:\\n(?:- [^\\n]*\\n(?:  [^\\n]*\\n)*)*`, "m");
  if (!re.test(fm)) throw new Error(`Block ${key} not found`);
  const block = replacement.endsWith("\n") ? replacement : `${replacement}\n`;
  return fm.replace(re, block);
}

for (const slug of SLUGS) {
  for (const locale of ["en", "ja", "ko"]) {
    const path = join(ROOT, `src/content/recipes-${locale}`, `${slug}.md`);
    const raw = readFileSync(path, "utf8");
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!match) throw new Error(`Bad FM: ${path}`);
    let fm = match[1];
    const patch = FIX[locale][slug];
    if (patch.ingredients) fm = replaceBlock(fm, "ingredients", patch.ingredients);
    if (patch.seasonings) fm = replaceBlock(fm, "seasonings", patch.seasonings);
    writeFileSync(path, `---\n${fm}\n---\n\n${match[2].trimStart()}`, "utf8");
    console.log(`Fixed ${locale}/${slug}`);
  }
}
