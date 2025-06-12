// 파일 경로: src/components/search/BroadcastGroupCard.tsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";

export interface ProductItem {
  name: string;
  image: string;
  link: string;
  price: number;
  priceOrigin: number;
  discountRate: number;
}

export interface BroadcastGroupProps {
  liveId: string;
  title: string;
  thumbnail: string;
  platform: "kakao" | "naver";
  sellerName: string;
  products: ProductItem[];
  onProductClick?: (item: ProductItem) => void;
  onWatchClick?: (liveId: string) => void;
}

const BroadcastGroupCard: React.FC<BroadcastGroupProps> = ({
  liveId,
  title,
  thumbnail,
  platform,
  sellerName,
  products,
  onProductClick,
  onWatchClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleProducts = expanded ? products : products.slice(0, 4);

  const handleWatch = () => {
    if (onWatchClick) {
      onWatchClick(liveId);
    } else {
      window.open(`/watch/${liveId}`, "_blank");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        p: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* ── 방송(그룹) 헤더 ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          gap: 2,
        }}
      >
        {/* 썸네일 */}
        <Box
          sx={{
            width: 120,
            height: 80,
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />

        {/* 제목 / 판매자 */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={700} noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="#666" sx={{ mt: 0.5 }} noWrap>
            판매자: {sellerName}
          </Typography>
        </Box>

        {/* 플랫폼 Chip */}
        <Chip
          label={platform.toUpperCase()}
          size="medium"
          sx={{
            backgroundColor: platform === "kakao" ? "#FEE500" : "#03C75A",
            color: platform === "kakao" ? "#000" : "#fff",
            fontWeight: 600,
          }}
        />

        {/* 방송 보러가기 버튼 */}
        <Button
          size="small"
          variant="outlined"
          sx={{
            textTransform: "none",
            ml: 1,
            borderColor: "#3f51b5",
            color: "#3f51b5",
            "&:hover": {
              backgroundColor: "#3f51b5",
              color: "#fff",
            },
          }}
          onClick={handleWatch}
        >
          방송 보러가기
        </Button>
      </Box>

      {/* ── 상품 그리드 ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {visibleProducts.map((prod, idx) => (
          <Card
            key={`${liveId}-prod-${idx}`}
            sx={{
              borderRadius: 1.5,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={prod.image}
              alt={prod.name}
            />
            <CardContent sx={{ p: 1.5 }}>
              <Typography fontWeight={600} fontSize="0.9rem" noWrap>
                {prod.name}
              </Typography>
              <Box
                sx={{
                  mt: 0.5,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 0.5,
                }}
              >
                <Typography fontWeight={700} color="#FF5722" fontSize="0.9rem">
                  {prod.price.toLocaleString()}원
                </Typography>
                <Typography
                  variant="caption"
                  color="#999"
                  sx={{ textDecoration: "line-through" }}
                >
                  {prod.priceOrigin.toLocaleString()}원
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "#388E3C" }}>
                할인 {prod.discountRate}%{" "}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ── 더 보기 / 접기 토글 ── */}
      {products.length > 4 && (
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Button
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ textTransform: "none" }}
          >
            {expanded ? "접기" : "더 보기"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BroadcastGroupCard;
