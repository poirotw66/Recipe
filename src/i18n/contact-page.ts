import type { Locale } from "../lib/i18n";

export interface ContactEcosystemCopy {
  beforeBloss0m: string;
  afterBloss0m: string;
  beforeRecipeUrl: string;
  afterRecipeUrl: string;
}

export interface ContactPageContent {
  title: string;
  description: string;
  eyebrow: string;
  updatedLabel: string;
  primaryHeading: string;
  ecosystem: ContactEcosystemCopy;
  topicsHeading: string;
  topics: string[];
  remindersHeading: string;
  reminders: string[];
  privacyNote: {
    before: string;
    linkLabel: string;
    after: string;
  };
}

const zhTW: ContactPageContent = {
  title: "聯絡我們",
  description: "透過 email 聯絡 Bloom Kitchen（今天煮什麼），回報內容問題、合作需求或站務建議。",
  eyebrow: "Contact",
  updatedLabel: "最後更新",
  primaryHeading: "主要聯絡方式",
  ecosystem: {
    beforeBloss0m: "本站為",
    afterBloss0m: "生態中的",
    beforeRecipeUrl: "食譜站（",
    afterRecipeUrl: "）。不提供表單後端，所有站務與內容回饋都透過 email 收件。"
  },
  topicsHeading: "可以來信的內容",
  topics: [
    "食譜步驟、食材名稱、時間資訊有誤。",
    "合作提案、授權詢問或內容引用通知。",
    "隱私權、廣告顯示或政策頁相關問題。"
  ],
  remindersHeading: "來信前提醒",
  reminders: [
    "請不要寄送身分證號、金融資料、健康病歷等敏感個資。",
    "若是內容修正需求，建議附上頁面網址與問題描述，方便快速處理。"
  ],
  privacyNote: {
    before: "隱私處理方式可另參考",
    linkLabel: "隱私權政策",
    after: "。"
  }
};

const en: ContactPageContent = {
  title: "Contact",
  description:
    "Email Bloom Kitchen (今天煮什麼) to report content issues, partnership inquiries, or site feedback.",
  eyebrow: "Contact",
  updatedLabel: "Last updated",
  primaryHeading: "How to reach us",
  ecosystem: {
    beforeBloss0m: "This site is the",
    afterBloss0m: "recipe site in the",
    beforeRecipeUrl: "ecosystem (",
    afterRecipeUrl: "). There is no form backend; all site and content feedback is handled by email."
  },
  topicsHeading: "What you can write about",
  topics: [
    "Recipe steps, ingredient names, or timing information that looks wrong.",
    "Partnership proposals, licensing questions, or content attribution notices.",
    "Questions about privacy, ads, or policy pages."
  ],
  remindersHeading: "Before you email",
  reminders: [
    "Please do not send sensitive personal data such as ID numbers, financial details, or medical records.",
    "For content corrections, include the page URL and a short description so we can respond faster."
  ],
  privacyNote: {
    before: "For how we handle privacy, see our",
    linkLabel: "Privacy Policy",
    after: "."
  }
};

const ja: ContactPageContent = {
  title: "お問い合わせ",
  description:
    "Bloom Kitchen（今天煮什麼）へのメールで、内容の誤り、提携のご相談、サイトに関するご意見をお送りください。",
  eyebrow: "Contact",
  updatedLabel: "最終更新",
  primaryHeading: "主な連絡方法",
  ecosystem: {
    beforeBloss0m: "当サイトは",
    afterBloss0m: "エコシステム内の",
    beforeRecipeUrl: "レシピサイト（",
    afterRecipeUrl: "）です。フォームのバックエンドはなく、サイトや内容に関するフィードバックはすべてメールで受け付けています。"
  },
  topicsHeading: "お問い合わせ内容の例",
  topics: [
    "レシピの手順、食材名、調理時間などの誤り。",
    "提携のご提案、ライセンスに関するお問い合わせ、引用のご連絡。",
    "プライバシー、広告表示、ポリシーページに関するご質問。"
  ],
  remindersHeading: "送信前のお願い",
  reminders: [
    "身分証番号、金融情報、健康・医療記録などの機微な個人情報は送らないでください。",
    "内容修正の場合は、ページ URL と問題の説明を添えていただけると対応が早くなります。"
  ],
  privacyNote: {
    before: "プライバシーの取り扱いについては",
    linkLabel: "プライバシーポリシー",
    after: "をご確認ください。"
  }
};

const ko: ContactPageContent = {
  title: "문의",
  description:
    "Bloom Kitchen(今天煮什麼)에 이메일로 내용 오류, 제휴 문의, 사이트 관련 의견을 보내 주세요.",
  eyebrow: "Contact",
  updatedLabel: "최종 업데이트",
  primaryHeading: "주요 연락 방법",
  ecosystem: {
    beforeBloss0m: "이 사이트는",
    afterBloss0m: "생태계의",
    beforeRecipeUrl: "레시피 사이트(",
    afterRecipeUrl: ")입니다. 폼 백엔드는 없으며, 사이트 및 콘텐츠 관련 피드백은 모두 이메일로 받습니다."
  },
  topicsHeading: "문의 가능한 내용",
  topics: [
    "레시피 단계, 재료명, 조리 시간 정보 오류.",
    "제휴 제안, 라이선스 문의, 콘텐츠 인용 관련 연락.",
    "개인정보, 광고 표시, 정책 페이지 관련 질문."
  ],
  remindersHeading: "보내기 전에",
  reminders: [
    "주민등록번호, 금융 정보, 건강·의료 기록 등 민감한 개인정보는 보내지 마세요.",
    "내용 수정 요청은 페이지 URL과 문제 설명을 함께 적어 주시면 더 빠르게 처리할 수 있습니다."
  ],
  privacyNote: {
    before: "개인정보 처리 방식은",
    linkLabel: "개인정보 처리방침",
    after: "을 참고해 주세요."
  }
};

const byLocale: Record<Locale, ContactPageContent> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export function getContactPage(locale: Locale): ContactPageContent {
  return byLocale[locale];
}
