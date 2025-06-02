import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Grid, Chip } from "@mui/material";

type SearchResultItem = {
  liveId: string;
  title: string;
  thumbnail: string;
  platform: "kakao" | "naver";
  channel: string;
};

const SearchResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query") || "";
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword) return;
      try {
        const res = await fetch(
          `http://localhost:8088/api/search/kakao?keyword=${keyword}`
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("검색 실패:", err);
      }
    };
    fetchSearchResults();
  }, [keyword]);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* 상단 헤더 */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #FF5722, #3f51b5)",
          color: "#fff",
          py: 5,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          🔍 "{keyword}" 검색 결과
        </Typography>
        <Typography variant="body1" mt={1}>
          관련된 라이브 방송을 한눈에 확인해보세요.
        </Typography>
      </Box>

      {/* 검색 결과 목록 */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        {results.length === 0 ? (
          <Typography variant="body1" textAlign="center" color="text.secondary">
            검색 결과가 없습니다.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {results.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.liveId}>
                <Box
                  onClick={() =>
                    (window.location.href = `/watch/${item.liveId}`)
                  }
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {/* 썸네일 영역 (16:9 비율 고정) */}
                  <Box
                    sx={{
                      position: "relative",
                      pt: "56.25%", // 16:9 비율
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* 텍스트 영역 */}
                  <Box sx={{ p: 2 }}>
                    <Typography
                      fontWeight={600}
                      fontSize="1rem"
                      mb={0.5}
                      noWrap
                    >
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {item.channel}
                      </Typography>
                      <Box
                        sx={{
                          px: 1,
                          py: "2px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          backgroundColor:
                            item.platform === "kakao" ? "#FEE500" : "#03C75A",
                          color: item.platform === "kakao" ? "#000" : "#fff",
                          fontWeight: 500,
                        }}
                      >
                        {item.platform.toUpperCase()}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SearchResultPage;
