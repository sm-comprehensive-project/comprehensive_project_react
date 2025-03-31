import { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // 👈 X 아이콘 추가

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95vw", // 거의 전체 너비
  maxWidth: "1280px", // 큰 화면에서도 안정
  height: "90vh", // 뷰포트 거의 다 차지
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  overflow: "hidden", // 안 넘치게
};

interface LiveModalProps {
  streamTitle: string;
  streamUrl: string;
  buttonLabel?: string;
}

const LiveModal = ({
  streamTitle,
  streamUrl,
  buttonLabel = "방송 보기",
}: LiveModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleOpen}
        sx={{ color: "#FF5722", borderColor: "#FF5722" }}
      >
        {buttonLabel}
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {/* ❌ 닫기 아이콘 버튼 (오른쪽 상단) */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.600",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* 콘텐츠 */}
          <Typography variant="h6" fontWeight="bold" mb={2}>
            🎥 {streamTitle}
          </Typography>
          <Box
            component="iframe"
            src={streamUrl}
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: 8 }}
          />
          <Box mt={2} textAlign="right">
            <Button variant="outlined" onClick={handleClose}>
              닫기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default LiveModal;
