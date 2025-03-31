import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import LiveStreamCard from "../live/LiveStreamCard";

const streamData = [
  { id: 1, title: "방송 1", thumbnail: "/images/streams/stream1.png" },
  { id: 2, title: "방송 2", thumbnail: "/images/streams/stream1.png" },
  { id: 3, title: "방송 3", thumbnail: "/images/streams/stream1.png" },
  { id: 4, title: "방송 4", thumbnail: "/images/streams/stream1.png" },
  { id: 5, title: "방송 5", thumbnail: "/images/streams/stream1.png" },
  { id: 6, title: "방송 6", thumbnail: "/images/streams/stream1.png" },
];

const MainContent: React.FC = () => {
  return (
    <Box>
      {/* 카테고리 제목 */}
      <Typography variant="h6" sx={{ color: "#333", mb: 2 }}>
        라이브 커머스 보기
      </Typography>

      {/* 방송 카드 그리드 */}
      <Grid container spacing={3}>
        {streamData.map((stream) => (
          <Grid item key={stream.id} xs={12} sm={6} md={4} lg={3}>
            <LiveStreamCard title={stream.title} thumbnail={stream.thumbnail} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainContent;
