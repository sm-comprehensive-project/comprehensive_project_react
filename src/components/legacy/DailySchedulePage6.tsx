import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
    Box,
    Typography,
    Grid,
    Divider,
    IconButton,
    Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    return t.isSameOrAfter(s) && t.isSameOrBefore(e);
};

const timeBlocks = [...Array(24).keys()].map((hour) => {
    const h = hour.toString().padStart(2, '0');
    return {
        label: `${h}:00 - ${h}:59`,
        key: h,
        start: `${h}:00`,
        end: `${h}:59`,
    };
});

const DailySchedulePage6: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [expandedBlocks, setExpandedBlocks] = useState<{ [key: string]: boolean }>({});

    const toggleBlock = (key: string) => {
        setExpandedBlocks((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const filteredSchedule = scheduleData.filter(
        (item) => item.date === selectedDate.format('YYYY-MM-DD')
    );

    const currentTime = dayjs().format('HH:mm');

    return (
        <Box sx={{ px: 2, py: 4, maxWidth: 1200, mx: 'auto' }}>
            <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
            <Typography variant="h4" sx={{ my: 4, fontWeight: 'bold', color: '#FF5722' }}>
                📅 {selectedDate.format('M월 D일 (dd)')} 라이브 편성표
            </Typography>

            {timeBlocks.map((block) => {
                const blockItems = filteredSchedule.filter((item) =>
                    isBetween(item.time, block.start, block.end)
                );
                if (blockItems.length === 0) return null;

                const isExpanded = expandedBlocks[block.key];
                const isPastBlock = dayjs(currentTime, 'HH:mm').isAfter(dayjs(block.end, 'HH:mm'));

                return (
                    <Box
                        key={block.key}
                        sx={{
                            mb: 4,
                            opacity: isPastBlock ? 0.4 : 1,
                            filter: isPastBlock ? 'grayscale(0.6)' : 'none',
                            backgroundColor: isPastBlock ? '#f5f5f5' : 'transparent',
                            borderRadius: 2,
                            p: 2,
                            transition: 'all 0.3s',
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ mb: 1, color: '#555', fontWeight: 500 }}
                        >
                            {block.label}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2}>
                            {blockItems.slice(0, 3).map((broadcast) => (
                                <Grid item xs={12} sm={6} md={4} key={broadcast.id}>
                                    <BroadcastCard broadcast={broadcast} />
                                </Grid>
                            ))}
                        </Grid>

                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                {blockItems.slice(3).map((broadcast) => (
                                    <Grid item xs={12} sm={6} md={4} key={broadcast.id}>
                                        <BroadcastCard broadcast={broadcast} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Collapse>

                        {blockItems.length > 3 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                <IconButton
                                    onClick={() => toggleBlock(block.key)}
                                    sx={{
                                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s',
                                        border: '1px solid #ccc',
                                        borderRadius: '50%',
                                        width: 36,
                                        height: 36,
                                    }}
                                >
                                    <ExpandMoreIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default DailySchedulePage6;
