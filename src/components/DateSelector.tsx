// src/components/DateSelector.tsx
import React from 'react';
import { Box, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

interface DateSelectorProps {
  selectedDate: Dayjs;
  onChange: (date: Dayjs) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onChange }) => {
  const days = Array.from({ length: 11 }, (_, i) =>
    dayjs().startOf('day').add(i - 5, 'day')
  );

  const getDayLabel = (date: Dayjs) => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return dayNames[date.day()];
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        py: 2,
        borderBottom: '1px solid #eee',
      }}
    >
      {days.map((date) => {
        const isToday = date.isSame(dayjs(), 'day');
        const isSelected = date.isSame(selectedDate, 'day');

        return (
          <Button
            key={date.format('YYYY-MM-DD')}
            onClick={() => onChange(date)}
            sx={{
              minWidth: 60,
              flexDirection: 'column',
              borderRadius: 2,
              fontWeight: isSelected ? 'bold' : 'normal',
              color: isToday ? '#FF5722' : '#333',
              backgroundColor: isSelected ? '#FFF3E0' : 'transparent',
              border: isSelected ? '1px solid #FFCCBC' : '1px solid transparent',
              '&:hover': {
                backgroundColor: '#FFF3E0',
              },
            }}
          >
            {date.format('DD')}
            <Box sx={{ fontSize: 12 }}>{isToday ? '오늘' : getDayLabel(date)}</Box>
          </Button>
        );
      })}
    </Box>
  );
};

export default DateSelector;
