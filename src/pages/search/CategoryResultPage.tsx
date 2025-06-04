// src/pages/Search/CategoryResultPage.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
  Button,
} from "@mui/material";

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

// --- 화면용, 방송별 상품 묶음을 나타낼 타입 ---
interface BroadcastGroup {
  liveId: string;
  title: string;
  thumbnail: string;
  platform: "kakao" | "naver";
  sellerName: string;
  products: {
    name: string;
    image: string;
    link: string;
    price: number;
    priceOrigin: number;
    discountRate: number;
  }[];
}

// 플랫폼 필터 타입
type PlatformFilter = "all" | "kakao" | "naver";

const CategoryResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  // 1) API 응답 데이터
  const [apiData, setApiData] = useState<ApiLiveResponseItem[]>([]);
  // 2) 방송별로 묶은 그룹 목록
  const [groups, setGroups] = useState<BroadcastGroup[]>([]);
  // 3) 플랫폼 필터
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  // 4) 로딩 상태
  const [loading, setLoading] = useState<boolean>(false);

  // 플랫폼 필터링된 그룹 (방송 단위 필터링)
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

  // 카테고리 바뀔 때마다 fetch
  useEffect(() => {
    if (!category) return;

    const fetchByCategory = async () => {
      setLoading(true);
      try {
        console.log("🛰 카테고리 방송 조회 시작:", category);
        const res = await fetch(
          `http://localhost:8088/damoa/live?category=${encodeURIComponent(category)}`
        );
        const jsonData: ApiLiveResponseItem[] = await res.json();
        setApiData(jsonData);

        // 방송별로 상품 묶기
        const mapByLive = new Map<string, BroadcastGroup>();
        jsonData.forEach((live) => {
          const sellerName = live.sellerInfo?.name || "알 수 없음";

          // 아직 Map에 해당 방송이 없으면 새 항목 생성
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

          // 해당 방송 그룹에 상품 추가 (카테고리가 동일한 것만)
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

        // products 배열이 비어있는 그룹은 제외하고 리스트로 변환
        const groupedList: BroadcastGroup[] = Array.from(mapByLive.values()).filter(
          (g) => g.products.length > 0
        );
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

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* 상단 헤더 */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #FF5722, #3f51b5)",
          color: "#fff",
          py: 4,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          {/* Breadcrumb */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#FFE0B2", mr: 0.5 }}>
              홈
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFE0B2", mr: 0.5 }}>
              &gt;
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFE0B2" }}>
              카테고리 검색
            </Typography>
          </Box>

          {/* 메인 제목 */}
          <Typography variant="h4" fontWeight={700}>
            🏷️ "{category}" 카테고리 방송 & 상품
          </Typography>
          <Typography variant="body1" mt={1}>
            총 <strong>{groups.length}</strong>개 방송 (상품 포함)
          </Typography>

          {/* 플랫폼 필터 탭 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Tabs
              value={platformFilter}
              onChange={(_e, v: PlatformFilter) => setPlatformFilter(v)}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            >
              <Tab label="전체" value="all" />
              <Tab label="Kakao" value="kakao" />
              <Tab label="Naver" value="naver" />
            </Tabs>
          </Box>
        </Box>
      </Box>

      {/* 결과 영역 */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress size={32} />
          </Box>
        ) : filteredGroups.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
          >
            해당 카테고리에 방송 및 상품이 없습니다.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {filteredGroups.map((group) => (
              <Box
                key={group.liveId}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  p: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {/* 방송 헤더 */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 80,
                      backgroundImage: `url(${group.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} noWrap>
                      {group.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#666"
                      sx={{ mt: 0.5 }}
                      noWrap
                    >
                      판매자: {group.sellerName}
                    </Typography>
                  </Box>

                  <Chip
                    label={group.platform.toUpperCase()}
                    size="medium"
                    sx={{
                      backgroundColor:
                        group.platform === "kakao" ? "#FEE500" : "#03C75A",
                      color: group.platform === "kakao" ? "#000" : "#fff",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {/* 상품 그리드 */}
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
                  {group.products.map((prod, idx) => (
                    <Card
                      key={`${group.liveId}-prod-${idx}`}
                      sx={{
                        borderRadius: 1.5,
                        overflow: "hidden",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        transition: "all 0.2s",
                        "&:hover": {
                          boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
                          transform: "translateY(-2px)",
                        },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* 상품 이미지 */}
                      <CardMedia
                        component="img"
                        height="140"
                        image={prod.image}
                        alt={prod.name}
                      />

                      <CardContent sx={{ p: 1.5 }}>
                        <Typography
                          fontWeight={600}
                          fontSize="0.9rem"
                          noWrap
                        >
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
                          <Typography
                            fontWeight={700}
                            color="#FF5722"
                            fontSize="0.9rem"
                          >
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
                        <Typography
                          variant="caption"
                          sx={{ color: "#388E3C" }}
                        >
                          할인 {prod.discountRate}% 
                        </Typography>
                      </CardContent>

                      <Box sx={{ p: 1, pt: 0, display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            borderColor: "#3f51b5",
                            color: "#3f51b5",
                            fontSize: "0.8rem",
                            flexGrow: 1,
                            "&:hover": {
                              backgroundColor: "#3f51b5",
                              color: "#fff",
                            },
                          }}
                          onClick={() => window.open(prod.link, "_blank")}
                        >
                          상품 보러가기
                        </Button>
                        <Button
                          size="small"
                          variant="text"
                          sx={{
                            textTransform: "none",
                            color: "#555",
                            fontSize: "0.8rem",
                          }}
                          onClick={() => window.open(`/watch/${group.liveId}`, "_blank")}
                        >
                          방송 보기
                        </Button>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CategoryResultPage;
