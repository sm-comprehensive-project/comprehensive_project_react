---

## 📁 프로젝트 디렉터리 구조

```bash
src/
├── components/                 # 재사용 가능한 UI 컴포넌트 모음
│   ├── layout/                # Header, Footer, Layout 등 공통 레이아웃 구성 요소
│   ├── live/                  # 라이브 방송 관련 UI (섹션, 모달, 카드 등)
│   ├── product/               # 상품 관련 UI (상품 목록 등)
│   ├── legacy/                # 과거 버전 컴포넌트 보관 (ex. CategoryBar)
│   └── EventBanner.tsx       # 이벤트/프로모션 배너 컴포넌트 (단일 파일)
│
├── pages/                     # 라우팅되는 주요 페이지 구성
│   ├── mainpage/              # 메인 페이지 버전들 (MainPage, MainPage2 등)
│   ├── schedule/              # 방송 일정 관련 페이지
│   ├── StreamDetail/          # 방송 상세 페이지들 (버전별로 구분)
│   └── user/                  # 로그인, 인증 관련 페이지
│
├── styles/                    # 전역 스타일 및 CSS
│   └── global.css
│
├── App.tsx                    # 라우터 및 전체 앱 구조 설정
├── main.tsx                   # 앱 진입점
└── swiper-css.d.ts            # Swiper 스타일 타입 정의
```

---

### 📝 참고
- `legacy/`는 더 이상 사용하지 않는 과거 컴포넌트들 백업 용도로 유지
- `StreamDetail/` 안의 여러 버전은 UI 테스트 및 비교용으로 사용됨
- 추후 `promotion/`, `category/` 같은 폴더도 컴포넌트 수 증가 시 분리 가능

---