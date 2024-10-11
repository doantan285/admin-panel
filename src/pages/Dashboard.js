import React from 'react';
import { Button, Page, Thumbnail } from '@shopify/polaris';
import {
  CalendarIcon
} from '@shopify/polaris-icons';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

const Dashboard = () => {
  return (
    <Page title="Dashboard" fullWidth>
      <Button
        icon={CalendarIcon}
      >
        Last 7 days
      </Button>
      <div className='flex gap-4 pt-3'>
          <LineChart />
          <BarChart />
      </div>

    </Page>
  );
};

export default Dashboard;
