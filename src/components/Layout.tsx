// src/components/Layout.tsx
import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header /> {/* 고정이 아닌 흐름 속에 들어감 */}

<Box
  sx={{
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    px: "5vw",         // 양 옆 여백 비율로
    pt: 0,             // 위 여백 제거
    transition: "all 0.3s ease",
  }}
>
  <Box
    sx={{
      width: "100%",
      maxWidth: "1200px",
      backgroundColor: "#fff",
      borderRadius: 0,
      padding: 3,
      boxShadow: 10,
    }}
  >
    {children}
  </Box>
</Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#FFF3E0", mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
