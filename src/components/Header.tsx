import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#282A36", // 테마 색상 적용
        boxShadow: "none",
        borderBottom: "2px solid #7B68EE", // 헤더 하단 보라색 강조선
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 로고 */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#7B68EE" }}>
          LIVE COMMERCE
        </Typography>

        {/* 검색 바 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#6864F7",
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          <SearchIcon sx={{ color: "white", marginRight: 1 }} />
          <InputBase
            placeholder="검색어 입력..."
            sx={{
              color: "white",
              width: "200px",
              "&::placeholder": { color: "rgba(255,255,255,0.7)" },
            }}
          />
        </Box>

        {/* 아이콘 버튼 (설정, 계정) */}
        <Box>
          <IconButton sx={{ color: "#9370DB" }}>
            <SettingsIcon />
          </IconButton>
          <IconButton sx={{ color: "#9370DB" }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
