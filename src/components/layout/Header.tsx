"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  InputBase,
  Badge,
  Collapse,
  IconButton,
  Box,
  Typography,
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
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (label: string) => {
    setSelected(label === selected ? null : label);
  };

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
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
          {/* 좌측 로고 및 메뉴 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#FF5722",
                textDecoration: "none",
                mr: 3,
              }}
            >
              DAMOA
            </Typography>

            <Box
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                p: 1,
                borderRadius: 1,
                "&:hover": { backgroundColor: "rgba(255,87,34,0.08)" },
                mr: 2,
              }}
            >
              <MenuIcon sx={{ color: "#FF5722", fontSize: "1.5rem" }} />
            </Box>

            {/* 주요 링크 */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                component={Link}
                to="/weeklyschedule"
                startIcon={<CalendarTodayIcon />}
                sx={{
                  textTransform: "none",
                  color: "#555",
                  "&:hover": { color: "#FF5722" },
                }}
              >
                편성표
              </Button>
              <Button
                component={Link}
                to="/stream"
                startIcon={<LiveTvIcon />}
                sx={{
                  textTransform: "none",
                  color: "#555",
                  "&:hover": { color: "#FF5722" },
                }}
              >
                라이브
              </Button>
            </Box>
          </Box>

          {/* 중앙 검색창 */}
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
                boxShadow: isSearchFocused
                  ? "0 4px 15px rgba(0,0,0,0.08)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            >
              <SearchIcon
                sx={{
                  color: isSearchFocused ? "#FF5722" : "#9e9e9e",
                  mr: 1,
                }}
              />
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
                transform: isSearchFocused
                  ? "translateY(0)"
                  : "translateY(-10px)",
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
                    <SearchIcon
                      sx={{
                        color: "#9e9e9e",
                        fontSize: "0.9rem",
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">{item.text}</Typography>
                  </Box>
                  <Badge badgeContent={item.category} color="default" />
                </Box>
              ))}
            </Box>
          </Box>

          {/* 우측 메뉴 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              sx={{
                textTransform: "none",
                fontWeight: 500,
                color: "#555",
                "&:hover": { color: "#FF5722" },
              }}
            >
              로그인 / 회원가입
            </Button>
            <IconButton sx={{ color: "#555", "&:hover": { color: "#FF5722" } }}>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton sx={{ color: "#555", "&:hover": { color: "#FF5722" } }}>
              <PersonOutlineIcon />
            </IconButton>
            <IconButton sx={{ color: "#555", "&:hover": { color: "#FF5722" } }}>
              <Badge badgeContent={0} showZero={false} color="success">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ✅ 카테고리 토글 - position: absolute로 수정 */}
      <Collapse
        in={isVisible}
        timeout="auto"
        unmountOnExit
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
                color: selected === cat.label ? "#FF5722" : "#333",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor:
                    selected === cat.label ? "#FFF3E0" : "#f5f5f5",
                  border:
                    selected === cat.label
                      ? "2px solid #FF5722"
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
