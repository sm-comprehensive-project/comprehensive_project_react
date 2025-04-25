import { Box, Typography, Container, Divider } from "@mui/material";

const Footer = () => {
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
          <Box sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              DAMOA
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#aaa" }}>
              최고의 라이브 커머스 플랫폼으로 쇼핑의 새로운 경험을 제공합니다.
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaa" }}>
              고객센터: 1234-5678 (평일 09:00-18:00)
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
              gap: 4,
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                쇼핑하기
              </Typography>
              {["베스트", "신상품", "이벤트", "라이브"].map((text) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#aaa" }}>
                  {text}
                </Typography>
              ))}
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                고객지원
              </Typography>
              {["자주 묻는 질문", "1:1 문의", "공지사항", "이용약관"].map((text) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#aaa" }}>
                  {text}
                </Typography>
              ))}
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                마이페이지
              </Typography>
              {["주문조회", "배송조회", "취소/반품", "쿠폰/포인트"].map((text) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#aaa" }}>
                  {text}
                </Typography>
              ))}
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                팔로우하기
              </Typography>
              {["인스타그램", "페이스북", "유튜브", "카카오톡"].map((text) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#aaa" }}>
                  {text}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 3 }} />

        <Typography variant="body2" sx={{ color: "#777", textAlign: "center" }}>
          © 2023 DAMOA. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
