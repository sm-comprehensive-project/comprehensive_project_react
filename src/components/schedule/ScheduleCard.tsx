// src/components/schedule/ScheduleCard.tsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Heart as HeartOutline, Heart as HeartFilled, Tv } from "lucide-react";
import { ScheduleCardItem } from "../../pages/schedule/WeeklySchedule2";

interface ScheduleCardProps {
  item: ScheduleCardItem;
  onLikeToggle: (id: string) => void;
  onWatch: (id: string) => void;
  isStarted: (item: ScheduleCardItem) => boolean;
  likedIds: string[];
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  item,
  onLikeToggle,
  onWatch,
  isStarted,
  likedIds,
}) => (
  <Card
    sx={{
      borderRadius: 2,
      overflow: "hidden",
      position: "relative",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      transition: "all 0.2s",
      opacity: isStarted(item) ? 1 : 0.5,
      filter: isStarted(item) ? "none" : "grayscale(70%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transform: "translateY(-2px)",
      },
    }}
  >
    <Box sx={{ position: "relative" }}>
      {item.thumbnail ? (
        <CardMedia
          component="div"
          sx={{
            height: 160,
            backgroundImage: `url(${item.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <Box
          sx={{
            height: 160,
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
      {!isStarted(item) && item.thumbnail && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "1.5rem",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.time} 방송 시작
          </Typography>
        </Box>
      )}
      {isStarted(item) && item.thumbnail && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "red",
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: "bold",
            px: 1,
            py: "2px",
            borderRadius: "4px",
            zIndex: 2,
          }}
        >
          LIVE
        </Box>
      )}
      {item.thumbnail && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: item.platform === "kakao" ? "#FEE500" : "#03C75A",
            color: "#000",
            fontWeight: 700,
            fontSize: "0.7rem",
            px: 1,
            py: "2px",
            borderRadius: "4px",
          }}
        >
          {item.platform.toUpperCase()}
        </Box>
      )}
    </Box>
    <CardContent sx={{ p: 1.5 }}>
      <Typography
        fontWeight={600}
        fontSize="0.9rem"
        noWrap
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {item.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 0.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tv size={14} />
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "#666" }}
          >
            {item.channel}
          </Typography>
        </Box>
        <IconButton onClick={() => onLikeToggle(item.liveId)}>
          {likedIds.includes(item.liveId) ? (
            <HeartFilled fill="#e53935" stroke="none" />
          ) : (
            <HeartOutline />
          )}
        </IconButton>
      </Box>
    </CardContent>
    {isStarted(item) && (
      <Box sx={{ px: 1, py: 1 }}>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            textTransform: "none",
            fontSize: "0.8rem",
            borderColor: "#3f51b5",
            color: "#3f51b5",
          }}
          onClick={() => onWatch(item.liveId)}
        >
          방송 보러 가기
        </Button>
      </Box>
    )}
  </Card>
);

export default ScheduleCard;
