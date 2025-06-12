// 파일: src/pages/SchedulePage.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Calendar,
  Tv,
  Heart as HeartOutline,
  Heart as HeartFilled,
} from "lucide-react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  ButtonGroup,
  IconButton,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// 🔷 타입 정의
type ScheduleCardItem = {
  id: number;
  title: string;
  time: string;         // ex. "13:30"
  date: string;         // ex. "2025-06-04"
  channel: string;
  thumbnail?: string;
  isNew: boolean;
  category: string;
  platform: "kakao" | "naver";
  liveId: string;
  liveUrl: string;
  routeId: string;      // ← watch 라우트용 ID
};

type LiveApiResponseItem = {
  id: string;
  liveId: string;
  live: boolean;
  lastUpdated: string;
  liveUrl: string;
  platform: "kakao" | "naver";
  thumbnail?: string;
  title: string;
  products: unknown[];
  sellerInfo: {
    name: string;
    url: string;
    image: string;
  };
  seller?: string;
  dates: string[];
};

// 카카오 기본 썸네일(“이미지 없음”과 동일 처리)
const FALLBACK_THUMBNAIL =
  "https://st.kakaocdn.net/commerce_ui/static/common_module/default_fallback_thumbnail.png";

// 날짜 “6월 4일 (수)” 형식 유틸
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
};

// 5일치(어제, 오늘, 내일, …) 날짜 배열
const generateDateRange = () =>
  Array.from({ length: 5 }, (_, i) =>
    dayjs().add(i - 1, "day").format("YYYY-MM-DD")
  );

// 오늘 라벨
const getDateLabel = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);
  return target.getTime() === today.getTime() ? "오늘" : "";
};

// 어제 판단 유틸
const isYesterday = (dateString: string) =>
  dayjs(dateString).isSame(dayjs().subtract(1, "day"), "day");

// 방송 시작 여부 판단
const isStarted = (item: ScheduleCardItem) =>
  dayjs(`${item.date}T${item.time}`).isBefore(dayjs());

const SchedulePage: React.FC = () => {
  const dateRange = generateDateRange();
  const today = dayjs().format("YYYY-MM-DD");

  // ─── 상태값 ───────────────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [platformFilter, setPlatformFilter] = useState<
    "all" | "kakao" | "naver"
  >("all");

  const [kakaoScheduleData, setKakaoScheduleData] = useState<
    ScheduleCardItem[]
  >([]);
  const [naverScheduleData, setNaverScheduleData] = useState<
    ScheduleCardItem[]
  >([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  // ───────────────────────────────────────────────────────────────────────────

  // ─── 이벤트 전송 헬퍼 ─────────────────────────────────────────────────────
  const postEvent = async (
    userId: string,
    type:
      | "LIKED_LIVE"
      | "WATCHED"
      | "CLICKED"
      | "CATEGORY_INTEREST"
      | "SEARCH",
    data: Record<string, unknown>
  ) => {
    try {
      await fetch("/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, type, data }),
      });
    } catch (err) {
      console.error("이벤트 전송 실패:", err);
    }
  };
  // ───────────────────────────────────────────────────────────────────────────

  // ─── API 응답 → ScheduleCardItem 변환 (routeId 파싱 포함) ─────────────────────
  const transformData = (
    items: LiveApiResponseItem[],
    platform: "kakao" | "naver"
  ): ScheduleCardItem[] =>
    items.map((item, idx) => {
      const dateStr = item.dates?.[0] || new Date().toISOString();
      const dateObj = new Date(dateStr);
      const rawThumb = item.thumbnail;
      const thumbnail =
        rawThumb && rawThumb !== FALLBACK_THUMBNAIL ? rawThumb : undefined;

      // URL 파싱으로 routeId 추출
      let routeId = "";
      try {
        const url = new URL(item.liveUrl);
        if (platform === "kakao") {
          routeId = url.pathname.split("/live/")[1] || "";
        } else {
          routeId = url.pathname.split("/replays/")[1] || "";
        }
      } catch {
        routeId = item.liveId;
      }

      return {
        id: idx,
        title: item.title,
        time: dayjs(dateObj).format("HH:mm"),
        date: dayjs(dateObj).format("YYYY-MM-DD"),
        channel: item.seller ?? item.sellerInfo.name,
        thumbnail,
        isNew: idx < 3,
        category: "기타",
        platform,
        liveId: item.liveId || item.id,
        liveUrl: item.liveUrl,
        routeId,
      };
    });
  // ───────────────────────────────────────────────────────────────────────────

  // ─── 데이터 로딩 ───────────────────────────────────────────────────────────
  const fetchData = async () => {
    setLoadingSchedules(true);
    try {
      const [kakaoRes, naverRes] = await Promise.all([
        fetch("http://localhost:8088/damoa/schedule/kakao"),
        fetch("http://localhost:8088/damoa/schedule/naver"),
      ]);
      const [kakaoJson, naverJson] = await Promise.all([
        kakaoRes.json(),
        naverRes.json(),
      ]);
      setKakaoScheduleData(transformData(kakaoJson, "kakao"));
      setNaverScheduleData(transformData(naverJson, "naver"));
    } catch (err) {
      console.error("스케줄 데이터 불러오기 실패:", err);
    } finally {
      setLoadingSchedules(false);
    }
  };

  const fetchLikes = async (email: string) => {
    try {
      const res = await fetch(
        `http://localhost:8088/api/user/likes?email=${email}`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.liked)) {
        setLikedIds(json.liked.map((id: unknown) => String(id)));
      }
    } catch {
      setLikedIds([]);
    }
  };

  useEffect(() => {
    fetchData();
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.email) fetchLikes(u.email);
      } catch {}
    }
  }, []);
  // ───────────────────────────────────────────────────────────────────────────

  // ─── 찜 토글 함수 ───────────────────────────────────────────────────────────
  const handleLikeToggle = async (liveId: string) => {
    const stored = sessionStorage.getItem("user");
    if (!stored) {
      alert("로그인이 필요합니다.");
      return;
    }
    const { email } = JSON.parse(stored);
    await postEvent(email, "LIKED_LIVE", { ObjectId: liveId });
    setLikedIds((prev) =>
      prev.includes(liveId)
        ? prev.filter((id) => id !== liveId)
        : [...prev, liveId]
    );
  };
  // ───────────────────────────────────────────────────────────────────────────

  // ─── 플랫폼 필터 & 날짜별 그룹핑 ───────────────────────────────────────────
  const filtered = useMemo(() => {
    const all = [...kakaoScheduleData, ...naverScheduleData];
    return platformFilter === "all"
      ? all
      : all.filter((i) => i.platform === platformFilter);
  }, [kakaoScheduleData, naverScheduleData, platformFilter]);

  const grouped = useMemo(() => {
    const map: Record<string, ScheduleCardItem[]> = {};
    filtered.forEach((i) => {
      if (!map[i.date]) map[i.date] = [];
      map[i.date].push(i);
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => a.time.localeCompare(b.time))
    );
    return map;
  }, [filtered]);
  // ───────────────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* ── 상단 헤더 ── */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #FF5722, #3f51b5)",
          color: "#fff",
          py: 5,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Calendar style={{ marginRight: 8 }} />
            <Typography variant="h4" fontWeight={700}>
              방송 편성표
            </Typography>
          </Box>
          <Typography variant="body1">
            DAMOA의 다양한 라이브 방송 일정을 한눈에 확인해보세요.
          </Typography>
        </Box>
      </Box>

      {/* ── 필터 · 뷰 모드 · 날짜 탭 ── */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <ButtonGroup>
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "contained" : "outlined"}
              >
                카드형
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "contained" : "outlined"}
              >
                리스트형
              </Button>
            </ButtonGroup>

            <Tabs
              value={platformFilter}
              onChange={(_, v) => setPlatformFilter(v)}
            >
              <Tab label="전체" value="all" />
              <Tab label="카카오" value="kakao" />
              <Tab label="네이버" value="naver" />
            </Tabs>
          </Box>

          <Tabs
            value={selectedDate}
            onChange={(_, v) => setSelectedDate(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {dateRange.map((date) => (
              <Tab
                key={date}
                value={date}
                label={`${getDateLabel(date)} ${formatDate(date)}`}
              />
            ))}
          </Tabs>
        </Box>

        {/* ── 선택된 날짜의 방송 리스트/카드 ── */}
        <Box sx={{ background: "#fff", borderRadius: 2, p: 3 }}>
          <Typography variant="h6" color="#3f51b5" fontWeight={600} mb={2}>
            {getDateLabel(selectedDate)} 방송 일정 ({formatDate(selectedDate)})
          </Typography>

          {loadingSchedules ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (grouped[selectedDate] || []).length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography color="text.secondary">
                해당 날짜에 방송 일정이 없습니다.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: viewMode === "grid" ? "grid" : "flex",
                gridTemplateColumns:
                  viewMode === "grid"
                    ? {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      }
                    : undefined,
                flexDirection: viewMode === "list" ? "column" : undefined,
                gap: 2,
              }}
            >
              {(grouped[selectedDate] || []).map((item) =>
                viewMode === "list" ? (
                  // ── 리스트형 UI ──
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      gap: 2,
                      p: 2,
                      borderBottom: "1px solid #eee",
                      borderRadius: 1,
                      backgroundColor: "#fafafa",
                      position: "relative",
                      overflow: "hidden",
                      opacity: isStarted(item) ? 1 : 0.5,
                      filter: isStarted(item) ? "none" : "grayscale(70%)",
                    }}
                  >
                    {/* ── 썸네일 ── */}
                    <Box
                      sx={{
                        width: 160,
                        height: 90,
                        backgroundColor: item.thumbnail ? "transparent" : "#ddd",
                        backgroundImage: item.thumbnail
                          ? `url(${item.thumbnail})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        flexShrink: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#666",
                        fontSize: "0.8rem",
                      }}
                    >
                      {!item.thumbnail && "이미지 없음"}
                      {/* 어제/미래 오버레이 */}
                      {(isYesterday(item.date) || !isStarted(item)) && item.thumbnail && (
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: "1rem",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {isYesterday(item.date)
                              ? "방송 종료"
                              : `${item.time} 방송 시작`}
                          </Typography>
                        </Box>
                      )}
                      {/* LIVE 뱃지 (어제 제외) */}
                      {!isYesterday(item.date) && isStarted(item) && item.thumbnail && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            backgroundColor: "red",
                            color: "#fff",
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            px: 1,
                            py: "2px",
                            borderRadius: "4px",
                            zIndex: 2,
                          }}
                        >
                          LIVE
                        </Box>
                      )}
                      {/* 플랫폼 뱃지 */}
                      {item.thumbnail && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            left: 4,
                            backgroundColor:
                              item.platform === "kakao" ? "#FEE500" : "#03C75A",
                            color: "#000",
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                            px: 1,
                            py: "2px",
                            borderRadius: "4px",
                          }}
                        >
                          {item.platform.toUpperCase()}
                        </Box>
                      )}
                    </Box>

                    {/* ── 방송 정보 ── */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        fontWeight={600}
                        fontSize="0.95rem"
                        noWrap
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Tv size={14} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.75rem",
                            color: "#666",
                          }}
                        >
                          {item.channel}
                        </Typography>
                      </Box>
                    </Box>

                    {/* ── 액션 버튼 ── */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <IconButton onClick={() => handleLikeToggle(item.liveId)}>
                        {likedIds.includes(item.liveId) ? (
                          <HeartFilled fill="#e53935" stroke="none" />
                        ) : (
                          <HeartOutline />
                        )}
                      </IconButton>

                      {isStarted(item) && (
                        <Button
                          component={Link}
                          to={`/watch/${item.routeId || item.liveId}`}
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: "none",
                            fontSize: "0.8rem",
                            borderColor: "#3f51b5",
                            color: "#3f51b5",
                            "&:hover": {
                              backgroundColor: "#3f51b5",
                              color: "#fff",
                            },
                          }}
                        >
                          방송 보러 가기
                        </Button>
                      )}
                    </Box>
                  </Box>
                ) : (
                  // ── 카드형 UI ──
                  <Card
                    key={item.id}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                      transition: "all 0.2s",
                      opacity: isStarted(item) ? 1 : 0.5,
                      filter: isStarted(item) ? "none" : "grayscale(70%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* 이미지 & 오버레이 */}
                    <Box sx={{ position: "relative" }}>
                      {item.thumbnail ? (
                        <CardMedia
                          component="div"
                          sx={{
                            height: 160,
                            backgroundImage: `url(${item.thumbnail})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            height: 160,
                            backgroundColor: "#ddd",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#666",
                          }}
                        >
                          이미지 없음
                        </Box>
                      )}

                      {/* 어제/미래 오버레이 */}
                      {(isYesterday(item.date) || !isStarted(item)) && item.thumbnail && (
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {isYesterday(item.date)
                              ? "방송 종료"
                              : `${item.time} 방송 시작`}
                          </Typography>
                        </Box>
                      )}

                      {/* LIVE 뱃지 (어제 제외) */}
                      {!isYesterday(item.date) && isStarted(item) && item.thumbnail && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "red",
                            color: "#fff",
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            px: 1,
                            py: "2px",
                            borderRadius: "4px",
                            zIndex: 2,
                          }}
                        >
                          LIVE
                        </Box>
                      )}

                      {/* 플랫폼 뱃지 */}
                      {item.thumbnail && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            backgroundColor:
                              item.platform === "kakao" ? "#FEE500" : "#03C75A",
                            color: "#000",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            px: 1,
                            py: "2px",
                            borderRadius: "4px",
                          }}
                        >
                          {item.platform.toUpperCase()}
                        </Box>
                      )}
                    </Box>

                    {/* 카드 콘텐츠 */}
                    <CardContent sx={{ p: 1.5 }}>
                      <Typography
                        fontWeight={600}
                        fontSize="0.9rem"
                        noWrap
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Tv size={14} />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.75rem",
                              color: "#666",
                            }}
                          >
                            {item.channel}
                          </Typography>
                        </Box>
                        <IconButton onClick={() => handleLikeToggle(item.liveId)}>
                          {likedIds.includes(item.liveId) ? (
                            <HeartFilled fill="#e53935" stroke="none" />
                          ) : (
                            <HeartOutline />
                          )}
                        </IconButton>
                      </Box>
                    </CardContent>

                    {/* 방송 중일 때만: 방송 보러 가기 */}
                    {isStarted(item) && (
                      <Box sx={{ px: 1, py: 1 }}>
                        <Button
                          component={Link}
                          to={`/watch/${item.routeId || item.liveId}`}
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{
                            textTransform: "none",
                            fontSize: "0.8rem",
                            borderColor: "#3f51b5",
                            color: "#3f51b5",
                            "&:hover": {
                              backgroundColor: "#3f51b5",
                              color: "#fff",
                            },
                          }}
                        >
                          방송 보러 가기
                        </Button>
                      </Box>
                    )}
                  </Card>
                )
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SchedulePage;
