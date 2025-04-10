// src/App.tsx
import React from "react";
import './i18n'; // ✅ 추가
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/mainpage/MainPage";
import MainPage2 from "./pages/mainpage/MainPage2";
import StreamDetail from "./pages/StreamDetail/StreamDetail";
import StreamDetail2 from "./pages/StreamDetail/StreamDetail2";
import StreamDetail3 from "./pages/StreamDetail/StreamDetail3";
import StreamDetail4 from "./pages/StreamDetail/StreamDetail4";
import WeeklySchedule from "./pages/schedule/WeeklySchedule";
import StreamPopup2 from "./pages/StreamDetail/StreamPopup2";
import LoginPage from "./pages/user/LoginPage";
import AuthPage from "./pages/user/AuthPage";
import DailySchedulePage from "./pages/schedule/DailySchedulePage";
import DailySchedulePage2 from "./pages/schedule/DailySchedulePage2";
import DailySchedulePage3 from "./pages/schedule/DailySchedulePage3";
import DailySchedulePage4 from "./pages/schedule/DailySchedulePage4";
import DailySchedulePage5 from "./pages/schedule/DailySchedulePage5";
import DailySchedulePage6 from "./pages/schedule/DailySchedulePage6";
import TestPage from "./pages/test"; // ✅ 여기 수정

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Layout이 필요한 페이지 */}
        <Route path="/" element={<Layout><MainPage /></Layout>} />
        <Route path="/mainpage2" element={<Layout><MainPage2 /></Layout>} />
        <Route path="/stream" element={<Layout><StreamDetail /></Layout>} />
        <Route path="/stream2" element={<Layout><StreamDetail2 /></Layout>} />
        <Route path="/stream3" element={<Layout><StreamDetail3 /></Layout>} />
        <Route path="/stream4" element={<Layout><StreamDetail4 /></Layout>} />
        <Route path="/weeklyschedule" element={<Layout><WeeklySchedule /></Layout>} />
        <Route path="/dailyschedule" element={<Layout><DailySchedulePage /></Layout>} />
        <Route path="/dailyschedule2" element={<Layout><DailySchedulePage2 /></Layout>} />
        <Route path="/dailyschedule3" element={<Layout><DailySchedulePage3 /></Layout>} />
        <Route path="/dailyschedule4" element={<Layout><DailySchedulePage4 /></Layout>} />
        <Route path="/dailyschedule5" element={<Layout><DailySchedulePage5 /></Layout>} />
        <Route path="/dailyschedule6" element={<Layout><DailySchedulePage6 /></Layout>} />

        {/* ✅ 레이아웃 없이 보여야 하는 페이지 */}
        <Route path="/streampopup2" element={<StreamPopup2 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/test" element={<TestPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
