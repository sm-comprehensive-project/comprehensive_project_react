"use client";
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
// 가상의 상품 데이터
const products = {
  _id: { $oid: "exampleObjectId" },
  liveId: "99999",
  isLive: false,
  lastUpdated: { $date: new Date().toISOString() },
  liveUrl: "https://shoppinglive.kakao.com/live/99999",
  platform: "kakao",
  products: [
    {
      name: "봄 신상 플라워 원피스",
      image: "/floral-dress.png",
      link: "https://store.kakao.com/demo/products/1?refLiveId=99999",
      price: 39900,
      price_origin: 59000,
      discountRate: 32,
    },
    {
      name: "캐주얼 데님 자켓",
      image: "/classic-denim-jacket.png",
      link: "https://store.kakao.com/demo/products/2?refLiveId=99999",
      price: 69000,
      price_origin: 89000,
      discountRate: 22,
    },
    {
      name: "베이직 화이트 티셔츠",
      image: "/white-tshirt.png",
      link: "https://store.kakao.com/demo/products/3?refLiveId=99999",
      price: 19000,
      price_origin: 29000,
      discountRate: 34,
    },
    {
      name: "와이드 팬츠",
      image: "/wide-leg-pants.png",
      link: "https://store.kakao.com/demo/products/4?refLiveId=99999",
      price: 39000,
      price_origin: 49000,
      discountRate: 20,
    },
    {
      name: "여름용 린넨 셔츠",
      image: "/light-blue-linen-shirt.png",
      link: "https://store.kakao.com/demo/products/5?refLiveId=99999",
      price: 35000,
      price_origin: 45000,
      discountRate: 22,
    },
    {
      name: "스트라이프 블라우스",
      image: "/striped-blouse.png",
      link: "https://store.kakao.com/demo/products/6?refLiveId=99999",
      price: 42000,
      price_origin: 55000,
      discountRate: 24,
    },
  ],
  sellerInfo: {
    name: "데모상점",
    url: "https://store.kakao.com/demo/live?refLiveId=99999",
    image: "/demo-seller-profile.png",
  },
  thumbnail: "/demo-thumbnail.png",
  title: "🔥 신상 패션 아이템 할인 중! 지금 만나보세요!",
};

export default function WatchPage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1245);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f8f8f8", // 밝은 배경색으로 변경
          pt: 0, // 상단 패딩 제거
          pb: 3, // 하단 패딩은 유지
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "1600px",
            mx: "auto",
            backgroundColor: "white",
            borderRadius: "0 0 12px 12px", // 상단은 직각, 하단만 둥글게 설정
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            p: { xs: 2, md: 3 },
            mb: 4,
          }}
        >
          {/* 메인 콘텐츠 영역 - 그리드 레이아웃 */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(350px, 400px) minmax(220px, 250px) 1fr",
              },
              gap: 2,
              alignItems: "stretch", // 모든 요소의 높이를 동일하게 맞춤
            }}
          >
            {/* 왼쪽: 비디오 영역 */}
            <Box sx={{ height: "100%" }}>
              {/* 비디오 플레이어 */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%", // aspectRatio 대신 height: 100% 사용
                  backgroundColor: "#000",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between", // center에서 space-between으로 변경하여 콘텐츠를 상하로 분산
                    color: "white",
                    p: 4,
                    textAlign: "center",
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)",
                  }}
                >
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                      라이브 방송 준비 중
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ maxWidth: "600px", opacity: 0.9 }}
                    >
                      현재 라이브 방송을 준비 중입니다.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ maxWidth: "600px", mt: 1, opacity: 0.9 }}
                    >
                      잠시만 기다려주세요.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: "rgba(74, 85, 104, 0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 4, // 하단 여백 추가
                      animation: "pulse 1.5s infinite",
                      "@keyframes pulse": {
                        "0%": {
                          transform: "scale(0.95)",
                          boxShadow: "0 0 0 0 rgba(74, 85, 104, 0.7)",
                        },
                        "70%": {
                          transform: "scale(1)",
                          boxShadow: "0 0 0 10px rgba(74, 85, 104, 0)",
                        },
                        "100%": {
                          transform: "scale(0.95)",
                          boxShadow: "0 0 0 0 rgba(74, 85, 104, 0)",
                        },
                      },
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      LIVE
                    </Typography>
                  </Box>
                </Box>

                {/* 비디오 오버레이 요소들 */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    backgroundColor: "#f44336",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    px: 1.5,
                    py: 0.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    zIndex: 10,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "white",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  LIVE
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    display: "flex",
                    gap: 1,
                    zIndex: 10,
                  }}
                >
                  <Badge
                    badgeContent={1245}
                    color="error"
                    max={999}
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.6rem",
                        height: "16px",
                        minWidth: "16px",
                        padding: "0 4px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "white",
                        borderRadius: "4px",
                        px: 1,
                        py: 0.5,
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.75rem",
                      }}
                    >
                      <Users size={14} style={{ marginRight: 4 }} />
                      시청자
                    </Box>
                  </Badge>
                </Box>

                {/* 비디오 컨트롤 */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 10,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      onClick={handleLike}
                      sx={{
                        color: liked ? "#f44336" : "white",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                      }}
                      aria-label="좋아요"
                    >
                      <Heart size={20} fill={liked ? "#f44336" : "none"} />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                      }}
                      aria-label="공유하기"
                    >
                      <Share size={20} />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      borderRadius: "4px",
                      px: 1,
                      py: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    HD 1080p
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 중앙: 판매자 정보 */}
            <Box>
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
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src="/fashion-model.png"
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
                        스타일리스트 지은
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.8rem" }}
                      >
                        @style_jieun • 팔로워 12.5K
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#4A5568", // 주황색에서 차분한 회색으로 변경
                      "&:hover": { backgroundColor: "#2D3748" },
                      mb: 2,
                      py: 0.5,
                      fontSize: "0.8rem",
                      width: "100%",
                    }}
                  >
                    팔로우
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{ mb: 2, fontSize: "0.85rem", lineHeight: 1.4 }}
                  >
                    🌸 봄맞이 신상 원피스 특가전 🌸 오늘만 추가 20% 할인 +
                    무료배송!
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mb: 1, fontSize: "0.9rem" }}
                  >
                    방송 정보
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 0.75,
                      }}
                    >
                      <Clock
                        size={14}
                        style={{ color: "#666", marginTop: 2 }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ fontSize: "0.8rem" }}
                        >
                          방송 시간
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          2023년 4월 25일 오후 2:00 ~ 4:00
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 0.75,
                      }}
                    >
                      <Users
                        size={14}
                        style={{ color: "#666", marginTop: 2 }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ fontSize: "0.8rem" }}
                        >
                          누적 시청자
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          3,450명
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 0.75,
                      }}
                    >
                      <ShoppingBag
                        size={14}
                        style={{ color: "#666", marginTop: 2 }}
                      />
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
                          총 {products.products.length}개 상품 판매 중
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#666",
                      }}
                    >
                      <ThumbsUp size={14} style={{ marginRight: 4 }} />
                      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                        {likeCount}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#666",
                      }}
                    >
                      <MessageCircle size={14} style={{ marginRight: 4 }} />
                      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                        238
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>

            {/* 오른쪽: 상품 리스트 */}
            <Box>
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
                    판매 상품 ({products.products.length})
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

                {/* 상품 리스트 - 스크롤 가능 */}
                <Box sx={{ flex: 1, overflow: "auto", maxHeight: "711px" }}>
                  {products.products.map((product, index) => (
                    <Box
                      key={`product-${index}`}
                      sx={{
                        p: 2,
                        borderBottom:
                          index < products.products.length - 1
                            ? "1px solid #f0f0f0"
                            : "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.02)",
                          transform: "translateY(-2px)",
                        },
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start", // center에서 flex-start로 변경
                        gap: 1.5, // 간격 조정
                        maxWidth: "100%",
                      }}
                    >
                      {/* 배지 요소들 */}
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
                        {/*{product.isHot && (
                          <Chip
                            label="HOT"
                            size="small"
                            sx={{
                              backgroundColor: "#f44336",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "0.7rem",
                              height: 20,
                            }}
                          />
                        )}*/}
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
                          variant="subtitle1" // subtitle2에서 subtitle1로 변경하여 크기 키움
                          fontWeight="bold"
                          component="div"
                          sx={{
                            mb: 1, // 0.5에서 1로 변경하여 여백 증가
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: "1rem", // 폰트 크기 명시적 지정
                          }}
                        >
                          {product.name}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "baseline",
                            mb: 1.5,
                          }}
                        >
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="#38A169"
                            sx={{ fontSize: "1.1rem" }}
                          >
                            {product.price.toLocaleString()}원
                          </Typography>
                          <Typography
                            variant="body2" // caption에서 body2로 변경
                            color="text.secondary"
                            sx={{ textDecoration: "line-through", ml: 1 }}
                          >
                            {product.price.toLocaleString()}원
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Star
                            size={16}
                            style={{ color: "#FFB400", marginRight: 6 }}
                          />
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
                            width: 40, // 36에서 40으로 크기 증가
                            height: 40, // 36에서 40으로 크기 증가
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                              color: "#f44336",
                            },
                          }}
                        >
                          <Heart size={20} />
                        </IconButton>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#4A5568",
                            "&:hover": { backgroundColor: "#2D3748" },
                            py: 1,
                            px: 2,
                            width: "100%", // 너비 100%로 설정
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
            </Box>
          </Box>
        </Container>

        {/* 추천 라이브 방송 섹션 */}
        <Container
          maxWidth={false}
          sx={{ maxWidth: "1600px", mx: "auto", mb: 6 }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            추천 라이브 방송
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={item}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 180,
                      backgroundImage: `url(/placeholder.svg?height=180&width=320&query=live shopping ${item})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      bgcolor: "#f44336",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                      borderRadius: "4px",
                      px: 1.5,
                      py: 0.5,
                    }}
                  >
                    LIVE
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      borderRadius: "4px",
                      px: 1,
                      py: 0.5,
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.75rem",
                    }}
                  >
                    <Users size={14} style={{ marginRight: 4 }} />
                    시청자 {Math.floor(Math.random() * 5000) + 500}명
                  </Box>
                </Box>
                <CardContent sx={{ p: 2, flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    {`${
                      [
                        "봄맞이 신상",
                        "여름 특가",
                        "가을 컬렉션",
                        "겨울 아우터",
                      ][item - 1]
                    } 라이브 방송`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {
                      [
                        "스타일리스트 민지",
                        "패션 디렉터 수진",
                        "뷰티 크리에이터 지현",
                        "쇼핑 호스트 태영",
                      ][item - 1]
                    }
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      bgcolor: "#4A5568",
                      "&:hover": { bgcolor: "#2D3748" },
                    }}
                  >
                    시청하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>

        {/* 관련 상품 추천 섹션 */}
        <Container
          maxWidth={false}
          sx={{ maxWidth: "1600px", mx: "auto", mb: 6 }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            이 방송의 인기 상품
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "1fr 1fr 1fr",
                md: "1fr 1fr 1fr 1fr 1fr 1fr",
              },
              gap: 2,
            }}
          >
            {products.products.slice(0, 6).map((product,index) => (
              <Card
                key={index}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 180,
                    objectFit: "cover",
                  }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      height: "2.5rem",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="#38A169"
                    >
                      {product.price.toLocaleString()}원
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through", ml: 1 }}
                    >
                      {product.price.toLocaleString()}원
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
