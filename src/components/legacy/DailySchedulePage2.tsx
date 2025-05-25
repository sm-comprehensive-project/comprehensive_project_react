import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import DateSelector from '../DateSelector';
import scheduleData from '../../assets/data/scheduleData.json';
import BroadcastCard from '../BroadcastCard2';

const timeBlocks = [
  { label: '오전 (06:00 - 12:00)', key: 'morning' },
  { label: '오후 (12:00 - 18:00)', key: 'afternoon' },
  { label: '저녁 (18:00 - 22:00)', key: 'evening' },
  { label: '심야 (22:00 - 06:00)', key: 'night' },
];

const DailySchedulePage2: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const filteredSchedule = scheduleData.filter(
    (item) => item.date === selectedDate.format('YYYY-MM-DD')
  );

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: 1000, mx: 'auto' }}>
      {/* 날짜 선택 바 */}
      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />

      <Typography variant="h5" sx={{ my: 4, fontWeight: 'bold', color: '#FF5722' }}>
        📅 {selectedDate.format('M월 D일 (dd)')} 라이브 편성표
      </Typography>

      {timeBlocks.map((block) => {
        const blockItems = filteredSchedule.filter((item) => item.block === block.key);
        if (blockItems.length === 0) return null;

        return (
          <Box key={block.key} sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {block.label}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {blockItems.map((broadcast) => (
                <Grid item xs={12} sm={6} md={4} key={broadcast.id}>
                  <BroadcastCard broadcast={broadcast} />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default DailySchedulePage2;
