import type React from "react"
import { Box, CssBaseline } from "@mui/material"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline /> {/* 브라우저 기본 마진/패딩 초기화 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          margin: 0,
          padding: 0,
          width: "100%",
          maxWidth: "100%",
          // overflow: "hidden", // 혹시 모를 오버플로우 방지
        }}
      >
        <Header />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            pt: "64px", // ✅ 수정: paddingTop 추가
            transition: "all 0.3s ease",
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: 0,
              margin: 0,
              padding: 0,
            }}
          >
            {children}
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "#FFF3E0", mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Layout
