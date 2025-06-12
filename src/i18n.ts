// 파일: src/i18n.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 로컬에 저장해둔 JSON 번역 리소스를 import
import translationKO from "./locales/ko/translation.json";
import translationEN from "./locales/en/translation.json";
import translationZH from "./locales/zh/translation.json";
import translationJA from "./locales/ja/translation.json";

const resources = {
  ko: { translation: translationKO },
  en: { translation: translationEN },
  zh: { translation: translationZH },
  ja: { translation: translationJA}
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ko",           // 초기 언어를 한국어로 설정
    fallbackLng: "en",   // 만약 지원되지 않는 언어면 영어로 표시
    interpolation: {
      escapeValue: false, // React에선 XSS 방지 자동이므로 false
    },
  });

export default i18n;
