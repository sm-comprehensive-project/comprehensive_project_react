# 💡 LiveCommerce 통합 플랫폼

라이브 커머스를 위한 통합형 프론트엔드 플랫폼입니다.  
실시간 방송 정보, 상품 추천, 편리한 UI/UX를 제공합니다.

---

## 🚀 프로젝트 개발 환경

### ✅ 빌드 도구 및 환경

| 구분 | 내용 | 버전 |
| --- | --- | --- |
| **빌드 도구** | Vite | 6.2.0 |
| **프로그래밍 언어** | TypeScript | 5.7.3 |
| **린팅 도구** | ESLint | 9.21.0 |
| **코드 스타일 가이드** | typescript-eslint | 8.25.0 |
| **React 플러그인** | @vitejs/plugin-react | 4.3.4 |

---

### 📦 라이브러리 & 프레임워크

| 구분 | 라이브러리 | 버전 | 비고 |
| --- | --- | --- | --- |
| **프론트엔드 프레임워크** | React | 19.0.0 | UI 개발 프레임워크 |
| **라우팅** | React Router DOM | 7.3.0 | SPA 라우팅 처리 |
| **UI 라이브러리** | Material UI (MUI) | 6.4.6 | UI 컴포넌트 관리 |
| **스타일링** | Emotion | 11.14.0 | CSS-in-JS |
| **아이콘** | MUI Icons Material | 6.4.6 | MUI 전용 아이콘 |
| **날짜 처리** | dayjs | 1.11.13 | 날짜 및 시간 포맷팅 |
| **슬라이더** | Swiper.js | 11.2.5 | 가로 슬라이더 UI |
| **다국어 처리** | i18next | 최신 | 국제화(i18n) 기능 |
| **번역 API** | Google Cloud Translation API | 최신 | 실시간 번역 기능 제공 |

---

### 📑 타입 정의 (Type Definitions)

| 구분 | 라이브러리 | 버전 |
| --- | --- | --- |
| **React 타입** | @types/react | 19.0.10 |
| **React DOM 타입** | @types/react-dom | 19.0.4 |
| **Swiper 타입** | @types/swiper | 5.4.3 |

---

## 📂 프로젝트 구조

```plaintext
📁 livecommerce
│
├── 📁 public                # 정적 리소스 (이미지, svg 등)
│   ├── images/             # 이미지 파일 저장소
│   └── vite.svg
│
├── 📁 src                  # 소스코드 루트
│   ├── 📁 assets           # 에셋 및 정적 데이터
│   │   └── data/               # JSON 등 외부 데이터
│   │       └── scheduleData.json
│   │
│   ├── 📁 components       # 공통 컴포넌트 모음
│   │   ├── 📁 layout/           # Header, Footer, Layout 등 레이아웃 요소
│   │   ├── 📁 live/             # 실시간 방송 관련 UI
│   │   ├── 📁 product/          # 상품 UI (상품 목록 등)
│   │   ├── 📁 auth/             # 로그인 / 회원가입 폼
│   │   ├── 📁 legacy/           # 이전 버전 보관소 (예: CategoryBar)
│   │   ├── EventBanner.tsx     # 이벤트 배너
│   │   ├── BroadcastCard.tsx   # 방송 카드 컴포넌트
│   │   ├── BroadcastCard2.tsx  # 방송 카드 대체 버전
│   │   └── DateSelector.tsx    # 날짜 선택 컴포넌트
│   │
│   ├── 📁 pages            # 라우팅되는 페이지
│   │   ├── 📁 mainpage/         # 메인페이지 (여러 버전 실험 중)
│   │   ├── 📁 schedule/         # 방송 일정 페이지 (일별/주별)
│   │   ├── 📁 StreamDetail/     # 방송 상세 정보 (버전별 비교용)
│   │   └── 📁 user/             # 사용자 인증 관련 페이지
│   │
│   ├── 📁 styles           # 전역 스타일 관리
│   │   └── global.css
│   │
│   ├── App.tsx            # 라우팅 및 Layout 통합 루트 컴포넌트
│   ├── main.tsx           # 애플리케이션 진입점
│   ├── i18n.ts            # i18n 설정 파일
│   └── swiper-css.d.ts    # Swiper 스타일 정의 타입
│
├── 📄 index.html           # HTML 템플릿
├── 📄 package.json         # 프로젝트 메타 및 의존성
├── 📄 package-lock.json    # 패키지 버전 잠금
├── 📄 vite.config.ts       # Vite 설정
├── 📄 tsconfig.json        # TypeScript 컴파일러 설정
├── 📄 tsconfig.app.json    # 앱 전용 TS 설정
├── 📄 tsconfig.node.json   # Node 전용 TS 설정
├── 📄 eslint.config.js     # ESLint 설정
└── 📄 .gitignore           # Git 무시 파일 목록
```

---

## 📌 개발 환경의 특징 및 개발 패턴

- ⚡ **Vite 기반의 React + TypeScript 환경**
- 📚 **컴포넌트 중심의 모듈화 구조** (기능별 분리)
- 🧪 **레이아웃 및 디자인 실험을 위한 다중 버전 관리**
- 🪟 **모달 및 팝업 컴포넌트 별도 관리**
- 🌍 **i18n + Google 번역 API로 다국어 지원**
- 🧹 **ESLint, 타입스크립트 기반의 코드 품질 유지**
- 🌿 **Git 브랜치 전략 기반의 개발 히스토리 관리**
