import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";

type SearchResultItem = {
  liveId: string;
  title: string;
  thumbnail: string;
  platform: "kakao" | "naver";
  channel: string;
};

// highlightKeyword 함수 정의
function highlightKeyword(text: string, keyword: string) {
  if (!keyword) return text;
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span key={i} style={{ color: "#FF5722", fontWeight: 700 }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const SearchResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query") || "";
  const [results, setResults] = useState<SearchResultItem[]>([]);

  // 플랫폼 필터 상태: "all" | "kakao" | "naver"
  const [platformFilter, setPlatformFilter] = useState<"all" | "kakao" | "naver">(
    "all"
  );

  // platformFilter 기준으로 걸러진 결과 배열
  const filteredResults = results.filter((item) =>
    platformFilter === "all" ? true : item.platform === platformFilter
  );

  // 디버깅: 필터 결과가 바뀔 때마다 로그
  useEffect(() => {
    console.log("🔎 keyword:", keyword);
    console.log("📑 results 전체 개수:", results.length);
    console.log("🔍 platformFilter:", platformFilter);
    console.log("✅ filteredResults 개수:", filteredResults.length);
  }, [keyword, results, platformFilter, filteredResults]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword) return;
      console.log("🛰 Fetch 시작 (keyword):", keyword);
      try {
        const res = await fetch(
          `http://localhost:8088/api/search/kakao?keyword=${keyword}`
        );
        const data = await res.json();
        console.log("🛰 fetch 성공, 데이터:", data);
        setResults(data);
      } catch (err) {
        console.error("❌ 검색 실패:", err);
      }
    };
    fetchSearchResults();
  }, [keyword]);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* 1) 상단 헤더 */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #FF5722, #3f51b5)",
          color: "#fff",
          py: 4,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          {/* 1-1) Breadcrumb */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#FFE0B2", mr: 0.5 }}>
              홈
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFE0B2", mr: 0.5 }}>
              &gt;
            </Typography>
            <Typography variant="body2" sx={{ color: "#FFE0B2" }}>
              검색
            </Typography>
          </Box>
          {/* 1-2) 메인 제목 */}
          <Typography variant="h4" fontWeight={700}>
            🔍 "{keyword}" 검색 결과
          </Typography>
          <Typography variant="body1" mt={1}>
            총 <strong>{results.length}</strong>개 결과
          </Typography>
          {/* 1-3) 플랫폼 필터 버튼 */}
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
              onChange={(
                _e: React.SyntheticEvent,
                v: "all" | "kakao" | "naver"
              ) => {
                console.log("💾 setPlatformFilter 호출:", v);
                setPlatformFilter(v);
              }}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            >
              <Tab label="전체" value="all" />
              <Tab label="Kakao" value="kakao" />
              <Tab label="Naver" value="naver" />
            </Tabs>
          </Box>
        </Box>
      </Box>

      {/* 2) 검색 결과 영역 (리스트형만) */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        {filteredResults.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
          >
            검색 결과가 없습니다.
          </Typography>
        ) : (
          /* 리스트형으로만 렌더링 */
          <Box>
            {filteredResults.map((item) => (
              <Box
                key={item.liveId}
                onClick={() => {
                  console.log("🔗 리스트 아이템 클릭:", item.liveId);
                  window.location.href = `/watch/${item.liveId}`;
                }}
                sx={{
                  display: "flex",
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  mb: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                {/* 썸네일 (작게, 16:9 비율) */}
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 160,
                    height: 90,
                    backgroundImage: `url(${item.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* 텍스트 영역 */}
                <Box sx={{ flexGrow: 1, p: 2 }}>
                  <Typography fontWeight={600} fontSize="1rem" noWrap>
                    {highlightKeyword(item.title, keyword)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.channel}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      👁 3,500명 · LIVE
                    </Typography>
                    <Chip
                      label={item.platform.toUpperCase()}
                      size="small"
                      sx={{
                        backgroundColor:
                          item.platform === "kakao" ? "#FEE500" : "#03C75A",
                        color: item.platform === "kakao" ? "#000" : "#fff",
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchResultPage;
