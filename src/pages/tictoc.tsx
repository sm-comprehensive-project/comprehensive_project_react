import React, { useState, useEffect } from "react";
import { Tv, Clock, Heart } from "lucide-react";
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
  Container,
} from "@mui/material";

// 합쳐진 틱톡 로고+LIVE 이미지
import TikTokLiveBanner from "../assets/icon/tiktok-logo.png";

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

const LivePage: React.FC = () => {
  const [tabValue, setTabValue] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [liveList, setLiveList] = useState<LiveItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchLiveData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8088/tiktok");
        const data: LiveItem[] = await res.json();
        setLiveList(data);
      } catch {
        setLiveList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveData();
  }, []);

  const filteredData =
    tabValue === "all"
      ? liveList
      : liveList.filter((item) => item.category === tabValue);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f8f8" }}>
      {/* ───────── 상단 배너 ───────── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FE2C55 0%, #00F2EA 150%)",
          py: { xs: 4, md: 6 },
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* 좌측: 제목 + 설명 */}
            <Box>
              <Typography variant="h3" fontWeight="bold">
                틱톡 라이브
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                인기 틱톡 크리에이터들의 라이브 방송을 시청하고
                특별한 혜택을 받아보세요.
              </Typography>
            </Box>

            {/* 우측: 합쳐진 배너 이미지 (크기 확대 + 투명도) */}
            <Box
              component="img"
              src={TikTokLiveBanner}
              alt="틱톡 라이브 배너"
              sx={{
                width: { xs: 200, sm: 260, md: 320 },
                height: "auto",
                mt: { xs: 3, md: 0 },
                opacity: 0.6,   // 40% opacity
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* ───────── 탭 (카테고리) ───────── */}
      <Container maxWidth="lg" sx={{ px: 2, py: 3 }}>
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
              "&.Mui-selected": { color: "#FE2C55", fontWeight: 600 },
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

        {loading ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress size={32} />
          </Box>
        ) : filteredData.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="text.secondary">
              현재 진행 중인 라이브 방송이 없습니다.
            </Typography>
          </Box>
        ) : (
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
                  </Box>
                  <Box sx={durationStyle}>
                    <Clock size={14} style={{ marginRight: 4 }} />—
                  </Box>
                </Box>
                <CardContent sx={{ paddingBottom: 2 }}>
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tv size={14} style={{ marginRight: 4, color: "#666" }} />
                      <Typography variant="body2" color="text.secondary">
                        {item.seller}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => toggleFavorite(item.id)}
                      sx={{
                        color: favorites.includes(item.id)
                          ? "#FE2C55"
                          : "#999",
                      }}
                    >
                      <Heart
                        size={20}
                        fill={
                          favorites.includes(item.id) ? "#FE2C55" : "none"
                        }
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
      </Container>
    </Box>
  );
};

const Badge = ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => (
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
