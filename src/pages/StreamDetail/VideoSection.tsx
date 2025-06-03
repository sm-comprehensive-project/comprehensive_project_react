// src/pages/StreamDetail/VideoSection.tsx
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Link, CircularProgress } from "@mui/material";
import Hls from "hls.js";

interface VideoSectionProps {
  isLive: boolean;
  liveUrl: string;
  thumbnail: string;
  fixedHeight?: boolean; // 부모가 높이를 고정해서 줄 때 'true'로 전달
}

export default function VideoSection({
  isLive,
  liveUrl,
  thumbnail,
  fixedHeight = false,
}: VideoSectionProps) {
  // 1) m3u8 URL을 담을 상태
  const [m3u8Url, setM3u8Url] = useState<string | null>(null);
  // 2) 로딩 상태 (m3u8를 요청 중이면 true)
  const [loading, setLoading] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 3) 라이브 URL을 proxy 서버로 보내서 m3u8 주소를 받아오는 함수
  const fetchM3u8 = async () => {
    if (!liveUrl) return;
    setLoading(true);

    // 간단히 kakao vs naver 구분 (필요하다면 더 세부 로직 추가 가능)
    let port: number;
    if (liveUrl.includes("kakao")) {
      port = 5000;
    } else if (liveUrl.includes("naver")) {
      port = 4000;
    } else {
      console.warn("지원하지 않는 라이브 플랫폼:", liveUrl);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:${port}/get-live-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: liveUrl }),
      });
      if (!res.ok) throw new Error(`프록시 서버 오류: ${res.status}`);
      const json: { url?: string } = await res.json();
      if (json.url) {
        setM3u8Url(json.url);
      } else {
        console.warn("m3u8 URL을 받아오지 못했습니다.");
      }
    } catch (err) {
      console.error("m3u8 fetch 중 에러:", err);
    } finally {
      setLoading(false);
    }
  };

  // 4) 컴포넌트가 마운트되거나 liveUrl이 바뀔 때, m3u8 URL을 가져오도록 감지
  useEffect(() => {
    if (isLive && liveUrl) {
      fetchM3u8();
    } else {
      // 라이브가 아니면 m3u8Url을 초기화
      setM3u8Url(null);
    }
  }, [isLive, liveUrl]);

  // 5) m3u8Url 값이 설정되면 Hls.js로 <video>에 붙여준다
  useEffect(() => {
    if (!m3u8Url || !videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(m3u8Url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // 스트리밍 준비 완료
        videoRef.current?.play().catch(() => {
          /* 자동 재생이 막히는 브라우저용 catch */
        });
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari 등 HLS 네이티브 지원 브라우저
      videoRef.current.src = m3u8Url;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current?.play().catch(() => {});
      });
    }
  }, [m3u8Url]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        bgcolor: "#000",

        // ────────────────────────────────────────────────────────────
        // 부모가 fixedHeight=true 로 props를 주면 전체 높이를 100% 차지.
        // 그렇지 않으면 ‘paddingTop: 56.25%’(16:9 비율)로 세로 긴 박스.
        height: fixedHeight ? "100%" : "auto",
        paddingTop: fixedHeight ? 0 : "56.25%",
      }}
    >
      {isLive ? (
        <>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                bgcolor: "rgba(0,0,0,0.4)",
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          )}

          {/* ───────────────────────────────────────────────────────
              실제 라이브인 경우: <video> 태그를 100%로 절대위치 채움
          ─────────────────────────────────────────────────────── */}
          <Box
            component="video"
            ref={videoRef}
            controls
            muted
            autoPlay
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "black",
            }}
          />
        </>
      ) : (
        /* ───────────────────────────────────────────────────────
           라이브 준비 중인 경우: 썸네일 배경 + 반투명 오버레이 + 중앙 정렬된 메시지
        ─────────────────────────────────────────────────────── */
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* 1) 반투명 어두운 오버레이 (가득 채움) */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)",
            }}
          />

          {/* 2) 중앙 정렬된 텍스트 & LIVE 배지 */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              zIndex: 1,
              px: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "white", mb: 1 }}
            >
              라이브 방송 준비 중
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "white", opacity: 0.9, mb: 2 }}
            >
              곧 시작합니다. 잠시만 기다려주세요.
            </Typography>

            {/* ─── “라이브 바로 가기” 링크를 추가 ─── */}
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                textDecoration: "underline",
                fontSize: "0.875rem",
                mb: 3,
              }}
            >
              ▶ 라이브 바로 가기
            </Link>
            {/* ──────────────────────────────────────── */}

            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "rgba(74, 85, 104, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(0.95)",
                    boxShadow: "0 0 0 0 rgba(74, 85, 104, 0.7)",
                  },
                  "70%": {
                    transform: "scale(1)",
                    boxShadow: "0 0 0 10px rgba(74, 85, 104, 0)",
                  },
                  "100%": {
                    transform: "scale(0.95)",
                    boxShadow: "0 0 0 0 rgba(74, 85, 104, 0)",
                  },
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "white" }}
              >
                LIVE
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
