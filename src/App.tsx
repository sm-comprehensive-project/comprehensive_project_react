// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import StreamDetail from "./pages/StreamDetail";
import StreamDetail2 from "./pages/StreamDetail2";
import StreamDetail3 from "./pages/StreamDetail3";
import StreamDetail4 from "./pages/StreamDetail4";
import WeeklySchedule from "./pages/WeeklySchedule";
import StreamPopup2 from "./pages/StreamPopup2";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Layout이 필요한 페이지는 여기서 감싸줌 */}
        <Route path="/" element={<Layout><MainPage /></Layout>} />
        <Route path="/stream" element={<Layout><StreamDetail /></Layout>} />
        <Route path="/stream2" element={<Layout><StreamDetail2 /></Layout>} />
        <Route path="/stream3" element={<Layout><StreamDetail3 /></Layout>} />
        <Route path="/stream4" element={<Layout><StreamDetail4 /></Layout>} />
        <Route path="/weeklyschedule" element={<Layout><WeeklySchedule /></Layout>} />

        {/* =============================================================================== */}
        <Route path="/streampopup2" element={<StreamPopup2 />} />
      </Routes>
    </Router>
  );
};

export default App;
