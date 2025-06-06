// src/components/HeroBanner.tsx

"use client";

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

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
}

const HeroBanner: React.FC<HeroBannerProps> = ({ user, recommendedItem }) => {
  // 디버깅용 console.log 추가
  console.log("[HeroBanner] 렌더링 → user:", user, "recommendedItem:", recommendedItem);

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
          {/* 왼쪽: 텍스트 / 버튼 */}
          <Box sx={{ maxWidth: { xs: "100%", md: "50%" }, mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h2"
              sx={{ fontWeight: "800", mb: 2, fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
            >
              DAMOA 라이브 쇼핑
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 1, fontWeight: "400", opacity: 0.9, fontSize: { xs: "1rem", sm: "1.1rem" } }}
            >
              지금 라이브로 쇼핑하지마 특별한 혜택을 받아보세요!
              <br />
              다양한 브랜드의 실시간 라이브 방송을 한 곳에서 만나보세요.
            </Typography>
            {user && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, mt: 2, mb: 2, fontSize: "1.05rem" }}
              >
                {recommendedItem
                  ? `${user.nickname} 님 맞춤 방송`
                  : `${user.nickname} 님을 위한 라이브 쇼핑`}
              </Typography>
            )}
            <Button
              variant="contained"
              size="large"
              href={recommendedItem?.liveUrl ?? "/"}
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
              🎥 {recommendedItem?.title ?? "라이브 보러가기"}
            </Button>
          </Box>

          {/* 오른쪽: 썸네일 영역 */}
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
                    // (e.target as HTMLImageElement).src = "/images/placeholder.png";
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
