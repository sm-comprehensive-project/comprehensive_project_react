import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1E1E1E",
        textAlign: "center",
        padding: "15px",
        borderTop: "2px solid #777",
      }}
    >
      <Typography variant="body2">© 2025 LiveCommerce 프로젝트</Typography>
    </Box>
  );
};

export default Footer;
