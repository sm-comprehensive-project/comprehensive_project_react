import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      title: '🧪 MongoDB 원본 데이터 출력',
      liveScreen: '방송 화면 (검정색)',
      sellerInfo: '🧑‍💼 판매자 정보',
      chat: '💬 채팅 (가상)',
      productList: '🛒 상품 리스트',
      loading: '불러오는 중...',
      translating: '🔄 번역 중입니다...',
      sellerPage: '🔗 판매자 페이지',
      viewProduct: '🔗 상품 보기',
      language: {
        ko: '🇰🇷 한국어',
        en: '🇺🇸 English',
        zh: '🇨🇳 中文',
      }
    },
  },
  en: {
    translation: {
      title: '🧪 Raw MongoDB Data Output',
      liveScreen: 'Live Screen (Black)',
      sellerInfo: '🧑‍💼 Seller Info',
      chat: '💬 Chat (Virtual)',
      productList: '🛒 Product List',
      loading: 'Loading...',
      translating: '🔄 Translating...',
      sellerPage: '🔗 Seller Page',
      viewProduct: '🔗 View Product',
      language: {
        ko: '🇰🇷 Korean',
        en: '🇺🇸 English',
        zh: '🇨🇳 Chinese',
      }
    },
  },
  zh: {
    translation: {
      title: '🧪 MongoDB 原始数据输出',
      liveScreen: '直播画面（黑色）',
      sellerInfo: '🧑‍💼 卖家信息',
      chat: '💬 聊天（虚拟）',
      productList: '🛒 商品列表',
      loading: '加载中...',
      translating: '🔄 正在翻译...',
      sellerPage: '🔗 卖家页面',
      viewProduct: '🔗 查看商品',
      language: {
        ko: '🇰🇷 韩语',
        en: '🇺🇸 英语',
        zh: '🇨🇳 中文',
      }
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
