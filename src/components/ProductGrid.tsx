// src/components/ProductGrid.tsx
import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const products = [
  {
    id: 1,
    name: "슈클린 신발 건조기",
    brand: "감성전자",
    discount: 29,
    price: 41800,
    salePrice: 29800,
    image:
      "https://img1.kakaocdn.net/thumb/C560x560.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fshoppingstore%2Fproduct%2F20250226164406_af5882d3f85d42089cbb777d59df14bb.jpg",
    url: "https://store.kakao.com/gamsunge/products/402101602?refLiveId=40583",
  },
  {
    id: 2,
    name: "라이브 전용 화장품 세트",
    brand: "뷰티코리아",
    discount: 40,
    price: 50000,
    salePrice: 29800,
    image: "/images/streams/stream1.png",
    url: "#",
  },
  // 더미 데이터 추가 가능
];

const ProductGrid = () => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card sx={{ boxShadow: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {product.brand}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body2" color="#FF5722">
                {product.discount}% 할인
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: "line-through", color: "#999" }}>
                {product.price.toLocaleString()}원
              </Typography>
              <Typography variant="h6" color="#FF5722">
                {product.salePrice.toLocaleString()}원
              </Typography>
              <Button
                variant="contained"
                size="small"
                href={product.url}
                target="_blank"
                sx={{ mt: 1, backgroundColor: "#FF5722" }}
              >
                구매하러 가기
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
