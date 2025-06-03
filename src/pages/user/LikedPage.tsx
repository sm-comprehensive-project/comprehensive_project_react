// 파일: LikedPage.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Calendar, Tv, Heart as HeartOutline, Heart as HeartFilled } from "lucide-react";
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

// ─────────────────────────────────────────────────────────────────────────────
// ★★★ 타입 정의 (SchedulePage와 동일) ★★★
type ScheduleCardItem = {
  id: number;
  title: string;
  time: string;         // ex. "13:30"
  date: string;         // ex. "2025-06-04"
  channel: string;
  thumbnail?: string;   // 옵셔널: 썸네일이 없을 수도 있으므로
  isNew: boolean;
  category: string;
  platform: "kakao" | "naver";
  liveId: string;
  liveUrl: string;      // “방송 보러 가기” 시 사용할 URL
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
  dates: string[];      // 날짜 문자열 배열 (ISO)
};

// 카카오 기본 썸네일 → “실제 없는 것”과 동일하게 간주
const FALLBACK_THUMBNAIL = "https://st.kakaocdn.net/commerce_ui/static/common_module/default_fallback_thumbnail.png";

// 날짜 포맷 헬퍼 (예: “6월 4일 (수)“)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
};

// 5일치(어제,오늘,내일…) 날짜 배열 생성
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

// 방송이 이미 시작되었는지 여부 판단
const isStarted = (item: ScheduleCardItem) =>
  dayjs(`${item.date}T${item.time}`).isBefore(dayjs());
// ─────────────────────────────────────────────────────────────────────────────

const LikedPage: React.FC = () => {
  const dateRange = generateDateRange();
  const today = dayjs().format("YYYY-MM-DD");

  // ─── 상태 정의 ─────────────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [platformFilter, setPlatformFilter] = useState<"all" | "kakao" | "naver">("all");

  const [kakaoScheduleData, setKakaoScheduleData] = useState<ScheduleCardItem[]>([]);
  const [naverScheduleData, setNaverScheduleData] = useState<ScheduleCardItem[]>([]);

  // “찜한 방송 liveId” 목록
  const [likedIds, setLikedIds] = useState<string[]>([]);
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── Backend로부터 스케줄 데이터를 가져와서 ScheduleCardItem 배열로 변환 ─────────────
  const transformData = (
    items: LiveApiResponseItem[],
    platform: "kakao" | "naver"
  ): ScheduleCardItem[] =>
    items.map((item, index) => {
      const dateStr = item.dates?.[0] || new Date().toISOString();
      const date = new Date(dateStr);

      // “fallback” URL이면(undefined처럼 간주)
      const rawThumb = item.thumbnail;
      const thumbnail =
        rawThumb && rawThumb !== FALLBACK_THUMBNAIL ? rawThumb : undefined;

      return {
        id: index,
        title: item.title,
        time: dayjs(date).format("HH:mm"),
        date: dayjs(date).format("YYYY-MM-DD"),
        channel: item.seller ?? item.sellerInfo?.name ?? "알 수 없음",
        thumbnail,      // 실제 유효한 썸네일 or undefined
        isNew: index < 3,
        category: "기타",
        platform,
        liveId: item.liveId || item.id,
        liveUrl: item.liveUrl,
      };
    });

  // ─── 스케줄 데이터(fetchData) + 찜 목록(fetchLikes) 동시에 불러오기 ───────────────────
  const fetchData = async () => {
    try {
      const [kakaoRes, naverRes] = await Promise.all([
        fetch("http://localhost:8088/damoa/schedule/kakao"),
        fetch("http://localhost:8088/damoa/schedule/naver"),
      ]);
      const [kakaoJson, naverJson] = await Promise.all([kakaoRes.json(), naverRes.json()]);

      const kakaoItems = transformData(kakaoJson, "kakao");
      const naverItems = transformData(naverJson, "naver");

      setKakaoScheduleData(kakaoItems);
      setNaverScheduleData(naverItems);
    } catch (err) {
      console.error("스케줄 데이터 불러오기 실패:", err);
    }
  };

  // 찜(liked) 라이브 ID 목록 가져오기
  const fetchLikes = async (email: string) => {
    try {
      const res = await fetch(`http://localhost:8088/api/user/likes?email=${email}`);
      const result = await res.json();
      if (result.success && Array.isArray(result.liked)) {
        setLikedIds(result.liked);
      } else {
        setLikedIds([]);
      }
    } catch (err) {
      console.error("Liked 목록 불러오기 실패:", err);
      setLikedIds([]);
    }
  };

  useEffect(() => {
    // 1) 스케줄 데이터 fetch
    fetchData();

    // 2) sessionStorage에서 email 파싱 → fetchLikes로 찜 목록 가져오기
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.email) {
          fetchLikes(user.email);
        }
      } catch {
        console.error("sessionStorage 파싱 오류");
      }
    }
  }, []);
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── 찜 토글 (해제) 시, 리프레시해서 likedIds 업데이트 ─────────────────────────────
  const handleLikeToggle = async (liveId: string) => {
    const stored = sessionStorage.getItem("user");
    if (!stored) {
      alert("로그인이 필요합니다.");
      return;
    }
    let email = "";
    try {
      const u = JSON.parse(stored);
      email = u.email;
    } catch {
      return;
    }

    // 이미 likedIds에 있으면 DELETE, 아니면 POST
    const isLiked = likedIds.includes(liveId);
    const url = `http://localhost:8088/api/user/like/${liveId}?email=${email}`;

    try {
      const res = await fetch(url, { method: isLiked ? "DELETE" : "POST" });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) {
        // re-fetch liked 목록
        fetchLikes(email);
      }
    } catch (err) {
      console.error("찜 토글 실패:", err);
    }
  };
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── 플랫폼 필터 & 날짜별 그룹핑 ───────────────────────────────────────────────
  const filteredScheduleData = useMemo(() => {
    // 1. 모든 스케줄(카카오+네이버) 합치기
    let combined = [...kakaoScheduleData, ...naverScheduleData];

    // 2. 플랫폼 필터 적용 (“all”이 아니면)
    if (platformFilter !== "all") {
      combined = combined.filter((item) => item.platform === platformFilter);
    }

    // 3. 사용자가 찜한 ID 목록(likedIds)에 속하는 아이템만 남기기
    combined = combined.filter((item) => likedIds.includes(item.liveId));

    return combined;
  }, [platformFilter, kakaoScheduleData, naverScheduleData, likedIds]);

  // 4. 날짜별 그룹핑 (SchedulePage와 동일)
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
      {/* ── 상단 헤더(SchedulePage와 동일) ── */}
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
              찜한 방송
            </Typography>
          </Box>
          <Typography variant="body1">내가 좋아요 누른 방송만 모아서 볼 수 있어요.</Typography>
        </Box>
      </Box>

      {/* ── 필터, 뷰 모드, 날짜 선택 탭(모두 SchedulePage와 동일) ── */}
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
          {/* 뷰 모드, 플랫폼 필터 영역 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <ButtonGroup>
              <Button onClick={() => setViewMode("grid")} variant={viewMode === "grid" ? "contained" : "outlined"}>
                카드형
              </Button>
              <Button onClick={() => setViewMode("list")} variant={viewMode === "list" ? "contained" : "outlined"}>
                리스트형
              </Button>
            </ButtonGroup>
            <Tabs value={platformFilter} onChange={(_, v) => setPlatformFilter(v)}>
              <Tab label="전체" value="all" />
              <Tab label="카카오" value="kakao" />
              <Tab label="네이버" value="naver" />
            </Tabs>
          </Box>

          {/* 날짜 탭 (5일치) */}
          <Tabs
            value={selectedDate}
            onChange={(_, v) => setSelectedDate(v as string)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {dateRange.map((date) => (
              <Tab
                key={date}
                value={date}
                label={`${getDateLabel(date) ? "오늘 " : ""}${formatDate(date)}`}
              />
            ))}
          </Tabs>
        </Box>

        {/* ── 본문: 선택된 날짜의 찜한 방송 목록 (카드/리스트) ── */}
        <Box sx={{ background: "#fff", borderRadius: 2, p: 3 }}>
          <Typography variant="h6" color="#3f51b5" fontWeight={600} mb={2}>
            {getDateLabel(selectedDate)} 내 찜 방송 ({formatDate(selectedDate)})
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
                    // 방송 시작 여부에 따른 흐림/필터
                    opacity: isStarted(item) ? 1 : 0.5,
                    filter: isStarted(item) ? "none" : "grayscale(70%)",
                  }}
                >
                  {/* 왼쪽: 썸네일 (160px 고정) */}
                  <Box
                    sx={{
                      width: 160,
                      height: 90,
                      borderRadius: 1,
                      backgroundColor: item.thumbnail ? "transparent" : "#ddd",
                      backgroundImage: item.thumbnail ? `url(${item.thumbnail})` : "none",
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
                    {/* 썸네일이 없을 때 */}
                    {!item.thumbnail && <>이미지 없음</>}

                    {/* 방송 전(썸네일이 있을 때): 큰 시간 오버레이 */}
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
                        <Typography sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>
                          {item.time} 방송 시작
                        </Typography>
                      </Box>
                    )}

                    {/* 방송 중(썸네일이 있을 때): 작은 LIVE 뱃지 */}
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
                          backgroundColor: item.platform === "kakao" ? "#FEE500" : "#03C75A",
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

                  {/* 중간: 방송 정보 (제목 + 채널) */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography fontWeight={600} fontSize="0.95rem" noWrap>
                      {item.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Tv size={14} />
                      <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#666" }}>
                        {item.channel}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 오른쪽: 찜 버튼 + 방송 보러 가기 버튼 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    {/* 찜 버튼 */}
                    <IconButton onClick={() => handleLikeToggle(item.liveId)}>
                      {likedIds.includes(item.liveId) ? (
                        <HeartFilled fill="#e53935" stroke="none" />
                      ) : (
                        <HeartOutline />
                      )}
                    </IconButton>

                    {/* 방송 중일 때만 “방송 보러 가기” */}
                    {isStarted(item) && (
                      <Button
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
                        onClick={() => window.open(item.liveUrl, "_blank")}
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
                    filter: isStarted(item) ? "none" : "grayscale(70%)",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
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
                      // 썸네일이 없을 때 대체 UI
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
                        <Typography sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>
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
                          backgroundColor: item.platform === "kakao" ? "#FEE500" : "#03C75A",
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

                  {/* 카드 콘텐츠 (제목/채널/찜) */}
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography fontWeight={600} fontSize="0.9rem" noWrap>
                      {item.title}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Tv size={14} />
                        <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#666" }}>
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

                  {/* 방송 중일 때만: 방송 보러 가기 버튼 */}
                  {isStarted(item) && (
                    <Box sx={{ px: 1, py: 1 }}>
                      <Button
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
                        onClick={() => window.open(item.liveUrl, "_blank")}
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

export default LikedPage;
