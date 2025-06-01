"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios"; // 맨 위에 추가
import {
  TextField,
  Button,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  MenuItem,
  InputAdornment,
  IconButton,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Phone,
  Calendar,
  MapPin,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SignupFormProps {
  signupData: {
    username: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    birthdate: string;
    gender: string;
    address: string;
    detailAddress: string;
    categories: string[];
    marketingAgree: boolean;
  };
  setSignupData: React.Dispatch<
    React.SetStateAction<SignupFormProps["signupData"]>
  >;
  categories: { emoji: string; label: string }[];
  onSignup: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  signupData,
  setSignupData,
  categories,
  onSignup,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = 3;

  const handleCategoryToggle = (category: string) => {
    const current = [...signupData.categories];
    const index = current.indexOf(category);
    if (index === -1) current.push(category);
    else current.splice(index, 1);
    setSignupData({ ...signupData, categories: current });
  };

  const handleNext = () => {
    if (step === 0) {
      if (
        !signupData.username ||
        !signupData.email ||
        !signupData.password ||
        !signupData.confirmPassword
      ) {
        setError("모든 필수 항목을 입력해주세요.");
        return;
      }
      if (signupData.password !== signupData.confirmPassword) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }
    } else if (step === 1 && !signupData.phone) {
      setError("휴대폰 번호는 필수 항목입니다.");
      return;
    }
    setError(null);
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const stepContents = [
    {
      label: "기본 정보",
      description: "계정 생성에 필요한 기본 정보를 입력해주세요.",
      content: (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            fullWidth
            label="아이디"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User size={18} color="#999" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="이름"
            value={signupData.name}
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            type="email"
            label="이메일"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
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
            type={showPassword ? "text" : "password"}
            label="비밀번호"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
            helperText="8자 이상, 영문/숫자/특수문자 조합"
            InputProps={{
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
          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            label="비밀번호 확인"
            value={signupData.confirmPassword}
            error={
              signupData.password !== signupData.confirmPassword &&
              signupData.confirmPassword !== ""
            }
            helperText={
              signupData.password !== signupData.confirmPassword &&
              signupData.confirmPassword !== ""
                ? "비밀번호가 일치하지 않습니다"
                : ""
            }
            onChange={(e) =>
              setSignupData({ ...signupData, confirmPassword: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      ),
    },
    {
      label: "개인 정보",
      description: "추가 정보를 입력해주세요.",
      content: (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            fullWidth
            label="휴대폰 번호"
            value={signupData.phone}
            onChange={(e) =>
              setSignupData({
                ...signupData,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone size={18} color="#999" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="생년월일"
            type="date"
            value={signupData.birthdate}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setSignupData({ ...signupData, birthdate: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar size={18} color="#999" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            select
            label="성별"
            value={signupData.gender}
            onChange={(e) =>
              setSignupData({ ...signupData, gender: e.target.value })
            }
          >
            <MenuItem value="">선택 안함</MenuItem>
            <MenuItem value="male">남성</MenuItem>
            <MenuItem value="female">여성</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="주소"
            value={signupData.address}
            onChange={(e) =>
              setSignupData({ ...signupData, address: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapPin size={18} color="#999" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="상세주소"
            value={signupData.detailAddress}
            onChange={(e) =>
              setSignupData({ ...signupData, detailAddress: e.target.value })
            }
          />
        </Box>
      ),
    },
    {
      label: "선택 정보",
      description: "관심 카테고리와 마케팅 수신 동의를 선택해주세요.",
      content: (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            관심 카테고리
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 1,
            }}
          >
            {categories.map(({ emoji, label }) => (
              <Button
                key={label}
                variant={
                  signupData.categories.includes(label)
                    ? "contained"
                    : "outlined"
                }
                startIcon={<span style={{ fontSize: "1.2rem" }}>{emoji}</span>}
                onClick={() => handleCategoryToggle(label)}
                sx={{
                  justifyContent: "flex-start",
                  py: 1,
                  px: 2,
                  borderColor: "#ddd",
                  color: signupData.categories.includes(label)
                    ? "white"
                    : "#666",
                  backgroundColor: signupData.categories.includes(label)
                    ? "#FF5722"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: signupData.categories.includes(label)
                      ? "#E64A19"
                      : "rgba(0,0,0,0.04)",
                    borderColor: signupData.categories.includes(label)
                      ? "#E64A19"
                      : "#ccc",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Divider />
          <Typography variant="subtitle1" fontWeight={600}>
            마케팅 수신 동의
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={signupData.marketingAgree}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      marketingAgree: e.target.checked,
                    })
                  }
                  sx={{
                    color: "#999",
                    "&.Mui-checked": {
                      color: "#FF5722",
                    },
                  }}
                />
              }
              label={
                <Box>
                  이메일/문자 마케팅 수신 동의
                  <Typography
                    variant="caption"
                    sx={{ display: "block", color: "gray" }}
                  >
                    혜택, 이벤트, 할인 정보를 받아볼 수 있어요 (선택)
                  </Typography>
                </Box>
              }
            />
          </FormGroup>
          <Alert severity="info">
            <Typography variant="body2">
              회원가입 시{" "}
              <Link
                to="/terms"
                style={{ color: "#FF5722", textDecoration: "none" }}
              >
                이용약관
              </Link>{" "}
              및{" "}
              <Link
                to="/privacy"
                style={{ color: "#FF5722", textDecoration: "none" }}
              >
                개인정보처리방침
              </Link>
              에 동의하게 됩니다.
            </Typography>
          </Alert>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">진행률</Typography>
          <Typography variant="body2" fontWeight={500}>
            {Math.round(((step + 1) / totalSteps) * 100)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={((step + 1) / totalSteps) * 100}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "#FFE0B2",
            "& .MuiLinearProgress-bar": { backgroundColor: "#FF5722" },
          }}
        />
      </Box>

      {isMobile ? (
        <>
          <Typography variant="h6" fontWeight={600}>
            {stepContents[step].label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stepContents[step].description}
          </Typography>
          <Box mt={2}>{stepContents[step].content}</Box>
        </>
      ) : (
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ width: 200 }}>
            <Stepper activeStep={step} orientation="vertical">
              {stepContents.map((item) => (
                <Step key={item.label}>
                  <StepLabel>{item.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {stepContents[step].label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stepContents[step].description}
            </Typography>
            <Box mt={2}>{stepContents[step].content}</Box>
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        {step > 0 && (
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ color: "#666", borderColor: "#ccc" }}
          >
            이전
          </Button>
        )}
        {step < totalSteps - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ backgroundColor: "#FF5722", px: 4 }}
          >
            다음
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={async () => {
              const signupInfo = {
                email: signupData.email,
                password: signupData.password,
                nickname: signupData.name,
                loginType: "basic",
                address: signupData.address,
                gender: signupData.gender?.toUpperCase(),
                birthDate: signupData.birthdate,
                interestedCategories: signupData.categories ?? [],
              };
              alert("보낼 회원가입 정보:\n" + JSON.stringify(signupInfo, null, 2));
              try {
                const response = await axios.post("http://localhost:8088/api/user/register", signupInfo);
                alert("✅ 회원가입 성공:\n" + JSON.stringify(response.data, null, 2));
                console.log("✅ 회원가입 성공:", response.data);
                onSignup();
              } catch (err: unknown) {
                const axiosError = err as AxiosError<{ message: string }>;
                let message = "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.";
                if (axiosError.response?.status === 409) {
                  message = "이미 가입된 이메일입니다.";
                } else if (axiosError.response?.data?.message) {
                  message = axiosError.response.data.message;
                }
                setError(message);
                alert(message);
              }
            }}
            startIcon={<Check size={18} />}
            sx={{ backgroundColor: "#FF5722", px: 4 }}
          >
            가입 완료
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SignupForm;
