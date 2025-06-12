// src/components/live/LiveNowSection2.tsx
import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const BroadcastCard: React.FC<{ live: LiveDataRaw }> = ({ live }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={live.thumbnail || "/images/streams/thumbnail.webp"}
          alt={live.title}
          sx={{ objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/streams/thumbnail.webp";
          }}
        />

        {/* LIVE 배지 */}
        {live.live && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: theme.palette.error.main,
              color: "#fff",
              px: 1,
              py: "2px",
              borderRadius: 1,
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            LIVE
          </Box>
        )}

        {/* 플랫폼 배지 */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            bgcolor: getPlatformColor(live.platform),
            color: live.platform.toLowerCase() === "kakao" ? "#000" : "#fff",
            px: 1,
            py: "2px",
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          {live.platform.toUpperCase()}
        </Box>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={700}
          noWrap
          sx={{
            mb: 2,
            fontSize: "0.9rem",
          }}
        >
          {live.title.replace(/\n/g, " ")}
        </Typography>

        {/* 내부 라우팅: /watch/{liveId} */}
        <Button
          onClick={() => navigate(`/watch/${live.liveId}`)}
          fullWidth
          variant="contained"
          color="warning"
          sx={{
            mt: "auto",
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          방송 바로가기
        </Button>
      </CardContent>
    </Card>
  );
};

const LiveNowSection2: React.FC<Props> = ({ data }) => {
  // liveId로 중복 제거
  const uniqueLives = Object.values(
    data.reduce((acc, cur) => {
      acc[cur.liveId] = acc[cur.liveId] || cur;
      return acc;
    }, {} as Record<string, LiveDataRaw>)
  );

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        mt: 4,
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)", // 최대 5개
        },
      }}
    >
      {uniqueLives.map((live) => (
        <BroadcastCard key={live.liveId} live={live} />
      ))}
    </Box>
  );
};

export default LiveNowSection2;
