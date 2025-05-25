"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Box, Typography, Container, Paper, Button, } from "@mui/material"
import LiveNowSection from "../../components/live/LiveNowSection.tsx"
import UpcomingStreamsSection from "../../components/live/UpcomingStreamsSection.tsx"
import EventBanner from "../../components/EventBanner.tsx"
import ProductGrid from "../../components/product/ProductGrid.tsx"
//import LiveNowSection2 from "../../components/live/LiveNowSection2.tsx"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import HeroBanner from "../../components/HeroBanner";
import LiveNowRecommendSection from "../../components/recommend/LiveNowRecommendSection.tsx"

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
  //const theme = useTheme()
  //const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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
      <HeroBanner />

      {/* 실시간 추천 방송 */}
      <SectionWrapper>
        <SectionTitle icon="🔥" title="지금 실시간 방송" />
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            p: { xs: 2, sm: 3 },
          }}
        >
          <LiveNowRecommendSection />
        </Paper>
      </SectionWrapper>

      {/* 실시간 인기 방송 */}
      <SectionWrapper bgColor="#f8f9fa">
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

export default MainPage;
