"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Box, Container, Typography, Tabs, Tab, ButtonGroup, Button } from "@mui/material";
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
  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: "700",
        color: "#FF5722",
        display: "flex",
        alignItems: "center",
        fontSize: { xs: "1rem", sm: "1.2rem" },
      }}
    >
      <Box component="span" sx={{ mr: 1, fontSize: { xs: "1.3rem", sm: "1.5rem" } }}>
        {icon}
      </Box>
      {title}
    </Typography>
  </Box>
);

const MainPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // (1) 실시간 인기 방송 데이터 (카카오+네이버)
  const [liveData, setLiveData] = useState<LiveDataRaw[]>([]);
  const [loadingLive, setLoadingLive] = useState(true);

  // (2) Top 1 추천 (HeroBanner용)
  const [topRecommendation, setTopRecommendation] = useState<Recommendation | null>(null);

  // (3) 나머지 추천 리스트 (RecommendationsSection용)
  const [otherRecs, setOtherRecs] = useState<Recommendation[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  // ───────────── 필터 상태 추가 ─────────────
  const [platformFilter, setPlatformFilter] = useState<"all" | "kakao" | "naver">("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  // ───────────────────────────────────────────────────────
  // (A) sessionStorage에서 User 파싱
  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // (1) 실시간 인기 방송 데이터(fetch)
  useEffect(() => {
    setLoadingLive(true);

    const fetchKakao = fetch("http://localhost:8088/damoa/live?platform=kakao")
      .then((res) => {
        if (!res.ok) throw new Error(`Kakao fetch 실패: ${res.status}`);
        return res.json() as Promise<LiveDataRaw[]>;
      });

    const fetchNaver = fetch("http://localhost:8088/damoa/live?platform=naver")
      .then((res) => {
        if (!res.ok) throw new Error(`Naver fetch 실패: ${res.status}`);
        return res.json() as Promise<LiveDataRaw[]>;
      });

    Promise.all([fetchKakao, fetchNaver])
      .then(([kakaoList, naverList]) => {
        const merged = [...kakaoList, ...naverList];
        setLiveData(merged);
      })
      .catch((err) => {
        console.error("[MainPage] 실시간 인기 방송 불러오기 실패:", err);
        setLiveData([]);
      })
      .finally(() => {
        setLoadingLive(false);
      });
  }, []);

  // (2+3) 전체 추천 리스트 API 호출 → Top1과 나머지 분리
  useEffect(() => {
    if (!user) {
      setLoadingRecs(false);
      return;
    }

    setLoadingRecs(true);
    fetch(
      `http://localhost:8088/api/user/recommendations?email=${encodeURIComponent(user.email)}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`추천 fetch 실패: ${res.status}`);
        return res.json();
      })
      .then((data: { success: boolean; recommendations: RecommendationItem[] }) => {
        if (data.success && data.recommendations.length > 0) {
          const sorted = data.recommendations.sort((a, b) => b.score - a.score);
          const top = sorted[0].liveProduct;
          setTopRecommendation(top);
          const remainder = sorted.slice(1).map((item) => item.liveProduct);
          setOtherRecs(remainder);
        }
      })
      .catch((err) => console.error("[MainPage] 추천 불러오기 실패:", err))
      .finally(() => {
        setLoadingRecs(false);
      });
  }, [user]);

  // ───────────── 필터 적용된 데이터 계산 ─────────────
  const filteredLiveData = useMemo(() => {
    let filtered = liveData;

    // 플랫폼 필터
    if (platformFilter !== "all") {
      filtered = filtered.filter((item) => item.platform === platformFilter);
    }

    // 정렬
    if (sortOrder === "recent") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );
    } else {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
      );
    }

    return filtered;
  }, [liveData, platformFilter, sortOrder]);

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* HeroBanner */}
      <HeroBanner user={user} recommendedItem={topRecommendation} loading={loadingRecs} />

      {/* 추천 방송 */}
      {!loadingRecs && otherRecs.length > 0 && (
        <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#ffffff", mt: 2 }}>
          <Container maxWidth="lg" sx={{ px: 0 }}>
            <SectionTitle icon="⭐" title="추천 방송" />
            <RecommendationsSection data={otherRecs} />
          </Container>
        </Box>
      )}

      {/* 실시간 인기 방송 */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#ffffff" }}>
        <Container maxWidth="lg">
          <SectionTitle icon="🔥" title="실시간 인기 방송" />

          {/* 필터 UI */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexWrap: "wrap", gap: 1 }}>
            {/* 플랫폼 필터 */}
            <Tabs
              value={platformFilter}
              onChange={(_, newValue) => setPlatformFilter(newValue)}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="전체" value="all" />
              <Tab label="카카오" value="kakao" />
              <Tab label="네이버" value="naver" />
            </Tabs>

            {/* 정렬 필터 */}
            <ButtonGroup variant="outlined" size="small">
              <Button
                variant={sortOrder === "recent" ? "contained" : "outlined"}
                onClick={() => setSortOrder("recent")}
              >
                최신순
              </Button>
              <Button
                variant={sortOrder === "oldest" ? "contained" : "outlined"}
                onClick={() => setSortOrder("oldest")}
              >
                오래된순
              </Button>
            </ButtonGroup>
          </Box>

          {!loadingLive ? (
            <LiveNowSection2 data={filteredLiveData} />
          ) : (
            <Typography sx={{ textAlign: "center", py: 6 }}>로딩 중...</Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;
