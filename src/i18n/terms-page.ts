import type { Locale } from "../lib/i18n";

export interface TermsSection {
  heading: string;
  paragraphs: string[];
}

export interface TermsContactCopy {
  beforeEmail: string;
  afterEmail: string;
  beforeContactLink: string;
  contactLinkLabel: string;
  afterContactLink: string;
}

export interface TermsPageContent {
  title: string;
  description: string;
  eyebrow: string;
  updatedLabel: string;
  sections: TermsSection[];
  updatesHeading: string;
  updates: TermsContactCopy;
}

const zhTW: TermsPageContent = {
  title: "使用條款",
  description: "說明 Bloom Kitchen（今天煮什麼）的內容用途、免責聲明、外部連結與廣告顯示原則。",
  eyebrow: "Terms",
  updatedLabel: "最後更新",
  sections: [
    {
      heading: "內容用途",
      paragraphs: [
        "本站內容以一般家常料理資訊整理與閱讀參考為主，提供食譜步驟、時間估算、食材搭配與保存建議，不保證適用於每一位使用者的設備、口味、過敏原限制或健康需求。"
      ]
    },
    {
      heading: "食譜與營養資訊免責",
      paragraphs: [
        "食譜做法、份量、時間與營養相關說明均可能因品牌、食材狀態、火力、器具與個人操作而有所差異。若你有過敏、慢性病、嬰幼兒飲食或特殊醫療需求，請優先參考專業醫療與營養建議。"
      ]
    },
    {
      heading: "智慧財產與引用",
      paragraphs: [
        "本站文字、整理架構與自製素材受著作權保護。若需引用，請保留來源並附上對應頁面連結；未經同意不得大量重製、鏡像或作為其他內容農場素材使用。"
      ]
    },
    {
      heading: "廣告與外部連結",
      paragraphs: [
        "本站可能顯示 Google AdSense 或其他第三方廣告，也可能連向外部參考資源。外部網站內容與其隱私政策、商品或服務品質，均不在本站控制範圍內。"
      ]
    }
  ],
  updatesHeading: "條款更新與聯絡",
  updates: {
    beforeEmail: "本站可依站務調整、法規需求或廣告政策更新本條款。若你對條款內容有疑問，可寄信至",
    afterEmail: "，或查看",
    beforeContactLink: "",
    contactLinkLabel: "聯絡我們",
    afterContactLink: "。"
  }
};

const en: TermsPageContent = {
  title: "Terms of Use",
  description:
    "Terms covering how Bloom Kitchen (今天煮什麼) content may be used, disclaimers, external links, and advertising.",
  eyebrow: "Terms",
  updatedLabel: "Last updated",
  sections: [
    {
      heading: "Purpose of content",
      paragraphs: [
        "Content on this site is general home-cooking information for reading reference—steps, timing estimates, pairings, and storage tips. It may not fit every kitchen, taste, allergen restriction, or health need."
      ]
    },
    {
      heading: "Recipe and nutrition disclaimer",
      paragraphs: [
        "Results can vary with brands, ingredient condition, heat levels, tools, and technique. If you have allergies, chronic conditions, infant feeding needs, or medical dietary requirements, follow professional medical and nutrition guidance first."
      ]
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "Text, structure, and original assets are protected by copyright. When citing, keep attribution and link to the source page. Do not bulk-copy, mirror, or repurpose the site as content-farm material without permission."
      ]
    },
    {
      heading: "Ads and external links",
      paragraphs: [
        "We may show Google AdSense or other third-party ads and link to external references. We do not control external sites, their privacy policies, or the quality of their products or services."
      ]
    }
  ],
  updatesHeading: "Updates and contact",
  updates: {
    beforeEmail: "We may update these terms for site operations, legal requirements, or ad policies. Questions? Email",
    afterEmail: " or visit our",
    beforeContactLink: "",
    contactLinkLabel: "Contact page",
    afterContactLink: "."
  }
};

const ja: TermsPageContent = {
  title: "利用規約",
  description:
    "Bloom Kitchen（今天煮什麼）のコンテンツ利用、免責事項、外部リンク、広告表示に関する条件。",
  eyebrow: "Terms",
  updatedLabel: "最終更新",
  sections: [
    {
      heading: "コンテンツの目的",
      paragraphs: [
        "当サイトの内容は家庭料理の一般的な情報整理・閲覧参考用です。手順、時間の目安、食材の組み合わせ、保存の提案を提供しますが、すべての設備、味覚、アレルゲン、健康ニーズに適合するとは限りません。"
      ]
    },
    {
      heading: "レシピ・栄養情報の免責",
      paragraphs: [
        "作り方、分量、時間、栄養に関する説明は、ブランド、食材の状態、火力、調理器具、個人の操作により異なる場合があります。アレルギー、持病、乳幼児の食事、特別な医療上の必要がある場合は、専門の医療・栄養のアドバイスを優先してください。"
      ]
    },
    {
      heading: "知的財産と引用",
      paragraphs: [
        "当サイトの文章、構成、自作素材は著作権で保護されています。引用する場合は出典とページリンクを残してください。無断での大量複製、ミラー、コンテンツファーム素材としての利用は禁止です。"
      ]
    },
    {
      heading: "広告と外部リンク",
      paragraphs: [
        "Google AdSense などの第三者広告を表示したり、外部参考リンクを掲載する場合があります。外部サイトの内容、プライバシーポリシー、商品・サービスの品質は当サイトの管理外です。"
      ]
    }
  ],
  updatesHeading: "規約の更新と連絡",
  updates: {
    beforeEmail: "サイト運営、法規制、広告方針に応じて本規約を更新することがあります。ご質問は",
    afterEmail: " まで、または",
    beforeContactLink: "",
    contactLinkLabel: "お問い合わせページ",
    afterContactLink: "をご確認ください。"
  }
};

const ko: TermsPageContent = {
  title: "이용약관",
  description:
    "Bloom Kitchen(今天煮什麼) 콘텐츠 이용, 면책, 외부 링크, 광고 표시에 관한 조건입니다.",
  eyebrow: "Terms",
  updatedLabel: "최종 업데이트",
  sections: [
    {
      heading: "콘텐츠 목적",
      paragraphs: [
        "본 사이트 콘텐츠는 가정 요리 정보 정리·열람 참고용입니다. 레시피 단계, 시간 추정, 재료 궁합, 보관 제안을 제공하지만 모든 주방, 취향, 알레르기, 건강 요구에 맞지 않을 수 있습니다."
      ]
    },
    {
      heading: "레시피·영양 정보 면책",
      paragraphs: [
        "조리법, 분량, 시간, 영양 관련 설명은 브랜드, 재료 상태, 화력, 도구, 개인 숙련도에 따라 달라질 수 있습니다. 알레르기, 만성 질환, 유아 식단, 특수 의료 요구가 있으면 전문 의료·영양 지침을 우선하세요."
      ]
    },
    {
      heading: "지적 재산과 인용",
      paragraphs: [
        "본 사이트의 문장, 구조, 자체 제작 자료는 저작권으로 보호됩니다. 인용 시 출처와 페이지 링크를 남겨 주세요. 무단 대량 복제, 미러, 콘텐츠 팜 소재로의 사용은 금지됩니다."
      ]
    },
    {
      heading: "광고 및 외부 링크",
      paragraphs: [
        "Google AdSense 등 제3자 광고를 표시하거나 외부 참고 링크를 둘 수 있습니다. 외부 사이트의 콘텐츠, 개인정보 처리방침, 상품·서비스 품질은 본 사이트 통제 범위 밖입니다."
      ]
    }
  ],
  updatesHeading: "약관 업데이트 및 문의",
  updates: {
    beforeEmail: "사이트 운영, 법규, 광고 정책에 따라 본 약관을 업데이트할 수 있습니다. 문의는",
    afterEmail: " 또는",
    beforeContactLink: "",
    contactLinkLabel: "문의 페이지",
    afterContactLink: "를 확인해 주세요."
  }
};

const byLocale: Record<Locale, TermsPageContent> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export function getTermsPage(locale: Locale): TermsPageContent {
  return byLocale[locale];
}
