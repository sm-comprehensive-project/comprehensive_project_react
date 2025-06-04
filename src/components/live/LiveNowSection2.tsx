// src/components/live/LiveNowSection2.tsx

import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Link,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface LiveDataRaw {
  liveId: string;
  title: string;
  live: boolean;
  platform: string;
  thumbnail: string;
  liveUrl: string;
}

interface Props {
  data: LiveDataRaw[];
}

// 플랫폼별 색상 반환 (배지용)
const getPlatformColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "kakao":
      return "#FEE500";
    case "naver":
      return "#03C75A";
    case "11st":
    case "11번가":
      return "#FF0000";
    default:
      return "#FF5722";
  }
};

const BroadcastCard = ({ live }: { live: LiveDataRaw }) => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      {/* ───────────────────── 썸네일 영역 ───────────────────── */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="160"
          image={live.thumbnail || "/images/streams/thumbnail.webp"}
          alt={live.title}
          sx={{ objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/streams/thumbnail.webp";
          }}
        />

        {/* 플랫폼 배지 */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: getPlatformColor(live.platform),
            color: "#000",
            fontWeight: 700,
            fontSize: "0.7rem",
            px: 1,
            py: "2px",
            borderRadius: "4px",
          }}
        >
          {live.platform.toUpperCase()}
        </Box>
      </Box>

      {/* ───────────────────── 카드 내용 ───────────────────── */}
      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* 제목 (두 줄 이하로 유지, 넘치면 말줄임) */}
        <Typography
          variant="body2"
          fontWeight="600"
          sx={{
            height: "3rem", // 두 줄 정도 확보
            lineHeight: "1.4rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 1,
          }}
        >
          {live.title.replace(/\n/g, " ")}
        </Typography>

        {/* “방송 바로가기” 버튼 (카드 하단 고정) */}
        <Box sx={{ mt: "auto" }}>
          <Link
            href={live.liveUrl || "#"}
            target="_blank"
            underline="none"
            sx={{
              display: "inline-block",
              fontWeight: "700",
              fontSize: "0.875rem",
              color: "#FF5722",
              border: "1px solid #FF5722",
              borderRadius: 1,
              textAlign: "center",
              width: "100%",
              py: 0.5,
              transition: "background-color 0.2s ease, color 0.2s ease",
              "&:hover": {
                backgroundColor: "#FF5722",
                color: "white",
              },
            }}
          >
            방송 바로가기
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

const LiveNowSection2: React.FC<Props> = ({ data }) => {
  // liveId로 중복 제거
  const uniqueLives = Object.values(
    data.reduce((acc, cur) => {
      if (!acc[cur.liveId]) acc[cur.liveId] = cur;
      return acc;
    }, {} as { [key: string]: LiveDataRaw })
  );

  // 반응형 그리드
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        width: "100%",
        mt: 4,
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
      }}
    >
      <Typography variant="h6" fontWeight="700" mb={2}>
        🔥 방송 카드 리스트
      </Typography>

      <Grid container spacing={3}>
        {uniqueLives.map((live) => (
          <Grid
            item
            key={live.liveId}
            xs={12}   // 모바일: 한 줄에 1개
            sm={6}    // 작은 태블릿(>=600px): 한 줄에 2개
            md={4}    // 데스크탑(>=960px): 한 줄에 3개
            lg={3}    // 큰 데스크탑(>=1280px): 한 줄에 4개
            xl={2}    // 매우 큰 화면(>=1920px): 한 줄에 6개
          >
            <BroadcastCard live={live} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveNowSection2;
