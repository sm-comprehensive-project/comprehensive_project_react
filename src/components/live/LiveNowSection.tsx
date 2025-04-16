// src/components/live/LiveNowSection.tsx
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SellerInfo {
  name: string;
  url: string;
  image: string;
}

interface LiveDataRaw {
  liveId: string;
  title: string;
  live: boolean;
  platform: string;
  sellerInfo: SellerInfo;
  thumbnail: string;
  liveUrl: string;
}

interface Props {
  data: LiveDataRaw[];
}

const BroadcastCard = ({ live }: { live: LiveDataRaw }) => {
  return (
    <Card sx={{ width: 360, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="320"
        image={live.thumbnail || "/images/streams/thumbnail.webp"}
        alt={live.title}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/images/streams/thumbnail.webp";
        }}
      />

      <CardContent>
        <Typography variant="subtitle2" color="#FF5722" fontWeight="bold">
          {live.platform.toUpperCase()} 방송
        </Typography>
        <Typography variant="body1" fontWeight="bold" gutterBottom>
          {live.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          판매자: {live.sellerInfo?.name ?? "정보 없음"}
        </Typography>
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            href={live.liveUrl || "#"}
            target="_blank"
            sx={{ borderColor: "#FF5722", color: "#FF5722" }}
          >
            방송 보기
          </Button>
          <Button
            variant="contained"
            href={
              !live.sellerInfo?.url || live.sellerInfo.url === "URL 없음"
                ? "#"
                : live.sellerInfo.url
            }
            target="_blank"
            sx={{ backgroundColor: "#FF5722" }}
          >
            판매자 페이지
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};


const LiveNowSection = ({ data }: Props) => {
  console.log("라이브 요약 데이터 개수:", data.length);

  const uniqueLives = Object.values(
    data.reduce((acc, cur) => {
      if (!acc[cur.liveId]) acc[cur.liveId] = cur;
      return acc;
    }, {} as { [key: string]: LiveDataRaw })
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 4 }}>
      <Box sx={{ position: "relative" }}>
        <Typography variant="h6" fontWeight="bold" mb={1} ml={1}>
          🔥 방송 카드
        </Typography>
        <Box className="swiper-button-prev-1" sx={navStyle}>
          <ArrowBackIosIcon sx={{ fontSize: 18, ml: "7px" }} />
        </Box>
        <Box className="swiper-button-next-1" sx={navStyleRight}>
          <ArrowForwardIosIcon fontSize="small" />
        </Box>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev-1",
            nextEl: ".swiper-button-next-1",
          }}
          spaceBetween={24}
          slidesPerView={3}
          style={{ padding: "0 16px" }}
        >
          {uniqueLives.map((live) => (
            <SwiperSlide key={live.liveId}>
              <Box sx={{ px: 1 }}>
                <BroadcastCard live={live} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

const navStyle = {
  position: "absolute",
  top: "50%",
  left: 8,
  transform: "translateY(-50%)",
  zIndex: 10,
  backgroundColor: "rgba(0,0,0,0.5)",
  color: "white",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
  "&::after": {
    display: "none",
  },
};

const navStyleRight = {
  ...navStyle,
  left: "auto",
  right: 8,
};

export default LiveNowSection;
