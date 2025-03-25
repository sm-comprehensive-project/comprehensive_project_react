// src/pages/StreamDetail2.tsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from "@mui/material";

const StreamDetail2: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 4, gap: 4 }}>
      {/* 방송 영상 영역 */}
      <Box
        sx={{
          flex: "0 0 50%",
          aspectRatio: "9/16",
          backgroundColor: "#121212",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 20,
        }}
      >
        방송 플레이어
      </Box>

      {/* 우측 패널 */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* 방송 정보 카드 */}
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "#fff8f1",
            borderLeft: "4px solid #FF5722",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            [톡딜가+5천원쿠폰] 뽀송뽀송함의 비밀 신발건조기
          </Typography>
          <Typography variant="body2" color="text.secondary">
            감성전자 · 플랫폼: Kakao
          </Typography>
          <Typography variant="body2" color="text.secondary">
            해시태그: #신발 #겨울아이템
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 1, borderColor: "#FF5722", color: "#FF5722" }}
          >
            + 팔로우
          </Button>
        </Paper>

        {/* 채팅 영역 */}
        <Paper
          sx={{
            backgroundColor: "#f9f9f9",
            padding: 2,
            border: "1px solid #eee",
            height: 180,
            overflowY: "auto",
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            💬 채팅창
          </Typography>
          {[
            "user1: 이거 좋아요!",
            "user2: 쿠폰은 어떻게 받나요?",
            "user3: 내일 배송 되나요?",
          ].map((msg, i) => (
            <Typography key={i} variant="body2">
              {msg}
            </Typography>
          ))}
        </Paper>

        {/* 상품 리스트 */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            🛍️ 관련 상품
          </Typography>

          <Box
            sx={{
              maxHeight: 300,
              overflowY: "auto",
              pr: 1,
            }}
          >
            {[...Array(6)].map((_, i) => (
              <Card key={i} sx={{ display: "flex", mb: 2, boxShadow: 1 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image="https://img1.kakaocdn.net/thumb/C560x560.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fshoppingstore%2Fproduct%2F20250226164406_af5882d3f85d42089cbb777d59df14bb.jpg"
                  alt="신발건조기"
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    슈클린 신발 건조기 {i + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    정가: 41,800원 →{" "}
                    <strong style={{ color: "#FF5722" }}>29,800원</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
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
    </Box>
  );
};

export default StreamDetail2;
