import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";

// 더미 데이터
const dummyLiveData = [
  {
    id: 1,
    title: "[fkfkfk] 봄맞이 패션 아이템 특가전",
    viewers: 1250,
    duration: "01:23:45",
    channel: "DAMOA 패션",
    thumbnail: "/images/fashion-live-stream.png",
    isHot: true,
    category: "패션",
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 2,
    title: "[라이브] 프리미엄 스킨케어 브랜드 론칭 방송",
    viewers: 980,
    duration: "00:45:30",
    channel: "DAMOA 뷰티",
    thumbnail: "/images/beauty-live-stream.png",
    isHot: false,
    category: "뷰티",
    rating: 4.6,
    reviews: 85,
  },
  {
    id: 3,
    title: "[라이브] 건강한 식단을 위한 유기농 식품 기획전",
    viewers: 750,
    duration: "00:30:15",
    channel: "DAMOA 푸드",
    thumbnail: "/images/food-live-stream.png",
    isHot: true,
    category: "푸드",
    rating: 4.9,
    reviews: 95,
  },
  {
    id: 4,
    title: "[라이브] 인테리어 소품 모음전 - 봄 시즌 특집",
    viewers: 620,
    duration: "01:05:20",
    channel: "DAMOA 라이프",
    thumbnail: "/images/interior-live-stream.png",
    isHot: false,
    category: "라이프",
    rating: 4.7,
    reviews: 65,
  },
];

const LivePage = () => {
  const [tabValue, setTabValue] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id];
      console.log("❤️ 찜 목록 갱신됨:", updated);
      return updated;
    });
  };

  const getCategoryFromTab = (tab: string) => {
    switch (tab) {
      case "fashion":
        return "패션";
      case "beauty":
        return "뷰티";
      case "food":
        return "푸드";
      case "life":
        return "라이프";
      case "travel":
        return "여행/체험";
      case "kids":
        return "키즈";
      case "tech":
        return "테크";
      case "hobby":
        return "취미레저";
      default:
        return "";
    }
  };

  const filteredData =
    tabValue === "all"
      ? dummyLiveData
      : dummyLiveData.filter(
          (item) => item.category === getCategoryFromTab(tabValue)
        );

  console.log("📺 현재 선택된 탭:", tabValue);
  console.log("🎯 필터링된 방송 수:", filteredData.length);

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
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Tv style={{ marginRight: 8 }} />
            <Typography variant="h4" fontWeight="bold">
              틱톡 라이브
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            인기 틱톡 크리에이터들의 라이브 방송을 시청하고 특별한 혜택을
            받아보세요.
          </Typography>
        </Box>
      </Box>

      {/* 탭 */}
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 2, py: 3 }}>
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
          <Tab value="fashion" label="패션" />
          <Tab value="beauty" label="뷰티" />
          <Tab value="food" label="푸드" />
          <Tab value="life" label="라이프" />
          <Tab value="travel" label="여행/체험" />
          <Tab value="kids" label="키즈" />
          <Tab value="tech" label="테크" />
          <Tab value="hobby" label="취미레저" />
        </Tabs>

        {/* 카드 리스트 */}
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
            <Card
              key={item.id}
              sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
            >
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
                  {item.isHot && <Badge label="HOT" color="#FF9500" />}
                </Box>
                <Box sx={viewerStyle}>
                  {item.viewers.toLocaleString()}명 시청 중
                </Box>
                <Box sx={durationStyle}>
                  <Clock size={14} style={{ marginRight: 4 }} />
                  {item.duration}
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
                    {item.channel}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Star
                      size={16}
                      style={{ color: "#FFB400", marginRight: 4 }}
                    />
                    <Typography variant="body2">
                      {item.rating} ({item.reviews})
                    </Typography>
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

                <Link to="/watch">
                  <Button fullWidth variant="contained" sx={watchButtonStyle}>
                    시청하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Box>

        {tabValue === "beauty" && filteredData.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="text.secondary">
              현재 진행 중인 뷰티 라이브 방송이 없습니다.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// 공통 컴포넌트
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
