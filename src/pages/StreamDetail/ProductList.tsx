// src/pages/WatchPage/ProductList.tsx

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import { Heart, Star } from "lucide-react";
import type { ProductItem } from "./WatchPage.tsx";

interface ProductListProps {
  products: ProductItem[];
}

export default function ProductList({ products }: ProductListProps) {
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
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          판매 상품 ({products.length})
        </Typography>
        <Chip
          label="전체보기"
          size="small"
          sx={{
            backgroundColor: "#f5f5f5",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        />
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", maxHeight: "711px" }}>
        {products.map((product, index) => (
          <Box
            key={`product-${index}`}
            sx={{
              p: 2,
              borderBottom: index < products.length - 1 ? "1px solid #f0f0f0" : "none",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.02)",
                transform: "translateY(-2px)",
              },
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              maxWidth: "100%",
            }}
          >
            {/* 할인율 배지 */}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                display: "flex",
                gap: 1,
                zIndex: 1,
              }}
            >
              <Chip
                label={`${product.discountRate}% OFF`}
                size="small"
                sx={{
                  backgroundColor: "#38A169",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                  height: 20,
                }}
              />
            </Box>

            {/* 상품 이미지 */}
            <Box
              sx={{
                position: "relative",
                flexShrink: 0,
                width: 90,
                height: 120,
                borderRadius: 1,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                image={product.image}
                alt={product.name}
              />
            </Box>

            {/* 상품 정보 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                component="div"
                sx={{
                  mb: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "1rem",
                }}
              >
                {product.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "baseline", mb: 1.5 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="#38A169"
                  sx={{ fontSize: "1.1rem" }}
                >
                  {product.price.toLocaleString()}원
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through", ml: 1 }}
                >
                  {product.price_origin.toLocaleString()}원
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Star size={16} style={{ color: "#FFB400", marginRight: 6 }} />
                <Typography variant="body2">4.8</Typography>
              </Box>
            </Box>

            {/* 액션 버튼 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
              }}
            >
              <IconButton
                size="small"
                sx={{
                  color: "#666",
                  backgroundColor: "#f5f5f5",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    color: "#f44336",
                  },
                }}
              >
                <Heart size={20} />
              </IconButton>
              <Button
                component="a"
                href={product.link}
                target="_blank"
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#4A5568",
                  "&:hover": { backgroundColor: "#2D3748" },
                  py: 1,
                  px: 2,
                  width: "100%",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                구매하기
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
