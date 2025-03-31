import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const categories = [
  { emoji: "👗", label: "패션" },
  { emoji: "💄", label: "뷰티" },
  { emoji: "🥗", label: "푸드" },
  { emoji: "🪑", label: "라이프" },
  { emoji: "✈️", label: "여행/체험" },
  { emoji: "🧸", label: "키즈" },
  { emoji: "💻", label: "테크" },
  { emoji: "⛺", label: "취미레저" },
  { emoji: "🎫", label: "문화생활" },
];

const subCategories: Record<string, string[]> = {
  패션: ["여성의류", "남성의류", "모자", "가방", "신발", "아우터", "데일리룩"],
  뷰티: ["스킨케어", "메이크업", "향수", "헤어케어", "바디케어", "클렌징"],
  푸드: ["간편식", "과일/채소", "정육/수산", "간식류", "건강식품", "커피/음료"],
  라이프: ["홈데코", "주방용품", "청소/세탁", "생활잡화", "수납/정리", "반려동물용품"],
  "여행/체험": ["호텔패키지", "글램핑", "레저입장권", "공연/전시", "렌터카", "여행가방"],
  키즈: ["아동의류", "완구", "유아용품", "책/교육", "분유/이유식", "기저귀"],
  테크: ["스마트폰", "노트북", "가전제품", "게임기", "이어폰/헤드폰", "PC주변기기"],
  취미레저: ["운동용품", "등산/캠핑", "게임", "악기", "취미DIY", "보드/스케이트"],
  문화생활: ["도서", "공연티켓", "음반/DVD", "전자책", "굿즈", "정기구독"],
};

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubVisible, setIsSubVisible] = useState(false);

  const handleCategoryClick = (label: string) => {
    if (selected === label) {
      setIsSubVisible((prev) => !prev);
    } else {
      setSelected(label);
      setIsSubVisible(true);
    }
  };

  return (
    <Box
      sx={{
        position: "sticky", // ✅ 스크롤 해도 상단 고정
        top: 0,
        zIndex: 1300,
        backgroundColor: "#ffffff",
        borderBottom: "2px solid #FF5722",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
      }}
    >
      {/* 상단 툴바 */}
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF5722" }}>
          LIVE COMMERCE
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFF3E0",
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          <SearchIcon sx={{ color: "#FF5722", marginRight: 1 }} />
          <InputBase
            placeholder="검색어 입력..."
            sx={{
              color: "#212121",
              width: "200px",
              "&::placeholder": { color: "rgba(0,0,0,0.4)" },
            }}
          />
        </Box>

        <Box>
          <IconButton sx={{ color: "#FF6D00" }}>
            <SettingsIcon />
          </IconButton>
          <IconButton sx={{ color: "#FF6D00" }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* 토글 영역 */}
      <Collapse in={isVisible} timeout="auto">
        {/* 카테고리 아이콘 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
            py: 2,
            backgroundColor: "#fff",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #ddd",
          }}
        >
          {categories.map((cat) => (
            <Box
              key={cat.label}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                color: selected === cat.label ? "#FF5722" : "#333",
              }}
              onClick={() => handleCategoryClick(cat.label)}
            >
              <IconButton
                sx={{
                  backgroundColor: "transparent",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  fontSize: "24px",
                  transition: "0.2s",
                  border:
                    selected === cat.label
                      ? "2px solid #FF5722"
                      : "2px solid transparent",
                  "&:hover": {
                    backgroundColor: "#FFF3E0",
                  },
                }}
              >
                {cat.emoji}
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  fontWeight: selected === cat.label ? "bold" : "normal",
                  color: selected === cat.label ? "#FF5722" : "#333",
                }}
              >
                {cat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 하위 카테고리 버튼 */}
        {isSubVisible && selected && subCategories[selected] && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
              py: 1.5,
              backgroundColor: "#fafafa",
              borderBottom: "1px solid #eee",
            }}
          >
            {subCategories[selected].map((sub, i) => (
              <Button
                key={i}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 20,
                  textTransform: "none",
                  fontSize: "0.85rem",
                  borderColor: "#FF5722",
                  color: "#FF5722",
                  "&:hover": {
                    backgroundColor: "#FFF3E0",
                    borderColor: "#FF6D00",
                    color: "#FF6D00",
                  },
                }}
              >
                {sub}
              </Button>
            ))}
          </Box>
        )}
      </Collapse>

      {/* 토글 버튼 */}
      <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
        <IconButton
          onClick={() => setIsVisible((prev) => !prev)}
          sx={{
            backgroundColor: "#FFF3E0",
            border: "1px solid #FFCCBC",
            color: "#FF5722",
            "&:hover": { backgroundColor: "#FFE0B2" },
          }}
        >
          {isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
