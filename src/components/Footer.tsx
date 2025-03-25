import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
  <Box
    sx={{
      backgroundColor: "#f5f5f5", // 밝은 회색 배경
      textAlign: "center",
      padding: "15px",
      borderTop: "2px solid #ccc", // 연한 회색 테두리
    }}
  >
    <Typography variant="body2" color="#333">
      © 2025 LiveCommerce 프로젝트
    </Typography>
  </Box>
  
  );
};

export default Footer;
