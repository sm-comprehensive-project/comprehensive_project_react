// 파일: src/components/layout/Footer.tsx
import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  // returnObjects 옵션을 이용해 배열을 받아올 때, 타입 단언(as string[])을 사용합니다.
  const shopItems = t("footer.shopList", { returnObjects: true }) as string[];
  const supportItems = t("footer.supportList", { returnObjects: true }) as string[];
  const mypageItems = t("footer.mypageList", { returnObjects: true }) as string[];
  const followItems = t("footer.followList", { returnObjects: true }) as string[];

  return (
    <Box sx={{ backgroundColor: "#212121", color: "white", py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          {/* 회사 로고/소개/고객센터 정보 */}
          <Box sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {t("footer.company")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#aaa" }}>
              {t("footer.description")}
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaa" }}>
              {t("footer.support")}
            </Typography>
          </Box>

          {/* 네 개 섹션: 쇼핑하기, 고객지원, 마이페이지, 팔로우하기 */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
              gap: 4,
            }}
          >
            {/* 쇼핑하기 섹션 */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("footer.section.shop")}
              </Typography>
              {shopItems.map((text: string) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#aaa" }}>
                  {text}
                </Typography>
              ))}
            </Box>

            {/* 고객지원 섹션 */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("footer.section.support")}
              </Typography>
              {supportItems.map((text: string) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#aaa" }}>
                  {text}
                </Typography>
              ))}
            </Box>

            {/* 마이페이지 섹션 */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("footer.section.mypage")}
              </Typography>
              {mypageItems.map((text: string) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#aaa" }}>
                  {text}
                </Typography>
              ))}
            </Box>

            {/* 팔로우하기 섹션 */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("footer.section.follow")}
              </Typography>
              {followItems.map((text: string) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#aaa" }}>
                  {text}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 3 }} />

        <Typography variant="body2" sx={{ color: "#777", textAlign: "center" }}>
          {t("footer.copyright")}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
