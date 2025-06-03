// 파일: LiveNowRecommendSlider.tsx

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
    console.log("[LiveNowRecommendSlider] useEffect 실행 - 라이브 방송 데이터 fetch 시작");
    fetch("http://localhost:8088/damoa/live?platform=kakao&isLive=true")
      .then((res) => {
        console.log("[LiveNowRecommendSlider] fetch 응답 상태:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("[LiveNowRecommendSlider] 서버로부터 받은 데이터:", data);
        const sliced = data.slice(0, 10);
        console.log("[LiveNowRecommendSlider] 상위 10개로 잘린 데이터:", sliced);
        setLiveList(sliced);
      })
      .catch((err) => {
        console.error("[LiveNowRecommendSlider] 라이브 방송 불러오기 실패:", err);
      });
  }, []);

  const detectPromotionBadge = (text: string): string | null => {
    console.log("[LiveNowRecommendSlider] 프로모션 배지 검사할 텍스트:", text);
    if (/2\s*\+\s*1/.test(text)) {
      console.log("[LiveNowRecommendSlider] '2+1' 프로모션 배지 발견");
      return "2+1";
    }
    if (/1\s*\+\s*1/.test(text)) {
      console.log("[LiveNowRecommendSlider] '1+1' 프로모션 배지 발견");
      return "1+1";
    }
    return null;
  };

  console.log("[LiveNowRecommendSlider] 렌더링 - liveList 상태:", liveList);

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
        console.log(`[LiveNowRecommendSlider] map 인덱스 ${idx} - item 내용:`, item);

        const product = item.products?.[0];
        console.log(`[LiveNowRecommendSlider] map 인덱스 ${idx} - 첫 번째 상품:`, product);

        const promoBadge =
          detectPromotionBadge(item.title) ||
          (product && detectPromotionBadge(product.name));
        console.log(`[LiveNowRecommendSlider] map 인덱스 ${idx} - promoBadge:`, promoBadge);

        return (
          <SwiperSlide key={idx}>
            <Card
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 2,
              }}
            >
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
                    <Box
                      sx={{
                        bgcolor: "#1976d2",
                        color: "white",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        borderRadius: 1,
                        px: 1,
                        py: 0.3,
                      }}
                    >
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
                    <Typography variant="caption">
                      {item.sellerInfo?.name || "판매자 없음"}
                    </Typography>
                  </Box>
                  <Button
                    href={item.liveUrl}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ fontWeight: 600 }}
                    onClick={() =>
                      console.log(
                        `[LiveNowRecommendSlider] '${item.title}' 방송보기 버튼 클릭 - URL:`,
                        item.liveUrl
                      )
                    }
                  >
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
