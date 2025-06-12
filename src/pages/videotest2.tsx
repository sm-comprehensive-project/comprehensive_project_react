import React, { useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axios from "axios";

const VideoTest: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStart = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/getStream", {
        url: inputRef.current?.value,
      });

      const { streamUrl } = data;
      if (!streamUrl) throw new Error("스트림 URL이 없습니다.");

      // 기존 player 해제
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }

      // 새 player 생성
      playerRef.current = videojs(videoRef.current!, {
        controls: true,
        autoplay: true,
        fluid: true,
        sources: [
          {
            src: `http://localhost:3001/proxy?url=${encodeURIComponent(
              streamUrl
            )}`,
            type: "application/x-mpegURL",
          },
        ],
      });
    } catch (err) {
      console.error(err);
      const error = err as Error;
      alert("스트림 재생에 실패했습니다:\n" + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>카카오 쇼핑라이브 스트림 보기</h1>
      <input
        ref={inputRef}
        defaultValue="https://shoppinglive.kakao.com/live/44442?startSec=300&t_src=shopping_live&t_ch=home&t_obj=live_player"
        style={{ width: "80%", marginRight: 8 }}
      />
      <button onClick={handleStart}>스트림 시작</button>

      <div style={{ marginTop: 20 }}>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoTest;
