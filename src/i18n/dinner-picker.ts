import type { Locale } from "../lib/i18n";

interface DinnerPickerCopy {
  title: string;
  hint: string;
  timeLabel: string;
  minutes: string;
  ingredients: string;
  cook: string;
  another: string;
  suggestion: string;
}

export const dinnerPickerCopy: Record<Locale, DinnerPickerCopy> = {
  "zh-TW": {
    title: "還沒想好？今晚就煮這道",
    hint: "選個時間，晚餐幫你想。",
    timeLabel: "你有多少時間？",
    minutes: "分鐘內",
    ingredients: "主要食材",
    cook: "今晚煮這道",
    another: "換一道看看",
    suggestion: "晚餐提案"
  },
  en: {
    title: "Dinner, decided.",
    hint: "Set your time. Find your next meal.",
    timeLabel: "How much time do you have?",
    minutes: "min or less",
    ingredients: "Main ingredients",
    cook: "Cook this tonight",
    another: "Try another dish",
    suggestion: "Dinner suggestion"
  },
  ja: {
    title: "迷ったら、今夜はこれ",
    hint: "使える時間から、晩ごはんを提案。",
    timeLabel: "何分で作りたい？",
    minutes: "分以内",
    ingredients: "主な材料",
    cook: "今夜はこれを作る",
    another: "ほかの料理を見る",
    suggestion: "晩ごはんの提案"
  },
  ko: {
    title: "오늘 저녁, 이 요리 어때요?",
    hint: "가능한 시간을 고르면 저녁을 추천해요.",
    timeLabel: "요리할 시간이 얼마나 있나요?",
    minutes: "분 이내",
    ingredients: "주요 재료",
    cook: "오늘 저녁은 이걸로",
    another: "다른 요리 보기",
    suggestion: "저녁 메뉴 추천"
  }
};
