// src/components/LiveNowSection.tsx
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

const liveStream = {
  title: "[톡딜가+5천원쿠폰] 뽀송뽀송함의 비밀 신발건조기",
  channel: "감성전자",
  viewers: 1234,
  thumbnail:
    "https://img1.kakaocdn.net/thumb/C560x560.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fshoppingstore%2Fproduct%2F20250226164406_af5882d3f85d42089cbb777d59df14bb.jpg",
  isLive: true,
  platform: "kakao",
  productUrl:
    "https://store.kakao.com/gamsunge/products/402101602?refLiveId=40583",
  streamUrl: "/stream",
  streamUrl2: "/streampopup2",
  streamUrl3: "/stream3",
  streamUrl4: "/stream4",
};

const dummyList1 = Array(10).fill(liveStream);
const dummyList2 = Array(10).fill(liveStream);
const dummyList3 = Array(10).fill(liveStream);

const HorizontalCard = ({ stream }: { stream: typeof liveStream }) => (
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

const LiveNowSection = () => {
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
          {dummyList1.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={{ px: 1 }}>
                <HorizontalCard stream={item} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 🔥 가로형 카드 배경 (2) */}
      <Box sx={cardWrapper}>
        <Typography variant="h6" fontWeight="bold" mb={2} ml={1}>
          🔥 가로형 카드
        </Typography>
        <Box className="swiper-button-prev-2" sx={navStyle}>
          <ArrowBackIosIcon sx={{ fontSize: 18, ml: "13px" }} />
        </Box>
        <Box className="swiper-button-next-2" sx={navStyleRight}>
          <ArrowForwardIosIcon fontSize="small" />
        </Box>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev-2",
            nextEl: ".swiper-button-next-2",
          }}
          spaceBetween={24}
          slidesPerView={3}
          style={{ padding: 0 }}
        >
          {dummyList1.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={{ px: 1 }}>
                <HorizontalCard stream={item} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 🔲 세로형 카드 */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={1} ml={1}>
          🔲 세로형 카드
        </Typography>
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          style={{ padding: "0 16px" }}
        >
          {dummyList2.map((item, idx) => (
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
                      streamUrl={item.streamUrl2}
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

      {/* 🖼️ 배너형 카드 (3) */}
      <Box sx={cardWrapper}>
        <Typography variant="h6" fontWeight="bold" mb={2} ml={1}>
          🖼️ 배너형 카드
        </Typography>
        <Box className="swiper-button-prev-3" sx={navStyle}>
          <ArrowBackIosIcon sx={{ fontSize: 18, ml: "7px" }} />
        </Box>
        <Box className="swiper-button-next-3" sx={navStyleRight}>
          <ArrowForwardIosIcon fontSize="small" />
        </Box>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev-3",
            nextEl: ".swiper-button-next-3",
          }}
          spaceBetween={24}
          slidesPerView={1}
          style={{ padding: "0 16px" }}
        >
          {dummyList3.map((item, idx) => (
            <SwiperSlide
              key={idx}
              style={{ width: "100%", boxSizing: "border-box" }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  backgroundImage: `url(${item.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 3,
                  padding: 3,
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: 3,
                  position: "relative",
                  overflow: "hidden",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    🔴 LIVE · {item.viewers.toLocaleString()}명 시청 중
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="caption">
                    {item.channel} · {item.platform}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    component={Link}
                    to={item.streamUrl}
                    sx={{
                      color: "white",
                      borderColor: "white",
                      px: 2,
                      minWidth: 100,
                    }}
                  >
                    방송 보러가기
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    href={item.productUrl}
                    target="_blank"
                    sx={{ backgroundColor: "#FF5722", px: 2, minWidth: 80 }}
                  >
                    구매하기
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

// ✅ 스타일 공통화
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

const cardWrapper = {
  position: "relative",
  backgroundColor: "#f5f5f5",
  borderRadius: 3,
  p: 3,
  boxShadow: 2,
  mb: 4,
};

export default LiveNowSection;
