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
} from '@mui/material';

const AuthPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

        {/* 로그인 탭 */}
        {tab === 0 && (
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="아이디"
              variant="outlined"
              fullWidth
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <TextField
              label="비밀번호"
              type="password"
              variant="outlined"
              fullWidth
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                backgroundColor: '#FF5722',
                '&:hover': { backgroundColor: '#E64A19' },
              }}
            >
              로그인하기
            </Button>
          </Box>
        )}

        {/* 회원가입 탭 */}
        {tab === 1 && (
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="아이디"
              variant="outlined"
              fullWidth
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            />
            <TextField
              label="이메일"
              variant="outlined"
              fullWidth
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <TextField
              label="비밀번호"
              type="password"
              variant="outlined"
              fullWidth
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
            <TextField
              label="비밀번호 확인"
              type="password"
              variant="outlined"
              fullWidth
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleSignup}
              sx={{
                backgroundColor: '#FF5722',
                '&:hover': { backgroundColor: '#E64A19' },
              }}
            >
              회원가입하기
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AuthPage;
