import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MainPage2 = () => {
  const [search, setSearch] = useState('');
  const popularKeywords = ['#봄신상', '#1+1', '#무료배송', '#오늘밤라이브'];
  const categories = ['패션', '뷰티', '푸드', '테크', '취미'];

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#fff3e0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {/* 상단 텍스트 */}
      <Typography variant="h5" sx={{ mb: 3, color: '#FF5722', fontWeight: 'bold' }}>
        원하는 방송이나 상품을 검색해보세요
      </Typography>

      {/* 검색창 */}
      <TextField
        placeholder="검색어 입력..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 500,
          backgroundColor: '#fff',
          borderRadius: 2,
          mb: 3,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* 추천 키워드 */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          🔍 인기 키워드
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {popularKeywords.map((keyword, index) => (
            <Button
              key={index}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 20,
                textTransform: 'none',
                borderColor: '#FF5722',
                color: '#FF5722',
                '&:hover': {
                  backgroundColor: '#FFF3E0',
                  borderColor: '#FF6D00',
                  color: '#FF6D00',
                },
              }}
            >
              {keyword}
            </Button>
          ))}
        </Box>
      </Box>

      {/* 추천 카테고리 */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          📂 인기 카테고리
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((category, index) => (
            <Button
              key={index}
              size="small"
              variant="contained"
              sx={{
                backgroundColor: '#FF5722',
                color: '#fff',
                borderRadius: 20,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#E64A19',
                },
              }}
            >
              {category}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage2;
