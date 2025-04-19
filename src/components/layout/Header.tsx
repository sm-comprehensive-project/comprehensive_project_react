"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Toolbar, Typography, InputBase, Box, IconButton, Collapse, Badge, Button, Container } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import MenuIcon from "@mui/icons-material/Menu"

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

  const handleCategoryClick = (label: string) => {
    setSelected(label === selected ? null : label)
  }

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
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
      {/* 상단 툴바 */}
      <Container maxWidth="lg">
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
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              padding: "6px 12px",
              borderRadius: "8px",
              width: { xs: "40%", sm: "35%", md: "40%" },
              maxWidth: "400px",
              border: "1px solid #eeeeee",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#f8f8f8",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              },
              "&:focus-within": {
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #FF5722",
              },
            }}
          >
            <SearchIcon sx={{ color: "#9e9e9e", marginRight: 1, fontSize: "1.2rem" }} />
            <InputBase
              placeholder="검색어 입력..."
              sx={{
                color: "#212121",
                width: "100%",
                fontSize: "0.9rem",
                "&::placeholder": { color: "#9e9e9e", opacity: 0.8 },
              }}
            />
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
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#FF5722",
                  textDecoration: "underline",
                },
              }}
            >
              로그인
            </Button>
            <Button
              variant="text"
              sx={{
                color: "#555",
                fontSize: "0.85rem",
                minWidth: { xs: "auto", sm: "auto" },
                padding: { xs: "4px 6px", sm: "4px 8px" },
                textTransform: "none",
                fontWeight: "500",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#FF5722",
                  textDecoration: "underline",
                },
              }}
            >
              회원가입
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
