import React from "react";
import { Box, Collapse, Typography } from "@mui/material";

// categories를 export 해서 부모에서 display 조회 가능하도록
export const categories = [
  { emoji: "👗", label: "패션의류",     display: "패션의류"   },
  { emoji: "👜", label: "패션잡화",     display: "패션잡화"   },
  { emoji: "💄", label: "화장품_미용",   display: "미용"       },
  { emoji: "💻", label: "디지털_가전",   display: "가전"       },
  { emoji: "🪑", label: "가구_인테리어", display: "인테리어"   },
  { emoji: "🧸", label: "출산_육아",     display: "육아"       },
  { emoji: "🥗", label: "식품",         display: "식품"       },
  { emoji: "⛺", label: "스포츠_레저",   display: "스포츠"     },
  { emoji: "🧼", label: "생활_건강",     display: "건강"       },
  { emoji: "✈️", label: "여가_생활편의", display: "생활편의"   },
];

interface CategoryMenuProps {
  isOpen: boolean;
  selected: string | null;
  onSelectCategory: (label: string) => void;
  themeColor: string;
}

/**
 * Collapse로 펼쳐지는 카테고리 리스트.
 * 클릭 시 label만 부모로 전달.
 */
const CategoryMenu: React.FC<CategoryMenuProps> = ({
  isOpen,
  selected,
  onSelectCategory,
  themeColor,
}) => {
  return (
    <Collapse
      in={isOpen}
      timeout="auto"
      unmountOnExit
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderTop: "1px solid #f0f0f0",
        zIndex: 1000,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          py: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {categories.map((cat) => (
          <Box
            key={cat.label}
            onClick={() => onSelectCategory(cat.label)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              color: selected === cat.label ? themeColor : "#333",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor:
                  selected === cat.label ? `${themeColor}10` : "#f5f5f5",
                border:
                  selected === cat.label
                    ? `2px solid ${themeColor}`
                    : "2px solid transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              {cat.emoji}
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {cat.display}
            </Typography>
          </Box>
        ))}
      </Box>
    </Collapse>
  );
};

export default CategoryMenu;
