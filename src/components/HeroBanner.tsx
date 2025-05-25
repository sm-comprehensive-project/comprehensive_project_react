import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";

const HeroBanner = () => {
  return (
      <Box
    sx={{
      background: "linear-gradient(135deg, #ff5722 0%, #62caf0 100%)",
      py: { xs: 6, md: 10 },
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ maxWidth: { xs: "100%", md: "50%" }, mb: { xs: 4, md: 0 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "800",
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            DAMOA 라이브 쇼핑
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: "400",
              opacity: 0.9,
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            지금 라이브로 쇼핑하고 특별한 혜택을 받아보세요!
            <br />
            다양한 브랜드의 실시간 라이브 방송을 한 곳에서 만나보세요.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#FF5722",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
              },
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            라이브 보러가기
          </Button>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            height: { xs: "200px", sm: "250px", md: "300px" },
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Typography variant="h5" sx={{ color: "white", fontWeight: "500" }}>
            라이브 쇼핑 배너
          </Typography>
        </Box>
      </Box>
    </Container>

    {/* 배경 장식 요소 */}
    <Box
      sx={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
        top: "-100px",
        right: "-100px",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
        bottom: "-50px",
        left: "10%",
      }}
    />
  </Box>
  );
};

export default HeroBanner;  