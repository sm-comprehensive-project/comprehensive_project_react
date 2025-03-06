import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";

interface LiveStreamCardProps {
  title: string;
  thumbnail: string;
}

const LiveStreamCard: React.FC<LiveStreamCardProps> = ({ title, thumbnail }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#282A36", // 다크 테마 유지
        width: "236px",
        height: "420px",
        borderRadius: "12px",
        padding: "8px",
        margin: "16px",
        position: "relative", // 테두리를 위해 추가
        border: "2px solid rgba(123, 104, 238, 0.4)", // 은은한 보라색 테두리
        boxShadow: "0 0 15px rgba(104, 100, 247, 0.3)", // 반투명한 그림자 효과
        transition: "0.3s ease-in-out",

        "&:hover": {
          transform: "scale(1.05)", // 마우스 올리면 살짝 커지게
          boxShadow: "0 0 20px rgba(123, 104, 238, 0.8)", // 강조 효과
        },
      }}
    >
      <CardMedia
        component="img"
        image={thumbnail}
        alt={title}
        sx={{
          borderRadius: "8px",
          height: "100%", 
          objectFit: "cover", // 이미지 비율 유지
        }}
      />
      <Typography
        variant="subtitle1"
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "#FFF",
          fontWeight: "bold",
          background: "rgba(0, 0, 0, 0.5)", // 반투명 배경
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

export default LiveStreamCard;
