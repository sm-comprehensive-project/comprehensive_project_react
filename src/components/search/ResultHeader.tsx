import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import KakaoLogo from "../../assets/icon/kakao-logo.png";
import NaverLogo from "../../assets/icon/naver-logo.png";

export type PlatformFilter = "all" | "kakao" | "naver";

interface ResultHeaderProps {
  title: string;
  count: number;
  filter: PlatformFilter;
  onFilterChange: (newValue: PlatformFilter) => void;
  breadcrumb: string[];
}

const ResultHeader: React.FC<ResultHeaderProps> = ({
  title,
  count,
  filter,
  onFilterChange,
  breadcrumb,
}) => {
  // 두 번째 그라디언트 색상만 filter별로
  const getSecondColor = (f: PlatformFilter) => {
    switch (f) {
      case "kakao": return "#dfc900";
      case "naver": return "#048f42";
      default:      return "#3f51b5";
    }
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(160deg, #FF5722, ${getSecondColor(filter)})`,
        color: "#fff",
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* 좌측 */}
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              {breadcrumb.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <Typography variant="body2" sx={{ color: "#FFE0B2", mr: 0.5 }}>
                    {crumb}
                  </Typography>
                  {idx < breadcrumb.length - 1 && (
                    <Typography variant="body2" sx={{ color: "#FFE0B2", mr: 0.5 }}>
                      &gt;
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </Box>
            <Typography variant="h4" fontWeight={700}>
              {title}
            </Typography>
            <Typography variant="body1" mt={1}>
              총 <strong>{count}</strong>개 결과
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Tabs
                value={filter}
                onChange={(_e, v) => onFilterChange(v as PlatformFilter)}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1,
                  "& .MuiTabs-indicator": { backgroundColor: "#FF5722" },
                }}
              >
                <Tab label="전체" value="all" />
                <Tab label="Kakao" value="kakao" />
                <Tab label="Naver" value="naver" />
              </Tabs>
            </Box>
          </Box>

          {/* 우측 로고/텍스트 */}
          {filter === "kakao" ? (
            <Box
              component="img"
              src={KakaoLogo}
              alt="Kakao 로고"
              sx={{ width: { xs: 80, sm: 100, md: 120 }, opacity: 0.8, mt: { xs: 3, md: 0 } }}
            />
          ) : filter === "naver" ? (
            <Box
              component="img"
              src={NaverLogo}
              alt="Naver 로고"
              sx={{ width: { xs: 80, sm: 100, md: 120 }, opacity: 0.8, mt: { xs: 3, md: 0 } }}
            />
          ) : (
            <Typography variant="h5" fontWeight={700} sx={{ whiteSpace: "nowrap", opacity: 0.9, mt: { xs: 3, md: 0 } }}>
              다 모 아
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ResultHeader;
