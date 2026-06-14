import type { Locale } from "../lib/i18n";

export interface PolicySection {
  heading: string;
  paragraphs: string[];
  listItems?: string[];
  emailListItem?: { before: string; after: string };
}

export interface PrivacyPageContent {
  title: string;
  description: string;
  eyebrow: string;
  updatedLabel: string;
  sections: PolicySection[];
}

const zhTW: PrivacyPageContent = {
  title: "隱私權政策",
  description: "說明 Bloom Kitchen（今天煮什麼）如何處理基本流量資料、Cookie、第三方廣告與聯絡資訊。",
  eyebrow: "Privacy",
  updatedLabel: "最後更新",
  sections: [
    {
      heading: "我們收集哪些資料",
      paragraphs: [
        "Bloom Kitchen 目前以靜態網站形式提供內容，不提供會員登入與站內留言功能。網站營運過程中，可能會透過主機服務、基礎流量分析工具或錯誤紀錄收集匿名技術資訊，例如瀏覽器類型、造訪時間、裝置類型與瀏覽頁面。"
      ]
    },
    {
      heading: "流量分析",
      paragraphs: [
        "本站可能使用 Google Analytics（GA4）等流量分析工具，以了解頁面瀏覽量、裝置類型與大致使用路徑。這些資料以彙總、匿名化方式呈現，用於改善內容與站內動線，不會用於出售個人資料。"
      ]
    },
    {
      heading: "Cookie 與第三方服務",
      paragraphs: [
        "本站可能使用 Google Analytics、Google AdSense 等第三方服務。這些服務可能依其政策使用 Cookie 或類似技術，以衡量流量、提供廣告或限制重複曝光。若你不希望接受相關 Cookie，可於瀏覽器設定中自行停用或清除。"
      ]
    },
    {
      heading: "聯絡資訊與來信內容",
      paragraphs: [
        "若你主動透過 email 聯絡我們，我們只會在處理回覆、站務溝通或必要紀錄的範圍內使用你提供的資訊，不會將你的個人資料出售或任意提供給無關第三方。"
      ]
    },
    {
      heading: "你的選擇",
      listItems: [
        "你可以透過瀏覽器限制 Cookie、刪除快取與網站資料。",
        "你可以避免在來信中提供不必要的敏感個資。"
      ],
      emailListItem: {
        before: "若對本站資料處理有疑問，可寄信至",
        after: "。"
      }
    }
  ]
};

const en: PrivacyPageContent = {
  title: "Privacy Policy",
  description:
    "How Bloom Kitchen (今天煮什麼) handles basic traffic data, cookies, third-party ads, and contact information.",
  eyebrow: "Privacy",
  updatedLabel: "Last updated",
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "Bloom Kitchen is a static site without member login or on-site comments. During normal operation, hosting, basic analytics, or error logging may collect anonymous technical data such as browser type, visit time, device type, and pages viewed."
      ]
    },
    {
      heading: "Analytics",
      paragraphs: [
        "We may use Google Analytics (GA4) or similar tools to understand page views, device types, and general navigation paths. Data is aggregated and anonymized to improve content and site flow—not sold as personal data."
      ]
    },
    {
      heading: "Cookies and third-party services",
      paragraphs: [
        "We may use Google Analytics, Google AdSense, and other third-party services. They may use cookies or similar technologies to measure traffic, serve ads, or limit repeat impressions. You can disable or clear cookies in your browser settings."
      ]
    },
    {
      heading: "Contact information",
      paragraphs: [
        "If you email us voluntarily, we use your message only to respond, handle site operations, or keep necessary records. We do not sell your personal data or share it with unrelated third parties."
      ]
    },
    {
      heading: "Your choices",
      listItems: [
        "You can limit cookies or clear cache and site data in your browser.",
        "You can avoid sending unnecessary sensitive personal data in email."
      ],
      emailListItem: {
        before: "Questions about how we handle data? Email",
        after: "."
      }
    }
  ]
};

const ja: PrivacyPageContent = {
  title: "プライバシーポリシー",
  description:
    "Bloom Kitchen（今天煮什麼）におけるトラフィックデータ、Cookie、第三者広告、連絡情報の取り扱いについて。",
  eyebrow: "Privacy",
  updatedLabel: "最終更新",
  sections: [
    {
      heading: "収集する情報",
      paragraphs: [
        "Bloom Kitchen は静的サイトで、会員ログインやサイト内コメント機能はありません。運用中、ホスティング、基本的な分析、エラーログにより、ブラウザ種別、訪問時刻、端末種別、閲覧ページなどの匿名技術情報が収集される場合があります。"
      ]
    },
    {
      heading: "アクセス解析",
      paragraphs: [
        "Google Analytics（GA4）などを利用し、ページビュー、端末種別、概ねの閲覧経路を把握する場合があります。データは集計・匿名化され、コンテンツと導線改善に使い、個人情報の販売には使いません。"
      ]
    },
    {
      heading: "Cookie と第三者サービス",
      paragraphs: [
        "Google Analytics、Google AdSense など第三者サービスを利用する場合があります。トラフィック計測、広告配信、重複表示の制限のため Cookie 等が使われることがあります。ブラウザ設定で無効化・削除できます。"
      ]
    },
    {
      heading: "連絡情報とメール内容",
      paragraphs: [
        "メールでご連絡いただいた場合、返信、サイト運営、必要な記録の範囲でのみ利用し、個人情報を販売したり無関係な第三者に提供したりしません。"
      ]
    },
    {
      heading: "あなたの選択",
      listItems: [
        "ブラウザで Cookie を制限したり、キャッシュやサイトデータを削除できます。",
        "メールに不要な機微な個人情報を含めないようにできます。"
      ],
      emailListItem: {
        before: "データの取り扱いについてのご質問は",
        after: "までご連絡ください。"
      }
    }
  ]
};

const ko: PrivacyPageContent = {
  title: "개인정보 처리방침",
  description:
    "Bloom Kitchen(今天煮什麼)의 트래픽 데이터, 쿠키, 제3자 광고, 연락 정보 처리 방식을 설명합니다.",
  eyebrow: "Privacy",
  updatedLabel: "최종 업데이트",
  sections: [
    {
      heading: "수집하는 정보",
      paragraphs: [
        "Bloom Kitchen은 정적 사이트이며 회원 로그인이나 사이트 내 댓글 기능은 없습니다. 운영 과정에서 호스팅, 기본 분석, 오류 로그를 통해 브라우저 유형, 방문 시각, 기기 유형, 조회 페이지 등 익명 기술 정보가 수집될 수 있습니다."
      ]
    },
    {
      heading: "트래픽 분석",
      paragraphs: [
        "Google Analytics(GA4) 등을 사용해 페이지뷰, 기기 유형, 대략적인 이용 경로를 파악할 수 있습니다. 데이터는 집계·익명화되어 콘텐츠와 사이트 동선 개선에 사용되며 개인정보 판매에는 사용하지 않습니다."
      ]
    },
    {
      heading: "쿠키 및 제3자 서비스",
      paragraphs: [
        "Google Analytics, Google AdSense 등 제3자 서비스를 사용할 수 있습니다. 트래픽 측정, 광고 제공, 중복 노출 제한을 위해 쿠키 등이 사용될 수 있습니다. 브라우저 설정에서 비활성화하거나 삭제할 수 있습니다."
      ]
    },
    {
      heading: "연락 정보 및 메일 내용",
      paragraphs: [
        "이메일로 연락하신 경우, 답변·사이트 운영·필요 기록 범위에서만 사용하며 개인정보를 판매하거나 무관한 제3자에게 제공하지 않습니다."
      ]
    },
    {
      heading: "귀하의 선택",
      listItems: [
        "브라우저에서 쿠키를 제한하거나 캐시·사이트 데이터를 삭제할 수 있습니다.",
        "메일에 불필요한 민감 개인정보를 포함하지 않을 수 있습니다."
      ],
      emailListItem: {
        before: "데이터 처리에 대한 문의는",
        after: "로 보내 주세요."
      }
    }
  ]
};

const byLocale: Record<Locale, PrivacyPageContent> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export function getPrivacyPage(locale: Locale): PrivacyPageContent {
  return byLocale[locale];
}
