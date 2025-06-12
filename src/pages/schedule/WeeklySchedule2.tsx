// 파일: src/pages/SchedulePage.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import DateTabs from "../../components/schedule/DateTabs";
import FilterBar from "../../components/schedule/FilterBar";
import ScheduleList from "../../components/schedule/ScheduleList";

// 🔷 타입 정의 (기존과 동일)
export type ScheduleCardItem = {
  id: number;
  title: string;
  time: string;
  date: string;
  channel: string;
  thumbnail?: string;
  isNew: boolean;
  category: string;
  platform: "kakao" | "naver";
  liveId: string;
  liveUrl: string;
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
  sellerInfo: { name: string; url: string; image: string };
  seller?: string;
  dates: string[];
};

const FALLBACK_THUMBNAIL =
  "https://st.kakaocdn.net/commerce_ui/static/common_module/default_fallback_thumbnail.png";

// 날짜 생성 및 포맷 유틸
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
};
const getDateLabel = (dateString: string) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const d = new Date(dateString);
  d.setHours(0,0,0,0);
  return d.getTime() === today.getTime() ? "오늘" : "";
};
const generateDateRange = () =>
  Array.from({ length: 5 }, (_, i) =>
    dayjs().add(i - 1, "day").format("YYYY-MM-DD")
  );
const isStarted = (item: ScheduleCardItem) =>
  dayjs(`${item.date}T${item.time}`).isBefore(dayjs());

const SchedulePage: React.FC = () => {
  const dateRange = generateDateRange();
  const today = dayjs().format("YYYY-MM-DD");

  // 상태
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [platformFilter, setPlatformFilter] = useState<"all" | "kakao" | "naver">("all");
  const [kakaoData, setKakaoData] = useState<ScheduleCardItem[]>([]);
  const [naverData, setNaverData] = useState<ScheduleCardItem[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 이벤트 전송 헬퍼
  const postEvent = async (
    userId: string,
    type: "LIKED_LIVE" | "WATCHED",
    payload: Record<string, unknown>
  ) => {
    try {
      await fetch("/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, type, data: payload }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // API → ScheduleCardItem 변환
  const transform = (items: LiveApiResponseItem[], platform: "kakao" | "naver") =>
    items.map((it, idx) => {
      const dateStr = it.dates?.[0] || new Date().toISOString();
      const raw = it.thumbnail;
      const thumb = raw && raw !== FALLBACK_THUMBNAIL ? raw : undefined;
      return {
        id: idx,
        title: it.title,
        time: dayjs(dateStr).format("HH:mm"),
        date: dayjs(dateStr).format("YYYY-MM-DD"),
        channel: it.seller ?? it.sellerInfo.name,
        thumbnail: thumb,
        isNew: idx < 3,
        category: "기타",
        platform,
        liveId: it.liveId || it.id,
        liveUrl: it.liveUrl,
      };
    });

  // 데이터 로드
  const fetchData = async () => {
    setLoading(true);
    try {
      const [kRes, nRes] = await Promise.all([
        fetch("http://localhost:8088/damoa/schedule/kakao"),
        fetch("http://localhost:8088/damoa/schedule/naver"),
      ]);
      const [kJson, nJson] = await Promise.all([kRes.json(), nRes.json()]);
      setKakaoData(transform(kJson, "kakao"));
      setNaverData(transform(nJson, "naver"));
    } catch {
      console.error("스케줄 로드 실패");
    } finally {
      setLoading(false);
    }
  };

  // 찜 불러오기
  const fetchLikes = async (email: string) => {
    try {
      const res = await fetch(`http://localhost:8088/api/user/likes?email=${email}`);
      const { success, liked } = await res.json();
      setLikedIds(success && Array.isArray(liked) ? liked.map(String) : []);
    } catch {
      setLikedIds([]);
    }
  };

  useEffect(() => {
    fetchData();
    const s = sessionStorage.getItem("user");
    if (s) {
      const u = JSON.parse(s);
      if (u.email) fetchLikes(u.email);
    }
  }, []);

  // 필터링 & 그룹핑
  const filtered = useMemo(() => {
    const all = [...kakaoData, ...naverData];
    return platformFilter === "all"
      ? all
      : all.filter((i) => i.platform === platformFilter);
  }, [platformFilter, kakaoData, naverData]);

  const grouped = useMemo(() => {
    const g: Record<string, ScheduleCardItem[]> = {};
    filtered.forEach((i) => {
      g[i.date] = g[i.date] || [];
      g[i.date].push(i);
    });
    Object.values(g).forEach((arr) =>
      arr.sort((a, b) => a.time.localeCompare(b.time))
    );
    return g;
  }, [filtered]);

  // 찜 토글
  const handleLikeToggle = async (liveId: string) => {
    const s = sessionStorage.getItem("user");
    if (!s) return alert("로그인이 필요합니다.");
    const { email } = JSON.parse(s);
    await postEvent(email, "LIKED_LIVE", { ObjectId: liveId });
    setLikedIds((prev) =>
      prev.includes(liveId) ? prev.filter((x) => x !== liveId) : [...prev, liveId]
    );
  };

  // 시청
  const handleWatch = async (liveId: string) => {
    const s = sessionStorage.getItem("user");
    if (!s) return alert("로그인이 필요합니다.");
    const { email } = JSON.parse(s);
    await postEvent(email, "WATCHED", { ObjectId: liveId });
    window.location.href = `/watch/${liveId}`;
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* ── 헤더 영역 (기존 그대로) ── */}
      {/* ... */}

      {/* ── 필터 & 날짜 탭 ── */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 3 }}>
        <FilterBar
          viewMode={viewMode}
          platformFilter={platformFilter}
          onViewChange={setViewMode}
          onPlatformChange={setPlatformFilter}
        />
        <DateTabs
          dateRange={dateRange}
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          formatDate={formatDate}
          getDateLabel={getDateLabel}
        />
      </Box>

      {/* ── 스케줄 리스트/카드 ── */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, pb: 4 }}>
        <ScheduleList
          items={grouped[selectedDate] || []}
          viewMode={viewMode}
          loading={loading}
          onLikeToggle={handleLikeToggle}
          onWatch={handleWatch}
          isStarted={isStarted}
        />
      </Box>
    </Box>
  );
};

export default SchedulePage;
