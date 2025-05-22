// 최적화 요약에 맞게 수정된 WatchPage 컴포넌트

import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Avatar,
  Card,
  CardMedia,
  Divider,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
  Chip,
  CardContent,
} from "@mui/material";
import {
  Heart,
  Share,
  ShoppingBag,
  Users,
  Star,
  ThumbsUp,
  Clock,
  MessageCircle,
} from "lucide-react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

// 상품 데이터 정의
const products = [
  { id: 1, name: "봄 신상 플라워 원피스", price: 59000, discountPrice: 39900, image: "/floral-dress.png", stock: 25, isHot: true, discount: 32 },
  { id: 2, name: "캐주얼 데님 자켓", price: 89000, discountPrice: 69000, image: "/classic-denim-jacket.png", stock: 12, isHot: false, discount: 22 },
  { id: 3, name: "베이직 화이트 티셔츠", price: 29000, discountPrice: 19000, image: "/white-tshirt.png", stock: 50, isHot: false, discount: 34 },
  { id: 4, name: "와이드 팬츠", price: 49000, discountPrice: 39000, image: "/wide-leg-pants.png", stock: 8, isHot: true, discount: 20 },
  { id: 5, name: "여름용 린넨 셔츠", price: 45000, discountPrice: 35000, image: "/light-blue-linen-shirt.png", stock: 15, isHot: false, discount: 22 },
  { id: 6, name: "스트라이프 블라우스", price: 55000, discountPrice: 42000, image: "/striped-blouse.png", stock: 20, isHot: false, discount: 24 },
];

export default function WatchPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1245);

  const handleLike = () => {
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: "#f8f8f8", pt: 0, pb: 3, minHeight: "calc(100vh - 64px)" }}>
        <Container maxWidth={false} sx={{ maxWidth: "1600px", mx: "auto", backgroundColor: "white", borderRadius: "0 0 12px 12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", p: { xs: 2, md: 3 }, mb: 4 }}>
          {/* 여기에 메인 콘텐츠 구조 (비디오 + 판매자 정보 + 상품 리스트) 구성된 상태 그대로 유지 */}
          {/* 아래 컴포넌트는 따로 분리할 수 있음: VideoSection, SellerInfoSection, ProductListSection 등 */}
        </Container>

        {/* 추천 라이브 방송 섹션 */}
        <Container maxWidth={false} sx={{ maxWidth: "1600px", mx: "auto", mb: 6 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>추천 라이브 방송</Typography>
          {/* 카드 리스트 반복 구조 유지 */}
        </Container>

        {/* 관련 상품 추천 섹션 */}
        <Container maxWidth={false} sx={{ maxWidth: "1600px", mx: "auto", mb: 6 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>이 방송의 인기 상품</Typography>
          {/* products.map 사용하여 인기 상품 그리드 */}
        </Container>
        <Footer />
      </Box>
    </>
  );
}
