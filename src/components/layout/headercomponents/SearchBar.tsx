// 파일: src/components/layout/headercomponents/SearchBar.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  InputBase,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  themeColor: string;
  userEmail: string | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ themeColor, userEmail }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const dummySearchResults = [
    { id: 1, text: t("search.dummy.item1"), category: "👗" },
    { id: 2, text: t("search.dummy.item2"), category: "🥗" },
    { id: 3, text: t("search.dummy.item3"), category: "💄" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveSearchHistory = async (query: string) => {
    if (!userEmail) return;
    try {
      await fetch("/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userEmail,
          type: "SEARCH",
          data: { Query: query },
        }),
      });
    } catch (err) {
      console.error("검색 기록 이벤트 전송 오류:", err);
    }
  };

  const doSearch = async () => {
    const query = searchValue.trim();
    if (!query) return;
    await saveSearchHistory(query);
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setIsFocused(false);
  };

  const clearInput = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  return (
    <Box
      ref={searchContainerRef}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: { xs: "40%", sm: "35%", md: "40%" },
        maxWidth: isFocused ? "500px" : "400px",
        transition: "all 0.3s ease",
        zIndex: 1200,
      }}
    >
      {/* 1) 입력창 + 아이콘 */}
      <Box
        onClick={() => {
          setIsFocused(true);
          inputRef.current?.focus();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: isFocused ? "#fff" : "#f5f5f5",
          p: "8px 12px",
          borderRadius: isFocused ? "8px 8px 0 0" : "8px",
          boxShadow: isFocused ? "0 4px 15px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <InputBase
          inputRef={inputRef}
          placeholder={t("search.placeholder")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await doSearch();
            }
          }}
          sx={{
            width: "100%",
            fontSize: "0.9rem",
            "&::placeholder": { color: "#9e9e9e" },
          }}
        />

        {searchValue && (
          <IconButton
            size="small"
            onClick={clearInput}
            sx={{ color: "#9e9e9e", p: "2px", ml: 1 }}
            aria-label="검색어 지우기"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}

        <IconButton
          size="small"
          onClick={doSearch}
          sx={{ color: themeColor, ml: 1 }}
          aria-label="검색 실행"
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {/* 2) 포커스 시 오버레이 */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 1050,
          opacity: isFocused ? 1 : 0,
          visibility: isFocused ? "visible" : "hidden",
          transition: "opacity 0.3s",
        }}
      />

      {/* 3) 드롭다운 */}
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          zIndex: 1060,
          opacity: isFocused ? 1 : 0,
          visibility: isFocused ? "visible" : "hidden",
          transform: isFocused ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.2s, transform 0.2s, visibility 0.2s",
        }}
      >
        <Typography variant="caption" sx={{ p: 1, color: "#666" }}>
          {t("search.recentSearch")}
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
              cursor: "pointer",
            }}
            onClick={async () => {
              setSearchValue(item.text);
              await saveSearchHistory(item.text);
              navigate(`/search?query=${encodeURIComponent(item.text)}`);
              setIsFocused(false);
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
  );
};

export default SearchBar;
