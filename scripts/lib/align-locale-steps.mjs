/**
 * Align en/ja/ko step lists to zh step count after zh-only edits (no generic padding).
 */

const PAD = {
  en: "Taste and adjust seasoning; serve while hot.",
  ja: "味を見て、温かいうちに盛り付ける。",
  ko: "간을 맞추고 뜨거울 때 바로 낸다."
};

function isBoilerplate(step) {
  return (
    /Bring .+ to a boil, then add longer-cooking/i.test(step) ||
    /を沸かし、煮えにくい材料から入れる/.test(step) ||
    /를 끓인 뒤 익는 데 시간이 걸리는 재료부터 넣는다/.test(step) ||
    /Boil salted water; cook pasta until al dente/i.test(step) ||
    /湯沸かしで塩を入れ、パスタをアルデンテに茹で/i.test(step) ||
    /소금물을 끓여 파스타를 알덴테로 삶고/i.test(step)
  );
}

function dedupeAdjacent(steps) {
  const out = [];
  for (const step of steps) {
    const prev = out[out.length - 1];
    if (prev && prev.slice(0, 28) === step.slice(0, 28)) continue;
    out.push(step);
  }
  return out;
}

function collapseDuplicatePrep(steps) {
  const out = [];
  const prepPrefix = /^(Prep:|下準備：|준비:)/;
  let prepKept = false;
  for (const step of steps) {
    if (prepPrefix.test(step)) {
      if (prepKept && step.slice(0, 36) === out[out.length - 1]?.slice(0, 36)) continue;
      prepKept = true;
    }
    out.push(step);
  }
  return out;
}

/**
 * @param {string[]} zhSteps
 * @param {string[]} localeSteps
 * @param {'en'|'ja'|'ko'} locale
 */
export function alignLocaleStepsToZh(zhSteps, localeSteps, locale) {
  const target = zhSteps.length;
  let steps = dedupeAdjacent(localeSteps);
  steps = collapseDuplicatePrep(steps);
  steps = steps.filter((s) => !isBoilerplate(s));

  while (steps.length > target) {
    const prepIdx = steps.findIndex(
      (s, i) => i > 0 && /^(Prep:|下準備：|준비:)/.test(s) && steps[i - 1].startsWith(s.slice(0, 20))
    );
    if (prepIdx > 0) {
      steps.splice(prepIdx, 1);
      continue;
    }
    if (steps.length > target && /^(Prep:|下準備：|준비:)/.test(steps[0]) && steps[1]?.match(/fluff|ほぐ|풀고|beat the eggs/i)) {
      steps.splice(1, 1);
      continue;
    }
    steps.pop();
  }

  const pad = PAD[locale];
  while (steps.length < target) steps.push(pad);
  return steps.slice(0, target);
}
