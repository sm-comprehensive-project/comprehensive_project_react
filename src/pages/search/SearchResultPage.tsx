// 파일 경로: src/pages/search/SearchResultPage.tsx

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import ResultHeader, { PlatformFilter } from "../../components/search/ResultHeader";
import BroadcastGroupCard, { ProductItem } from "../../components/search/BroadcastGroupCard";

// --- API 응답 예시 타입 정의 (검색 → 방송+상품) ---
interface ApiProduct {
  name: string;
  image: string;
  link: string;
  price: number;
  price_origin: number;
  discountRate: number;
  category: string;
}

interface ApiLiveResponseItem {
  liveId: string;
  title: string;
  thumbnail: string;
  platform: "kakao" | "naver";
  sellerInfo?: { name: string };
  products: ApiProduct[];
}

// 화면용, BroadcastGroup 형태
interface BroadcastGroup {
  liveId: string;
  title: string;
  thumbnail: string;
  platform: "kakao" | "naver";
  sellerName: string;
  products: ProductItem[];
}

const SearchResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query") || "";

  // 1) API 응답 원본
  const [apiData, setApiData] = useState<ApiLiveResponseItem[]>([]);
  // 2) BroadcastGroup 형태로 가공한 데이터
  const [groups, setGroups] = useState<BroadcastGroup[]>([]);
  // 3) 플랫폼 필터
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  // 4) 로딩 상태
  const [loading, setLoading] = useState<boolean>(false);

  // 사용자 이메일 가져오기 (sessionStorage)
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.email) setUserEmail(u.email);
      } catch {
        setUserEmail(null);
      }
    }
  }, []);

  // 플랫폼 필터링된 그룹
  const filteredGroups = groups.filter((g) =>
    platformFilter === "all" ? true : g.platform === platformFilter
  );

  // 디버깅 로그
  useEffect(() => {
    console.log("🔎 keyword:", keyword);
    console.log("🚀 apiData:", apiData);
    console.log("📦 groups:", groups);
    console.log("🖥 platformFilter:", platformFilter);
    console.log("✅ filteredGroups:", filteredGroups);
  }, [keyword, apiData, groups, platformFilter, filteredGroups]);

  // 검색할 때마다 API 호출
  useEffect(() => {
    if (!keyword) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        console.log("🛰 검색 API 호출 (keyword):", keyword);
        const res = await fetch(
          `http://localhost:8088/damoa/live?search=${encodeURIComponent(
            keyword
          )}`
        );
        const data: ApiLiveResponseItem[] = await res.json();
        setApiData(data);

        // 방송별 상품 묶기
        const mapByLive = new Map<string, BroadcastGroup>();
        data.forEach((live) => {
          const sellerName = live.sellerInfo?.name || "알 수 없음";

          if (!mapByLive.has(live.liveId)) {
            mapByLive.set(live.liveId, {
              liveId: live.liveId,
              title: live.title,
              thumbnail: live.thumbnail,
              platform: live.platform,
              sellerName,
              products: [],
            });
          }

          const group = mapByLive.get(live.liveId)!;
          live.products.forEach((prod) => {
            // 검색 결과에서는 카테고리 필터가 없으므로, 그냥 전부 추가하거나
            // 별도의 로직(예: prod.category === someCategory)이 필요하다면 수정하세요.
            group.products.push({
              name: prod.name,
              image: prod.image,
              link: prod.link,
              price: prod.price,
              priceOrigin: prod.price_origin,
              discountRate: prod.discountRate,
            });
          });
        });

        const groupedList: BroadcastGroup[] = Array.from(
          mapByLive.values()
        ).filter((g) => g.products.length > 0);

        setGroups(groupedList);
        console.log("📦 groupedList 생성:", groupedList);
      } catch (err) {
        console.error("❌ 검색 실패:", err);
        setApiData([]);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  // 상품 클릭 시 이벤트 로그 + 새 창 열기
  const sendProductClickEvent = async (item: ProductItem) => {
    if (!userEmail) return;
    try {
      await fetch("/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userEmail,
          type: "CLICKED",
          data: {
            ItemId: item.name,
            thumbnail: item.image,
            link: item.link,
          },
        }),
      });
    } catch (err) {
      console.error("클릭 이벤트 전송 오류:", err);
    }
  };

  // 방송 보기 버튼 클릭
  const handleWatchClick = (liveId: string) => {
    window.location.href = `/watch/${liveId}`;
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* 상단 헤더 (ResultHeader) */}
      <ResultHeader
        title={`🔍 "${keyword}" 검색 결과`}
        count={groups.length}
        filter={platformFilter}
        onFilterChange={(v) => setPlatformFilter(v)}
        breadcrumb={["홈", "검색"]}
      />

      {/* 검색 결과 영역 */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            {/* ② 기존 스피너 */}
            <CircularProgress size={52} /> 
            {/* ① 로딩 문구 추가 */}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              데이터를 불러오는 중입니다… 잠시만 기다려 주세요.
            </Typography>
          </Box>
        ) : filteredGroups.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
          >
            검색 결과가 없습니다.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filteredGroups.map((group) => (
              <BroadcastGroupCard
                key={group.liveId}
                liveId={group.liveId}
                title={group.title}
                thumbnail={group.thumbnail}
                platform={group.platform}
                sellerName={group.sellerName}
                products={group.products}
                onProductClick={(item) => {
                  sendProductClickEvent(item);
                  window.open(item.link, "_blank");
                }}
                onWatchClick={handleWatchClick}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchResultPage;
