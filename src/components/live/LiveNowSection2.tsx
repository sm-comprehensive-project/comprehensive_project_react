// src/components/live/LiveNowSection2.tsx

import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Avatar,
  Link,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface SellerInfo {
  name: string;
  url: string;
  image: string;
}

interface LiveDataRaw {
  liveId: string;
  title: string;
  live: boolean;
  platform: string;
  sellerInfo: SellerInfo;
  thumbnail: string;
  liveUrl: string;
}

interface Props {
  data: LiveDataRaw[];
}

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
  const hasSellerUrl = !!live.sellerInfo?.url && live.sellerInfo.url !== "URL 없음";

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
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
      <CardMedia
        component="img"
        height="180"
        image={live.thumbnail || "/images/streams/thumbnail.webp"}
        alt={live.title}
        sx={{ objectFit: "cover" }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/streams/thumbnail.webp";
        }}
      />
      <CardContent sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography
          variant="caption"
          fontWeight="700"
          gutterBottom
          sx={{
            color: getPlatformColor(live.platform),
            mb: 0.5,
          }}
        >
          📺 {live.platform.toUpperCase()} 방송
        </Typography>

        <Typography
          variant="body2"
          fontWeight="bold"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mb: 1,
          }}
        >
          {live.title.replace(/\n/g, " ")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          {hasSellerUrl ? (
            <Link
              href={live.sellerInfo.url}
              target="_blank"
              underline="none"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  color: "#FF5722",
                },
                cursor: "pointer",
              }}
            >
              <Avatar
                src={live.sellerInfo.image}
                alt={live.sellerInfo.name}
                sx={{ width: 24, height: 24 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/default_seller.png";
                }}
              />
              <Typography variant="subtitle2" noWrap>
                {live.sellerInfo.name ?? "정보 없음"}
              </Typography>
            </Link>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#999" }}>
              <Avatar
                src={live.sellerInfo.image}
                alt={live.sellerInfo.name}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="subtitle2" noWrap>
                {live.sellerInfo.name ?? "정보 없음"}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Link
            href={live.liveUrl || "#"}
            target="_blank"
            underline="none"
            sx={{
              display: "inline-block",
              fontWeight: "bold",
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
            👉 방송 바로가기
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

const LiveNowSection2 = ({ data }: Props) => {
  // ID 중복 제거
  const uniqueLives = Object.values(
    data.reduce((acc, cur) => {
      if (!acc[cur.liveId]) acc[cur.liveId] = cur;
      return acc;
    }, {} as { [key: string]: LiveDataRaw })
  );

  // 반응형 여부에 따라 컬럼 갯수 변경 (예: 모바일일 땐 1컬럼, 태블릿 2컬럼 등)
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

      {/* Grid 컨테이너 */}
      <Grid container spacing={3}>
        {uniqueLives.map((live) => (
          <Grid
            item
            key={live.liveId}
            xs={12}   // 모바일: 한 줄에 1개
            sm={6}    // 작은 태블릿(≥600px): 한 줄에 2개
            md={4}    // 데스크탑(≥960px): 한 줄에 3개
            lg={3}    // 큰 데스크탑(≥1280px): 한 줄에 4개
            xl={2}    // 매우 큰 화면(≥1920px): 한 줄에 6개
          >
            <BroadcastCard live={live} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveNowSection2;
