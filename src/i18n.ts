import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      title: '🧪 MongoDB 원본 데이터 출력',
    },
  },
  en: {
    translation: {
      title: '🧪 Raw MongoDB Data Output',
    },
  },
  zh: {
    translation: {
      title: '🧪 MongoDB 原始数据输出',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko', // 기본 언어
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
