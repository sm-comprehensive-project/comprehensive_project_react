// src/components/auth/LoginForm.tsx
import React from 'react';
import { Box, TextField, Button } from '@mui/material';

interface LoginFormProps {
  loginData: {
    username: string;
    password: string;
  };
  setLoginData: React.Dispatch<React.SetStateAction<{ username: string; password: string }>>;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginData, setLoginData, onLogin }) => {
  return (
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
        onClick={onLogin}
        sx={{
          backgroundColor: '#FF5722',
          '&:hover': { backgroundColor: '#E64A19' },
        }}
      >
        로그인하기
      </Button>
    </Box>
  );
};

export default LoginForm;
