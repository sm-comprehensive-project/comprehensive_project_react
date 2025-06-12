import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  Button,
  Divider,
} from "@mui/material";
import { Clock, ShoppingBag } from "lucide-react";
import type { LiveData } from "./WatchPage";

interface SellerInfoCardProps {
  liveData: LiveData;
  likeCount: number; // 삭제 예정이지만, 일단 남겨둡니다
}

export default function SellerInfoCard({
  liveData,
}: SellerInfoCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* 판매자 프로필 & 팔로우 버튼 */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={liveData.sellerInfo.image}
            sx={{
              width: 48,
              height: 48,
              mr: 1.5,
              border: "2px solid #f0f0f0",
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ fontSize: "1rem", lineHeight: 1.2 }}
            >
              {liveData.sellerInfo.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.8rem" }}
            >
              @{liveData.sellerInfo.name} • 팔로워
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#4A5568",
            "&:hover": { backgroundColor: "#2D3748" },
            mb: 2,
            py: 0.5,
            fontSize: "0.8rem",
            width: "100%",
          }}
        >
          팔로우
        </Button>

        {/* 타이틀 */}
        <Typography
          variant="body2"
          sx={{ mb: 2, fontSize: "0.85rem", lineHeight: 1.4 }}
        >
          {liveData.title}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        {/* 방송 정보 섹션 */}
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ mb: 1, fontSize: "0.9rem" }}
        >
          방송 정보
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* 방송 시작 시간 (레이블만 변경) */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.75 }}>
            <Clock size={14} style={{ color: "#666", marginTop: 2 }} />
            <Box>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ fontSize: "0.8rem" }}
              >
                방송 시작 시간
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                {new Date(liveData.lastUpdated).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
          </Box>

          {/* 판매 상품 개수 (유지) */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.75 }}>
            <ShoppingBag size={14} style={{ color: "#666", marginTop: 2 }} />
            <Box>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ fontSize: "0.8rem" }}
              >
                판매 상품
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                총 {liveData.products.length}개 상품 판매 중
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
