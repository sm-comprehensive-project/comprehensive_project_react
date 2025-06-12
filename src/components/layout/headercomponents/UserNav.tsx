// 파일: src/components/layout/headercomponents/UserNav.tsx
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n"; // i18n 인스턴스 import

interface UserNavProps {
  themeColor: string;
  userEmail: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ themeColor, userEmail }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 🌐 언어 메뉴 상태
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang); // 실제 언어를 전환합니다.
    handleMenuClose();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* 로그인 여부에 따른 메뉴 */}
      {userEmail ? (
        <>
          <Button
            onClick={() => navigate("/liked")}
            sx={{
              color: "#555",
              textTransform: "none",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { color: themeColor },
            }}
          >
            <FavoriteIcon fontSize="small" />
            {t("userNav.wishlist")}
          </Button>

          <Button
            component={Link}
            to="/mypage"
            sx={{
              color: "#555",
              textTransform: "none",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { color: themeColor },
            }}
          >
            <AccountCircleIcon fontSize="small" />
            {t("userNav.mypage")}
          </Button>
        </>
      ) : (
        <Button
          component={Link}
          to="/auth"
          sx={{
            color: "#555",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": { color: themeColor },
          }}
        >
          {t("header.login")}
        </Button>
      )}

      {/* 언어 선택 버튼 */}
      <Tooltip title={t("userNav.language")}>
        <IconButton
          onClick={handleMenuOpen}
          sx={{ color: "#555", "&:hover": { color: themeColor } }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleLanguageChange("ko")}>
          {t("language.ko")}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("en")}>
          {t("language.en")}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("zh")}>
          {t("language.zh")}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("ja")}>
          {t("language.ja")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserNav;
