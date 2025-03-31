// src/components/LiveStreamCard.tsx
import React from "react";
import { CardMedia, Box, Typography, Button } from "@mui/material";

const LiveStreamCard = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 250,
        height: 300,
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s ease",
        "&:hover .thumb-img": {
          transform: "scale(1.05)",
        },
        "&:hover .hover-overlay": {
          opacity: 1,
        },
      }}
    >
      {/* 썸네일 이미지 */}
      <CardMedia
        component="img"
        image="/images/streams/stream1.png"
        alt="썸네일"
        className="thumb-img"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease",
        }}
      />

      {/* Hover 시 보여질 오버레이 */}
      <Box
        className="hover-overlay"
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          opacity: 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          🔴 LIVE 중
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#FF5722",
            "&:hover": {
              backgroundColor: "#e64a19",
            },
          }}
        >
          방송 보러가기
        </Button>
      </Box>
    </Box>
  );
};

export default LiveStreamCard;
