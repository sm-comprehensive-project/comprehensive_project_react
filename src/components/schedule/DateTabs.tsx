// src/components/schedule/DateTabs.tsx
import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface DateTabsProps {
  dateRange: string[];
  selectedDate: string;
  onChange: (date: string) => void;
  formatDate: (date: string) => string;
  getDateLabel: (date: string) => string;
}

const DateTabs: React.FC<DateTabsProps> = ({ dateRange, selectedDate, onChange, formatDate, getDateLabel }) => (
  <Tabs
    value={selectedDate}
    onChange={(_, v) => onChange(v)}
    variant="scrollable"
    scrollButtons="auto"
  >
    {dateRange.map((date) => (
      <Tab
        key={date}
        value={date}
        label={`${getDateLabel(date) ? '오늘 ' : ''}${formatDate(date)}`}
      />
    ))}
  </Tabs>
);

export default DateTabs;