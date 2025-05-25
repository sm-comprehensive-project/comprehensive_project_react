"use client";

import React from "react";
import { Calendar, Clock, Tv, Rows, LayoutGrid } from "lucide-react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  ButtonGroup,
} from "@mui/material";
import dayjs from "dayjs";
import kakaoSchedule from "../../assets/data/damoa.kakao_schedule.json";

type KakaoScheduleItem = {
  _id: { $oid: string };
  liveUrl: string;
  channelUrl: string;
  title: string;
  thumbnail: string;
  seller: string;
  platform: string;
  dates: string[];
};

const scheduleData = (kakaoSchedule as KakaoScheduleItem[]).map(
  (item, index) => {
    const date = new Date(item.dates[0]);
    return {
      id: index,
      title: item.title,
      time: dayjs(date).format("HH:mm"),
      date: dayjs(date).format("YYYY-MM-DD"),
      channel: item.seller,
      thumbnail: item.thumbnail,
      isNew: index < 3,
      category: "기타",
    };
  }
);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${
    days[date.getDay()]
  })`;
};

const groupByDate = (data: typeof scheduleData) => {
  const grouped: Record<string, typeof scheduleData> = {};
  data.forEach((item) => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });
  return grouped;
};

const generateDateRange = () => {
  return Array.from({ length: 5 }, (_, i) =>
    dayjs()
      .add(i - 1, "day")
      .format("YYYY-MM-DD")
  );
};

const getDateLabel = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime() ? "오늘" : "";
};

const SchedulePage: React.FC = () => {
  const dateRange = generateDateRange();
  const groupedSchedule = groupByDate(scheduleData);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = React.useState(today);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #FF5722 -40%, #3f51b5 100%)",
          py: { xs: 4, md: 6 },
          color: "white",
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Calendar style={{ marginRight: 8 }} />
            <Typography variant="h4" fontWeight="bold">
              방송 편성표
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ maxWidth: 600 }}>
            DAMOA의 다양한 라이브 방송 일정을 확인하고 관심 있는 방송을 놓치지
            마세요.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 3 }}>
        {/* 날짜 선택 탭 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap", // 반응형 대응
            gap: 1,
            mb: 2,
          }}
        >
          {/* 날짜 탭 */}
          <Tabs
            value={selectedDate}
            onChange={(_, v) => setSelectedDate(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#3f51b5" },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.95rem",
                color: "#666",
                "&.Mui-selected": {
                  color: "#3f51b5",
                  fontWeight: 600,
                },
              },
            }}
          >
            {dateRange.map((date) => (
              <Tab
                key={date}
                value={date}
                label={`${
                  getDateLabel(date) === "오늘" ? "오늘 " : ""
                }${formatDate(date)}`}
              />
            ))}
          </Tabs>

          {/* 보기 전환 버튼 */}
          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={() => setViewMode("grid")}
              variant={viewMode === "grid" ? "contained" : "outlined"}
              startIcon={<LayoutGrid size={16} />}
            >
              카드형
            </Button>
            <Button
              onClick={() => setViewMode("list")}
              variant={viewMode === "list" ? "contained" : "outlined"}
              startIcon={<Rows size={16} />}
            >
              리스트형
            </Button>
          </ButtonGroup>
        </Box>

        {/* 방송 리스트 */}
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            p: 3,
            mb: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h6" color="#3f51b5" fontWeight={600} mb={2}>
            {getDateLabel(selectedDate)} 방송 일정 ({formatDate(selectedDate)})
          </Typography>

          {groupedSchedule[selectedDate] &&
          groupedSchedule[selectedDate].length > 0 ? (
            <Box
              sx={{
                display: viewMode === "grid" ? "grid" : "flex",
                flexDirection: viewMode === "list" ? "column" : undefined,
                gap: 2,
                gridTemplateColumns:
                  viewMode === "grid"
                    ? {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(5, 1fr)",
                      }
                    : undefined,
              }}
            >
              {groupedSchedule[selectedDate].map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    display: viewMode === "list" ? "flex" : "block",
                    gap: 2,
                    borderRadius: 2,
                    overflow: "hidden",
                    minHeight: viewMode === "list" ? 120 : undefined,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      width: viewMode === "list" ? 140 : "100%",
                      height: viewMode === "list" ? 100 : 180,
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flexShrink: 0,
                    }}
                  />
                  <CardContent
                    sx={{
                      p: 2,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          mr: 2,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          minWidth: "auto",
                          whiteSpace: "nowrap",
                          px: 2,
                          py: 0.5,
                          fontSize: "0.75rem",
                          color: "#3f51b5",
                          borderColor: "#3f51b5",
                        }}
                      >
                        알림 설정
                      </Button>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Clock size={14} />
                      <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                        {item.time}
                      </Typography>
                      <Tv size={14} style={{ marginLeft: 12, color: "#666" }} />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.85rem" }}
                      >
                        {item.channel}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography sx={{ textAlign: "center", py: 6, color: "#666" }}>
              해당 날짜에 예정된 방송이 없습니다.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SchedulePage;
