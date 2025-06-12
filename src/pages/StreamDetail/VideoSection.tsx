// src/pages/StreamDetail/VideoSection.tsx

import React, { useState, useRef, useEffect } from "react";
import { Box, CircularProgress, Typography, Link } from "@mui/material";
import Hls from "hls.js";

interface VideoSectionProps {
  liveUrl: string;
  thumbnail: string;
  fixedHeight?: boolean;
}

export default function VideoSection({
  liveUrl,
  thumbnail,
  fixedHeight = false,
}: VideoSectionProps) {
  // m3u8 URL 상태
  const [m3u8Url, setM3u8Url] = useState<string | null>(null);
  // 로딩 상태 (프록시 호출 중)
  const [loading, setLoading] = useState<boolean>(false);
  // 네트워크/프록시 오류 상태
  const [fetchError, setFetchError] = useState<boolean>(false);
  // 스트림 준비되지 않음 상태 (5회 재시도 후에도 URL 없음)
  const [noStream, setNoStream] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 1) m3u8 URL 받아오는 함수
  const fetchM3u8 = async (retryCount: number = 0) => {
    if (!liveUrl) {
      setNoStream(true);
      return;
    }

    setLoading(true);
    setFetchError(false);
    setNoStream(false);

    // 플랫폼(port) 결정
    const port = liveUrl.includes("kakao") ? 5000 : liveUrl.includes("naver") ? 4000 : null;
    if (port === null) {
      setNoStream(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:${port}/get-live-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: liveUrl }),
      });

      if (!res.ok) throw new Error(`프록시 서버 상태 코드 오류: ${res.status}`);

      const json: { url?: string } = await res.json();
      if (json.url) {
        // m3u8 URL을 한번만 세팅 (같으면 재세팅 안 함)
        setM3u8Url((prev) => (prev === json.url ? prev : json.url));
      } else {
        // 아직 준비되지 않으면 재시도
        if (retryCount < 4) {
          setTimeout(() => fetchM3u8(retryCount + 1), 2000);
        } else {
          setNoStream(true);
        }
      }
    } catch (err) {
      if (retryCount < 4) {
        setTimeout(() => fetchM3u8(retryCount + 1), 2000);
      } else {
        setFetchError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // liveUrl이 바뀔 때마다 상태 초기화 후 새로 fetch
  useEffect(() => {
    setM3u8Url(null);
    setFetchError(false);
    setNoStream(false);
    setLoading(false);

    if (liveUrl) {
      fetchM3u8(0);
    } else {
      setNoStream(true);
    }
  }, [liveUrl]);

  // 2) m3u8Url이 준비되면 Hls.js로 video 연결
  useEffect(() => {
    if (!m3u8Url || !videoRef.current) return;

    const videoEl = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(m3u8Url);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoEl.play().catch((e) => {
          console.error("[video.play 에러]", e);
        });
      });
      return () => {
        hls.destroy();
      };
    } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = m3u8Url;
      videoEl.addEventListener("loadedmetadata", () => {
        videoEl.play().catch((e) => {
          console.error("[video.play 에러]", e);
        });
      });
    } else {
      setNoStream(true);
    }
  }, [m3u8Url]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: fixedHeight ? "100%" : "auto",
        backgroundColor: "#000",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      {/* 1) 항상 video 엘리먼트를 렌더링하되, m3u8Url이 준비되지 않으면 비공개 상태 */}
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
          display: m3u8Url ? "block" : "none",
          backgroundColor: "black",
        }}
      />

      {/* 2) 로딩 중일 때만 최상단에 Spinner */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(0,0,0,0.6)",
            zIndex: 2,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}

      {/* 3) fetchError가 발생했을 때 */}
      {!loading && fetchError && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.6)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            스트림을 불러오는 중 오류가 발생했습니다.
          </Typography>
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white", textDecoration: "underline", fontSize: "0.875rem" }}
          >
            ▶ 직접 라이브 페이지로 이동하기
          </Link>
        </Box>
      )}

      {/* 4) noStream(스트림 없음)인 상태 */}
      {!loading && !fetchError && noStream && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.6)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            현재 재생 가능한 방송이 없습니다.
          </Typography>
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white", textDecoration: "underline", fontSize: "0.875rem" }}
          >
            ▶ 라이브 페이지로 이동하기
          </Link>
        </Box>
      )}

      {/* 5) m3u8Url이 아직 준비되지 않았을 때(로딩도 아니고, fetchError도 아니고, noStream도 아님) */}
      {!loading && !fetchError && !noStream && !m3u8Url && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
              p: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              라이브 방송 준비 중
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
              곧 시작합니다. 잠시만 기다려주세요.
            </Typography>
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "white", textDecoration: "underline", fontSize: "0.875rem" }}
            >
              ▶ 라이브 페이지로 이동하기
            </Link>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "rgba(74, 85, 104, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(74, 85, 104, 0.7)" },
                  "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px rgba(74, 85, 104, 0)" },
                  "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(74, 85, 104, 0)" },
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                LIVE
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
