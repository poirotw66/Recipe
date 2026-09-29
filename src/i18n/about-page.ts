import type { Locale } from "../lib/i18n";

export const aboutLastUpdated = "2026-09-29";

export interface AboutBloss0mCopy {
  beforeBloss0m: string;
  afterBloss0m: string;
  taglineNote: string;
  afterRecipeUrl: string;
  pickerLabel: string;
  betweenPickerAndRender: string;
  renderLabel: string;
  afterRender: string;
}

export interface AboutContactCopy {
  beforeEmail: string;
  afterEmail: string;
  beforeContactLink: string;
  contactLinkLabel: string;
  afterContactLink: string;
}

export interface AboutPageContent {
  title: string;
  description: string;
  eyebrow: string;
  updatedLabel: string;
  brandMarkAlt: string;
  missionHeading: string;
  missionBody: string;
  audienceHeading: string;
  audienceItems: string[];
  principlesHeading: string;
  principlesItems: string[];
  bloss0mHeading: string;
  bloss0mPrimary: AboutBloss0mCopy;
  bloss0mSecondary: string;
  contactHeading: string;
  contact: AboutContactCopy;
}

const zhTW: AboutPageContent = {
  title: "關於本站",
  description: "Bloom Kitchen（今天煮什麼）專注整理台灣一人份、租屋族與想快速開飯的家常料理靈感。",
  eyebrow: "About",
  updatedLabel: "最後更新",
  brandMarkAlt: "Bloom Kitchen（今天煮什麼）品牌插畫",
  missionHeading: "本站在做什麼",
  missionBody:
    "Bloom Kitchen（今天煮什麼）整理以台灣常見食材、一至兩人份與小廚房為出發點的料理提案，協助你依手邊材料、器具與可用時間選擇今晚的菜色。各道料理的備料、烹調與等待時間請以食譜說明為準。",
  audienceHeading: "適合哪些人",
  audienceItems: [
    "一人份、兩人份的小家庭日常料理需求。",
    "租屋族、學生、上班族想降低備料與清理負擔。",
    "想用常見台灣食材快速完成家常菜的人。"
  ],
  principlesHeading: "內容原則",
  principlesItems: [
    "優先提供容易掃讀的步驟、時間、份量與替代建議。",
    "部分文字與翻譯使用 AI 協助整理。目前尚未完成所有食譜的實際試做；文字校正與翻譯不代表已經試做驗證。",
    "餐廳風格料理是本站的居家改作，不是餐廳提供或認證的配方。插畫與示意圖不能作為試做證據。",
    "營養數值若有列出，屬估算而非檢驗結果；實際數值會因食材品牌、份量與替換而異。",
    "若發現食材、步驟或時間不一致，請透過下方聯絡方式提供食譜網址與問題，協助我們校正。"
  ],
  bloss0mHeading: "與 Bloss0m 的關係",
  bloss0mPrimary: {
    beforeBloss0m: "{brandName} 是",
    afterBloss0m: "生態中的食譜站，中文口號為「",
    taglineNote: "」，網址為",
    afterRecipeUrl: "。同系列產品還包含",
    pickerLabel: "Bloom Picker",
    betweenPickerAndRender: "（色票推薦）與",
    renderLabel: "Bloom Render",
    afterRender: "（繪圖入口）。"
  },
  bloss0mSecondary:
    "Bloss0m 是我個人網路內容與實驗專案的集合入口；這裡專注在台灣家常、一人份與租屋族能實際開做的食譜整理，與主站其他主題分開，方便你專心找今晚要煮什麼。",
  contactHeading: "聯絡方式",
  contact: {
    beforeEmail: "如果你想回報內容錯誤、提出合作需求或補充建議，可以寄信到",
    afterEmail: "，或直接前往",
    beforeContactLink: "",
    contactLinkLabel: "聯絡我們",
    afterContactLink: "。"
  }
};

const en: AboutPageContent = {
  title: "About Bloom Kitchen",
  description:
    "Bloom Kitchen (今天煮什麼) focuses on Taiwanese home cooking for solo cooks, renters, and weeknight dinners.",
  eyebrow: "About",
  updatedLabel: "Last updated",
  brandMarkAlt: "Bloom Kitchen (今天煮什麼) brand illustration",
  missionHeading: "What we do",
  missionBody:
    "Bloom Kitchen (今天煮什麼) collects cooking ideas built around familiar Taiwanese ingredients, one or two servings, and small kitchens. Choose a meal based on the ingredients, equipment, and time you have; check each recipe for preparation, cooking, and waiting times.",
  audienceHeading: "Who it is for",
  audienceItems: [
    "Solo diners and small households cooking one or two servings.",
    "Renters, students, and office workers who want less prep and cleanup.",
    "Anyone who wants familiar Taiwanese ingredients turned into approachable weeknight meals."
  ],
  principlesHeading: "Content principles",
  principlesItems: [
    "Steps, timing, portions, and substitutions should be easy to scan.",
    "AI assists with some writing and translation. Not all recipes have been kitchen-tested; text corrections and translations do not establish that a recipe has been tested.",
    "Restaurant-style dishes are our home adaptations, not recipes supplied or endorsed by the restaurants. Illustrations and reference images are not evidence of kitchen testing.",
    "Any nutrition figures shown are estimates, not laboratory results; actual values vary with brands, portions, and substitutions.",
    "If ingredients, steps, or timing do not agree, send the recipe URL and issue through the contact details below so we can correct it."
  ],
  bloss0mHeading: "Relationship with Bloss0m",
  bloss0mPrimary: {
    beforeBloss0m: "{brandName} is the recipe site in the ",
    afterBloss0m: " ecosystem. The Chinese tagline is「",
    taglineNote: "」, and the site lives at ",
    afterRecipeUrl: ". Related products include ",
    pickerLabel: "Bloom Picker",
    betweenPickerAndRender: " (color palette recommendations) and ",
    renderLabel: "Bloom Render",
    afterRender: " (drawing entry point)."
  },
  bloss0mSecondary:
    "Bloss0m is my personal hub for web content and experiments. This site stays focused on Taiwanese home cooking you can actually make in a small kitchen, separate from other topics on the main hub.",
  contactHeading: "Contact",
  contact: {
    beforeEmail: "To report content issues, discuss partnerships, or send suggestions, email",
    afterEmail: " or visit our",
    beforeContactLink: "",
    contactLinkLabel: "Contact page",
    afterContactLink: "."
  }
};

const ja: AboutPageContent = {
  title: "Bloom Kitchen について",
  description:
    "Bloom Kitchen（今天煮什麼）は、台湾の一人分・賃貸キッチン・平日の夕食向け家庭料理をまとめるレシピサイトです。",
  eyebrow: "About",
  updatedLabel: "最終更新",
  brandMarkAlt: "Bloom Kitchen（今天煮什麼）ブランドイラスト",
  missionHeading: "サイトの目的",
  missionBody:
    "Bloom Kitchen（今天煮什麼）は、台湾の身近な食材、一〜二人分、小さな台所を出発点に料理のアイデアをまとめています。手元の材料、調理器具、使える時間に合わせて今夜の献立を選べます。下準備、調理、待ち時間は各レシピの説明をご確認ください。",
  audienceHeading: "こんな方に向いています",
  audienceItems: [
    "一人分・二人分の小さな家庭の日常料理。",
    "下準備と片付けを減らしたい賃貸・学生・社会人。",
    "台湾の身近な食材で素早く家常菜を作りたい方。"
  ],
  principlesHeading: "コンテンツの方針",
  principlesItems: [
    "手順・時間・分量・代替案を読みやすく優先します。",
    "一部の文章作成と翻訳には AI を利用しています。すべてのレシピの試作が完了しているわけではなく、文章の修正や翻訳は試作による検証を意味しません。",
    "レストラン風の料理は当サイトによる家庭向けのアレンジで、店舗が提供・公認したレシピではありません。イラストやイメージ画像は試作の証拠ではありません。",
    "栄養値を掲載している場合は推定値であり、検査結果ではありません。実際の値は商品の種類、分量、代用食材によって変わります。",
    "材料、手順、時間に不一致があれば、下記の連絡先へレシピの URL と問題点をお知らせください。修正に役立てます。"
  ],
  bloss0mHeading: "Bloss0m との関係",
  bloss0mPrimary: {
    beforeBloss0m: "{brandName} は",
    afterBloss0m: " エコシステム内のレシピサイトです。中国語のスローガンは「",
    taglineNote: "」、URL は ",
    afterRecipeUrl: "。同シリーズには ",
    pickerLabel: "Bloom Picker",
    betweenPickerAndRender: "（色票の提案）と ",
    renderLabel: "Bloom Render",
    afterRender: "（描画入口）があります。"
  },
  bloss0mSecondary:
    "Bloss0m は個人のウェブコンテンツと実験プロジェクトの入口です。ここでは台湾の家庭料理に特化し、今夜作るレシピ探しに集中できるよう他テーマと分けています。",
  contactHeading: "お問い合わせ",
  contact: {
    beforeEmail: "内容の誤り、提携、ご提案は",
    afterEmail: " までメールするか、",
    beforeContactLink: "",
    contactLinkLabel: "お問い合わせページ",
    afterContactLink: "をご利用ください。"
  }
};

const ko: AboutPageContent = {
  title: "Bloom Kitchen 소개",
  description:
    "Bloom Kitchen(今天煮什麼)은 대만 1인분·원룸 주방·빠른 저녁을 위한 가정식 레시피를 정리하는 사이트입니다.",
  eyebrow: "About",
  updatedLabel: "최종 업데이트",
  brandMarkAlt: "Bloom Kitchen(今天煮什麼) 브랜드 일러스트",
  missionHeading: "사이트 목적",
  missionBody:
    "Bloom Kitchen(今天煮什麼)은 대만에서 흔한 식재료, 1~2인분, 작은 주방을 중심으로 요리 아이디어를 모읍니다. 가지고 있는 재료와 도구, 사용 가능한 시간에 맞춰 오늘의 메뉴를 고를 수 있습니다. 준비, 조리, 대기 시간은 각 레시피의 설명을 확인해 주세요.",
  audienceHeading: "이런 분께",
  audienceItems: [
    "1~2인분 일상 요리가 필요한 소규모 가정.",
    "준비와 설거지 부담을 줄이고 싶은 원룸·학생·직장인.",
    "흔한 대만 식재료로 빠르게 집밥을 만들고 싶은 분."
  ],
  principlesHeading: "콘텐츠 원칙",
  principlesItems: [
    "단계, 시간, 분량, 대체 재료를 쉽게 훑어볼 수 있게 합니다.",
    "일부 글 작성과 번역에 AI를 활용합니다. 모든 레시피의 실제 조리 검증이 완료된 것은 아니며, 문장 수정이나 번역이 조리 검증을 의미하지는 않습니다.",
    "식당 스타일 요리는 이 사이트의 가정용 응용 요리이며, 식당이 제공하거나 인증한 레시피가 아닙니다. 일러스트와 예시 이미지는 실제 조리 검증의 증거가 아닙니다.",
    "표시된 영양 수치는 검사 결과가 아닌 추정치이며, 실제 수치는 제품, 분량, 대체 재료에 따라 달라집니다.",
    "재료, 단계, 시간이 서로 맞지 않으면 아래 연락처로 레시피 URL과 문제를 보내 주세요. 수정에 참고하겠습니다."
  ],
  bloss0mHeading: "Bloss0m과의 관계",
  bloss0mPrimary: {
    beforeBloss0m: "{brandName}은 ",
    afterBloss0m: " 생태계의 레시피 사이트입니다. 중국어 슬로건은「",
    taglineNote: "」, URL은 ",
    afterRecipeUrl: "입니다. 같은 시리즈에는 ",
    pickerLabel: "Bloom Picker",
    betweenPickerAndRender: "(색상 팔레트 추천)와 ",
    renderLabel: "Bloom Render",
    afterRender: " (그리기 입구)가 있습니다."
  },
  bloss0mSecondary:
    "Bloss0m은 개인 웹 콘텐츠와 실험 프로젝트의 허브입니다. 이 사이트는 작은 주방에서 실제로 만들 수 있는 대만 가정식에 집중합니다.",
  contactHeading: "문의",
  contact: {
    beforeEmail: "내용 오류, 제휴, 제안은",
    afterEmail: "로 메일하거나",
    beforeContactLink: "",
    contactLinkLabel: "문의 페이지",
    afterContactLink: "를 이용해 주세요."
  }
};

const byLocale: Record<Locale, AboutPageContent> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export function getAboutPage(locale: Locale): AboutPageContent {
  return byLocale[locale];
}
