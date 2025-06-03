// 파일: src/pages/user/MyPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";

// ─────────────────────────────────────────────────────────────────────────────
// 이 페이지 안에서 쓰이는 타입을 모두 정의합니다.
interface LiveApiResponseItem {
  id: string;
  title: string;
  thumbnail: string;
  dates?: string[];
  seller?: string;
  sellerInfo?: { name: string };
  liveId?: string;
  liveUrl?: string;
}

interface ScheduleCardItem {
  id: number;
  title: string;
  time: string;      // "HH:mm"
  date: string;      // "YYYY-MM-DD"
  channel: string;
  thumbnail?: string;
  isNew: boolean;
  category: string;
  platform: "kakao" | "naver";
  liveId: string;
  liveUrl?: string;
}

interface UserInfo {
  email: string;
  nickname: string;
  loginType: string;
  address: string;
  gender: "MALE" | "FEMALE" | string;
  birthDate: string;           // ISO 문자열
  likedLiveIds: string[];
  recentWatchedIds: string[];
  clickedItems: string[];
  interestedCategories: string[];
  searchHistory: string[];
  recommendations: { liveId: string; score: number }[];
}
// ─────────────────────────────────────────────────────────────────────────────

// 헤더에서 쓰이던 카테고리 목록을 그대로 복사합니다.
const categories = [
  { emoji: "👗", label: "패션" },
  { emoji: "💄", label: "뷰티" },
  { emoji: "🥗", label: "푸드" },
  { emoji: "🪑", label: "라이프" },
  { emoji: "✈️", label: "여행/체험" },
  { emoji: "🧸", label: "키즈" },
  { emoji: "💻", label: "테크" },
  { emoji: "⛺", label: "취미레저" },
];

// ★★★ 서버 주소를 여기 하드코딩으로 두고, 필요에 따라 수정하세요 ★★★
const API_BASE = "http://localhost:8088/api/user";
const SCHEDULE_BASE = "http://localhost:8088/damoa/schedule";
const FALLBACK_THUMBNAIL =
  "https://st.kakaocdn.net/commerce_ui/static/common_module/default_fallback_thumbnail.png";

// transformData 함수
const transformData = (
  items: LiveApiResponseItem[] | null,
  platform: "kakao" | "naver"
): ScheduleCardItem[] => {
  if (!items) return [];
  return items.map((item, index) => {
    const dateStr = item.dates?.[0] || new Date().toISOString();
    const date = new Date(dateStr);
    const rawThumb = item.thumbnail;
    const thumbnail =
      rawThumb && rawThumb !== FALLBACK_THUMBNAIL ? rawThumb : undefined;

    return {
      id: index,
      title: item.title,
      time: dayjs(date).format("HH:mm"),
      date: dayjs(date).format("YYYY-MM-DD"),
      channel: item.seller ?? item.sellerInfo?.name ?? "알 수 없음",
      thumbnail,
      isNew: index < 3,
      category: "기타",
      platform,
      liveId: item.liveId || item.id,
      liveUrl: item.liveUrl,
    };
  });
};

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  // ─── 최근 본 방송 스케줄 상태 ─────────────────────────────────────────────
  const [recentWatchedSchedule, setRecentWatchedSchedule] = useState<ScheduleCardItem[]>([]);
  const [loadingRecent, setLoadingRecent] = useState<boolean>(false);

  // ─── 1) 사용자 정보(fetch) ───────────────────────────────────────────────────
  const fetchUserInfo = async (email: string) => {
    try {
      const res = await fetch(`${API_BASE}/me?email=${email}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setUserInfo({
          email: json.user.email,
          nickname: json.user.nickname,
          loginType: json.user.loginType,
          address: json.user.address,
          gender: json.user.gender,
          birthDate: json.user.birthDate,
          likedLiveIds: json.user.likedLiveIds || [],
          recentWatchedIds: json.user.recentWatchedIds || [],
          clickedItems: json.user.clickedItems || [],
          interestedCategories: json.user.interestedCategories || [],
          searchHistory: json.user.searchHistory || [],
          recommendations: json.user.recommendations || [],
        });
      }
    } catch (err) {
      console.error("사용자 정보 조회 실패:", err);
    } finally {
      setLoadingUser(false);
    }
  };

  // ─── 2) 최근 본 방송 스케줄 fetch ────────────────────────────────────────────
  const fetchRecentWatchedSchedule = async (ids: string[]) => {
    setLoadingRecent(true);
    try {
      if (!ids.length) {
        setRecentWatchedSchedule([]);
        return;
      }
      const [kakaoRes, naverRes] = await Promise.all([
        fetch(`${SCHEDULE_BASE}/kakao`),
        fetch(`${SCHEDULE_BASE}/naver`),
      ]);
      const [kakaoJson, naverJson] = await Promise.all([kakaoRes.json(), naverRes.json()]);
      const kakaoItems = transformData(kakaoJson, "kakao");
      const naverItems = transformData(naverJson, "naver");
      const combined = [...kakaoItems, ...naverItems];

      // 필터링
      const matched = combined.filter((item) => ids.includes(item.liveId));
      setRecentWatchedSchedule(matched);
    } catch (err) {
      console.error("최근 본 방송 조회 실패:", err);
    } finally {
      setLoadingRecent(false);
    }
  };

  // ─── 초기 마운트: 세션 스토리지에서 이메일 꺼내기 ─────────────────────────────────
  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.email) {
          fetchUserInfo(u.email);
        }
      } catch {
        console.error("sessionStorage parsing error");
        setLoadingUser(false);
      }
    } else {
      setLoadingUser(false);
    }
  }, []);

  // ─── userInfo.recentWatchedIds가 준비되면 스케줄 데이터를 로드 ─────────────────────
  useEffect(() => {
    if (userInfo && userInfo.recentWatchedIds.length > 0) {
      fetchRecentWatchedSchedule(userInfo.recentWatchedIds);
    }
  }, [userInfo]);

  // ─── 관심 카테고리 추가/제거 ─────────────────────────────────────────────────
  const addCategory = async (category: string) => {
    if (!userInfo) return;
    try {
      await fetch(`${API_BASE}/category/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userInfo.email, category }),
      });
      setUserInfo((prev: UserInfo | null) =>
        prev
          ? {
              ...prev,
              interestedCategories: [...prev.interestedCategories, category],
            }
          : prev
      );
    } catch (err) {
      console.error("카테고리 추가 실패:", err);
    }
  };

  const removeCategory = async (category: string) => {
    if (!userInfo) return;
    try {
      await fetch(`${API_BASE}/category/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userInfo.email, category }),
      });
      setUserInfo((prev: UserInfo | null) =>
        prev
          ? {
              ...prev,
              interestedCategories: prev.interestedCategories.filter((c: string) => c !== category),
            }
          : prev
      );
    } catch (err) {
      console.error("카테고리 제거 실패:", err);
    }
  };

  // 카테고리 클릭 시 토글
  const toggleCategory = (label: string) => {
    if (!userInfo) return;
    if (userInfo.interestedCategories.includes(label)) {
      removeCategory(label);
    } else {
      addCategory(label);
    }
  };

  // ─── 로딩 처리 ───────────────────────────────────────────────────────────────
  if (loadingUser) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userInfo) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography>로그인된 사용자가 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* ── 헤더 영역 ── */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #FF5722, #3f51b5)",
          color: "#fff",
          py: 5,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CalendarTodayIcon sx={{ marginRight: 1 }} />
            <Typography variant="h4" fontWeight={700}>
              마이페이지
            </Typography>
          </Box>
          <Typography variant="body1">내 정보를 확인하고, 관심 방송을 관리해보세요.</Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        {/* ── 1) 프로필 섹션 ── */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 3,
            mb: 4,
            display: "flex",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* 아바타: 닉네임 첫 글자 */}
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#3f51b5",
              fontSize: "1.5rem",
            }}
          >
            {userInfo.nickname.charAt(0).toUpperCase()}
          </Avatar>

          {/* 사용자 기본 정보 */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {userInfo.nickname} 님
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
              이메일: {userInfo.email}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
              생년월일: {dayjs(userInfo.birthDate).format("YYYY년 MM월 DD일")}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
              성별: {userInfo.gender === "MALE" ? "남성" : userInfo.gender === "FEMALE" ? "여성" : "-"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
              주소: {userInfo.address || "-"}
            </Typography>
          </Box>

          {/* 회원 정보 수정 버튼 */}
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: "none", borderColor: "#3f51b5", color: "#3f51b5" }}
            onClick={() => {
              window.location.href = "/mypage/edit";
            }}
          >
            회원 정보 수정
          </Button>
        </Box>

        {/* ── 2) 관심 카테고리 섹션 ── */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 3,
            mb: 4,
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            관심 카테고리
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {categories.map((cat) => {
              const isSelected = userInfo.interestedCategories.includes(cat.label);
              return (
                <Chip
                  key={cat.label}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography>{cat.emoji}</Typography>
                      <Typography>{cat.label}</Typography>
                    </Box>
                  }
                  clickable
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                  onClick={() => toggleCategory(cat.label)}
                  sx={{
                    "& .MuiChip-label": { px: 1.5 },
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* ── 3) 최근 본 방송 섹션 ── */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            최근 본 방송 ({recentWatchedSchedule.length}개)
          </Typography>

          {loadingRecent ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CircularProgress size={24} />
            </Box>
          ) : recentWatchedSchedule.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              {recentWatchedSchedule.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    transition: "all 0.2s",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* 썸네일 */}
                  <Box sx={{ position: "relative" }}>
                    {item.thumbnail ? (
                      <CardMedia
                        component="div"
                        sx={{
                          height: 140,
                          backgroundImage: `url(${item.thumbnail})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 140,
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
                  </Box>

                  <CardContent sx={{ p: 1.5 }}>
                    <Typography fontWeight={600} fontSize="0.9rem" noWrap>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", color: "#666", mt: 0.5 }}
                    >
                      {item.channel}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", color: "#999", mt: 0.5 }}
                    >
                      {item.date} {item.time} 방송
                    </Typography>
                  </CardContent>

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
                      다시 보러 가기
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: "#999" }}>
              최근 본 방송 기록이 없습니다.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyPage;
