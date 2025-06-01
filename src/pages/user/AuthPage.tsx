// src/pages/AuthPage.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 상단에 추가

import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";

const AuthPage: React.FC = () => {
  const navigate = useNavigate(); // 👈 추가
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState(0);

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const [signupData, setSignupData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
    gender: "",
    address: "",
    detailAddress: "",
    categories: [] as string[],
    marketingAgree: false,
  });

  const categories = [
    { emoji: "👗", label: "패션" },
    { emoji: "💄", label: "뷰티" },
    { emoji: "🥗", label: "푸드" },
    { emoji: "🪑", label: "라이프" },
    { emoji: "✈️", label: "여행/체험" },
    { emoji: "🧸", label: "키즈" },
    { emoji: "💻", label: "테크" },
    { emoji: "⛺", label: "취미레저" },
    { emoji: "🎫", label: "문화생활" },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "signup") setTab(1);
  }, []);

  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const handleLogin = async () => {
    try {
      setLoginError("");
      setLoginSuccess("");

      const query = new URLSearchParams({
        email: loginData.username,
        password: loginData.password,
      });

      const response = await fetch(
        `http://localhost:8088/api/user/login?${query}`,
        {
          method: "POST",
          credentials: "include", // ✅ 세션 유지
        }
      );

      const result = await response.json();
      console.log("🟢 로그인 응답:", result); // ✅ 콘솔 출력 추가

      if (result.success) {
        const meResponse = await fetch("http://localhost:8088/api/user/me", {
          method: "GET",
          credentials: "include",
        });

        const meResult = await meResponse.json();
        console.log("🟢 /me 응답:", meResult); // ✅ 이것도 같이 추가하면 좋음

        if (meResult.success) {
          setLoginSuccess("로그인 성공! 메인 페이지로 이동합니다.");
          setTimeout(() => navigate("/"), 1000);
        } else {
          setLoginError("세션 유저 정보 확인 실패");
        }
      } else {
        setLoginError("로그인 실패: " + result.message);
      }
    } catch (err) {
      console.error("❌ 로그인 오류:", err);
      setLoginError("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSignup = () => {
    console.log("회원가입 정보:", signupData);
    setLoginData({ username: signupData.email, password: "" }); // 이메일 채움
    setTab(0); // 👈 회원가입 후 로그인 페이지로 이동
  };

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(135deg, #FFF3E0 0%, #FFCCBC 100%)",
          minHeight: "calc(100vh - 64px)",
          py: { xs: 4, md: 8 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 4, md: 8 },
            }}
          >
            {!isMobile && (
              <Box
                sx={{
                  flex: "0 0 40%",
                  maxWidth: "450px",
                  p: 4,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: 3,
                  textAlign: "center",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="#FF5722"
                  gutterBottom
                >
                  DAMOA 쇼핑
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  다양한 라이브 커머스 혜택을 지금 경험해보세요.
                </Typography>
              </Box>
            )}

            <Paper
              elevation={isMobile ? 2 : 8}
              sx={{
                width: "100%",
                maxWidth: 720,
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#ffffff",
              }}
            >
              {isMobile && (
                <Box
                  sx={{
                    py: 3,
                    px: 2,
                    textAlign: "center",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Typography variant="h5" fontWeight={700} color="#FF5722">
                    DAMOA
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
                    라이브 쇼핑의 모든 것
                  </Typography>
                </Box>
              )}

              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tab}
                  onChange={(_, newVal) => setTab(newVal)}
                  variant="fullWidth"
                  sx={{
                    "& .MuiTab-root": {
                      py: 2,
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#666",
                    },
                    "& .Mui-selected": {
                      color: "#FF5722",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#FF5722",
                      height: 3,
                    },
                  }}
                >
                  <Tab
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LogIn size={18} />
                        <span>로그인</span>
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <UserPlus size={18} />
                        <span>회원가입</span>
                      </Box>
                    }
                  />
                </Tabs>
              </Box>

              <Box
                sx={{ p: { xs: 3, sm: 5 }, minHeight: tab === 0 ? 360 : 520 }}
              >
                {tab === 0 ? (
                  <LoginForm
                    loginData={loginData}
                    setLoginData={setLoginData}
                    onLogin={handleLogin}
                    loginError={loginError}
                    loginSuccess={loginSuccess}
                  />
                ) : (
                  <SignupForm
                    signupData={signupData}
                    setSignupData={setSignupData}
                    categories={categories}
                    onSignup={handleSignup}
                  />
                )}
              </Box>

              <Box
                sx={{
                  p: 3,
                  backgroundColor: "#f9f9f9",
                  borderTop: "1px solid #f0f0f0",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {tab === 0
                    ? "아직 계정이 없으신가요?"
                    : "이미 계정이 있으신가요?"}
                </Typography>
                <Typography
                  component="button"
                  onClick={() => setTab(tab === 0 ? 1 : 0)}
                  sx={{
                    display: "block",
                    mt: 1,
                    color: "#FF5722",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    fontSize: "0.9rem",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {tab === 0 ? "회원가입하기" : "로그인하기"}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AuthPage;
