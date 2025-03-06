import React from "react";
import { Box, List, ListItem, ListItemText, Typography, Avatar, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StorefrontIcon from "@mui/icons-material/Storefront"; // 쇼핑몰 아이콘
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // 할인 아이콘

const menuItems = [
  { name: "전체 방송", path: "/all" },
  { name: "인기 클립", path: "/clips" },
  { name: "카테고리", path: "/categories" },
  { name: "팔로잉", path: "/following" },
];

const followingChannels = [
  { name: "나이키 공식", viewers: 5472, product: "신상 운동화 세일!", image: "/images/avatars/nike.png" },
  { name: "다이슨 코리아", viewers: 3940, product: "다이슨 에어랩 한정 할인", image: "/images/avatars/dyson.png" },
  { name: "삼성전자", viewers: 1290, product: "갤럭시 S24 얼리버드", image: "/images/avatars/samsung.png" },
  { name: "미샤 뷰티", viewers: 872, product: "겨울 스킨케어 특가", image: "/images/avatars/missha.png" },
  { name: "Apple Korea", viewers: 540, product: "아이폰 15 프로 실시간 리뷰", image: "/images/avatars/apple.png" },
];

const recommendedChannels = [
  { name: "스타일쉐어", viewers: 3180, product: "2024 패션 트렌드", image: "/images/avatars/style.png" },
  { name: "롯데홈쇼핑", viewers: 2750, product: "가전제품 특별 프로모션", image: "/images/avatars/lotte.png" },
  { name: "무신사 라이브", viewers: 2180, product: "나이키 덩크 재입고!", image: "/images/avatars/musinsa.png" },
  { name: "CJ온스타일", viewers: 1820, product: "뷰티 인기템 라이브", image: "/images/avatars/cjonstyle.png" },
  { name: "현대백화점", viewers: 1050, product: "럭셔리 브랜드 세일", image: "/images/avatars/hyundai.png" },
];

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: "250px",
        backgroundColor: "#1e1e1e",
        height: "100vh",
        padding: 2,
        color: "white",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* 로고 */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        LIVE COMMERCE
      </Typography>

      {/* 네비게이션 메뉴 */}
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component="div"
            sx={{
              "&:hover": { backgroundColor: "#7B68EE" },
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>

      {/* 팔로잉 채널 목록 */}
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        팔로잉 채널
      </Typography>
      <List>
        {followingChannels.map((channel, index) => (
          <ListItem
            key={index}
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": { backgroundColor: "#3e3e3e" },
              padding: "8px",
              cursor: "pointer",
            }}
          >
            <Avatar src={channel.image} sx={{ width: 30, height: 30, marginRight: 1 }} />
            <ListItemText
              primary={channel.name}
              secondary={`${channel.product} · ${channel.viewers.toLocaleString()}명 시청`}
              secondaryTypographyProps={{
                sx: { color: "lightgray", fontSize: "0.8rem" },
              }}
            />
            <IconButton sx={{ color: "#FFD700" }}>
              <LocalOfferIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* 추천 채널 목록 */}
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        추천 채널
      </Typography>
      <List>
        {recommendedChannels.map((channel, index) => (
          <ListItem
            key={index}
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": { backgroundColor: "#3e3e3e" },
              padding: "8px",
              cursor: "pointer",
            }}
          >
            <Avatar src={channel.image} sx={{ width: 30, height: 30, marginRight: 1 }} />
            <ListItemText
              primary={channel.name}
              secondary={`${channel.product} · ${channel.viewers.toLocaleString()}명 시청`}
              secondaryTypographyProps={{
                sx: { color: "lightgray", fontSize: "0.8rem" },
              }}
            />
            <IconButton sx={{ color: "#FF4500" }}>
              <StorefrontIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* 하단 추가 버튼 */}
      <IconButton sx={{ marginTop: "auto", color: "#7B68EE" }}>
        <FavoriteIcon />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
