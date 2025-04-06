// src/components/auth/SignupForm.tsx
import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
} from '@mui/material';

interface Category {
    emoji: string;
    label: string;
}

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
    setSignupData: React.Dispatch<React.SetStateAction<SignupFormProps['signupData']>>;
    categories: Category[];
    onSignup: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
    signupData,
    setSignupData,
    categories,
    onSignup,
}) => {
    const [step, setStep] = useState(1);

    return (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* 1단계: 기본 정보 */}
            {step === 1 && (
                <>
                    <TextField
                        label="아이디"
                        variant="outlined"
                        fullWidth
                        value={signupData.username}
                        onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                    />
                    <TextField
                        label="이름 (닉네임 또는 실명)"
                        variant="outlined"
                        fullWidth
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
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
                </>
            )}

            {/* 2단계: 개인정보 */}
            {step === 2 && (
                <>
                    <TextField
                        label="휴대폰 번호 (숫자만 입력)"
                        variant="outlined"
                        fullWidth
                        value={signupData.phone}
                        onChange={(e) =>
                            setSignupData({ ...signupData, phone: e.target.value.replace(/\D/g, '') })
                        }
                    />
                    <TextField
                        label="생년월일 (예: 1990-01-01)"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={signupData.birthdate}
                        onChange={(e) => setSignupData({ ...signupData, birthdate: e.target.value })}
                    />
                    <TextField
                        label="성별 (선택사항)"
                        select
                        fullWidth
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }} // 👈 이거 추가!
                        value={signupData.gender}
                        onChange={(e) => setSignupData({ ...signupData, gender: e.target.value })}
                    >
                        <option value="">선택 안함</option>
                        <option value="남성">남성</option>
                        <option value="여성">여성</option>
                    </TextField>
                    <TextField
                        label="주소 (도로명)"
                        variant="outlined"
                        fullWidth
                        value={signupData.address}
                        onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                    />
                    <TextField
                        label="상세주소 (아파트 동/호 등)"
                        variant="outlined"
                        fullWidth
                        value={signupData.detailAddress}
                        onChange={(e) => setSignupData({ ...signupData, detailAddress: e.target.value })}
                    />
                </>
            )}

            {step === 3 && (
                <>
                    <Divider sx={{ mt: 2, mb: 1 }}>관심 카테고리 (선택)</Divider>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 1.5,
                        }}
                    >
                        {categories.map(({ emoji, label }) => (
                            <FormControlLabel
                                key={label}
                                control={
                                    <Checkbox
                                        checked={signupData.categories.includes(label)}
                                        onChange={() =>
                                            setSignupData((prev) => ({
                                                ...prev,
                                                categories: prev.categories.includes(label)
                                                    ? prev.categories.filter((c) => c !== label)
                                                    : [...prev.categories, label],
                                            }))
                                        }
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <span style={{ fontSize: '1.2rem' }}>{emoji}</span>
                                        <span>{label}</span>
                                    </Box>
                                }
                            />
                        ))}
                    </Box>

                    <Divider sx={{ mt: 4, mb: 1 }}>마케팅 수신 동의</Divider>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={signupData.marketingAgree}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, marketingAgree: e.target.checked })
                                    }
                                />
                            }
                            label={
                                <Box>
                                    <Box component="span">이메일 / 문자 등 마케팅 수신에 동의합니다</Box>
                                    <Typography variant="caption" sx={{ display: 'block', color: 'gray' }}>
                                        혜택, 이벤트, 할인 정보 등을 받아볼 수 있어요 (선택)
                                    </Typography>
                                </Box>
                            }
                        />
                    </FormGroup>
                </>
            )}


            {/* 이전/다음/제출 버튼 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                {step > 1 && (
                    <Button variant="outlined" onClick={() => setStep(step - 1)}>
                        이전
                    </Button>
                )}
                {step < 3 ? (
                    <Button variant="contained" onClick={() => setStep(step + 1)}>
                        다음
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={onSignup}
                        sx={{ backgroundColor: '#FF5722', '&:hover': { backgroundColor: '#E64A19' } }}
                    >
                        회원가입하기
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default SignupForm;
