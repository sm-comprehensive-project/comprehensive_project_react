import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Avatar,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Product {
  name: string;
  price: number;
  price_origin: number;
  discountRate: number;
  image: string;
}

interface SellerInfo {
  name: string;
  image: string;
}

interface LiveProduct {
  liveId: string;
  title: string;
  liveUrl: string;
  thumbnail: string;
  isLive: boolean;
  sellerInfo: SellerInfo;
  products: Product[];
}

const LiveNowRecommendSlider: React.FC = () => {
  const [liveList, setLiveList] = useState<LiveProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:8088/damoa/live?platform=kakao&isLive=true")
      .then((res) => res.json())
      .then((data) => {
        setLiveList(data.slice(0, 10)); // 상위 10개만 표시
      })
      .catch((err) => console.error("라이브 방송 불러오기 실패:", err));
  }, []);

  const detectPromotionBadge = (text: string): string | null => {
    if (/2\s*\+\s*1/.test(text)) return "2+1";
    if (/1\s*\+\s*1/.test(text)) return "1+1";
    return null;
  };

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.2}
      breakpoints={{
        600: { slidesPerView: 2 },
        960: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {liveList.map((item, idx) => {
        const product = item.products?.[0];
        const promoBadge =
          detectPromotionBadge(item.title) || (product && detectPromotionBadge(product.name));

        return (
          <SwiperSlide key={idx}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 2 }}>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={item.thumbnail}
                  alt={item.title}
                  sx={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    bgcolor: "#FF1744",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    borderRadius: 1,
                    px: 1,
                    py: 0.3,
                  }}
                >
                  LIVE
                </Box>
                {promoBadge && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "#00C853",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      borderRadius: 1,
                      px: 1,
                      py: 0.3,
                    }}
                  >
                    {promoBadge}
                  </Box>
                )}
              </Box>

              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 180,
                  p: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  {product?.discountRate ? (
                    <Box sx={{
                      bgcolor: "#1976d2",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      borderRadius: 1,
                      px: 1,
                      py: 0.3,
                    }}>
                      {product.discountRate}% OFF
                    </Box>
                  ) : null}
                </Box>

                <Box
                  sx={{
                    height: "3em",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700} fontSize="0.95rem">
                    {item.title}
                  </Typography>
                </Box>

                {product && (
                  <Typography variant="body2" color="text.secondary" noWrap mt={0.5}>
                    {product.name}
                  </Typography>
                )}

                <Box mt="auto">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Avatar src={item.sellerInfo?.image || ""} sx={{ width: 24, height: 24 }} />
                    <Typography variant="caption">{item.sellerInfo?.name || "판매자 없음"}</Typography>
                  </Box>
                  <Button href={item.liveUrl} variant="outlined" size="small" fullWidth sx={{ fontWeight: 600 }}>
                    방송 보기
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default LiveNowRecommendSlider;
