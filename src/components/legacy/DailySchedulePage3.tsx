import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
    Box,
    Typography,
    Grid,
    Divider,
    Paper,
} from '@mui/material';
import DateSelector from '../DateSelector';
import scheduleData from '../../assets/data/scheduleData.json';
import BroadcastCard from '../BroadcastCard2';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const isBetween = (time: string, start: string, end: string) => {
    const t = dayjs(time.trim(), 'HH:mm');
    const s = dayjs(start.trim(), 'HH:mm');
    const e = dayjs(end.trim(), 'HH:mm');
  
    console.log(`🔍 raw: t=${t.format()}, s=${s.format()}, e=${e.format()}`);
    console.log(`⏱ isBetween(${time}, ${start}, ${end}) → ${t.isSameOrAfter(s)} && ${t.isSameOrBefore(e)} = ${t.isSameOrAfter(s) && t.isSameOrBefore(e)}`);
  
    return t.isSameOrAfter(s) && t.isSameOrBefore(e);
  };

const timeBlocks = [
    {
        label: '🌄 새벽 00:00 - 02:00',
        key: 'midnight1',
        start: '00:00',
        end: '01:59',
        bg: 'linear-gradient(135deg, #ECEFF1, #CFD8DC)',
    },
    {
        label: '🌌 새벽 02:00 - 04:00',
        key: 'midnight2',
        start: '02:00',
        end: '03:59',
        bg: 'linear-gradient(135deg, #E0F7FA, #B2EBF2)',
    },
    {
        label: '🌃 이른아침 04:00 - 06:00',
        key: 'dawn',
        start: '04:00',
        end: '05:59',
        bg: 'linear-gradient(135deg, #F1F8E9, #DCEDC8)',
    },
    {
        label: '🌅 오전 06:00 - 08:00',
        key: 'morning1',
        start: '06:00',
        end: '07:59',
        bg: 'linear-gradient(135deg, #FFFDE7, #FFF9C4)',
    },
    {
        label: '🌄 오전 08:00 - 10:00',
        key: 'morning2',
        start: '08:00',
        end: '09:59',
        bg: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
    },
    {
        label: '🌞 오전 10:00 - 12:00',
        key: 'morning3',
        start: '10:00',
        end: '11:59',
        bg: 'linear-gradient(135deg, #FFECB3, #FFD54F)',
    },
    {
        label: '🌤 오후 12:00 - 14:00',
        key: 'afternoon1',
        start: '12:00',
        end: '13:59',
        bg: 'linear-gradient(135deg, #E1F5FE, #B3E5FC)',
    },
    {
        label: '☀️ 오후 14:00 - 16:00',
        key: 'afternoon2',
        start: '14:00',
        end: '15:59',
        bg: 'linear-gradient(135deg, #BBDEFB, #90CAF9)',
    },
    {
        label: '🌇 오후 16:00 - 18:00',
        key: 'afternoon3',
        start: '16:00',
        end: '17:59',
        bg: 'linear-gradient(135deg, #F3E5F5, #CE93D8)',
    },
    {
        label: '🌆 저녁 18:00 - 20:00',
        key: 'evening1',
        start: '18:00',
        end: '19:59',
        bg: 'linear-gradient(135deg, #FFE0B2, #FFCC80)',
    },
    {
        label: '🌃 밤 20:00 - 22:00',
        key: 'evening2',
        start: '20:00',
        end: '21:59',
        bg: 'linear-gradient(135deg, #D1C4E9, #B39DDB)',
    },
    {
        label: '🌙 심야 22:00 - 00:00',
        key: 'night',
        start: '22:00',
        end: '23:59',
        bg: 'linear-gradient(135deg, #CFD8DC, #B0BEC5)',
    },
];


const DailySchedulePage3: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

    const filteredSchedule = scheduleData.filter(
        (item) => item.date === selectedDate.format('YYYY-MM-DD')
    );

    return (
        <Box sx={{ px: 2, py: 4, maxWidth: 1200, mx: 'auto' }}>
            <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
            <Typography variant="h4" sx={{ my: 4, fontWeight: 'bold', color: '#FF5722' }}>
                📅 {selectedDate.format('M월 D일 (dd)')} 라이브 편성표
            </Typography>

            {timeBlocks.map((block) => {
                const blockItems = filteredSchedule.filter((item) =>
                    isBetween(item.time, block.start, block.end)
                ); if (blockItems.length === 0) return null;

                return (
                    <Paper
                        key={block.key}
                        elevation={3}
                        sx={{
                            mb: 6,
                            borderRadius: 3,
                            p: 3,
                            background: block.bg,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {block.label}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={3}>
                            {blockItems.map((broadcast) => (
                                <Grid item xs={12} sm={6} md={4} key={broadcast.id}>
                                    <BroadcastCard broadcast={broadcast} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                );
            })}
        </Box>
    );
};

export default DailySchedulePage3;
