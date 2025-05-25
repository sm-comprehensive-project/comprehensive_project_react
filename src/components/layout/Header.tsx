"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  InputBase,
  Badge,
  Collapse,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MenuIcon from "@mui/icons-material/Menu";

const categories = [
  { emoji: "👗", label: "패션" },
  { emoji: "💄", label: "뷰티" },
  { emoji: "🥗", label: "푸드" },
  { emoji: "🪑", label: "라이프" },
  { emoji: "✈️", label: "여행/체험" },
  { emoji: "🧸", label: "키즈" },
  { emoji: "💻", label: "테크" },
  { emoji: "⛺", label: "취미레저" },
];

const dummySearchResults = [
  { id: 1, text: "인기 상품", category: "👗" },
  { id: 2, text: "새로운 레시피", category: "🥗" },
  { id: 3, text: "오늘의 메이크업", category: "💄" },
];

const Header = () => {
  const location = useLocation();

  const getThemeStyle = () => {
    if (location.pathname.startsWith("/weeklyschedule")) {
      return {
        color: "#3f51b5",
        gradient: "linear-gradient(160deg, #FF5722 -40%, #3f51b5 100%)",
      };
    }
    if (location.pathname.startsWith("/tictoc")) {
      return {
        color: "#FF0050",
        gradient: "linear-gradient(135deg, #FE2C55 0%, #00F2EA 100%)",
      };
    }
    if (location.pathname === "/") {
      return {
        color: "#62caf0",
        gradient: "linear-gradient(135deg, #ff5722 0%, #62caf0 100%)",
      };
    }
    return {
      color: "#FF5722",
      gradient: "linear-gradient(45deg, #FF5722, #FFC107)",
    };
  };

  const { color: themeColor, gradient: themeGradient } = getThemeStyle();

  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }

      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (label: string) => {
    setSelected(label === selected ? null : label);
  };

  const toggleCategory = () => setIsCategoryOpen((prev) => !prev);
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    inputRef.current?.focus();
  };
  const clearSearch = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1300,
        backgroundColor: "#fff",
        borderBottom: "1px solid #f0f0f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* 검색 오버레이 */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 40,
          opacity: isSearchFocused ? 1 : 0,
          visibility: isSearchFocused ? "visible" : "hidden",
          transition: "opacity 0.3s",
        }}
      />

      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          position: "relative",
          zIndex: 50,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          {/* 로고 & 메뉴 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                textDecoration: "none",
                mr: 3,
                background: themeGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              DAMOA
            </Typography>

            <Box
              onClick={toggleCategory}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                p: 1,
                borderRadius: 1,
                "&:hover": { backgroundColor: `${themeColor}10` },
                mr: 2,
              }}
            >
              <MenuIcon sx={{ color: themeColor, fontSize: "1.5rem" }} />
            </Box>

            {/* 네비게이션 */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button
                component={Link}
                to="/weeklyschedule"
                startIcon={<CalendarTodayIcon sx={{ fontSize: "1rem" }} />}
                sx={{
                  color: "#555",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { color: themeColor },
                }}
              >
                편성표
              </Button>
              <Button
                component={Link}
                to="/tictoc"
                startIcon={<LiveTvIcon sx={{ fontSize: "1rem" }} />}
                sx={{
                  color: "#555",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { color: themeColor },
                }}
              >
                틱톡
              </Button>
            </Box>
          </Box>

          {/* 검색창 */}
          <Box
            ref={searchRef}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              width: { xs: "40%", sm: "35%", md: "40%" },
              maxWidth: isSearchFocused ? "500px" : "400px",
              transition: "all 0.3s ease",
              zIndex: 1200,
            }}
          >
            <Box
              onClick={handleSearchFocus}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isSearchFocused ? "#fff" : "#f5f5f5",
                p: "8px 12px",
                borderRadius: isSearchFocused ? "8px 8px 0 0" : "8px",
                boxShadow: isSearchFocused ? "0 4px 15px rgba(0,0,0,0.08)" : "none",
              }}
            >
              <SearchIcon sx={{ color: isSearchFocused ? themeColor : "#9e9e9e", mr: 1 }} />
              <InputBase
                inputRef={inputRef}
                placeholder="검색어 입력..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                sx={{
                  width: "100%",
                  fontSize: "0.9rem",
                  "&::placeholder": { color: "#9e9e9e" },
                }}
              />
              {searchValue && (
                <IconButton
                  size="small"
                  onClick={clearSearch}
                  sx={{ color: "#9e9e9e", p: "2px" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            {/* 검색 결과 */}
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "0 0 8px 8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                opacity: isSearchFocused ? 1 : 0,
                visibility: isSearchFocused ? "visible" : "hidden",
                transform: isSearchFocused ? "translateY(0)" : "translateY(-10px)",
                transition: "opacity 0.2s, transform 0.2s, visibility 0.2s",
              }}
            >
              <Typography variant="caption" sx={{ p: 1, color: "#666" }}>
                최근 검색어
              </Typography>
              {dummySearchResults.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    px: 2,
                    py: 1,
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SearchIcon sx={{ color: "#9e9e9e", fontSize: "0.9rem", mr: 1 }} />
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                  <Badge
                    badgeContent={item.category}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#f5f5f5",
                        color: "#333",
                        fontSize: "0.7rem",
                        minWidth: "auto",
                        padding: "0 6px",
                        height: "20px",
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* 사용자 메뉴 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              component={Link}
              to="/auth"
              sx={{
                color: "#555",
                textTransform: "none",
                fontWeight: "500",
                "&:hover": { color: themeColor },
              }}
            >
              로그인 / 회원가입
            </Button>
            <IconButton sx={{ color: "#555", "&:hover": { color: themeColor } }}>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton sx={{ color: "#555", "&:hover": { color: themeColor } }}>
              <PersonOutlineIcon />
            </IconButton>
            <IconButton sx={{ color: "#555", "&:hover": { color: themeColor } }}>
              <Badge badgeContent={0} showZero={false} color="success">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* 카테고리 토글 영역 */}
      <Collapse
        in={isCategoryOpen}
        timeout="auto"
        unmountOnExit
        ref={categoryRef}
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          borderTop: "1px solid #f0f0f0",
          zIndex: 1000,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: 2,
            py: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {categories.map((cat) => (
            <Box
              key={cat.label}
              onClick={() => handleCategoryClick(cat.label)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                color: selected === cat.label ? themeColor : "#333",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor:
                    selected === cat.label ? `${themeColor}10` : "#f5f5f5",
                  border:
                    selected === cat.label
                      ? `2px solid ${themeColor}`
                      : "2px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                {cat.emoji}
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {cat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default Header;
