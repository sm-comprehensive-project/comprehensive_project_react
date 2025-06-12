import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import VideoSection from "./VideoSection";
import SellerInfoCard from "./SellerInfoCard";
import ProductList from "./ProductList";
import RecommendationsSection from "../../components/recommend/RecommendationsSection";
import type { RecommendationsSectionProps } from "../../components/recommend/RecommendationsSection";
import type { Recommendation } from "../../components/HeroBanner";

// onItemClick prop 추가를 위해 컴포넌트를 확장
const RecSection = RecommendationsSection as React.ComponentType<
  RecommendationsSectionProps & { onItemClick?: (rec: Recommendation) => void }
>;

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
  lastUpdated: string;
  liveUrl: string;
  platform: string;
  products: ProductItemDTO[];
  sellerInfo: SellerInfoDTO;
  thumbnail: string;
  title: string;
}

export default function WatchPage() {
  const { liveId } = useParams<{ liveId: string }>();
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const stored = sessionStorage.getItem("user");
  const user = stored ? (JSON.parse(stored) as { email: string }) : null;

  // 강제 1초 로딩 후 데이터 fetch
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
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
          setError("라이브 데이터를 불러오는 중 오류가 발생했습니다.");
          setLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, [liveId]);

  // 추천 방송 로딩
  useEffect(() => {
    if (!user || !liveId) return;
    fetch(
      `http://localhost:8088/api/user/recommendations?email=${encodeURIComponent(
        user.email
      )}`,
      { method: "GET", credentials: "include" }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`추천 fetch 실패: ${res.status}`);
        return res.json();
      })
      .then(
        (resp: {
          success: boolean;
          recommendations: { liveProduct: Recommendation }[];
        }) => {
          if (resp.success && resp.recommendations.length > 0) {
            const recs = resp.recommendations.map((i) => i.liveProduct);
            const unique = Array.from(
              new Map(recs.map((r) => [r.liveId, r])).values()
            );
            const filtered = unique.filter((r) => String(r.liveId) !== liveId);
            setRecommendations(filtered);
          }
        }
      )
      .catch((err) => console.error("[WatchPage] 추천 불러오기 실패:", err));
  }, [user, liveId]);

  // WATCHED 이벤트
  useEffect(() => {
    if (!user || !liveId) return;
    const payload = {
      userId: user.email,
      type: "WATCHED",
      data: { ObjectId: liveId },
    };
    fetch("/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.error("[WatchPage] 이벤트 전송 오류:", err));
  }, [user, liveId]);

  // 추천 클릭 처리: 스크롤 탑, 로딩, 네비게이트
  const handleRecClick = (rec: Recommendation) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    setTimeout(() => {
      window.location.href = `/watch/${rec.liveId}`;
    }, 1000);
  };

  // 로딩 화면
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          방송 정보를 불러오는 중입니다… 잠시만 기다려주세요
        </Typography>
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
          <Box
            sx={{
              width: "100%",
              aspectRatio: { xs: "16/9", md: "auto" },
              height: { md: "700px" },
              position: "relative",
            }}
          >
            {!showVideo ? (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${data.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 1,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                {/* ... 오버레이 내용 */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowVideo(true)}
                  sx={{ fontWeight: "bold", px: 4, py: 1.5, mb: 2 }}
                >
                  라이브 보기
                </Button>
              </Box>
            ) : (
              <VideoSection
                liveUrl={data.liveUrl}
                thumbnail={data.thumbnail}
                fixedHeight
              />
            )}
          </Box>
          <Box sx={{ height: { xs: "auto", md: "700px" } }}>
            <SellerInfoCard liveData={data} likeCount={0} />
          </Box>
          <Box
            sx={{
              height: { xs: "auto", md: "700px" },
              overflowY: { xs: "visible", md: "auto" },
            }}
          >
            <ProductList products={data.products} />
          </Box>
        </Box>
      </Container>
      <Box sx={{ maxWidth: "1600px", mx: "auto", px: { xs: 2, md: 3 }, mb: 6 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          사용자 맞춤 추천 방송
        </Typography>
        <RecSection data={recommendations} onItemClick={handleRecClick} />
      </Box>
    </Box>
  );
}
