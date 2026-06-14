import type { Locale } from "../lib/i18n";

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
    "Bloom Kitchen（今天煮什麼）是一個以靜態內容為主的食譜 SEO 站，整理適合台灣家庭廚房、小套房廚具與忙碌生活節奏的家常料理。我們希望讓讀者在 10 到 30 分鐘內，快速找到今天能煮、冰箱裡也可能有材料的做法。",
  audienceHeading: "適合哪些人",
  audienceItems: [
    "一人份、兩人份的小家庭日常料理需求。",
    "租屋族、學生、上班族想降低備料與清理負擔。",
    "想用常見台灣食材快速完成家常菜的人。"
  ],
  principlesHeading: "內容原則",
  principlesItems: [
    "優先提供容易掃讀的步驟、時間、份量與替代建議。",
    "營養、保存與食材搭配資訊屬整理與估算用途，不構成醫療建議。",
    "站點以 Markdown 與 JSON 靜態內容建置，會持續擴充與修正。"
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
    "Bloom Kitchen (今天煮什麼) is a static recipe site built for Taiwanese home kitchens, small apartments, and busy schedules. We help you find something you can cook tonight in 10 to 30 minutes, often with ingredients you already have.",
  audienceHeading: "Who it is for",
  audienceItems: [
    "Solo diners and small households cooking one or two servings.",
    "Renters, students, and office workers who want less prep and cleanup.",
    "Anyone who wants familiar Taiwanese ingredients turned into approachable weeknight meals."
  ],
  principlesHeading: "Content principles",
  principlesItems: [
    "Steps, timing, portions, and substitutions should be easy to scan.",
    "Nutrition, storage, and pairing notes are estimates for reference only—not medical advice.",
    "The site is built from Markdown and JSON static content and will keep expanding and improving."
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
    "Bloom Kitchen（今天煮什麼）は静的コンテンツ中心のレシピサイトで、台湾の家庭キッチン、小さな台所、忙しい生活リズムに合う料理を整理しています。10〜30分で今夜作れて、冷蔵庫の材料でも作れるレシピを見つけやすくすることを目指しています。",
  audienceHeading: "こんな方に向いています",
  audienceItems: [
    "一人分・二人分の小さな家庭の日常料理。",
    "下準備と片付けを減らしたい賃貸・学生・社会人。",
    "台湾の身近な食材で素早く家常菜を作りたい方。"
  ],
  principlesHeading: "コンテンツの方針",
  principlesItems: [
    "手順・時間・分量・代替案を読みやすく優先します。",
    "栄養・保存・組み合わせ情報は整理・目安であり、医療アドバイスではありません。",
    "Markdown と JSON の静的コンテンツで構築し、継続的に拡充・修正します。"
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
    "Bloom Kitchen(今天煮什麼)은 정적 콘텐츠 기반 레시피 사이트로, 대만 가정 주방·작은 원룸·바쁜 일상에 맞는 요리를 모읍니다. 10~30분 안에 오늘 만들 수 있고 냉장고 재료로도 가능한 레시피를 빠르게 찾도록 돕습니다.",
  audienceHeading: "이런 분께",
  audienceItems: [
    "1~2인분 일상 요리가 필요한 소규모 가정.",
    "준비와 설거지 부담을 줄이고 싶은 원룸·학생·직장인.",
    "흔한 대만 식재료로 빠르게 집밥을 만들고 싶은 분."
  ],
  principlesHeading: "콘텐츠 원칙",
  principlesItems: [
    "단계, 시간, 분량, 대체 재료를 쉽게 훑어볼 수 있게 합니다.",
    "영양·보관·궁합 정보는 참고용 추정이며 의료 조언이 아닙니다.",
    "Markdown과 JSON 정적 콘텐츠로 구축하며 지속적으로 보완합니다."
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
