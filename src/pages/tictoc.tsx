// src/pages/LivePage.tsx
import React, { useState, useEffect } from "react";
import { Tv, Clock, Star, Heart } from "lucide-react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";

// API에서 받아오는 라이브 방송 아이템 타입
interface LiveItem {
  id: string;
  title: string;
  liveUrl: string;
  channelUrl: string;
  thumbnail: string;
  seller: string;
  platform: "tiktok" | string;
  createdAt: string;
  category: string;
}

// 페이지 컴포넌트
const LivePage: React.FC = () => {
  // 탭 값: "all" 혹은 실제 카테고리와 동일하게 설정
  const [tabValue, setTabValue] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [liveList, setLiveList] = useState<LiveItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 탭 변경 핸들러
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // 찜 토글 핸들러
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id];
      console.log("❤️ 찜 목록 갱신됨:", updated);
      return updated;
    });
  };

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const fetchLiveData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8088/tiktok"); // API 엔드포인트
        const data: LiveItem[] = await res.json();
        setLiveList(data);
      } catch (err) {
        console.error("라이브 데이터 조회 실패:", err);
        setLiveList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveData();
  }, []);

  // 현재 탭 기준 필터링 (tabValue === "all" 이면 전체, 아니면 카테고리 일치)
  const filteredData =
    tabValue === "all" ? liveList : liveList.filter((item) => item.category === tabValue);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f8f8" }}>
      {/* 상단 배너 */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FE2C55 0%, #00F2EA 150%)",
          py: { xs: 4, md: 6 },
          color: "white",
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Tv style={{ marginRight: 8 }} />
            <Typography variant="h4" fontWeight="bold">
              틱톡 라이브
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            인기 틱톡 크리에이터들의 라이브 방송을 시청하고 특별한 혜택을 받아보세요.
          </Typography>
        </Box>
      </Box>

      {/* 탭 (카테고리) */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": { backgroundColor: "#FE2C55" },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
              color: "#666",
              "&.Mui-selected": {
                color: "#FE2C55",
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab value="all" label="전체" />
          <Tab value="패션의류" label="패션의류" />
          <Tab value="패션잡화" label="패션잡화" />
          <Tab value="식품" label="식품" />
          <Tab value="화장품_미용" label="화장품/미용" />
          <Tab value="디지털_인테리어" label="디지털/인테리어" />
          <Tab value="생활_편의" label="생활/편의" />
        </Tabs>

        {/* 로딩 중 표시 */}
        {loading ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress size={24} />
          </Box>
        ) : filteredData.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="text.secondary">
              현재 진행 중인 라이브 방송이 없습니다.
            </Typography>
          </Box>
        ) : (
          /* 카드 리스트 */
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            {filteredData.map((item) => (
              <Card key={item.id} sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 220,
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Badge label="LIVE" color="#FE2C55" />
                  </Box>
                  <Box sx={viewerStyle}>
                    {/* createdAt을 방송 시간으로 표시 */}
                    {new Date(item.createdAt).toLocaleTimeString()} 방송
                  </Box>
                  <Box sx={durationStyle}>
                    <Clock size={14} style={{ marginRight: 4 }} />
                    {/* duration 정보가 없으므로 생략 */}
                    —
                  </Box>
                </Box>

                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{
                      height: "2.8rem",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 1,
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Tv size={14} style={{ marginRight: 4, color: "#666" }} />
                    <Typography variant="body2" color="text.secondary">
                      {item.seller}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Star size={16} style={{ color: "#FFB400", marginRight: 4 }} />
                      {/* 평점/리뷰 정보 없음 */}
                      <Typography variant="body2">—</Typography>
                    </Box>
                    <IconButton
                      onClick={() => toggleFavorite(item.id)}
                      sx={{
                        color: favorites.includes(item.id) ? "#FE2C55" : "#999",
                      }}
                    >
                      <Heart
                        size={20}
                        fill={favorites.includes(item.id) ? "#FE2C55" : "none"}
                      />
                    </IconButton>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={watchButtonStyle}
                    onClick={() => window.open(item.liveUrl, "_blank")}
                  >
                    방송 보러 가기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// 공통 컴포넌트: 배지
const Badge = ({ label, color }: { label: string; color: string }) => (
  <Box
    sx={{
      backgroundColor: color,
      color: "white",
      fontWeight: "bold",
      fontSize: "0.75rem",
      borderRadius: "4px",
      px: 1.5,
      py: 0.5,
    }}
  >
    {label}
  </Box>
);

// 시청자/방송 시간 스타일
const viewerStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "white",
  borderRadius: "4px",
  px: 1,
  py: 0.5,
  fontSize: "0.75rem",
  display: "flex",
  alignItems: "center",
};

const durationStyle = {
  position: "absolute",
  bottom: 10,
  left: 10,
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "white",
  borderRadius: "4px",
  px: 1,
  py: 0.5,
  fontSize: "0.75rem",
  display: "flex",
  alignItems: "center",
};

const watchButtonStyle = {
  backgroundColor: "#FE2C55",
  color: "white",
  textTransform: "none",
  fontWeight: 600,
  py: 1,
  "&:hover": {
    backgroundColor: "#E61E4D",
  },
};

export default LivePage;
