// 파일: src/components/layout/LogoNav.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LogoNavProps {
  themeColor: string;
  themeGradient: string;
  onToggleCategory: () => void;
}

/**
 * LogoNav 컴포넌트
 * - 좌측 로고(DAMOA) + 카테고리 토글 메뉴 버튼
 * - 중간 네비게이션(편성표 / 틱톡) 버튼 (다국어 처리됨)
 */
const LogoNav: React.FC<LogoNavProps> = ({
  themeColor,
  themeGradient,
  onToggleCategory,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* 1) 로고 */}
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

      {/* 2) 카테고리 토글 버튼 (메뉴 아이콘) */}
      <Box
        onClick={onToggleCategory}
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

      {/* 3) 네비게이션 버튼: 편성표 / 틱톡 (xs 화면에서는 숨김) */}
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
          {t("header.schedule")}
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
          {t("header.tictoc")}
        </Button>
      </Box>
    </Box>
  );
};

export default LogoNav;
