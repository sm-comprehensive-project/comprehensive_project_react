// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';

const AuthPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const [signupData, setSignupData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthdate: '',
    gender: '',
    address: '',
    detailAddress: '',
    categories: [] as string[],
    marketingAgree: false,
  });

  const categories: { emoji: string; label: string }[] = [
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

  const handleLogin = () => {
    console.log('로그인 정보:', loginData);
  };

  const handleSignup = () => {
    console.log('회원가입 정보:', signupData);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#fff3e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          backgroundColor: '#ffffff',
          minHeight: 420, // 💡 최소 높이 설정 (로그인/회원가입 모두 커버할 수 있도록)
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="로그인" />
          <Tab label="회원가입" />
        </Tabs>

        {/* 공통 영역 감싸기 (탭 내부 컨텐츠) */}
        <Box sx={{ flex: 1 }}>
          {tab === 0 && (
            <LoginForm
              loginData={loginData}
              setLoginData={setLoginData}
              onLogin={handleLogin}
            />
          )}

          {tab === 1 && (
            <SignupForm
              signupData={signupData}
              setSignupData={setSignupData}
              categories={categories}
              onSignup={handleSignup}
            />
          )}

        </Box>
      </Paper>

    </Box>
  );
};

export default AuthPage;
