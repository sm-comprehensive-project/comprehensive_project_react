
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
| **라우팅 라이브러리** | React Router DOM | 7.3.0 | SPA 라우팅 처리 |
| **UI 라이브러리** | Material UI (MUI) | 6.4.6 | UI 컴포넌트 관리 |
| **UI 스타일링 라이브러리** | Emotion | 11.14.0 | CSS-in-JS 스타일링 |
| **아이콘 라이브러리** | MUI Icons Material | 6.4.6 | 아이콘 관리 |
| **날짜 및 시간 처리** | dayjs | 1.11.13 | 날짜 형식 관리 및 연산 |
| **캐러셀/슬라이더 라이브러리** | Swiper.js | 11.2.5 | 가로형 슬라이더 기능 |

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
├── 📁 public                # 정적 리소스 관리 (이미지 등)
│
├── 📁 src                  # 소스코드
│   ├── 📁 components       # 공통 UI 컴포넌트
│   │   ├── layout/              # Header, Footer, Layout 등 공통 레이아웃
│   │   ├── live/                # 라이브 방송 관련 UI
│   │   ├── product/             # 상품 관련 UI
│   │   ├── legacy/              # 이전 버전 보관용 (예: CategoryBar)
│   │   └── EventBanner.tsx      # 이벤트 배너 컴포넌트
│   │
│   ├── 📁 pages            # 라우팅되는 주요 페이지
│   │   ├── mainpage/            # 메인 페이지 (버전별)
│   │   ├── schedule/            # 방송 일정 관련 페이지
│   │   ├── StreamDetail/        # 방송 상세 페이지들 (버전 비교용)
│   │   └── user/                # 로그인 및 인증 페이지
│   │
│   ├── 📁 styles           # 전역 CSS 스타일
│   │   └── global.css
│   │
│   ├── App.tsx            # 라우터 및 최상위 컴포넌트
│   ├── main.tsx           # React 진입점
│   └── swiper-css.d.ts    # Swiper 스타일 타입 정의
│
├── package.json           # 패키지 의존성 설정
├── vite.config.ts         # Vite 설정
├── tsconfig.json          # TypeScript 설정
├── eslint.config.js       # ESLint 설정
└── .gitignore             # Git 무시 파일 설정
```



## 📌 개발 환경의 특징 및 개발 패턴

- ⚡ **Vite 기반의 React + TypeScript 환경**
- 🧩 **컴포넌트 중심의 모듈화 구조**
- 🧪 **여러 디자인 후보 및 레이아웃 실험 동시 진행**
- 🪟 **팝업 및 모달 컴포넌트 별도 관리**
- 🔍 **ESLint + 타입 검사로 코드 품질 유지**
- 🌿 **Git 기반의 브랜치 전략 및 히스토리 관리**

---
