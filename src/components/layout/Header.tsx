// 파일: src/components/layout/Header.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, InputBase, IconButton, Badge } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import LogoNav from "./headercomponents/LogoNav";
import UserNav from "./headercomponents/UserNav";
import CategoryMenu from "./headercomponents/CategoryMenu";

interface User {
  email: string;
}

const categories = [
  { emoji: "👗", label: "패션의류", display: "패션의류" },
  { emoji: "👜", label: "패션잡화", display: "패션잡화" },
  { emoji: "💄", label: "화장품_미용", display: "미용" },
  { emoji: "💻", label: "디지털_가전", display: "가전" },
  { emoji: "🪑", label: "가구_인테리어", display: "인테리어" },
  { emoji: "🧸", label: "출산_육아", display: "육아" },
  { emoji: "🥗", label: "식품", display: "식품" },
  { emoji: "⛺", label: "스포츠_레저", display: "스포츠" },
  { emoji: "🧼", label: "생활_건강", display: "건강" },
  { emoji: "✈️", label: "여가_생활편의", display: "생활편의" },
];

const dummySearchResults = [
  { id: 1, text: "인기 상품", category: "👗" },
  { id: 2, text: "새로운 레시피", category: "🥗" },
  { id: 3, text: "오늘의 메이크업", category: "💄" },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 테마 색상이나 그래디언트 변경
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

  // 로그인 정보(user) 상태 관리
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({ email: parsed.email });
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // 카테고리 Collapse 토글
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategory = () => setIsCategoryOpen((prev) => !prev);

  const handleSelectCategory = (label: string) => {
    setSelectedCategory(label === selectedCategory ? null : label);
    setIsCategoryOpen(false);
    window.location.href = `/search/category?category=${encodeURIComponent(label)}`;
  };

  // ---------- 검색창 로직 (원래대로 복원) ----------
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    inputRef.current?.focus();
  };
  const clearSearch = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };
  // -------------------------------------------------

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
          {/* 좌측 로고 + 카테고리 + 네비게이션 */}
          <LogoNav
            themeColor={themeColor}
            themeGradient={themeGradient}
            onToggleCategory={toggleCategory}
          />

          {/* 검색창 (원본 로직으로 복원) */}
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
              }}
            >
              <InputBase
                inputRef={inputRef}
                placeholder="검색어 입력..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchValue.trim()) {
                    navigate(
                      `/search?query=${encodeURIComponent(searchValue.trim())}`
                    );
                    setIsSearchFocused(false);
                  }
                }}
                sx={{
                  width: "100%",
                  fontSize: "0.9rem",
                  "&::placeholder": { color: "#9e9e9e" },
                }}
              />

              {/* ✖️ 검색어 지우기 버튼 */}
              {searchValue && (
                <IconButton
                  size="small"
                  onClick={clearSearch}
                  sx={{ color: "#9e9e9e", p: "2px", ml: 1 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}

              {/* 🔍 검색 버튼 */}
              <IconButton
                size="small"
                onClick={() => {
                  if (searchValue.trim()) {
                    navigate(
                      `/search?query=${encodeURIComponent(searchValue.trim())}`
                    );
                    setIsSearchFocused(false);
                  }
                }}
                sx={{ color: themeColor, ml: 1 }}
              >
                <SearchIcon />
              </IconButton>
            </Box>

            {/* 🔽 최근 검색어 드롭다운 */}
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
                      sx={{ color: "#9e9e9e", fontSize: "0.9rem", mr: 1 }}
                    />
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

          {/* 우측 로그인／내 정보／찜 아이콘 */}
          <UserNav themeColor={themeColor} userEmail={user?.email || null} />
        </Box>
      </Box>

      {/* 카테고리 메뉴 Collapse */}
      <CategoryMenu
        isOpen={isCategoryOpen}
        selected={selectedCategory}
        onSelectCategory={handleSelectCategory}
        themeColor={themeColor}
      />
    </Box>
  );
};

export default Header;
