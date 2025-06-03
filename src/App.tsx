// src/App.tsx
import React from "react";
import './i18n';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/mainpage/MainPage";
import WeeklySchedule from "./pages/schedule/WeeklySchedule";
import AuthPage from "./pages/user/AuthPage";
import TestPage from "./pages/test";
import Tictoc from "./pages/tictoc"; // ✅ 추가
import VideoTest from "./pages/videotest"; // ✅ 추가
import Watch from "./pages/StreamDetail/WatchPage";
import SearchResultPage from "./pages/search/SearchResultPage";
import LikedPage from "./pages/user/LikedPage"; // ✅ 추가
import MyPage from "./pages/user/MyPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><MainPage /></Layout>} />
        <Route path="/weeklyschedule" element={<Layout><WeeklySchedule /></Layout>} />
        <Route path="/tictoc" element={<Layout><Tictoc /></Layout>} /> {/* ✅ 추가된 라우트 */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/videotest" element={<Layout><VideoTest /></Layout>} /> {/* ✅ 테스트용 추가 */}
        <Route path="/watch" element={<Layout><Watch/></Layout>} /> {/* ✅ 테스트용 추가 */}
        <Route path="/watch/:liveId" element={<Layout><Watch/></Layout>} /> {/* ✅ liveId 파라미터를 받아오도록 수정 */}
        <Route path="/search" element={<Layout><SearchResultPage /></Layout>} />
        <Route path="/liked" element={<Layout><LikedPage /></Layout>} /> {/* ✅ 찜한 방송 페이지 */}
        <Route path="/mypage" element={<Layout><MyPage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
