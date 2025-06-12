// src/components/schedule/ScheduleItem.tsx
import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Tv, Heart as HeartOutline, Heart as HeartFilled } from "lucide-react";
import { ScheduleCardItem } from "../../pages/schedule/WeeklySchedule2";

interface ScheduleItemProps {
  item: ScheduleCardItem;
  onLikeToggle: (id: string) => void;
  onWatch: (id: string) => void;
  isStarted: (item: ScheduleCardItem) => boolean;
  likedIds: string[];
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  item,
  onLikeToggle,
  onWatch,
  isStarted,
  likedIds,
}) => (
  <Box
    sx={{
      display: "flex",
      gap: 2,
      p: 2,
      borderBottom: "1px solid #eee",
      borderRadius: 1,
      backgroundColor: "#fafafa",
      position: "relative",
      overflow: "hidden",
      opacity: isStarted(item) ? 1 : 0.5,
      filter: isStarted(item) ? "none" : "grayscale(70%)",
    }}
  >
    <Box
      sx={{
        width: 160,
        height: 90,
        borderRadius: 1,
        backgroundColor: item.thumbnail ? "transparent" : "#ddd",
        backgroundImage: item.thumbnail ? `url(${item.thumbnail})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#666",
        fontSize: "0.8rem",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {!item.thumbnail && "이미지 없음"}
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
              fontSize: "1rem",
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
            top: 4,
            right: 4,
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
            top: 4,
            left: 4,
            backgroundColor: item.platform === "kakao" ? "#FEE500" : "#03C75A",
            color: "#000",
            fontWeight: "bold",
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
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        fontWeight={600}
        fontSize="0.95rem"
        noWrap
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {item.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
        <Tv size={14} />
        <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#666" }}>
          {item.channel}
        </Typography>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <IconButton onClick={() => onLikeToggle(item.liveId)}>
        {likedIds.includes(item.liveId) ? (
          <HeartFilled fill="#e53935" stroke="none" />
        ) : (
          <HeartOutline />
        )}
      </IconButton>
      {isStarted(item) && (
        <Button
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
      )}
    </Box>
  </Box>
);

export default ScheduleItem;
