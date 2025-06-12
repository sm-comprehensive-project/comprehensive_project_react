// src/components/schedule/ScheduleList.tsx
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import ScheduleCard from "./ScheduleCard";
import ScheduleItem from "./ScheduleItem";
import { ScheduleCardItem } from "../../pages/schedule/WeeklySchedule2";

interface ScheduleListProps {
  items: ScheduleCardItem[];
  loading: boolean;
  viewMode: "grid" | "list";
  onLikeToggle: (id: string) => void;
  onWatch: (id: string) => void;
  isStarted: (item: ScheduleCardItem) => boolean;
  likedIds: string[];
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  items,
  loading,
  viewMode,
  onLikeToggle,
  onWatch,
  isStarted,
  likedIds,
}) => {
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography color="text.secondary">
          해당 날짜에 방송 일정이 없습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={
        viewMode === "grid"
          ? {
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              },
            }
          : { display: "flex", flexDirection: "column", gap: 2 }
      }
    >
      {items.map((item) =>
        viewMode === "grid" ? (
          <ScheduleCard
            key={item.id}
            item={item}
            onLikeToggle={onLikeToggle}
            onWatch={onWatch}
            isStarted={isStarted}
            likedIds={likedIds}
          />
        ) : (
          <ScheduleItem
            key={item.id}
            item={item}
            onLikeToggle={onLikeToggle}
            onWatch={onWatch}
            isStarted={isStarted}
            likedIds={likedIds}
          />
        )
      )}
    </Box>
  );
};

export default ScheduleList;
