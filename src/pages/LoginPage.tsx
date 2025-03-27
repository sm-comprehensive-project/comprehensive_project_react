// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
} from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('로그인 시도:', username, password);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom color="primary" fontWeight={700}>
        로그인
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        margin="normal"
        label="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        로그인하기
      </Button>
    </Container>
  );
};

export default LoginPage;
