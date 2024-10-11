import React, { useState } from 'react';
import { Button, DatePicker, Page } from '@shopify/polaris';
import {
  CalendarIcon
} from '@shopify/polaris-icons';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

import fakeData from '../fakeData';

const Dashboard = () => {
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (value) => {
    setSelectedDates(value);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const filterDataByDate = (data, startDate, endDate) => {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const calculateTotalDays = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const filteredData = filterDataByDate(fakeData, selectedDates.start, selectedDates.end);
  const totalDays = calculateTotalDays(selectedDates.start, selectedDates.end);

  return (
    <Page title="Dashboard" fullWidth>
      {showDatePicker && (
        <DatePicker
          month={selectedDates.start.getMonth()}
          year={selectedDates.start.getFullYear()}
          onChange={handleDateChange}
          onMonthChange={(month, year) => setSelectedDates({ ...selectedDates, start: new Date(year, month, 1) })}
          selected={selectedDates}
          allowRange
        />
      )}
      <Button
        icon={CalendarIcon}
        children={`Last ${totalDays} days`}
        onClick={toggleDatePicker}
      />
      <div className='flex gap-4 pt-3'>
        <LineChart data={filteredData} />
        <BarChart data={filteredData} />
      </div>

    </Page>
  );
};

export default Dashboard;
