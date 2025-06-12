import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Avatar,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import type { Recommendation } from "../../components/HeroBanner";

export interface RecommendationsSectionProps {
  data: Recommendation[];
  onItemClick?: (item: Recommendation) => void;
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  data,
  onItemClick,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ position: "relative", mt: 4, px: 2 }}>
      {/* 네비게이션 버튼 */}
      <Box
        className="swiper-button-prev-rec"
        sx={{
          position: "absolute",
          top: "50%",
          left: 8,
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "#fff",
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background-color 0.3s",
          "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ArrowBackIosIcon fontSize="small" />
      </Box>
      <Box
        className="swiper-button-next-rec"
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "#fff",
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background-color 0.3s",
          "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </Box>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev-rec",
          nextEl: ".swiper-button-next-rec",
        }}
        loop
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          600: { slidesPerView: 2, spaceBetween: 16 },
          960: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
        style={{ padding: "16px 0" }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.liveId}>
            <Card
              onClick={() => onItemClick?.(item)}
              sx={{
                cursor: onItemClick ? "pointer" : "default",
                borderRadius: 3,
                boxShadow: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.thumbnail}
                  alt={item.title}
                  sx={{ objectFit: "cover" }}
                />
                {item.live && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: theme.palette.error.main,
                      color: "#fff",
                      px: 1,
                      py: "2px",
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    LIVE
                  </Box>
                )}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    bgcolor:
                      item.platform === "kakao" ? "#FEE500" : "#03C75A",
                    color: item.platform === "kakao" ? "#000" : "#fff",
                    px: 1,
                    py: "2px",
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {item.platform.toUpperCase()}
                </Box>
              </Box>

              <CardContent
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {item.title.replace(/\n/g, " ")}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Avatar
                    src={item.sellerInfo.image}
                    alt={item.sellerInfo.name}
                    sx={{ width: 28, height: 28 }}
                  />
                  <Typography variant="body2" noWrap>
                    {item.sellerInfo.name}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={() => navigate(`/watch/${item.liveId}`)}
                  sx={{
                    mt: "auto",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  방송 보기
                </Button>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RecommendationsSection;
