import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TestPage = () => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:8080/damoa/live')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('에러 발생:', err))
      .finally(() => setLoading(false));
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* 언어 선택 버튼 */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => changeLanguage('ko')} style={{ marginRight: '0.5rem' }}>🇰🇷 한국어</button>
        <button onClick={() => changeLanguage('en')} style={{ marginRight: '0.5rem' }}>🇺🇸 English</button>
        <button onClick={() => changeLanguage('zh')}>🇨🇳 中文</button>
      </div>

      {/* 다국어 적용 */}
      <h2>{t('title')}</h2>

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestPage;
