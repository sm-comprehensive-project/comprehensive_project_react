import React from "react";
import { Box } from "@mui/material";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#0e0e10", minHeight: "100vh", color: "white" }}>
      <Layout />
    </Box>
  );
};

export default App;
