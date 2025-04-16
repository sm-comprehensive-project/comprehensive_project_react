// src/components/live/LiveNowSection2.tsx
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Avatar,
  Link,
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

const getPlatformColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "kakao":
      return "#FEE500";
    case "naver":
      return "#03C75A";
    case "11st":
    case "11번가":
      return "#FF0000";
    default:
      return "#FF5722";
  }
};

const BroadcastCard = ({ live }: { live: LiveDataRaw }) => {
  const hasSellerUrl = !!live.sellerInfo?.url && live.sellerInfo.url !== "URL 없음";

  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={live.thumbnail || "/images/streams/thumbnail.webp"}
        alt={live.title}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/images/streams/thumbnail.webp";
        }}
      />
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="caption"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: getPlatformColor(live.platform),
          }}
        >
          📺 {live.platform.toUpperCase()} 방송
        </Typography>

        <Typography
          variant="body2"
          fontWeight="bold"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {live.title.replace(/\n/g, " ")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1.5,
          }}
        >
          {hasSellerUrl ? (
            <Link
              href={live.sellerInfo.url}
              target="_blank"
              underline="none"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  color: "#FF5722",
                },
                cursor: "pointer",
              }}
            >
              <Avatar
                src={live.sellerInfo.image}
                alt={live.sellerInfo.name}
                sx={{ width: 24, height: 24 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/default_seller.png";
                }}
              />
              <Typography variant="body2" noWrap>
                {live.sellerInfo.name ?? "정보 없음"}
              </Typography>
            </Link>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#999" }}>
              <Avatar
                src={live.sellerInfo.image}
                alt={live.sellerInfo.name}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="body2" noWrap>
                {live.sellerInfo.name ?? "정보 없음"}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Link
            href={live.liveUrl || "#"}
            target="_blank"
            underline="always"
            color="#FF5722"
            fontWeight="bold"
            fontSize={14}
          >
            👉 방송 바로가기
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

const LiveNowSection2 = ({ data }: Props) => {
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
          🔥 방송 카드 v2
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
          spaceBetween={20}
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
};

const navStyleRight = {
  ...navStyle,
  left: "auto",
  right: 8,
};

export default LiveNowSection2;
