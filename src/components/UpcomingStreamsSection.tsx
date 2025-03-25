// src/components/UpcomingStreamsSection.tsx
import React from "react";
import { Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

const upcomingStreams = [
  {
    id: 1,
    title: "🎥 20시 시작 | 따뜻한 겨울 패션 특가",
    channel: "라이브쇼핑TV",
    time: "2025-03-16 20:00",
    thumbnail: "/images/streams/stream1.png",
  },
  {
    id: 2,
    title: "🎥 21시 | 1+1 유기농 간식 기획전",
    channel: "헬씨푸드 LIVE",
    time: "2025-03-16 21:00",
    thumbnail: "/images/streams/stream1.png",
  },
];

const UpcomingStreamsSection = () => {
  return (
    <Grid container spacing={3}>
      {upcomingStreams.map((stream) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={stream.id}>
          <Card sx={{ boxShadow: 2 }}>
            <CardMedia
              component="img"
              height="160"
              image={stream.thumbnail}
              alt={stream.title}
            />
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {stream.time}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {stream.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stream.channel}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UpcomingStreamsSection;
