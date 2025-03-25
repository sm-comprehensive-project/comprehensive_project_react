// src/pages/StreamDetail4.tsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Paper,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StreamDetail4: React.FC = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        gap: 3,
        padding: 4,
        height: "calc(100vh - 100px)",
      }}
    >
      {/* 방송 플레이어 */}
      <Box
        sx={{
          backgroundColor: "#000",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 20,
          boxShadow: 3,
        }}
      >
        📺 방송 플레이어
      </Box>

      {/* 방송 정보 + 채팅 */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Paper sx={{ padding: 2, borderRadius: 3, boxShadow: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src="/images/streamer-avatar.png" />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                감성전자
              </Typography>
              <Typography variant="body2" color="text.secondary">
                플랫폼: Kakao
              </Typography>
            </Box>
          </Box>
          <Typography mt={2} fontWeight="bold">
            [톡딜가+5천원쿠폰] 뽀송뽀송함의 비밀 신발건조기
          </Typography>
          <Typography variant="caption" color="text.secondary">
            #신발 #겨울아이템 #따뜻하게
          </Typography>
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FavoriteBorderIcon />}
              sx={{ borderColor: "#FF5722", color: "#FF5722" }}
            >
              팔로우
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#FF5722" }}
            >
              채널 방문
            </Button>
          </Box>
        </Paper>

        <Paper
          sx={{
            flex: 1,
            padding: 2,
            borderRadius: 3,
            overflowY: "auto",
            backgroundColor: "#fdfdfd",
            boxShadow: 2,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            <ChatBubbleOutlineIcon fontSize="small" /> 실시간 채팅
          </Typography>
          {[...Array(10)].map((_, idx) => (
            <Typography key={idx} variant="body2">
              user{idx + 1}: 이 상품 진짜 좋아요!
            </Typography>
          ))}
        </Paper>
      </Box>

      {/* 상품 리스트 */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          <ShoppingCartIcon fontSize="small" sx={{ mr: 1 }} /> 관련 상품
        </Typography>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              sx={{
                display: "flex",
                boxShadow: 1,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 90, objectFit: "cover" }}
                image="https://img1.kakaocdn.net/thumb/C560x560.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fshoppingstore%2Fproduct%2F20250226164406_af5882d3f85d42089cbb777d59df14bb.jpg"
                alt={`신발건조기 ${i + 1}`}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  슈클린 신발 건조기 {i + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  41,800원 → <strong style={{ color: "#FF5722" }}>29,800원</strong>
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mt: 1, backgroundColor: "#FF5722" }}
                  href="https://store.kakao.com/gamsunge/products/402101602?refLiveId=40583"
                  target="_blank"
                >
                  구매하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StreamDetail4;
