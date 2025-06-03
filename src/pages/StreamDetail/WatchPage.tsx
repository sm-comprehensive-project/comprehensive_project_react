// src/pages/StreamDetail/WatchPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

import VideoSection from "./VideoSection";
import SellerInfoCard from "./SellerInfoCard";
import ProductList from "./ProductList";

// ──────── 타입 정의 및 export ────────
export interface SellerInfoDTO {
  name: string;
  url: string;
  image: string;
}

export interface ProductItemDTO {
  name: string;
  image: string;
  link: string;
  price: number;
  price_origin: number;
  discountRate: number;
  category: string;
}

export interface LiveData {
  liveId: string;
  live: boolean;
  lastUpdated: string; // ISO 문자열
  liveUrl: string;
  platform: string;
  products: ProductItemDTO[];
  sellerInfo: SellerInfoDTO;
  thumbnail: string;
  title: string;
}
// ────────────────────────────────────

export default function WatchPage() {
  const { liveId } = useParams<{ liveId: string }>();
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!liveId) {
      setError("라이브 ID가 지정되지 않았습니다.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8088/damoa/live/${liveId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<LiveData>;
      })
      .then((dto) => {
        setData(dto);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("라이브 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, [liveId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error ?? "라이브 데이터를 찾을 수 없습니다."}
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f8f8f8", minHeight: "calc(100vh - 64px)" }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1600px",
          mx: "auto",
          backgroundColor: "white",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          p: { xs: 2, md: 3 },
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(350px,400px) minmax(220px,250px) 1fr",
            },
            gap: 2,
            alignItems: "start",
          }}
        >
          {/* ─────────────────────────────────────────
            왼쪽 컬럼: VideoSection Wrapper
            • md(데스크톱 이상): 높이를 600px로 고정
            • xs(모바일): 높이를 auto(=paddingTop 비율로 처리)
          ───────────────────────────────────────── */}
          <Box
            sx={{
              width: "100%",
              height: { xs: "auto", md: "600px" },
            }}
          >
            <VideoSection
              isLive={data.live}
              liveUrl={data.liveUrl}
              thumbnail={data.thumbnail}
              fixedHeight={true}
            />
          </Box>

          {/* ─────────────────────────────────────────
            중간 컬럼: SellerInfoCard
            • md 이상: 높이를 600px로 고정
            • xs: auto
          ───────────────────────────────────────── */}
          <Box
            sx={{
              height: { xs: "auto", md: "600px" },
            }}
          >
            <SellerInfoCard liveData={data} likeCount={0 /* 예시 */} />
          </Box>

          {/* ─────────────────────────────────────────
            오른쪽 컬럼: ProductList
            • md 이상: 높이를 600px로 고정, 내부만 스크롤 가능
            • xs: auto
          ───────────────────────────────────────── */}
          <Box
            sx={{
              height: { xs: "auto", md: "600px" },
              overflowY: { xs: "visible", md: "auto" },
            }}
          >
            <ProductList products={data.products} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
