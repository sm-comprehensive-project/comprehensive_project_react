// src/components/recommend/RecommendationsSection.tsx

import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button, Avatar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation /*, Autoplay */ } from "swiper/modules";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Recommendation } from "../../components/HeroBanner";
import { Link } from "react-router-dom";

interface RecommendationsSectionProps {
  data: Recommendation[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ data }) => {
  return (
    // 상하에 살짝 여백을 주기 위해 py: 2 추가
    <Box sx={{ position: "relative", mt: 2, py: 2 }}>
      {/* 이전/다음 버튼 */}
      <Box
        className="swiper-button-prev-rec"
        sx={{
          position: "absolute",
          top: "50%",
          left: 8,
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 16 }} />
      </Box>
      <Box
        className="swiper-button-next-rec"
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
      </Box>

      <Swiper
        modules={[Navigation /*, Autoplay*/]}
        navigation={{
          prevEl: ".swiper-button-prev-rec",
          nextEl: ".swiper-button-next-rec",
        }}
        loop={true} // 무한 반복
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          600: { slidesPerView: 2, spaceBetween: 16 },
          960: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
        style={{
          // 상하 여백 추가
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.liveId}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.thumbnail}
                alt={item.title}
                sx={{ objectFit: "cover" }}
                onError={(e) => {
                  // (e.target as HTMLImageElement).src = "/images/placeholder.png";
                }}
              />
              <CardContent sx={{ p: 1, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  noWrap
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title.replace(/\n/g, " ")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <Avatar
                    src={item.sellerInfo.image}
                    alt={item.sellerInfo.name}
                    sx={{ width: 24, height: 24 }}
                    onError={(e) => {
                      // (e.target as HTMLImageElement).src = "/images/default_seller.png";
                    }}
                  />
                  <Typography variant="caption" noWrap>
                    {item.sellerInfo.name}
                  </Typography>
                </Box>
                <Box sx={{ mt: "auto" }}>
                  {/* React Router Link를 사용해 /watch/{liveId}로 이동 */}
                  <Button
                    component={Link}
                    to={`/watch/${item.liveId}`}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ fontWeight: 600, fontSize: "0.8rem", mt: 1 }}
                  >
                    방송 보기
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RecommendationsSection;
