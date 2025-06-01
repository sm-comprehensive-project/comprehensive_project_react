import { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";

type Recommendation = {
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

type User = {
  email: string;
  nickname: string;
};

const HeroBanner = () => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("🟡 HeroBanner 마운트됨");

    // 1. 사용자 정보 요청
    fetch("http://localhost:8088/api/user/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("👤 사용자 정보:", data);
        if (data.success && data.user) {
          setUser(data.user);

          // 2. 사용자 email로 추천 API 요청
          return fetch(`http://localhost:8088/api/user/recommendations/top?email=${data.user.email}`, {
            method: "GET",
            credentials: "include",
          });
        }
      })
      .then((res) => res?.json())
      .then((data) => {
        console.log("🎯 추천 응답:", data);
        if (data?.success && data.recommendation) {
          setRecommendation(data.recommendation);
        }
      })
      .catch((err) => {
        console.error("❌ 추천 방송 요청 실패:", err);
      });
  }, []);

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
          {/* 왼쪽 텍스트 영역 */}
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
                mb: 1,
                fontWeight: "400",
                opacity: 0.9,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              지금 라이브로 쇼핑하지마 특별한 혜택을 받아보세요!
              <br />
              다양한 브랜드의 실시간 라이브 방송을 한 곳에서 만나보세요.
            </Typography>

            {/* 사용자 이름 맞춤 추천 문구 */}
            {user && recommendation && (
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  mt: 2,
                  mb: 2,
                  fontSize: "1.05rem",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                {user.nickname} 님 맞춤 방송
              </Typography>
            )}

            {/* 추천 방송 버튼 */}
            {recommendation ? (
              <Button
                variant="contained"
                size="large"
                href={recommendation.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                🎥 {recommendation.title} 보러가기
              </Button>
            ) : (
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
            )}
          </Box>

          {/* 오른쪽 썸네일 영역 */}
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
            {recommendation ? (
              <>
                <img
                  src={recommendation.thumbnail}
                  alt="추천 썸네일"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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

      {/* 배경 장식 요소 */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
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
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          bottom: "-50px",
          left: "10%",
        }}
      />
    </Box>
  );
};

export default HeroBanner;
