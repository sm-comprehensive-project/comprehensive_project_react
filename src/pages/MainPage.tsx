// src/pages/MainPage.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import LiveNowSection from "../components/LiveNowSection.tsx";
import UpcomingStreamsSection from "../components/UpcomingStreamsSection.tsx";
import EventBanner from "../components/EventBanner.tsx";
import ProductGrid from "../components/ProductGrid.tsx";

const MainPage: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", padding: 2 }}>

      {/* 실시간 인기 방송 */}
      <Box sx={{ padding: "30px 20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF6D00", mb: 2 }}>
          🔥 실시간 인기 방송
        </Typography>
        <LiveNowSection />
      </Box>

      {/* 예정된 방송 */}
      <Box sx={{ padding: "30px 20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF6D00", mb: 2 }}>
          📅 오늘의 라이브 예정
        </Typography>
        <UpcomingStreamsSection />
      </Box>

      {/* 이벤트 배너 */}
      <Box sx={{ padding: "30px 20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF6D00", mb: 2 }}>
          💥 이벤트 & 프로모션
        </Typography>
        <EventBanner />
      </Box>

      {/* 추천 상품 피드 */}
      <Box sx={{ padding: "30px 20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF6D00", mb: 2 }}>
          🛍️ 추천 상품
        </Typography>
        <ProductGrid />
      </Box>

    </Box>
  );
};

export default MainPage;
