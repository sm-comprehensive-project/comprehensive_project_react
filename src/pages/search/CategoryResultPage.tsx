// 파일 경로: src/pages/search/CategoryResultPage.tsx

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

import ResultHeader, {
  PlatformFilter,
} from "../../components/search/ResultHeader";
import BroadcastGroupCard, {
  ProductItem,
} from "../../components/search/BroadcastGroupCard";

// --- API 응답 타입 정의 (방송 + 상품) ---
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

// --- 화면용, 방송별 상품 묶음(컴포넌트에 넘길 형태) 타입 ---
interface BroadcastGroup {
  liveId: string;
  title: string;
  thumbnail: string;
  platform: "kakao" | "naver";
  sellerName: string;
  products: ProductItem[];
}

const CategoryResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  // 1) API 응답 원본 데이터
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

  // 플랫폼 필터링된 그룹 (라이브 ID 단위)
  const filteredGroups = groups.filter((g) =>
    platformFilter === "all" ? true : g.platform === platformFilter
  );

  // 디버깅 로그
  useEffect(() => {
    console.log("📂 category:", category);
    console.log("📑 apiData 개수:", apiData.length);
    console.log("📦 groups 개수:", groups.length);
    console.log("🖥 platformFilter:", platformFilter);
    console.log("✅ filteredGroups 개수:", filteredGroups.length);
  }, [category, apiData, groups, platformFilter, filteredGroups]);

  //  카테고리 바뀔 때마다 fetch 수행
  useEffect(() => {
    if (!category) return;

    const fetchByCategory = async () => {
      setLoading(true);
      try {
        console.log("🛰 카테고리 방송 조회 시작:", category);
        const res = await fetch(
          `http://localhost:8088/damoa/live?category=${encodeURIComponent(
            category
          )}`
        );
        const jsonData: ApiLiveResponseItem[] = await res.json();
        setApiData(jsonData);

        // 방송별 상품 묶기
        const mapByLive = new Map<string, BroadcastGroup>();
        jsonData.forEach((live) => {
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

          // 해당 방송 그룹에, 카테고리가 같은 상품만 추가
          const group = mapByLive.get(live.liveId)!;
          live.products.forEach((prod) => {
            if (prod.category === category) {
              group.products.push({
                name: prod.name,
                image: prod.image,
                link: prod.link,
                price: prod.price,
                priceOrigin: prod.price_origin,
                discountRate: prod.discountRate,
              });
            }
          });
        });

        // products 배열이 비어있는 그룹은 필터링
        const groupedList: BroadcastGroup[] = Array.from(
          mapByLive.values()
        ).filter((g) => g.products.length > 0);

        setGroups(groupedList);
        console.log("📦 groupedList 생성:", groupedList);
      } catch (err) {
        console.error("❌ 카테고리 방송 조회 실패:", err);
        setApiData([]);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchByCategory();
  }, [category]);

  // 클릭 이벤트 전송 함수 (상품 클릭 시 /events 호출)
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

  // 방송 보기 버튼 클릭 시, /watch/${liveId}로 이동
  const handleWatchClick = (liveId: string) => {
    window.location.href = `/watch/${liveId}`;
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* 상단 헤더 (ResultHeader) */}
      <ResultHeader
        title={`🏷️ "${category}" 카테고리 방송 & 상품`}
        count={groups.length}
        filter={platformFilter}
        onFilterChange={(v) => setPlatformFilter(v)}
        breadcrumb={["홈", "카테고리 검색"]}
      />

      {/* 결과 영역 */}
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
          <Typography variant="body1" textAlign="center" color="text.secondary">
            해당 카테고리에 방송 및 상품이 없습니다.
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

export default CategoryResultPage;
