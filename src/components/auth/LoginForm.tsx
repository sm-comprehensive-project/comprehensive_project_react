// src/components/auth/LoginForm.tsx
"use client";

import type React from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  loginData: {
    username: string;
    password: string;
  };
  setLoginData: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
    }>
  >;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginData,
  setLoginData,
  onLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    setError(null);
    onLogin();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="아이디 또는 이메일"
        variant="outlined"
        value={loginData.username}
        onChange={(e) =>
          setLoginData({ ...loginData, username: e.target.value })
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail size={18} color="#999" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock size={18} color="#999" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              size="small"
              sx={{
                color: "#999",
                "&.Mui-checked": {
                  color: "#FF5722",
                },
              }}
            />
          }
          label={<Typography variant="body2">자동 로그인</Typography>}
        />

        <Link to="/auth/forgot-password">
          {" "}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ "&:hover": { color: "#FF5722" } }}
          >
            아이디/비밀번호 찾기
          </Typography>
        </Link>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 1,
          py: 1.5,
          backgroundColor: "#FF5722",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#E64A19",
          },
        }}
      >
        로그인
      </Button>

      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          간편 로그인
        </Typography>
      </Divider>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            py: 1,
            borderColor: "#FEE500",
            backgroundColor: "#FEE500",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#FEE500",
              opacity: 0.9,
              borderColor: "#FEE500",
            },
          }}
        >
          카카오
        </Button>
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            py: 1,
            borderColor: "#03C75A",
            backgroundColor: "#03C75A",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#03C75A",
              opacity: 0.9,
              borderColor: "#03C75A",
            },
          }}
        >
          네이버
        </Button>
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            py: 1,
            borderColor: "#4285F4",
            backgroundColor: "#4285F4",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#4285F4",
              opacity: 0.9,
              borderColor: "#4285F4",
            },
          }}
        >
          구글
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
