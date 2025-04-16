// src/pages/MainPage.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LiveNowSection from "../../components/live/LiveNowSection.tsx";
import UpcomingStreamsSection from "../../components/live/UpcomingStreamsSection.tsx";
import EventBanner from "../../components/EventBanner.tsx";
import ProductGrid from "../../components/product/ProductGrid.tsx";

interface Product {
  name: string;
  image: string;
  link: string;
  price: number;
  price_origin: number;
  discountRate: number;
}

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
  products: Product[];
}

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

const MainPage: React.FC = () => {
  const [liveData, setLiveData] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/damoa/live")
      .then((res) => res.json())
      .then((json: LiveDataRaw[]) => {
        const flatMapped = json.map((live) =>
          live.products.map((product) => ({
            title: product.name,
            channel: live.sellerInfo.name || "판매자 미지정",
            viewers: Math.floor(Math.random() * 10000),
            thumbnail: product.image,
            isLive: live.live,
            platform: live.platform,
            productUrl: product.link,
            streamUrl: `/stream/${live.liveId}`,
            streamUrl2: `/streampopup2/${live.liveId}`,
          }))
        );
        setLiveData(flatMapped.flat());
      })
      .catch((err) => console.error("에러 발생:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
      {/* 실시간 인기 방송 */}
      <Box sx={{ padding: "30px 20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF6D00", mb: 2 }}>
          🔥 실시간 인기 방송
        </Typography>
        {!loading && <LiveNowSection data={liveData} />}
      </Box>

      {/* 예정된 방송 */}
      <Box sx={{ padding: "30px 20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF6D00", mb: 2 }}>
          📅 오늘의 라이브 예정
        </Typography>
        <UpcomingStreamsSection />
      </Box>

      {/* 이벤트 배너 */}
      <Box sx={{ padding: "30px 20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF6D00", mb: 2 }}>
          💥 이벤트 & 프로모션
        </Typography>
        <EventBanner />
      </Box>

      {/* 추천 상품 피드 */}
      <Box sx={{ padding: "30px 20px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF6D00", mb: 2 }}>
          🛍️ 추천 상품
        </Typography>
        <ProductGrid />
      </Box>
    </Box>
  );
};

export default MainPage;
