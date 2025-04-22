"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Collapse,
  Badge,
  Button,
  Container,
  Chip,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

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
]

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 더미 검색 데이터
  const dummySearchResults = [
    { id: 1, text: "패션 봄 신상품", category: "패션" },
    { id: 2, text: "뷰티 화장품 세트", category: "뷰티" },
    { id: 3, text: "푸드 건강식품", category: "푸드" },
    { id: 4, text: "라이프 주방용품", category: "라이프" },
    { id: 5, text: "여행 패키지", category: "여행/체험" },
  ]

  // 검색창 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCategoryClick = (label: string) => {
    setSelected(label === selected ? null : label)
  }

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    // 검색창에 포커스가 갔을 때 자동으로 입력 필드에 포커스
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const clearSearch = () => {
    setSearchValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <Box
      sx={{
        position: "sticky", // ✅ 스크롤 해도 상단 고정
        top: 0,
        zIndex: 1300,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
      }}
    >
      {/* 검색 오버레이 */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1100,
          opacity: isSearchFocused ? 1 : 0,
          visibility: isSearchFocused ? "visible" : "hidden",
          transition: "opacity 0.3s, visibility 0.3s",
        }}
      />

      {/* 상단 툴바 */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1200 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: { xs: "0.5rem 0", md: "0.75rem 0" },
            minHeight: "64px",
          }}
          disableGutters
        >
          {/* 왼쪽: 로고 */}
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              fontWeight: "700",
              color: "#FF5722",
              textDecoration: "none",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              mr: 3,
            }}
          >
            DAMOA
          </Typography>

          {/* 메뉴 아이콘 */}
          <Box
            ref={menuRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "4px",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "rgba(255, 87, 34, 0.08)",
              },
            }}
          >
            <MenuIcon
              sx={{
                color: "#FF5722",
                fontSize: "2rem",
              }}
            />
          </Box>

          {/* 중앙: 검색창 */}
          <Box
            ref={searchRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              width: { xs: "40%", sm: "35%", md: "40%" },
              maxWidth: isSearchFocused ? "500px" : "400px",
              zIndex: 1200,
              transition: "all 0.3s ease",
            }}
          >
            <Box
              onClick={handleSearchFocus}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isSearchFocused ? "#ffffff" : "#f5f5f5",
                padding: "8px 12px",
                borderRadius: isSearchFocused ? "8px 8px 0 0" : "8px",
                width: "100%",
                boxShadow: isSearchFocused ? "0 4px 15px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: isSearchFocused ? "#ffffff" : "#f8f8f8",
                  boxShadow: isSearchFocused ? "0 4px 15px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.05)",
                },
              }}
            >
              <SearchIcon
                sx={{
                  color: isSearchFocused ? "#FF5722" : "#9e9e9e",
                  marginRight: 1,
                  fontSize: "1.2rem",
                  transition: "color 0.3s ease",
                }}
              />
              <InputBase
                inputRef={inputRef}
                placeholder="검색어 입력..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                sx={{
                  color: "#212121",
                  width: "100%",
                  fontSize: "0.9rem",
                  "&::placeholder": { color: "#9e9e9e", opacity: 0.8 },
                }}
              />
              {searchValue && (
                <IconButton size="small" onClick={clearSearch} sx={{ padding: "2px", color: "#9e9e9e" }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            {/* 검색 결과 드롭다운 - Fade 대신 CSS 트랜지션 사용 */}
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "0 0 8px 8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                border: "none",
                maxHeight: "300px",
                overflowY: "auto",
                opacity: isSearchFocused ? 1 : 0,
                visibility: isSearchFocused ? "visible" : "hidden",
                transform: isSearchFocused ? "translateY(0)" : "translateY(-10px)",
                transition: "opacity 0.2s, visibility 0.2s, transform 0.2s",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  padding: "10px 12px",
                  color: "#666",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                인기 검색어
              </Typography>

              {dummySearchResults.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    padding: "10px 12px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SearchIcon sx={{ color: "#9e9e9e", fontSize: "0.9rem", marginRight: 1 }} />
                    <Typography variant="body2">{item.text}</Typography>
                  </Box>
                  <Chip
                    label={item.category}
                    size="small"
                    sx={{
                      height: "20px",
                      fontSize: "0.7rem",
                      backgroundColor:
                        item.category === "패션"
                          ? "#FFF8E1"
                          : item.category === "뷰티"
                            ? "#E8F4FD"
                            : item.category === "푸드"
                              ? "#E8F5E9"
                              : item.category === "라이프"
                                ? "#F3E5F5"
                                : "#FFF3E0",
                      color: "#555",
                      border: "none",
                    }}
                  />
                </Box>
              ))}

              <Box
                sx={{
                  padding: "8px 12px",
                  borderTop: "1px solid #f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  sx={{
                    fontSize: "0.75rem",
                    color: "#666",
                    textTransform: "none",
                  }}
                >
                  모든 검색결과 보기
                </Button>
              </Box>
            </Box>
          </Box>

          {/* 오른쪽: 사용자 메뉴 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1, md: 1.5 } }}>
            <Button
              variant="text"
              sx={{
                color: "#555",
                fontSize: "0.85rem",
                minWidth: { xs: "auto", sm: "auto" },
                padding: { xs: "4px 6px", sm: "4px 8px" },
                textTransform: "none",
                fontWeight: "500",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#FF5722",
                },
              }}
            >
              로그인 / 회원가입
            </Button>
            <IconButton
              size="small"
              sx={{
                color: "#555",
                padding: "8px",
                "&:hover": { color: "#FF5722" },
              }}
            >
              <FavoriteBorderIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: "#555",
                padding: "8px",
                "&:hover": { color: "#FF5722" },
              }}
            >
              <PersonOutlineIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: "#555",
                padding: "8px",
                "&:hover": { color: "#FF5722" },
              }}
            >
              <Badge
                badgeContent={0}
                showZero={false}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#22c55e",
                    color: "white",
                    fontWeight: "bold",
                    minWidth: "18px",
                    height: "18px",
                    fontSize: "0.7rem",
                  },
                }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: "1.2rem" }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* 토글 영역 */}
      <Collapse in={isVisible} timeout="auto">
        <Container maxWidth="lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* 카테고리 아이콘 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 2, sm: 3, md: 4 },
              flexWrap: "wrap",
              py: 3,
              backgroundColor: "#fff",
              borderTop: "1px solid #f5f5f5",
              borderBottom: "1px solid #eeeeee",
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
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => handleCategoryClick(cat.label)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    borderRadius: "50%",
                    fontSize: { xs: "22px", sm: "24px" },
                    transition: "all 0.2s",
                    backgroundColor: selected === cat.label ? "#FFF3E0" : "#f5f5f5",
                    border: selected === cat.label ? "2px solid #FF5722" : "2px solid transparent",
                    "&:hover": {
                      backgroundColor: "#FFF3E0",
                      border: "2px solid #FFCCBC",
                    },
                  }}
                >
                  {cat.emoji}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    fontSize: "0.85rem",
                    fontWeight: selected === cat.label ? "600" : "normal",
                    color: selected === cat.label ? "#FF5722" : "#333",
                  }}
                >
                  {cat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Collapse>
    </Box>
  )
}

export default Header
