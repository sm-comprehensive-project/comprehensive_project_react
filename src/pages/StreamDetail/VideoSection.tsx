// src/pages/StreamDetail/VideoSection.tsx
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Link, CircularProgress } from "@mui/material";
import Hls from "hls.js";

interface VideoSectionProps {
  liveUrl: string;
  thumbnail: string;
  fixedHeight?: boolean; // 부모가 높이를 고정해서 줄 때 'true'로 전달
}

export default function VideoSection({
  liveUrl,
  thumbnail,
  fixedHeight = false,
}: VideoSectionProps) {
  // 1) m3u8 URL을 담을 상태
  const [m3u8Url, setM3u8Url] = useState<string | null>(null);
  // 2) 로딩 상태 (m3u8를 요청 중이면 true)
  const [loading, setLoading] = useState<boolean>(false);
  // 3) 개발자 임시 입력용 live URL 상태
  const [manualUrl, setManualUrl] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   * 4) 라이브 URL 또는 수동 입력된 URL을 proxy 서버로 보내서 m3u8 주소를 받아오는 함수
   *    customUrl이 전달되면 해당 URL을, 아니면 props로 전달된 liveUrl을 사용
   */
  const fetchM3u8 = async (customUrl?: string) => {
    const targetUrl = customUrl || liveUrl;
    console.log("[fetchM3u8] 호출됨. targetUrl:", targetUrl);
    if (!targetUrl) {
      console.warn("[fetchM3u8] URL이 없습니다.");
      return;
    }

    setLoading(true);
    console.log("[fetchM3u8] loading 상태 true로 설정");

    let port: number;
    if (targetUrl.includes("kakao")) {
      port = 5000;
      console.log("[fetchM3u8] kakao 플랫폼 감지, port=5000");
    } else if (targetUrl.includes("naver")) {
      port = 4000;
      console.log("[fetchM3u8] naver 플랫폼 감지, port=4000");
    } else {
      console.warn("[fetchM3u8] 지원하지 않는 플랫폼:", targetUrl);
      setLoading(false);
      console.log("[fetchM3u8] loading 상태 false로 설정 (지원하지 않는 플랫폼)");
      return;
    }

    try {
      const res = await fetch(`http://localhost:${port}/get-live-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });
      console.log("[fetchM3u8] 프록시 서버 응답 상태:", res.status);

      if (!res.ok) throw new Error(`프록시 서버 오류: ${res.status}`);
      const json: { url?: string } = await res.json();
      console.log("[fetchM3u8] 응답 JSON:", json);

      if (json.url) {
        setM3u8Url(json.url);
        console.log("[fetchM3u8] m3u8Url 설정:", json.url);
      } else {
        console.warn("[fetchM3u8] m3u8 URL을 받아오지 못했습니다.");
      }
    } catch (err) {
      console.error("[fetchM3u8] 에러 발생:", err);
    } finally {
      setLoading(false);
      console.log("[fetchM3u8] loading 상태 false로 설정");
    }
  };

  /**
   * 5) 컴포넌트가 마운트되거나 props로 전달된 liveUrl이 바뀔 때 자동으로 m3u8 호출
   */
  useEffect(() => {
    console.log("[useEffect:liveUrl] liveUrl:", liveUrl);
    if (liveUrl) {
      fetchM3u8();
    } else {
      setM3u8Url(null);
      console.log("[useEffect:liveUrl] m3u8Url 초기화됨");
    }
  }, [liveUrl]);

  /**
   * 6) m3u8Url 값이 설정되면 Hls.js로 <video>에 스트림 연결
   */
  useEffect(() => {
    console.log("[useEffect:m3u8Url] m3u8Url 변경됨:", m3u8Url);
    if (!m3u8Url || !videoRef.current) {
      console.log("[useEffect:m3u8Url] videoRef 없거나 m3u8Url 없음");
      return;
    }

    if (Hls.isSupported()) {
      console.log("[useEffect:m3u8Url] Hls.js 지원됨. 스트리밍 시작");
      const hls = new Hls();
      hls.loadSource(m3u8Url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("[Hls.Events.MANIFEST_PARSED] 재생 시도");
        videoRef.current?.play().catch((e) => {
          console.error("[video.play 에러]", e);
        });
      });

      return () => {
        console.log("[useEffect:m3u8Url] Hls.destroy 호출");
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("[useEffect:m3u8Url] 네이티브 HLS 지원. video.src 설정");
      videoRef.current.src = m3u8Url;
      videoRef.current.addEventListener("loadedmetadata", () => {
        console.log("[video.loadedmetadata] 재생 시도");
        videoRef.current?.play().catch((e) => {
          console.error("[video.play 에러]", e);
        });
      });
    } else {
      console.warn("[useEffect:m3u8Url] HLS 미지원 브라우저");
    }
  }, [m3u8Url]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: fixedHeight ? "100%" : "100%", // 무조건 부모가 정한 높이를 100% 차지
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        bgcolor: "#000",
        padding: 0, // 패딩 제거
      }}
    >
      {/* 개발자용 입력 UI: 항상 표시 */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          right: 8,
          zIndex: 100,
          display: "flex",
          gap: 1,
          alignItems: "center",
          bgcolor: "rgba(255,255,255,0.9)",
          px: 2,
          py: 1,
          borderRadius: 1,
        }}
      >
        <input
          type="text"
          placeholder="테스트용 라이브 URL 입력"
          value={manualUrl}
          onChange={(e) => {
            console.log("[input:onChange] manualUrl 변경:", e.target.value);
            setManualUrl(e.target.value);
          }}
          style={{
            flex: 1,
            padding: "4px 8px",
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => {
            console.log(
              "[button:onClick] 수동 fetchM3u8 실행. manualUrl:",
              manualUrl
            );
            fetchM3u8(manualUrl);
          }}
          style={{
            padding: "6px 10px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          불러오기
        </button>
      </Box>

      {m3u8Url ? (
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

          {/* m3u8Url이 있을 때 <video>를 부모 크기에 맞춰 완전 표시 */}
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
              objectFit: "contain", // 잘리지 않게 비율 유지
              backgroundColor: "black",
            }}
          />
        </>
      ) : (
        /* m3u8Url이 없을 때: 썸네일 */
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
            <Typography variant="h5" fontWeight="bold" sx={{ color: "white", mb: 1 }}>
              라이브 방송 준비 중
            </Typography>
            <Typography variant="body1" sx={{ color: "white", opacity: 0.9, mb: 2 }}>
              곧 시작합니다. 잠시만 기다려주세요.
            </Typography>

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
              <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
                LIVE
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
