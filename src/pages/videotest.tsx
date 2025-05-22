import React, { useState, useRef, useEffect } from "react";
import Hls from "hls.js";

const VideoTest: React.FC = () => {
  const [m3u8Url, setM3u8Url] = useState<string | null>(null);
  const [liveUrl, setLiveUrl] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 방송 URL에서 m3u8 URL을 받아오는 함수
  const fetchLiveStreamUrl = async () => {
    if (!liveUrl) {
      alert("Please enter a live URL");
      return;
    }

    let port: number;
    if (liveUrl.includes("kakao")) {
      port = 5000;
    } else if (liveUrl.includes("naver")) {
      port = 4000;
    } else {
      alert("지원하지 않는 URL입니다.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:${port}/get-live-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: liveUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch live stream URL");
      }

      const data: { url?: string } = await response.json();

      if (data.url) {
        setM3u8Url(data.url);
      } else {
        alert("Failed to fetch live stream URL");
      }
    } catch (error) {
      console.error("Error fetching live stream URL:", error);
      alert("Failed to fetch live stream URL");
    }
  };

  useEffect(() => {
    if (m3u8Url && videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(m3u8Url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Manifest loaded, streaming now...");
      });

      return () => {
        hls.destroy();
      };
    }
  }, [m3u8Url]);

  return (
    <div>
      <h1>Live Stream Viewer</h1>
      <input
        type="text"
        value={liveUrl}
        onChange={(e) => setLiveUrl(e.target.value)}
        placeholder="Enter live stream URL"
      />
      <button onClick={fetchLiveStreamUrl}>Fetch Live Stream</button>

      {m3u8Url && (
        <div>
          <video
            ref={videoRef}
            width={360}
            height={640}
            controls
            autoPlay
            style={{
              backgroundColor: "black",
              objectFit: "contain", // 비디오 왜곡 방지
              display: "block",
              margin: "0 auto", // 가운데 정렬
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoTest;
