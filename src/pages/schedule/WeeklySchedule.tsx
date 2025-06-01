"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Calendar, Tv, Heart, HeartOff } from "lucide-react";
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

// 🔷 타입 정의
type ScheduleCardItem = {
  id: number;
  title: string;
  time: string;
  date: string;
  channel: string;
  thumbnail: string;
  isNew: boolean;
  category: string;
  platform: "kakao" | "naver";
  liveId: string;
};

type LiveApiResponseItem = {
  id: string;
  liveId: string;
  live: boolean;
  lastUpdated: string;
  liveUrl: string;
  platform: "kakao" | "naver";
  thumbnail: string;
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${
    days[date.getDay()]
  })`;
};

const generateDateRange = () =>
  Array.from({ length: 5 }, (_, i) =>
    dayjs()
      .add(i - 1, "day")
      .format("YYYY-MM-DD")
  );

const getDateLabel = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime() ? "오늘" : "";
};

const SchedulePage: React.FC = () => {
  const dateRange = generateDateRange();
  const today = new Date().toISOString().split("T")[0];
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

  const transformData = (
    items: LiveApiResponseItem[],
    platform: "kakao" | "naver"
  ) =>
    items.map((item, index) => {
      const dateStr = item.dates?.[0] || new Date().toISOString();
      const date = new Date(dateStr);
      return {
        id: index,
        title: item.title,
        time: dayjs(date).format("HH:mm"),
        date: dayjs(date).format("YYYY-MM-DD"),
        channel: item.seller ?? item.sellerInfo?.name ?? "알 수 없음",
        thumbnail: item.thumbnail,
        isNew: index < 3,
        category: "기타",
        platform,
        liveId: item.liveId || item.id,
      };
    });

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
        setLikedIds(result.liked);
      } else {
        setLikedIds([]);
      }
    } catch (err) {
      console.error("찜 목록 조회 오류:", err);
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

  const handleLikeToggle = async (liveId: string) => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      alert("로그인이 필요합니다.");
      return;
    }
    const { email } = JSON.parse(storedUser);
    const isLiked = likedIds.includes(liveId);
    const url = `http://localhost:8088/api/user/like/${liveId}?email=${email}`;
    try {
      const res = await fetch(url, {
        method: isLiked ? "DELETE" : "POST",
      });
      if (res.ok) {
        setLikedIds((prev) =>
          isLiked ? prev.filter((id) => id !== liveId) : [...prev, liveId]
        );
      } else {
        alert("찜 상태 변경 실패");
      }
    } catch (err) {
      console.error("찜 토글 실패:", err);
    }
  };

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

  const handleAlertClick = (item: ScheduleCardItem) => {
    alert(`${item.title} 방송 알림 설정 완료!`);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* 상단 헤더 */}
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

      {/* 필터 및 리스트 */}
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

        {/* 리스트/카드 렌더링 */}
        <Box sx={{ background: "#fff", borderRadius: 2, p: 3 }}>
          <Typography variant="h6" color="#3f51b5" fontWeight={600} mb={2}>
            {getDateLabel(selectedDate)} 방송 일정 ({formatDate(selectedDate)})
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
                // 👉 리스트형 UI
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    borderBottom: "1px solid #eee",
                    borderRadius: 1,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Box
                    sx={{
                      width: 160,
                      height: 90,
                      borderRadius: 1,
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
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
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        right: 4,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        px: 1,
                        py: "2px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {item.time}
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      fontWeight={600}
                      fontSize="0.95rem"
                      mb={0.5}
                      noWrap
                    >
                      {item.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Tv size={14} />
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "0.75rem", color: "#666" }}
                      >
                        {item.channel}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <IconButton
                        onClick={() => {
                          console.log(
                            "🛠️ handleLikeToggle 클릭됨 - item:",
                            item
                          );
                          handleLikeToggle(item.liveId);
                        }}
                      >
                        {likedIds.includes(item.liveId) ? (
                          <Heart color="red" />
                        ) : (
                          <HeartOff />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ) : (
                // 👈 리스트형 끝
                // 👉 카드형 UI
                <Card
                  key={item.id}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    transition: "all 0.2s",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 160,
                        backgroundImage: `url(${item.thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "radial-gradient(transparent, rgba(0,0,0,0.6))",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 8,
                          right: 8,
                          backgroundColor: "rgba(0,0,0,0.7)",
                          color: "#fff",
                          px: 1.2,
                          py: 0.5,
                          borderRadius: 1,
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {item.time}
                      </Box>
                    </CardMedia>
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
                  </Box>
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography fontWeight={600} fontSize="0.9rem" noWrap>
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <IconButton
                          onClick={() => {
                            console.log(
                              "🛠️ handleLikeToggle 클릭됨 - item:",
                              item
                            );
                            handleLikeToggle(item.liveId);
                          }}
                        >
                          {likedIds.includes(item.liveId) ? (
                            <Heart color="red" />
                          ) : (
                            <HeartOff />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                // 👈 카드형 끝
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SchedulePage;
