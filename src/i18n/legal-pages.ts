import type { Locale } from "../lib/i18n";

export interface LegalPageContent {
  title: string;
  description: string;
  eyebrow: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
}

const zhTWAbout: LegalPageContent = {
  title: "關於本站",
  description: "Bloom Kitchen 專注台灣一人份與租屋族家常料理。",
  eyebrow: "About",
  sections: [
    {
      heading: "本站在做什麼",
      paragraphs: [
        "Bloom Kitchen 是靜態食譜站，整理適合台灣家庭廚房、小套房與忙碌生活的家常料理。"
      ]
    }
  ]
};

const legalByLocale: Record<Exclude<Locale, "zh-TW">, Record<"about" | "contact" | "privacy" | "terms", LegalPageContent>> = {
  en: {
    about: {
      title: "About Bloom Kitchen",
      description: "Taiwanese home-style recipes for solo cooks and small kitchens.",
      eyebrow: "About",
      sections: [
        {
          heading: "What we do",
          paragraphs: [
            "Bloom Kitchen is a static recipe site focused on approachable Taiwanese home cooking for busy weeknights and small households."
          ]
        },
        {
          heading: "Languages",
          paragraphs: [
            "Traditional Chinese is the primary content language. English, Japanese, and Korean pages provide navigation and policy text; recipe translations roll out in batches."
          ]
        }
      ]
    },
    contact: {
      title: "Contact",
      description: "Reach the Bloom Kitchen team.",
      eyebrow: "Contact",
      sections: [
        {
          heading: "Email",
          paragraphs: ["For site feedback or partnership questions, email poirotw66@gmail.com."]
        }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      description: "How Bloom Kitchen handles data and ads.",
      eyebrow: "Legal",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "This site may use Google AdSense and standard analytics. See the Traditional Chinese policy for full details until localized copies are complete."
          ]
        }
      ]
    },
    terms: {
      title: "Terms of Use",
      description: "Terms for using Bloom Kitchen.",
      eyebrow: "Legal",
      sections: [
        {
          heading: "Use of content",
          paragraphs: [
            "Recipes are for personal use. Follow food safety guidance and adjust for your kitchen equipment."
          ]
        }
      ]
    }
  },
  ja: {
    about: {
      title: "Bloom Kitchen について",
      description: "台湾の家庭料理レシピサイトです。",
      eyebrow: "About",
      sections: [
        {
          heading: "サイトの目的",
          paragraphs: ["一人暮らしや小さなキッチン向けの台湾家庭料理を整理しています。"]
        }
      ]
    },
    contact: {
      title: "お問い合わせ",
      description: "ご連絡先",
      eyebrow: "Contact",
      sections: [{ heading: "メール", paragraphs: ["poirotw66@gmail.com までご連絡ください。"] }]
    },
    privacy: {
      title: "プライバシーポリシー",
      description: "個人情報と広告について",
      eyebrow: "Legal",
      sections: [{ heading: "概要", paragraphs: ["繁体字版ポリシーが正式版です。英語・日本語ページは順次拡充します。"] }]
    },
    terms: {
      title: "利用規約",
      description: "サイト利用条件",
      eyebrow: "Legal",
      sections: [{ heading: "コンテンツ", paragraphs: ["個人利用を想定しています。調理は自己責任で行ってください。"] }]
    }
  },
  ko: {
    about: {
      title: "Bloom Kitchen 소개",
      description: "대만 가정식 레시피 사이트입니다.",
      eyebrow: "About",
      sections: [
        {
          heading: "사이트 목적",
          paragraphs: ["1인 가구와 작은 주방을 위한 대만 가정식 레시피를 정리합니다."]
        }
      ]
    },
    contact: {
      title: "문의",
      description: "연락처",
      eyebrow: "Contact",
      sections: [{ heading: "이메일", paragraphs: ["poirotw66@gmail.com 으로 문의해 주세요."] }]
    },
    privacy: {
      title: "개인정보 처리방침",
      description: "데이터 및 광고 안내",
      eyebrow: "Legal",
      sections: [{ heading: "요약", paragraphs: ["번체 중국어 정책이 정본입니다. 다국어 페이지는 순차 보완됩니다."] }]
    },
    terms: {
      title: "이용약관",
      description: "사이트 이용 조건",
      eyebrow: "Legal",
      sections: [{ heading: "콘텐츠", paragraphs: ["개인 이용을 전제합니다. 조리는 사용자 책임입니다."] }]
    }
  }
};

export function getLegalPage(locale: Locale, page: "about" | "contact" | "privacy" | "terms"): LegalPageContent {
  if (locale === "zh-TW") {
    return zhTWAbout;
  }
  return legalByLocale[locale][page];
}
