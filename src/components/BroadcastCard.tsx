import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

interface Broadcast {
  id: number;
  date: string;
  time: string;
  title: string;
  channel: string;
  thumbnail: string;
  isLive: boolean;
  block: string;
}

// 채널 색상 매핑
const channelColors: Record<string, string> = {
  카카오: "#FEE500",
  네이버: "#2DB400",
  "11번가": "#FF1E00",
  CJ: "#0095FF",
};

const BroadcastCard: React.FC<{ broadcast: Broadcast }> = ({ broadcast }) => {
  const channelColor = channelColors[broadcast.channel] || "#9E9E9E"; // 기본 회색

  return (
    <Card sx={{ display: "flex", height: 140 }}>
      <CardMedia
        component="img"
        image={broadcast.thumbnail}
        alt={broadcast.title}
        sx={{ width: 120, height: "100%", objectFit: "cover" }}
      />
      <CardContent
        sx={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          py: 1.5,
        }}
      >
        <Typography variant="subtitle2" color="text.secondary" noWrap>
          {broadcast.time} |{" "}
          <span style={{ color: channelColor, fontWeight: "bold" }}>
            ◼ {broadcast.channel}
          </span>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap", // ✅ 한 줄만 보이게
          }}
        >
          {broadcast.title}
        </Typography>

        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
          {broadcast.isLive && <Chip label="LIVE" color="error" size="small" />}
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 20,
              textTransform: "none",
              fontSize: "0.8rem",
              borderColor: "#FF5722",
              color: "#FF5722",
              "&:hover": {
                backgroundColor: "#FFF3E0",
                borderColor: "#FF6D00",
                color: "#FF6D00",
              },
            }}
          >
            방송보기
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BroadcastCard;
