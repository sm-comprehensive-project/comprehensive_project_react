import React from "react";
import { Grid, Box } from "@mui/material";
import LiveStreamCard from "../components/LiveStreamCard.tsx";

const streamData = [
  { id: 1, title: "방송 1", thumbnail: "/images/streams/stream1.png" },
  { id: 2, title: "방송 2", thumbnail: "/images/streams/stream1.png" },
  { id: 3, title: "방송 3", thumbnail: "/images/streams/stream1.png" },
  { id: 4, title: "방송 4", thumbnail: "/images/streams/stream1.png" },
  { id: 5, title: "방송 5", thumbnail: "/images/streams/stream1.png" },
  { id: 6, title: "방송 6", thumbnail: "/images/streams/stream1.png" },
];

const MainPage: React.FC = () => {
  return (
    <Box sx={{ overflowY: "auto", height: "100vh", padding: 3 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          display: "flex",
          flexWrap: "wrap", // 카드가 겹치지 않도록 함
          gap: "16px",
        }}
      >
        {streamData.map((stream) => (
          <Grid
            item
            key={stream.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              minWidth: "260px", // 카드 최소 크기 설정 (너무 작아지지 않도록)
            }}
          >
            <LiveStreamCard title={stream.title} thumbnail={stream.thumbnail} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
