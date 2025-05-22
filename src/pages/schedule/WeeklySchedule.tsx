"use client"

import React from "react"
import { Calendar, Clock, Tv, BellRing } from "lucide-react"
import { Box, Typography, Card, CardContent, CardMedia, Button, Tabs, Tab, Divider } from "@mui/material"
import dayjs from "dayjs"

// 더미 데이터: 방송 예정 정보
const dummyScheduleData = [
  {
    id: 1,
    title: "[신상품] 봄맞이 패션 아이템 특가전",
    time: "10:00",
    date: "2023-05-08",
    channel: "DAMOA 패션",
    thumbnail: "/images/vibrant-runway-show.png",
    isNew: true,
    category: "패션",
  },
  {
    id: 2,
    title: "프프프프프프리미엄 스킨케어 브랜드 론칭 방송",
    time: "12:30",
    date: "2023-05-08",
    channel: "DAMOA 뷰티",
    thumbnail: "/images/diverse-beauty-display.png",
    isNew: false,
    category: "뷰티",
  },
  // ... 나머지 데이터
]

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const days = ["일", "월", "화", "수", "목", "금", "토"]
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = days[date.getDay()]
  return `${month}월 ${day}일 (${dayOfWeek})`
}

// 날짜별로 데이터 그룹화
const groupByDate = (data: typeof dummyScheduleData) => {
  const grouped: Record<string, typeof dummyScheduleData> = {}

  data.forEach((item) => {
    if (!grouped[item.date]) {
      grouped[item.date] = []
    }
    grouped[item.date].push(item)
  })

  return grouped
}

const generateDateRange = () => {
  const dates: string[] = []

  for (let i = -1; i <= 3; i++) {
    const date = dayjs().add(i, "day").format("YYYY-MM-DD")
    dates.push(date)
  }

  return dates
}

// 날짜에 해당하는 한글 표현 가져오기
const getDateLabel = (dateString: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const date = new Date(dateString)
  date.setHours(0, 0, 0, 0)

  const diffDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // 오늘만 "오늘"로 표시하고 나머지는 날짜만 표시
  if (diffDays === 0) {
    return "오늘"
  } else {
    return ""
  }
}

const SchedulePage: React.FC = () => {
  // 날짜 범위 생성 (어제부터 4일 후까지)
  const dateRange = generateDateRange()

  // 날짜별로 그룹화된 데이터
  const groupedSchedule = groupByDate(dummyScheduleData)

  // 기본 선택 날짜를 오늘로 설정
  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = React.useState(today)

  const handleDateChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedDate(newValue)
  }

  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        {/* 페이지 헤더 */}
        <Box
          sx={{
            background: "linear-gradient(160deg, #FF5722 -40%, #3f51b5 100%)",
            py: { xs: 4, md: 6 },
            color: "white",
          }}
        >
          <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box sx={{ mr: 1, fontSize: "1.5rem" }}>
                <Calendar />
              </Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                방송 편성표
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                maxWidth: "600px",
              }}
            >
              DAMOA의 다양한 라이브 방송 일정을 확인하고 관심 있는 방송을 놓치지 마세요.
            </Typography>
          </Box>
        </Box>



        {/* 날짜 탭 */}
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 2, py: 3 }}>
          <Tabs
            value={selectedDate}
            onChange={handleDateChange}
            variant="scrollable"
            scrollButtons="auto"
            centered
            sx={{
              mb: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "#3f51b5",
              },
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
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            {dateRange.map((date) => {
              const isToday = new Date(date).toDateString() === new Date().toDateString()
              const displayText = `${getDateLabel(date) === "오늘" ? "오늘 " : ""}${formatDate(date)}`
              return (
                <Tab
                  key={date}
                  value={date}
                  label={
                    <Typography
                      variant="body2"
                      fontWeight={isToday ? 600 : 400}
                      sx={{
                        color: isToday ? "#3f51b5" : "inherit",
                      }}
                    >
                      {displayText}
                    </Typography>
                  }
                />
              )
            })}
          </Tabs>


          <Box sx={{ bgcolor: "white", borderRadius: 2, p: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box sx={{ mr: 1, color: "#3f51b5" }}>
                <Calendar />
              </Box>
              <Typography variant="h6" color="#3f51b5" fontWeight={600}>
                {getDateLabel(selectedDate)} 방송 일정 ({formatDate(selectedDate)})
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
              {groupedSchedule[selectedDate] && groupedSchedule[selectedDate].length > 0 ? (
                groupedSchedule[selectedDate].map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="div"
                        sx={{
                          height: 180,
                          backgroundImage: `url(${item.thumbnail})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <Box sx={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 1 }}>
                        <Box
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "white",
                            fontSize: "0.75rem",
                            borderRadius: "4px",
                            px: 1.5,
                            py: 0.5,
                          }}
                        >
                          {item.category}
                        </Box>
                        {item.isNew && (
                          <Box
                            sx={{
                              backgroundColor: "#f44336",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                              px: 1.5,
                              py: 0.5,
                            }}
                          >
                            NEW
                          </Box>
                        )}
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                          p: 1.5,
                          pt: 3,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
                          <Clock size={14} style={{ marginRight: 4 }} />
                          <Typography variant="body2" fontWeight={500}>
                            {item.time}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle1"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          fontSize: "0.95rem",
                          height: "2.8rem",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Tv size={14} style={{ marginRight: 4, color: "#666" }} />
                        <Typography variant="body2" color="text.secondary">
                          {item.channel}
                        </Typography>
                      </Box>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          borderColor: "#3f51b5",
                          color: "#3f51b5",
                          "&:hover": {
                            borderColor: "#303f9f",
                            backgroundColor: "rgba(63, 81, 181, 0.04)",
                          },
                        }}
                      >
                        알림 설정
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 6, color: "#666" }}>
                  <Typography>해당 날짜에 예정된 방송이 없습니다.</Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* 카테고리별 필터링 섹션 */}
          <Box sx={{ bgcolor: "white", borderRadius: 2, p: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              카테고리별 방송 찾기
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {["전체", "패션", "뷰티", "푸드", "라이프", "여행/체험", "키즈", "테크", "취미레저"].map(
                (category, index) => (
                  <Box
                    key={category}
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      bgcolor: index === 0 ? "#3f51b5" : "transparent",
                      color: index === 0 ? "white" : "#666",
                      border: index === 0 ? "none" : "1px solid #ddd",
                      "&:hover": {
                        bgcolor: index === 0 ? "#303f9f" : "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    {category}
                  </Box>
                ),
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              원하는 카테고리를 선택하여 관심 있는 방송만 필터링해 보세요.
            </Typography>
          </Box>

          {/* 추가 정보 섹션 */}
          <Box sx={{ bgcolor: "#e8eaf6", borderRadius: 2, p: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
              <BellRing size={20} style={{ color: "#3f51b5", marginRight: 8, marginTop: 2 }} />
              <Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  알림 설정 안내
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  관심 있는 방송의 '알림 설정' 버튼을 클릭하면 방송 시작 30분 전에 알림을 받을 수 있습니다. 로그인 후
                  이용 가능한 서비스입니다.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: "#3f51b5",
                      "&:hover": {
                        bgcolor: "#303f9f",
                      },
                    }}
                    href="/login"
                  >
                    로그인하기
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "#3f51b5",
                      color: "#3f51b5",
                      "&:hover": {
                        borderColor: "#303f9f",
                        bgcolor: "rgba(63, 81, 181, 0.04)",
                      },
                    }}
                  >
                    자세히 알아보기
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  )
}

export default SchedulePage
