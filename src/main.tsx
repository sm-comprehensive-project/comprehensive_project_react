import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./i18n"; // ← 한 번만 import 해 두면 전역 설정 완료
  
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
