// src/pages/StreamDetail.tsx
import React from "react";
import { Box, Typography, Button, Card, CardContent, CardMedia} from "@mui/material";

const StreamDetail: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 4, gap: 3 }}>

      {/* 방송 영상 */}
      <Box sx={{ flex: "0 0 45%", backgroundColor: "#000", height: "600px", borderRadius: 2 }}>
        {/* 영상 플레이스홀더 */}
        <Typography sx={{ color: "#fff", textAlign: "center", paddingTop: 25 }}>방송 영상 영역</Typography>
      </Box>

      {/* 오른쪽 영역 (채팅, 방송정보, 상품리스트) */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>

        {/* 방송 정보 */}
        <Box sx={{ backgroundColor: "#FFF3E0", padding: 2, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            [톡딜가+5천원쿠폰] 뽀송뽀송함의 비밀 신발건조기
          </Typography>
          <Typography variant="body2" color="text.secondary">채널명: 감성전자</Typography>
          <Typography variant="body2" color="text.secondary">플랫폼: Kakao</Typography>
          <Typography variant="body2" color="text.secondary">해시태그: #신발 #겨울아이템</Typography>
          <Button variant="outlined" size="small" sx={{ mt: 1, borderColor: "#FF5722", color: "#FF5722" }}>
            팔로우
          </Button>
        </Box>

        {/* 채팅 영역 */}
        <Box sx={{ backgroundColor: "#f0f0f0", padding: 2, height: "200px", borderRadius: 2, overflowY: "auto" }}>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>💬 실시간 채팅</Typography>
          <Typography variant="body2">user1: 상품 좋아보여요!</Typography>
          <Typography variant="body2">user2: 쿠폰 어떻게 받아요?</Typography>
          <Typography variant="body2">user3: 재입고 언제되나요?</Typography>
        </Box>

        {/* 상품 리스트 */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>🛍️ 상품 정보</Typography>

          <Card sx={{ display: "flex", gap: 2, boxShadow: 1, mb: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 120 }}
              image="https://img1.kakaocdn.net/thumb/C560x560.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fshoppingstore%2Fproduct%2F20250226164406_af5882d3f85d42089cbb777d59df14bb.jpg"
              alt="신발건조기"
            />
            <CardContent>
              <Typography variant="body1" fontWeight="bold">
                슈클린 신발 건조기
              </Typography>
              <Typography variant="body2" color="text.secondary">
                정가: 41,800원 → <strong style={{ color: "#FF5722" }}>29,800원</strong> (29% 할인)
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 1, backgroundColor: "#FF5722" }}
                href="https://store.kakao.com/gamsunge/products/402101602?refLiveId=40583"
                target="_blank"
              >
                구매하러 가기
              </Button>
            </CardContent>
          </Card>

          {/* 추가 상품 반복 가능 */}
        </Box>
      </Box>
    </Box>
  );
};

export default StreamDetail;
