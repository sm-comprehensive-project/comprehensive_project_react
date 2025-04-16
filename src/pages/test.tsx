import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const translateText = async (text: string, targetLang: string): Promise<string> => {
  const lang = targetLang.split('-')[0];

  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      target: lang,
      format: 'text',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await res.json();

  if (json.error) {
    console.error('🔥 번역 API 오류:', json.error.message);
    throw new Error(json.error.message);
  }

  return json.data.translations[0].translatedText;
};

interface Product {
  name: string;
  image: string;
  link: string;
  price: number;
  price_origin: number;
  discountRate: number;
}

interface SellerInfo {
  name: string;
  url: string;
  image: string;
}

interface LiveData {
  liveId: string;
  title: string;
  products: Product[];
  sellerInfo: SellerInfo;
  liveUrl: string;
}

const TestPage = () => {
  const [data, setData] = useState<LiveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [translatedNames, setTranslatedNames] = useState<Record<string, string>>({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:8080/damoa/live/40224')
      .then((res) => res.json())
      .then((json) => setData([json]))
      .catch((err) => console.error('에러 발생:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchTranslations = async () => {
      if (!data.length || i18n.language === 'ko') return;

      const lang = i18n.language;
      const newTranslations: Record<string, string> = {};
      const namesToTranslate = new Set<string>();

      data.forEach((live) => {
        live.products.forEach((p) => {
          if (!translatedNames[p.name]) {
            namesToTranslate.add(p.name);
          }
        });
      });

      if (namesToTranslate.size === 0) return;

      setTranslating(true);

      for (const name of namesToTranslate) {
        try {
          const translated = await translateText(name, lang);
          newTranslations[name] = translated;
        } catch (err) {
          console.error('번역 오류:', err);
          newTranslations[name] = t('translationFailed');
        }
      }

      setTranslatedNames((prev) => ({ ...prev, ...newTranslations }));
      setTranslating(false);
    };

    fetchTranslations();
  }, [data, i18n.language]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setTranslatedNames({});
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      {/* 언어 선택 버튼 */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => changeLanguage('ko')} style={{ marginRight: '0.5rem' }}>{t('language.ko')}</button>
        <button onClick={() => changeLanguage('en')} style={{ marginRight: '0.5rem' }}>{t('language.en')}</button>
        <button onClick={() => changeLanguage('zh')}>{t('language.zh')}</button>
      </div>

      {/* 제목 */}
      <h2 style={{ marginBottom: '1rem' }}>{t('title')}</h2>

      {/* 본문 */}
      {loading ? (
        <p>{t('loading')}</p>
      ) : (
        <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
          {data.map((live) => (
            <div key={live.liveId} style={{ display: 'flex', flex: 1, gap: '1rem' }}>
              {/* 방송 화면 */}
              <div style={{
                flex: '1',
                backgroundColor: '#000',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <p>{t('liveScreen')}</p>
              </div>

              {/* 판매자 정보 및 채팅 */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1, border: '1px solid #ccc', padding: '1rem' }}>
                  <h4>{t('sellerInfo')}</h4>
                  <img src={live.sellerInfo.image} alt={live.sellerInfo.name} width="100" />
                  <p>{live.sellerInfo.name}</p>
                  <a href={live.sellerInfo.url} target="_blank" rel="noreferrer">{t('sellerPage')}</a>
                </div>
                <div style={{ flex: 2, border: '1px solid #ccc', padding: '1rem' }}>
                  <h4>{t('chat')}</h4>
                  <div style={{ height: '100%', backgroundColor: '#f5f5f5' }}>채팅창 자리</div>
                </div>
              </div>

              {/* 상품 리스트 */}
              <div style={{ flex: '2', border: '2px solid red', padding: '1rem', overflowY: 'auto' }}>
                <h3 style={{ color: 'red', marginBottom: '1rem' }}>{t('productList')}</h3>
                {translating && <p>{t('translating')}</p>}
                {live.products.map((product) => (
                  <div key={product.link} style={{
                    display: 'flex',
                    gap: '1rem',
                    borderBottom: '1px solid #eee',
                    marginBottom: '1rem',
                    paddingBottom: '1rem'
                  }}>
                    <img src={product.image} alt={product.name} width="100" />
                    <div>
                      <p><strong>
                        {i18n.language === 'ko'
                          ? product.name
                          : translatedNames[product.name] || t('translating')}
                      </strong></p>
                      <p>{product.price.toLocaleString()}원 → <s>{product.price_origin.toLocaleString()}원</s> ({product.discountRate}%)</p>
                      <a href={product.link} target="_blank" rel="noreferrer">{t('viewProduct')}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestPage;
