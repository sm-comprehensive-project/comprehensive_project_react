// src/components/live/LiveNowSection.tsx
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LiveModal from "./LiveModal";

interface LiveStream {
  title: string;
  channel: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  platform: string;
  productUrl: string;
  streamUrl: string;
  streamUrl2?: string;
  streamUrl3?: string;
  streamUrl4?: string;
}

interface LiveNowSectionProps {
  data: LiveStream[];
}

const HorizontalCard = ({ stream }: { stream: LiveStream }) => (
  <Card sx={{ display: "flex", gap: 2, width: 360, boxShadow: 3, padding: 1 }}>
    <CardMedia
      component="img"
      sx={{ width: 140, borderRadius: 2 }}
      image={stream.thumbnail}
      alt={stream.title}
    />
    <CardContent sx={{ flex: 1 }}>
      <Typography variant="subtitle2" color="#FF5722" fontWeight="bold">
        🔴 LIVE · {stream.viewers.toLocaleString()}명 시청 중
      </Typography>
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        {stream.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {stream.channel} · {stream.platform}
      </Typography>
      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          component={Link}
          target="_blank"
          to={stream.streamUrl}
          sx={{ color: "#FF5722", borderColor: "#FF5722" }}
        >
          새탭방송
        </Button>
        <Button
          variant="contained"
          size="small"
          href={stream.productUrl}
          target="_blank"
          sx={{ backgroundColor: "#FF5722" }}
        >
          구매하기
        </Button>
      </Box>
    </CardContent>
  </Card>
);

const LiveNowSection = ({ data }: LiveNowSectionProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 4 }}>
      {/* 🔥 가로형 카드 (1) */}
      <Box sx={{ position: "relative" }}>
        <Typography variant="h6" fontWeight="bold" mb={1} ml={1}>
          🔥 가로형 카드
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
          {data.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={{ px: 1 }}>
                <HorizontalCard stream={item} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 세로형 카드 */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={1} ml={1}>
          🔲 세로형 카드
        </Typography>
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          style={{ padding: "0 16px" }}
        >
          {data.map((item, idx) => (
            <SwiperSlide key={idx} style={{ width: 240, flexShrink: 0 }}>
              <Card sx={{ width: 240, boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={item.thumbnail}
                  alt={item.title}
                />
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="#FF5722"
                    fontWeight="bold"
                  >
                    🔴 {item.viewers.toLocaleString()}명 시청 중
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.channel} · {item.platform}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <LiveModal
                      streamTitle={item.title}
                      streamUrl={item.streamUrl2 || item.streamUrl}
                      buttonLabel="방송 볼래말래"
                    />
                    <Button
                      variant="contained"
                      size="small"
                      href={item.productUrl}
                      target="_blank"
                      sx={{ backgroundColor: "#FF5722" }}
                    >
                      구매하러 가기
                    </Button>
                  </Box>
                </CardContent>
              </Card>
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
