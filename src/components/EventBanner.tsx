// src/components/EventBanner.tsx
import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";

// 샘플 배너 이미지 (이미지 폴더에 저장 or 외부 URL 가능)
const banners = [
  {
    id: 1,
    image: "/images/banners/banner1.png",
    alt: "봄맞이 특가 이벤트",
  },
  {
    id: 2,
    image: "/images/banners/banner2.png",
    alt: "라이브 방송 할인쿠폰",
  },
  {
    id: 3,
    image: "/images/banners/banner3.png",
    alt: "1+1 기획전",
  },
];

const EventBanner = () => {
  return (
    <Grid container spacing={3}>
      {banners.map((banner) => (
        <Grid item xs={12} sm={6} md={4} key={banner.id}>
          <Card sx={{ boxShadow: 2 }}>
            <CardMedia
              component="img"
              height="160"
              image={banner.image}
              alt={banner.alt}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventBanner;
