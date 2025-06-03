// src/pages/mainpage/MainPage.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import HeroBanner, { Recommendation, User } from "../../components/HeroBanner";
import LiveNowSection2 from "../../components/live/LiveNowSection2";
import RecommendationsSection from "../../components/recommend/RecommendationsSection";

type RecommendationItem = {
  liveProduct: Recommendation;
  score: number;
};

type LiveDataRaw = {
  liveId: string;
  title: string;
  thumbnail: string;
  liveUrl: string;
  platform: string;
  sellerInfo: {
    name: string;
    image: string;
    url: string;
  };
  live: boolean;
  lastUpdated: string;
  products: unknown[];
};

const SectionTitle: React.FC<{
  icon: string;
  title: string;
}> = ({ icon, title }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Typography
      variant="h5"
      sx={{
        fontWeight: "700",
        color: "#FF5722",
        display: "flex",
        alignItems: "center",
        fontSize: { xs: "1.2rem", sm: "1.5rem" },
      }}
    >
      <Box
        component="span"
        sx={{ mr: 1, fontSize: { xs: "1.3rem", sm: "1.6rem" } }}
      >
        {icon}
      </Box>
      {title}
    </Typography>
  </Box>
);

const MainPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // (1) 실시간 인기 방송
  const [liveData, setLiveData] = useState<LiveDataRaw[]>([]);
  const [loadingLive, setLoadingLive] = useState(true);

  // (2) Top 1 추천 (HeroBanner용)
  const [topRecommendation, setTopRecommendation] =
    useState<Recommendation | null>(null);

  // (3) 나머지 추천 리스트 (RecommendationsSection용)
  const [otherRecs, setOtherRecs] = useState<Recommendation[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  // ───────────────────────────────────────────────────────────────
  // (1) 실시간 인기 방송 데이터(fetch)
  useEffect(() => {
    console.log("[MainPage] useEffect: 실시간 인기 방송 데이터 호출 시작");
    fetch("http://localhost:8088/damoa/live/summary")
      .then((res) => {
        console.log("[MainPage] 실시간 인기 방송 fetch 응답 상태:", res.status);
        return res.json();
      })
      .then((json: LiveDataRaw[]) => {
        console.log("[MainPage] 실시간 인기 방송 데이터:", json);
        setLiveData(json);
      })
      .catch((err) =>
        console.error("[MainPage] 실시간 인기 방송 불러오기 실패:", err)
      )
      .finally(() => {
        console.log("[MainPage] 실시간 인기 방송 로딩 완료");
        setLoadingLive(false);
      });
  }, []);

  // ───────────────────────────────────────────────────────────────
  // (A) sessionStorage에서 User 파싱
  useEffect(() => {
    console.log("[MainPage] useEffect: sessionStorage에서 user 정보 파싱 시도");
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        console.log("[MainPage] sessionStorage에서 파싱된 user:", parsed);
        setUser(parsed);
      } catch (e) {
        console.warn("[MainPage] sessionStorage 파싱 실패:", e);
        setUser(null);
      }
    } else {
      console.log("[MainPage] sessionStorage에 user가 없음");
      setUser(null);
    }
  }, []);

  // ───────────────────────────────────────────────────────────────
  // (2+3) 전체 추천 리스트 API 호출 → Top1과 나머지 분리
  useEffect(() => {
    if (!user) {
      console.log("[MainPage] 추천 리스트: user 정보가 없어서 API 호출 건너뜀");
      setLoadingRecs(false);
      return;
    }

    console.log("[MainPage] 추천 리스트 API 호출 시작, email:", user.email);
    fetch(
      `http://localhost:8088/api/user/recommendations?email=${encodeURIComponent(
        user.email
      )}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        console.log("[MainPage] 전체 추천 fetch 응답 상태:", res.status);
        return res.json();
      })
      .then(
        (data: { success: boolean; recommendations: RecommendationItem[] }) => {
          console.log("[MainPage] 전체 추천 API 데이터:", data);
          if (
            data.success &&
            Array.isArray(data.recommendations) &&
            data.recommendations.length > 0
          ) {
            // score 기준 내림차순 정렬
            const sorted = data.recommendations.sort(
              (a, b) => b.score - a.score
            );
            console.log("[MainPage] 정렬된 추천 리스트:", sorted);

            // 첫 번째(Top1) 아이템은 HeroBanner용
            const top = sorted[0].liveProduct;
            setTopRecommendation(top);
            console.log("[MainPage] Top 추천 설정 완료:", top);

            // 나머지(인덱스 1~끝) 아이템만 otherRecs에 저장
            const remainder = sorted.slice(1).map((item) => item.liveProduct);
            console.log("[MainPage] Top1 제외한 나머지 추천:", remainder);
            setOtherRecs(remainder);
          } else {
            console.warn(
              "[MainPage] 추천 API에서 추천 리스트가 비었거나 success=false"
            );
          }
        }
      )
      .catch((err) =>
        console.error("[MainPage] 전체 추천 리스트 로딩 실패:", err)
      )
      .finally(() => {
        console.log("[MainPage] 전체 추천 리스트 로딩 완료");
        setLoadingRecs(false);
      });
  }, [user]);

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* HeroBanner: user + topRecommendation prop 전달 */}
      <HeroBanner user={user} recommendedItem={topRecommendation} />

      {/* ─────────────────────────────────────────────────────────
          나머지 추천 방송 가로 스크롤 섹션 (순서를 최상단으로 이동) */}
      {!loadingRecs && otherRecs.length > 0 && (
        <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#ffffff", mt: 2 }}>
          <Container maxWidth="lg" sx={{ px: 0 }}>
            <SectionTitle icon="⭐" title="추천 방송" />
            <RecommendationsSection data={otherRecs} />
          </Container>
        </Box>
      )}

      {/* ─────────────────────────────────────────────────────────
          실시간 인기 방송 섹션 (추천 방송 아래로 이동) */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#ffffff" }}>
        <Container maxWidth="lg">
          <SectionTitle icon="🔥" title="실시간 인기 방송" />
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              p: { xs: 2, sm: 3 },
            }}
          >
            {!loadingLive && <LiveNowSection2 data={liveData} />}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;
