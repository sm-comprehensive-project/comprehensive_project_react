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
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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

const channelColors: Record<string, string> = {
  카카오: "#FEE500",
  네이버: "#2DB400",
  "11번가": "#FF1E00",
  CJ: "#0095FF",
};

const channelIcons: Record<string, string> = {
  카카오: "🟡",
  네이버: "🟢",
  "11번가": "🔴",
  CJ: "🔵",
};

const BroadcastCard2: React.FC<{ broadcast: Broadcast }> = ({ broadcast }) => {
  const channelColor = channelColors[broadcast.channel] || "#9E9E9E";
  const channelIcon = channelIcons[broadcast.channel] || "🔘";

  return (
    <Card
      sx={{
        display: "flex",
        height: 140,
        transition: "all 0.3s ease",
        boxShadow: 1,
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.02)",
        },
      }}
    >
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
        {/* 방송 시간 + 채널 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: "1rem" }} />}
            label={broadcast.time}
            size="small"
            sx={{
              backgroundColor: "#F5F5F5",
              fontWeight: "bold",
              fontSize: "0.75rem",
              color: "#333",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: channelColor,
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {channelIcon} {broadcast.channel}
          </Typography>
        </Box>

        {/* 방송 제목 */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {broadcast.title}
        </Typography>

        {/* 하단 버튼 */}
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

export default BroadcastCard2;
