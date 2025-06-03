// 파일: SchedulePage.tsx
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
} from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom"; // ← Link 추가

// 🔷 타입 정의
type ScheduleCardItem = {
  id: number;
  title: string;
  time: string; // ex. "13:30"
  date: string; // ex. "2025-06-04"
  channel: string;
  thumbnail?: string; // 썸네일이 없을 수 있으므로 옵셔널로 변경
  isNew: boolean;
  category: string;
  platform: "kakao" | "naver";
  liveId: string;
  liveUrl: string; // “방송 보러 가기” 시 사용할 URL (WatchPage에서 처리)
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
  dates: string[]; // 날짜 문자열 배열 (ISO)
};

// 카카오 기본 썸네일(실제로는 “이미지 없음”과 동일하게 처리)
const FALLBACK_THUMBNAIL =
  "https://st.kakaocdn.net/commerce_ui/static/common_module/default_fallback_thumbnail.png";

// ─────────────────────────────────────────────────────────────────────────────
// 날짜를 “6월 4일 (수)” 형식으로 바꿔주는 유틸
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${
    days[date.getDay()]
  })`;
};

// 5일치(어제, 오늘, 내일, …) 날짜 배열 생성
const generateDateRange = () =>
  Array.from({ length: 5 }, (_, i) =>
    dayjs().add(i - 1, "day").format("YYYY-MM-DD")
  );

// 오늘인 경우 “오늘” 표시
const getDateLabel = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime() ? "오늘" : "";
};

// 방송이 시작되었는지 여부 판단 (현재 시간이 “날짜+시간”보다 이후인지)
const isStarted = (item: ScheduleCardItem) =>
  dayjs(`${item.date}T${item.time}`).isBefore(dayjs());
// ─────────────────────────────────────────────────────────────────────────────

const SchedulePage: React.FC = () => {
  const dateRange = generateDateRange();
  const today = dayjs().format("YYYY-MM-DD");

  // ─── 상태값 정의 ─────────────────────────────────────────────────────────────
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
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── API 응답을 ScheduleCardItem 형태로 바꿔주는 함수 ─────────────────────────────
  const transformData = (
    items: LiveApiResponseItem[],
    platform: "kakao" | "naver"
  ) =>
    items.map((item, index) => {
      const dateStr = item.dates?.[0] || new Date().toISOString();
      const date = new Date(dateStr);

      // fallback URL과 동일하면 undefined로 간주
      const rawThumb = item.thumbnail;
      const thumbnail =
        rawThumb && rawThumb !== FALLBACK_THUMBNAIL ? rawThumb : undefined;

      return {
        id: index,
        title: item.title,
        time: dayjs(date).format("HH:mm"),
        date: dayjs(date).format("YYYY-MM-DD"),
        channel: item.seller ?? item.sellerInfo?.name ?? "알 수 없음",
        thumbnail, // 이제 undefined일 수도 있음
        isNew: index < 3,
        category: "기타",
        platform,
        liveId: item.liveId || item.id,
        liveUrl: item.liveUrl, // 외부 URL은 WatchPage 내에서 실제 사용
      };
    });
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── 스케줄 데이터 & 찜 목록 불러오기 ───────────────────────────────────────────
  const fetchData = async () => {
    try {
      const [kakaoRes, naverRes] = await Promise.all([
        fetch("http://localhost:8088/damoa/schedule/kakao"),
        fetch("http://localhost:8088/damoa/schedule/naver"),
      ]);
      const [kakaoData, naverData] = await Promise.all([
        kakaoRes.json(),
        naverRes.json(),
      ]);

      setKakaoScheduleData(transformData(kakaoData, "kakao"));
      setNaverScheduleData(transformData(naverData, "naver"));
    } catch (err) {
      console.error("스케줄 데이터 불러오기 실패:", err);
    }
  };

  const fetchLikes = async (email: string) => {
    try {
      const res = await fetch(
        `http://localhost:8088/api/user/likes?email=${email}`
      );
      const result = await res.json();

      if (result.success && Array.isArray(result.liked)) {
        setLikedIds(result.liked.map((id: unknown) => String(id)));
      } else {
        setLikedIds([]);
      }
    } catch (err) {
      console.error(err);
      setLikedIds([]);
    }
  };

  useEffect(() => {
    fetchData();
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.email) fetchLikes(user.email);
      } catch (err) {
        console.error("세션 파싱 실패:", err);
      }
    }
  }, []);
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── 찜 토글 함수 ─────────────────────────────────────────────────────────────
  const handleLikeToggle = async (liveId: string) => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    let email = "";
    try {
      const user = JSON.parse(storedUser);
      email = user?.email;
    } catch {
      return;
    }

    const isLiked = likedIds.includes(liveId);
    const url = `http://localhost:8088/api/user/like/${liveId}?email=${email}`;

    try {
      const res = await fetch(url, {
        method: isLiked ? "DELETE" : "POST",
      });
      const result = await res.json().catch(() => ({}));

      if (res.ok && result.success !== false) {
        setLikedIds((prev) =>
          isLiked ? prev.filter((id) => id !== liveId) : [...prev, liveId]
        );
      }
    } catch {}
  };
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── 플랫폼 필터 & 날짜별 그룹핑 ───────────────────────────────────────────────
  const filteredScheduleData = useMemo(() => {
    let combined = [...kakaoScheduleData, ...naverScheduleData];
    if (platformFilter !== "all") {
      combined = combined.filter((item) => item.platform === platformFilter);
    }
    return combined;
  }, [platformFilter, kakaoScheduleData, naverScheduleData]);

  const groupedSchedule = useMemo(() => {
    const grouped: Record<string, ScheduleCardItem[]> = {};
    filteredScheduleData.forEach((item) => {
      if (!grouped[item.date]) grouped[item.date] = [];
      grouped[item.date].push(item);
    });
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => a.time.localeCompare(b.time));
    });
    return grouped;
  }, [filteredScheduleData]);
  // ─────────────────────────────────────────────────────────────────────────────

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

      {/* ── 필터, 뷰 모드, 날짜 선택 탭 ── */}
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
                label={`${getDateLabel(date) ? "오늘 " : ""}${formatDate(
                  date
                )}`}
              />
            ))}
          </Tabs>
        </Box>

        {/* ── 선택된 날짜의 방송 리스트/카드 영역 ── */}
        <Box sx={{ background: "#fff", borderRadius: 2, p: 3 }}>
          <Typography
            variant="h6"
            color="#3f51b5"
            fontWeight={600}
            mb={2}
          >
            {getDateLabel(selectedDate)} 방송 일정 (
            {formatDate(selectedDate)})
          </Typography>

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
            {(groupedSchedule[selectedDate] || []).map((item) =>
              viewMode === "list" ? (
                // ─── 리스트형 UI ─────────────────────────────────
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
                    filter: isStarted(item)
                      ? "none"
                      : "grayscale(70%)",
                  }}
                >
                  {/* ── 왼쪽: 썸네일 (160px 고정) ── */}
                  <Box
                    sx={{
                      width: 160,
                      height: 90,
                      borderRadius: 1,
                      backgroundColor: item.thumbnail
                        ? "transparent"
                        : "#ddd", // 썸네일이 없으면 회색 박스
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
                    {/* 썸네일이 없을 때 “이미지 없음” 표시 */}
                    {!item.thumbnail && <>이미지 없음</>}

                    {/* 방송 전: 큰 시간 오버레이 */}
                    {!isStarted(item) && item.thumbnail && (
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
                          }}
                        >
                          {item.time} 방송 시작
                        </Typography>
                      </Box>
                    )}

                    {/* 방송 중: 작은 LIVE 뱃지 */}
                    {isStarted(item) && item.thumbnail && (
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
                            item.platform === "kakao"
                              ? "#FEE500"
                              : "#03C75A",
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

                  {/* ── 중간: 방송 정보 (flex:1) ── */}
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
                        sx={{ fontSize: "0.75rem", color: "#666" }}
                      >
                        {item.channel}
                      </Typography>
                    </Box>
                  </Box>

                  {/* ── 오른쪽: 찜 버튼 + 방송 보러 가기 버튼(세로 정렬) ── */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    {/* 찜 버튼: 좋아요 상태에 따라 하트 채워짐 */}
                    <IconButton
                      onClick={() => handleLikeToggle(item.liveId)}
                    >
                      {likedIds.includes(item.liveId) ? (
                        <HeartFilled
                          fill="#e53935"
                          stroke="none"
                        />
                      ) : (
                        <HeartOutline />
                      )}
                    </IconButton>

                    {/* 방송 중일 때만 “방송 보러 가기” 표시 */}
                    {isStarted(item) && (
                      <Button
                        component={Link}
                        to={`/watch/${item.liveId}`} // ← 내부 라우트로 이동
                        variant="outlined" // 디자인을 튀지 않도록 outlined 로 변경
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
                // ─── 카드형 UI ───────────────────────────────────────────────
                <Card
                  key={item.id}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    transition: "all 0.2s",
                    opacity: isStarted(item) ? 1 : 0.5,
                    filter: isStarted(item)
                      ? "none"
                      : "grayscale(70%)",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* ── 이미지 & 오버레이 ── */}
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
                      // 썸네일이 없을 때 회색 배경 & “이미지 없음” 텍스트
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

                    {/* 방송 전: 큰 시간 오버레이 */}
                    {!isStarted(item) && item.thumbnail && (
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
                          }}
                        >
                          {item.time} 방송 시작
                        </Typography>
                      </Box>
                    )}

                    {/* 방송 중: 작은 LIVE 뱃지 */}
                    {isStarted(item) && item.thumbnail && (
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
                            item.platform === "kakao"
                              ? "#FEE500"
                              : "#03C75A",
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

                  {/* ── 카드 콘텐츠 ── */}
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography
                      fontWeight={600}
                      fontSize="0.9rem"
                      noWrap
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
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Tv size={14} />
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.75rem", color: "#666" }}
                        >
                          {item.channel}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleLikeToggle(item.liveId)}
                      >
                        {likedIds.includes(item.liveId) ? (
                          <HeartFilled
                            fill="#e53935"
                            stroke="none"
                          />
                        ) : (
                          <HeartOutline />
                        )}
                      </IconButton>
                    </Box>
                  </CardContent>

                  {/* ── 방송 중일 때만: 방송 보러 가기 버튼 ── */}
                  {isStarted(item) && (
                    <Box sx={{ px: 1, py: 1 }}>
                      <Button
                        component={Link}
                        to={`/watch/${item.liveId}`} // ← 내부 라우트로 이동
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
        </Box>
      </Box>
    </Box>
  );
};

export default SchedulePage;
