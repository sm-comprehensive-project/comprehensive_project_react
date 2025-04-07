import { useEffect, useState } from 'react';

const TestPage = () => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/damoa/live')
      .then((res) => {
        console.log('res.status:', res.status);
        return res.json();
      })
      .then((json) => {
        console.log('받은 데이터:', json);
        setData(json);
      })
      .catch((err) => {
        console.error('에러 발생:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧪 MongoDB 원본 데이터 출력</h2>
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
