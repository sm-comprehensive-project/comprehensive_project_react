import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* 사이드바 (고정) */}
      <Box sx={{ width: "250px", backgroundColor: "#1e1e1e", color: "white", flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* 메인 컨텐츠 영역 */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* 헤더 (고정) */}
        <Box sx={{ height: "60px", backgroundColor: "#111", color: "white", flexShrink: 0 }}>
          <Header />
        </Box>

        {/* 메인 콘텐츠 (스크롤 가능) */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", backgroundColor: "#000", padding: 3 }}>
          <MainContent />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
