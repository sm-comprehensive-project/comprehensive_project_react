"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Box, Typography, Container, Paper, Button, useTheme, useMediaQuery } from "@mui/material"
import LiveNowSection from "../../components/live/LiveNowSection.tsx"
import UpcomingStreamsSection from "../../components/live/UpcomingStreamsSection.tsx"
import EventBanner from "../../components/EventBanner.tsx"
import ProductGrid from "../../components/product/ProductGrid.tsx"
import LiveNowSection2 from "../../components/live/LiveNowSection2.tsx"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

interface SellerInfo {
  name: string
  url: string
  image: string
}

interface LiveDataRaw {
  liveId: string
  title: string
  live: boolean
  platform: string
  sellerInfo: SellerInfo
  thumbnail: string
  liveUrl: string
}

// 섹션 제목 컴포넌트
const SectionTitle: React.FC<{ icon: string; title: string; viewAll?: boolean }> = ({
  icon,
  title,
  viewAll = true,
}) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
    <Typography
      variant="h5"
      sx={{
        fontWeight: "700",
        color: "#FF5722",
        display: "flex",
        alignItems: "center",
        fontSize: { xs: "1.2rem", sm: "1.5rem" },
      }}
    >
      <Box component="span" sx={{ mr: 1, fontSize: { xs: "1.3rem", sm: "1.6rem" } }}>
        {icon}
      </Box>
      {title}
    </Typography>
    {viewAll && (
      <Button
        endIcon={<ArrowForwardIcon />}
        sx={{
          color: "#757575",
          textTransform: "none",
          fontWeight: "500",
          "&:hover": {
            backgroundColor: "transparent",
            color: "#FF5722",
          },
        }}
      >
        더보기
      </Button>
    )}
  </Box>
)

// 섹션 래퍼 컴포넌트
const SectionWrapper: React.FC<{ children: React.ReactNode; bgColor?: string }> = ({
  children,
  bgColor = "#ffffff",
}) => (
  <Box
    sx={{
      backgroundColor: bgColor,
      py: { xs: 4, md: 6 },
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Container maxWidth="lg">{children}</Container>
  </Box>
)

const MainPage: React.FC = () => {
  const [liveData, setLiveData] = useState<LiveDataRaw[]>([])
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    fetch("http://localhost:8080/damoa/live/summary")
      .then((res) => res.json())
      .then((json: LiveDataRaw[]) => {
        setLiveData(json)
      })
      .catch((err) => console.error("에러 발생:", err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>

      {/* 히어로 배너 */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #ff5722 0%, #62caf0 100%)",
          py: { xs: 6, md: 10 },
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ maxWidth: { xs: "100%", md: "50%" }, mb: { xs: 4, md: 0 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "800",
                  mb: 2,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                DAMOA 라이브 쇼핑
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: "400",
                  opacity: 0.9,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                }}
              >
                지금 라이브로 쇼핑하고 특별한 혜택을 받아보세요!
                <br />
                다양한 브랜드의 실시간 라이브 방송을 한 곳에서 만나보세요.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "#FF5722",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                  },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                라이브 보러가기
              </Button>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "45%" },
                height: { xs: "200px", sm: "250px", md: "300px" },
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <Typography variant="h5" sx={{ color: "white", fontWeight: "500" }}>
                라이브 쇼핑 배너
              </Typography>
            </Box>
          </Box>
        </Container>

        {/* 배경 장식 요소 */}
        <Box
          sx={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            top: "-100px",
            right: "-100px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            bottom: "-50px",
            left: "10%",
          }}
        />
      </Box>

      {/* 실시간 인기 방송 */}
      <SectionWrapper>
        <SectionTitle icon="🔥" title="실시간 인기 방송" />
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            p: { xs: 2, sm: 3 },
          }}
        >
          {!loading && <LiveNowSection data={liveData} />}
        </Paper>
      </SectionWrapper>

      {/* 실시간 인기 방송 2 */}
      <SectionWrapper bgColor="#f8f9fa">
        <SectionTitle icon="🔥" title="실시간 인기 방송 2" />
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            p: { xs: 2, sm: 3 },
          }}
        >
          {!loading && <LiveNowSection2 data={liveData} />}
        </Paper>
      </SectionWrapper>

      {/* 예정된 방송 */}
      <SectionWrapper>
        <SectionTitle icon="📅" title="오늘의 라이브 예정" />
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            p: { xs: 2, sm: 3 },
          }}
        >
          <UpcomingStreamsSection />
        </Paper>
      </SectionWrapper>

      {/* 이벤트 배너 */}
      <SectionWrapper bgColor="#f8f9fa">
        <SectionTitle icon="💥" title="이벤트 & 프로모션" />
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            p: { xs: 2, sm: 3 },
          }}
        >
          <EventBanner />
        </Paper>
      </SectionWrapper>

      {/* 추천 상품 피드 */}
      <SectionWrapper>
        <SectionTitle icon="🛍️" title="추천 상품" />
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            p: { xs: 2, sm: 3 },
          }}
        >
          <ProductGrid />
        </Paper>
      </SectionWrapper>

      
    </Box>
  )
}

export default MainPage
