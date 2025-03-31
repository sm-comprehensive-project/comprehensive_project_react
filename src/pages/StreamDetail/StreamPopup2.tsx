// src/pages/StreamPopup2.tsx
import React from "react";
import { Box, Typography, Button,  Paper } from "@mui/material";

const StreamPopup2: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2, gap: 2 }}>
      {/* 방송 플레이어 영역 */}
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

      {/* 정보 패널 */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "#fff8f1",
            borderLeft: "4px solid #FF5722",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            [모달용] 뽀송뽀송함의 비밀 신발건조기
          </Typography>
          <Typography variant="body2" color="text.secondary">
            감성전자 · 플랫폼: Kakao
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 1, borderColor: "#FF5722", color: "#FF5722" }}
          >
            + 팔로우
          </Button>
        </Paper>

        <Paper sx={{ backgroundColor: "#f9f9f9", padding: 2, height: 160, overflowY: "auto" }}>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            💬 채팅
          </Typography>
          <Typography variant="body2">user1: 방송 잘 보고 있어요!</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default StreamPopup2;
