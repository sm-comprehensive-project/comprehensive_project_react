// src/components/HeroBanner.tsx

"use client";

import React from "react";
import { Box, Container, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

// HeroBanner에서 사용하는 Recommendation 타입
export type Recommendation = {
  liveId: string;
  title: string;
  thumbnail: string;
  liveUrl: string;
  platform: string;
  sellerInfo: {
    name: string;
    image: string;
    url: string;
  };
};

export type User = {
  email: string;
  nickname: string;
};

interface HeroBannerProps {
  user: User | null;
  recommendedItem: Recommendation | null;
  loading: boolean; // 로딩 중 여부
}

const HeroBanner: React.FC<HeroBannerProps> = ({ user, recommendedItem, loading }) => {
  console.log("[HeroBanner] 렌더링 → user:", user, "recommendedItem:", recommendedItem, "loading:", loading);

  return (
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
          {/* ─────────── 왼쪽: 추천 방송 제목 + 버튼 ─────────── */}
          <Box sx={{ maxWidth: { xs: "100%", md: "50%" }, mb: { xs: 4, md: 0 } }}>
            {loading ? (
              // ─── 로딩 중인 경우 ───
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CircularProgress size={32} color="inherit" />
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  추천 방송 정보를 불러오는 중...
                </Typography>
              </Box>
            ) : recommendedItem ? (
              // ─── 추천 방송이 준비된 경우 ───
              <>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "800",
                    mb: 2,
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    lineHeight: 1.1,
                  }}
                >
                  {recommendedItem.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: "400",
                    opacity: 0.9,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.5,
                  }}
                >
                  지금 바로 시청하고, 특별한 혜택을 놓치지 마세요!
                </Typography>
                <Button
                  component={Link}
                  to={`/watch/${recommendedItem.liveId}`}
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
                  🎥 방송 보러가기
                </Button>
              </>
            ) : (
              // ─── 추천 방송이 없을 때(loading=false & recommendedItem=null) ───
              <>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "800",
                    mb: 2,
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    lineHeight: 1.1,
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
                    lineHeight: 1.5,
                  }}
                >
                  지금 라이브로 쇼핑하고 특별한 혜택을 받아보세요!
                  <br />
                  다양한 브랜드의 실시간 라이브 방송을 한 곳에서 만나보세요.
                </Typography>
                <Button
                  component={Link}
                  to="/"
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
                  🎥 라이브 보러가기
                </Button>
              </>
            )}
          </Box>

          {/* ───── 오른쪽: 썸네일 영역 ───── */}
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              height: { xs: "200px", sm: "250px", md: "300px" },
              position: "relative",
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255,255,255,0.3)",
              overflow: "hidden",
            }}
          >
            {recommendedItem ? (
              <>
                <img
                  src={recommendedItem.thumbnail}
                  alt="추천 썸네일"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    // 필요하다면 fallback 이미지 처리
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    backgroundColor: "rgba(255,87,34,0.9)",
                    color: "white",
                    px: 2,
                    py: "4px",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  추천
                </Box>
              </>
            ) : (
              <Typography variant="h5" sx={{ color: "white", fontWeight: "500" }}>
                라이브 쇼핑 배너
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroBanner;
