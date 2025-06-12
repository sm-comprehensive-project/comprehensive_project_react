// src/components/schedule/FilterBar.tsx
import React from "react";
import { Box, ButtonGroup, Button, Tabs, Tab } from "@mui/material";

interface FilterBarProps {
  viewMode: "grid" | "list";
  platformFilter: "all" | "kakao" | "naver";
  onViewChange: (mode: "grid" | "list") => void;
  onPlatformChange: (platform: "all" | "kakao" | "naver") => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  viewMode,
  platformFilter,
  onViewChange,
  onPlatformChange,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
      flexWrap: "wrap",
      gap: 2,
    }}
  >
    <Box sx={{ display: "flex", gap: 2 }}>
      <ButtonGroup>
        <Button
          onClick={() => onViewChange("grid")}
          variant={viewMode === "grid" ? "contained" : "outlined"}
        >
          카드형
        </Button>
        <Button
          onClick={() => onViewChange("list")}
          variant={viewMode === "list" ? "contained" : "outlined"}
        >
          리스트형
        </Button>
      </ButtonGroup>
      <Tabs value={platformFilter} onChange={(_, v) => onPlatformChange(v)}>
        <Tab label="전체" value="all" />
        <Tab label="카카오" value="kakao" />
        <Tab label="네이버" value="naver" />
      </Tabs>
    </Box>
  </Box>
);

export default FilterBar;
