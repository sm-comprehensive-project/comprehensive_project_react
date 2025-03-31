// src/pages/WeeklySchedule.tsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const timeSlots = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

// 임시 편성표 데이터
const schedules = [
  { day: "월", time: "10:00", title: "패션쇼 라이브", channel: "패션피플" },
  { day: "월", time: "14:00", title: "뷰티 Live", channel: "뷰티채널" },
  { day: "화", time: "20:00", title: "푸드쇼핑", channel: "맛집채널" },
  { day: "수", time: "10:00", title: "건강템 특가", channel: "헬스존" },
  { day: "금", time: "18:00", title: "신상 신발 런칭", channel: "감성전자" },
  { day: "일", time: "22:00", title: "야간 타임딜", channel: "야간마켓" },
];

const WeeklySchedule: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        📅 팔로우 중인 방송 편성표
      </Typography>

      <Grid container spacing={1}>
        {/* 요일 헤더 */}
        <Grid item xs={1.2}>
          <Paper elevation={0} sx={{ height: 60 }} />
        </Grid>
        {days.map((day) => (
          <Grid item xs key={day}>
            <Paper
              elevation={2}
              sx={{
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              {day}
            </Paper>
          </Grid>
        ))}

        {/* 시간 슬롯별 라인 */}
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            {/* 시간 표시 */}
            <Grid item xs={1.2}>
              <Paper
                sx={{
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {time}
              </Paper>
            </Grid>

            {/* 각 요일별 셀 */}
            {days.map((day) => {
              const match = schedules.find((s) => s.day === day && s.time === time);
              return (
                <Grid item xs key={day + time}>
                  <Paper
                    elevation={match ? 3 : 1}
                    sx={{
                      height: 120,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: match ? "flex-start" : "center",
                      justifyContent: match ? "center" : "center",
                      backgroundColor: match ? "#FFF3E0" : "#fafafa",
                      color: match ? "#FF5722" : "#aaa",
                      fontWeight: match ? "bold" : "normal",
                      padding: match ? 2 : 1,
                      borderRadius: 2,
                    }}
                  >
                    {match ? (
                      <Box sx={{ textAlign: "left", wordBreak: "keep-all" }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.5 }}>
                          {match.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {match.channel}
                        </Typography>
                      </Box>
                    ) : null}
                  </Paper>
                </Grid>
              );
            })}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklySchedule;
